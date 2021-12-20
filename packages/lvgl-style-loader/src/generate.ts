import lodash from 'lodash';
import { StyleItem } from "./align";
import { PART_SELECTOR, STATE_SELECTOR, STYLE_PROP } from "./constants";


export function generateCLang(styleItem: StyleItem): string {
  return '';
}

export interface JSStyleItem {
  className: string;
  selector: number;
  attributes: {name: number | string, value: number | string}[];
}

function lvPct(x: number): number {
  const lvCoordSetSpec = x => x | (1 << 13);
  return (x < 0 ? lvCoordSetSpec(1000 - (x)) : lvCoordSetSpec(x));
}

export function generateJSStyleItem(styleItem: StyleItem): JSStyleItem {
  const jsStyleItem: JSStyleItem = {
    className: styleItem.className,
    selector: 0,
    attributes: [],
  };
  
  // selector
  for (const state of styleItem.stateSelector) {
    jsStyleItem.selector |= STATE_SELECTOR[state];
  }
  for (const part of styleItem.partSelector) {
    jsStyleItem.selector |= PART_SELECTOR[part];
  }

  // attributtes
  for (const attr of styleItem.attributes) {
    const name = `LV_STYLE_${attr.name.toUpperCase()}`;
    if (!name.startsWith('LV_STYLE_FLEX') && !(name in STYLE_PROP)) {
      throw new Error(`className(${styleItem.className})'s attribute(${attr.name}) is not in lvgl style props!`);
    }
    switch(attr.type) {
      case 'pixel': {
        const value = parseInt(attr.value);
        jsStyleItem.attributes.push({ name: STYLE_PROP[name], value });
        continue;
      }
      case 'percent': {
        const value = parseInt(attr.value);
        jsStyleItem.attributes.push({ name: STYLE_PROP[name], value: lvPct(value) });
        continue;
      }
      case 'color': {
        const m = attr.value.match(/rgb\((\d+),(\d+),(\d+)\)/);
        const r = parseInt(m[1]);
        const g = parseInt(m[2]);
        const b = parseInt(m[3]);
        // hight byte -- r, g, b -- low byte
        const color = (0xff & b) | (0xff & g) << 8 | (0xff & r) << 16;
        jsStyleItem.attributes.push({ name: STYLE_PROP[name], value: color });
        continue; 
      }
      case 'enum': {
        continue;
      }
      // dynamic for runtime opetations
      case 'dynamic': {
        if (name.startsWith('LV_STYLE_FLEX')) {
          /**
           * for flex display props, they are registered on runtime.
           * these props should be replaced to specific value in createLvglStyles.
           * prop -> s(prop), eg. FLEX_FLOW -> s(FLEX_FLOW)
           */
          jsStyleItem.attributes.push({ name: `s(${attr.name})`, value: parseInt(attr.value) });
        } else if (name === 'LV_STYLE_LAYOUT' && attr.value === 'LV_LAYOUT_FLEX') {
          jsStyleItem.attributes.push({ name: STYLE_PROP[name], value: `s(${attr.value})` });
        }
        break;
      }
    }
  }
  return jsStyleItem;
}

export function generateJS(rules: Record<string, JSStyleItem>): string {
  return `export default createLvglStyles(${JSON.stringify(rules)})`;
}