// https://docs.lvgl.io/master/overview/style-props.html
import { Declaration, Rule } from 'postcss';
import * as Color from 'color'; 
import * as selectorPaser from 'postcss-selector-parser';
import * as valueParser from 'postcss-value-parser';
import parseSides from 'parse-css-sides';
import { PART_SELECTOR, STATE_SELECTOR } from './constants';
import { AttributeAlignConfig, AttributeAlignType } from './align-config';


export type StyleItemAttributes = {name: string, value: string, type: AttributeAlignType}[];
export interface StyleItem {
  className: string;
  stateSelector: string[];
  partSelector: string[];
  attributes: StyleItemAttributes;
}

function valueFunctionToString(node: valueParser.Node): string {
  if (node.type === 'comment') return '';
  else if (node.type !== 'function') return node.value;
  return `${node.value}(${node.nodes.map(valueFunctionToString).join('')})`;
}

function attributeTransform(decl: Declaration, alignConfig: AttributeAlignConfig): StyleItemAttributes {
  const lineInfo = `line(${decl?.source?.start.line})`;
  if (!(decl.prop in alignConfig)) {
    throw new Error(`unkown lvgl css attribute(${decl.prop}) in ${lineInfo}!`);
  }

  const config = alignConfig[decl.prop];
  const valueAst = valueParser(decl.value);
  const getSingleWordNode = () => {
    const valueNodes = valueAst.nodes.filter(node => node.type === 'word' || node.type === 'function');
    if (valueNodes.length !== 1) {
      throw new Error(`multiple value is not supported in attribute(${decl.prop}) in ${lineInfo}`);
    }
    return valueNodes[0];
  };
  let attributesValue: StyleItemAttributes = [];
  switch (config.type) {
    case 'pixel':
    case 'percent':
    case 'coord': {
      const node = getSingleWordNode();
      if (node.value.endsWith('%')) {
        attributesValue = [{ value: node.value.slice(0, -1), name: config.target, type: 'percent' }];
      } else if (node.value.endsWith('px')) {
        attributesValue = [{ value: node.value.slice(0, -2), name: config.target, type: 'pixel' }];
      } else {
        throw new Error(`unsupported format(${node.value}) in ${lineInfo}`);
      }
      break;
    }
    // case 'pixel': {
    //   const node = getSingleWordNode();
    //   if (node.value.endsWith('px')) {
    //     attributesValue = [{value: node.value, name: config.target, type: config.type}];
    //   } else {
    //     throw new Error(`unsupported format(${node.value}) in ${lineInfo}`);
    //   }
    //   break;
    // }
    case 'color': {
      const node = getSingleWordNode();
      let color: number[] = [];
      let value = node.value;
      if (node.type === 'function') {
        value = valueFunctionToString(node);
      }
      try {
        color = Color(value).rgb().array();
      } catch (e) {
        throw new Error(`unsupported format(${value}) in ${lineInfo}`);
      }
      attributesValue = [{ value: `rgb(${color.join(',')})`, name: config.target, type: config.type }];
      break;
    }
    case 'side': {
      if (valueAst.nodes.filter(node => node.type === 'word').some(node => !node.value.endsWith('px'))) {
        throw new Error(`lvgl css sides only support px unit in ${lineInfo}!`);
      }
      const attributes: StyleItemAttributes = [];
      const sides = parseSides(decl.value);
      ['top', 'right', 'bottom', 'left'].forEach((k, i) => {
        const newDecl = decl.clone({ prop: config.target[i], value: sides[k] });
        attributes.push(...attributeTransform(newDecl, alignConfig));
      });
      attributesValue = attributes;
      break;
    }
    case 'enum': {
      const node = getSingleWordNode();
      const hasMapTo = config.enum.length && typeof config.enum[0] !== 'string';
      const isFound = hasMapTo
        ? (config.enum as {value: string, mapTo: string}[]).some(({ value }) => value === node.value)
        : (config.enum as string[]).includes(node.value);
      if (!isFound) {
        throw new Error(`unkown enum value(${node.value}) for attribute(${decl.prop}) in ${lineInfo}`);
      }
      if (hasMapTo) {
        const enumValue = (config.enum as {value: string, mapTo: string}[]).find(({ value }) => value === node.value);
        attributesValue = [{ value: enumValue.mapTo, name: config.target, type: config.type }];
      } else {
        return [{ value: node.value, name: config.target, type: config.type }];
      }
      break;
    }
    case 'dynamic': {
      attributesValue = config.transform(decl);
      break;
    }
    default: {
      break;
    }
  }

  return attributesValue;
}

const selectorProcessor = selectorPaser();

export function transform(rule: Rule, alignConfig: AttributeAlignConfig): StyleItem {
  const selectorAst = selectorProcessor.astSync(rule.selector);
  let selector: selectorPaser.Selector | null = null;
  if (selectorAst.nodes.length) {
    selector = selectorAst.nodes[0];
  }
  if (
    // multiple selector is not supported. eg. `.s1, .s2`
    selectorAst.nodes.length > 1
    || !selector
    || selector.nodes.length === 0
    // only class selector is supported
    || selector.nodes.filter(node => node.type === 'class').length !== selector.nodes.length
    // class selector must be in StateSelector or PartSelector when starting with second one.
    || selector.nodes.some((node, index) => index !== 0 && (!(node.value in STATE_SELECTOR) || !(node.value in PART_SELECTOR)))
  ) {
    throw new Error('unsupported selector syntax!');
  }

  const styleItem: StyleItem = {
    className: '',
    stateSelector: [],
    partSelector: [],
    attributes: []
  };

  for (let i = 0; i < selector.nodes.length; i++) {
    if (i === 0) {
      styleItem.className = selector.nodes[i].value;
      continue;
    }
    const name = selector.nodes[i].value;
    if (name in STATE_SELECTOR) {
      styleItem.stateSelector.push(name);
    } else if (name in PART_SELECTOR) {
      styleItem.partSelector.push(name);
    }
  }

  // attributes transform
  for (const node of rule.nodes.filter(node => node.type === 'decl')) {
    styleItem.attributes.push(...attributeTransform(node as Declaration, alignConfig));
  }

  // attribute merge
  for (const configKey of Object.keys(alignConfig)) {
    const config = alignConfig[configKey];
    if (config.type !== 'merge') continue;
    const filtered = [];
    const mergeAttrs = [];
    for (const attr of styleItem.attributes) {
      if (config.target.includes(attr.name)) mergeAttrs.push(attr);
      else filtered.push(attr);
    }
    styleItem.attributes = filtered.concat(config.transform(mergeAttrs));
  }

  return styleItem;
}