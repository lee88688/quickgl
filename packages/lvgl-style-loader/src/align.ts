// https://docs.lvgl.io/master/overview/style-props.html
import postcss, { Declaration, Rule } from 'postcss'
import * as selectorPaser from 'postcss-selector-parser';
import * as valueParser from 'postcss-value-parser';
import parseSides from 'parse-css-sides';
import { PartSelector, StateSelector } from './types';

/**
 * coord: pixel or percentage
 * percentage use macro `LV_PCT(x)` to transform
 */
interface StaticAlignCoordType {
  type: 'coord';
  target: string;
}

// only pixel
interface StaticAlignPixelType {
  type: 'pixel';
  target: string;
}

interface StaticAlignColorType {
  type: 'color';
  target: string;
}

/**
 * enum: usually c macros
 * value is css attribute value and mapTo is corresponding lvgl style attribute value
 */
interface StaticAlignEnumType {
  type: 'enum';
  target: string;
  enum: string[] | {value: string, mapTo: string}[];
}

/**
 * expand type is used to expanding it to other types
 * only support CSS sides
 * the unit is px(pixel)
 * target is a string array which indicate to expanded attributes
 * the order is top -> right -> bottom -> left
 * eg. padding -> padding-top, padding-right, padding-bottom, padding-left
 */
interface StaticAlignSideType {
  type: 'side';
  target: string[];
}

type StaticAlign = 
  | StaticAlignCoordType
  | StaticAlignPixelType
  | StaticAlignColorType
  | StaticAlignEnumType
  | StaticAlignSideType

interface DynamicAlign {
  type: 'dynamic';
  transform: (decl: Declaration) => {value: string, name: string}[];
}

/**
 * key is css attribute name
 */
const attributeAlignConfig: Record<string, StaticAlign | DynamicAlign> = {
  width: {
    type: 'coord',
    target: 'width'
  },
  'min-width': {
    type: 'coord',
    target: 'min-width'
  }
}

function attributeTransform(decl: Declaration, alignConfig: Record<string, StaticAlign | DynamicAlign>): {name: string, value: string}[] {
  const lineInfo = `line(${decl?.source?.start.line})`;
  if (!(decl.prop in alignConfig)) {
    throw new Error(`unkown lvgl css attribute(${decl.prop}) in ${lineInfo}!`);
  }

  const config = alignConfig[decl.prop];
  const valueAst = valueParser(decl.value);
  const getSingleWordNode = () => {
    const valueNodes = valueAst.nodes.filter(node => node.type === 'word');
    if (valueNodes.length !== 1) {
      throw new Error(`multiple value is not supported in attribute(${decl.prop}) in ${lineInfo}`);
    }
    return valueNodes[0];
  }
  switch (config.type) {
    case 'coord': {
      const node = getSingleWordNode();
      if (node.value.endsWith('%')) {
        return [{value: `LV_PCT(${node.value.slice(0, -1)})`, name: config.target}];
      } else if (node.value.endsWith('px')) {
        return [{value: node.value.slice(0, -2), name: config.target}];
      } else {
        throw new Error(`unsupported format(${node.value}) in ${lineInfo}`);
      }
      break;
    }
    case 'pixel': {
      const node = getSingleWordNode();
      if (node.value.endsWith('px')) {
        return [{value: node.value.slice(0, -2), name: config.target}];
      } else {
        throw new Error(`unsupported format(${node.value}) in ${lineInfo}`);
      }
      break;
    }
    case 'color': {
      const node = getSingleWordNode();
      if (node.value.startsWith('#')) {
        return []; // todo
      } else {
        throw new Error(`unsupported format(${node.value}) in ${lineInfo}`);
      }
      break;
    }
    case 'side': {
      if (valueAst.nodes.filter(node => node.type === 'word').some(node => !node.value.endsWith('px'))) {
        throw new Error(`lvgl css sides only support px unit in ${lineInfo}!`);
      }
      const attributes: {value: string, name: string}[] = [];
      const sides = parseSides(decl.value);
      ['top', 'right', 'bottom', 'left'].forEach((k, i) => {
        const newDecl = decl.clone({prop: config.target[i], value: sides[k]});
        attributes.push(...attributeTransform(newDecl, alignConfig));
      });
      return attributes;
      break;
    }
    case 'enum': {
      const node = getSingleWordNode();
      const hasMapTo = config.enum.length && typeof config.enum[0] !== 'string';
      const isFound = hasMapTo
        ? (config.enum as {value: string, mapTo: string}[]).some(({value}) => value === node.value)
        : (config.enum as string[]).includes(node.value);
      if (!isFound) {
        throw new Error(`unkown enum value(${node.value}) for attribute(${decl.prop}) in ${lineInfo}`)
      }
      if (hasMapTo) {
        const enumValue = (config.enum as {value: string, mapTo: string}[]).find(({value}) => value === node.value);
        return [{value: enumValue.mapTo, name: config.target}];
      } else {
        return [{value: node.value, name: config.target}];
      }
      break;
    }
    case 'dynamic': {
      return config.transform(decl);
      break;
    }
    default: {
      break;
    }
  }

  return [];
}

interface StyleItem {
  className: string;
  stateSelector: string[];
  partSelector: string[];
  attributes: {
    name: string;
    value: string;
  }[]
}

const selectorProcessor = selectorPaser();

export function transform(rule: Rule, alignConfig: Record<string, StaticAlign | DynamicAlign> = attributeAlignConfig): StyleItem {
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
    || selector.nodes.some((node, index) => index !== 0 && (!(node.value in StateSelector) || !(node.value in PartSelector)))
  ) {
    throw new Error('unsupported selector syntax!');
  }

  const styleItem: StyleItem = {
    className: '',
    stateSelector: [],
    partSelector: [],
    attributes: []
  }

  for (let i = 0; i < selector.nodes.length; i++) {
    if (i === 0) {
      styleItem.className = selector.nodes[i].value;
      continue;
    }
    const name = selector.nodes[i].value;
    if (name in StateSelector) {
      styleItem.stateSelector.push(name);
    } else if (name in PartSelector) {
      styleItem.partSelector.push(name);
    }
  }

  for (let node of rule.nodes.filter(node => node.type === 'decl')) {
    styleItem.attributes.push(...attributeTransform(node as Declaration, alignConfig));
  }

  return styleItem;
}