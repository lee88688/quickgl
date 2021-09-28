// import lodash from 'lodash';
import { StyleItem } from "./align";
import { PART_SELECTOR, STATE_SELECTOR, STYLE_PROP } from "./constants";


export function generateCLang(styleItem: StyleItem): string {
  return '';
}

interface JSStyleItem {
  className: string;
  selector: number;
  attributes: {name: number, value: number}[];
}

function lvPct(x: number): number {
  const lvCoordSetSpec = x => x | (1 << 13);
  return (x < 0 ? lvCoordSetSpec(1000 - (x)) : lvCoordSetSpec(x));
}

export function generateJS(styleItem: StyleItem): JSStyleItem {
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
    if (!(name in STYLE_PROP)) {
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
        const color = (0xff & b) << 16 | (0xff & g) << 8 | (0xff & r);
        jsStyleItem.attributes.push({ name: STYLE_PROP[name], value: color });
        continue; 
      }
      case 'enum': {
        continue;
      }
    }
  }
  return jsStyleItem;
}