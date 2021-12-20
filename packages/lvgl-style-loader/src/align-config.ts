import { Declaration } from "postcss";
import * as constants from '@quickgl/constants';
import { StyleItemAttributes } from "./align";

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

interface StaticAlignNumberType {
  type: 'number';
  target: string
}

interface StaticAlignPercentType {
  type: 'percent';
  target: string;
}

interface StaticAlignColorType {
  type: 'color';
  target: string;
}

/**
 * enum: usually c macros, there are 3 forms
 * 1. just strings, user's value must be one of them.
 * 2. value is css attribute value and mapTo is corresponding lvgl style attribute value.
 * 3. template enum, template is regex one of which css attribute value must match.
 *    if target is provided, the template must has groups, the group value is used for the target in sequence at next step.
 *    if no target is provided, just matched string. 
 */
interface StaticAlignEnumType {
  type: 'enum';
  target: string;
  constant?: string;
  enum: string[] | {value: string, mapTo: string}[] | {reg: RegExp, target?: string[]}[];
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
  | StaticAlignNumberType
  | StaticAlignPercentType
  | StaticAlignColorType
  | StaticAlignEnumType
  | StaticAlignSideType

interface DynamicAlign {
  type: 'dynamic';
  transform: (decl: Declaration) => StyleItemAttributes;
}

/**
 * proxy align type can use multiple config or target to process values.
 */
interface ProxyAlignType {
  type: 'proxy';
  proxyConfig: (AlignType | string)[];
}

/**
 * merge multiple target after all types are aligned
 */
 interface MergeAlign {
  type: 'merge';
  target: string[];
  transform(attributes: StyleItemAttributes): StyleItemAttributes;
}

type AlignType = StaticAlign | DynamicAlign | MergeAlign | ProxyAlignType;

export type AttributeAlignConfig = Record<string, AlignType>;
export type AttributeAlignType = AlignType['type'];
  
/**
 * key is css attribute name
 */
export const defaultAttributeAlignConfig: AttributeAlignConfig = {
  // ----Size and position----
  width: {
    type: 'coord',
    target: 'width'
  },
  'min-width': {
    type: 'coord',
    target: 'min_width'
  },
  'max-width': {
    type: 'coord',
    target: 'max_width'
  },
  height: {
    type: 'coord',
    target: 'height'
  },
  'min-height': {
    type: 'coord',
    target: 'min_height'
  },
  'max-height': {
    type: 'coord',
    target: 'max_height'
  },
  'left': {
    type: 'coord',
    target: 'x'
  },
  x: {
    type: 'coord',
    target: 'x'
  },
  top: {
    type: 'coord',
    target: 'y'
  },
  y: {
    type: 'coord',
    target: 'y'
  },
  // todo: align
  'transform-width': {
    type: 'coord',
    target: 'transform_width'
  },
  'transform-height': {
    type: 'coord',
    target: 'transform_height'
  },
  'transform-width-height-pre': {
    type: 'dynamic',
    transform(decl: Declaration): StyleItemAttributes {
      return [{ name: decl.prop, value: `${parseFloat(decl.value) * 100}%`, type: 'dynamic' }];
    }
  },
  'transform-width-proxy': {
    type: 'proxy',
    proxyConfig: ['transform-width-height-pre', 'transform-width']
  },
  'transform-height-proxy': {
    type: 'proxy',
    proxyConfig: ['transform-width-height-pre', 'transform-height']
  },
  transform: {
    type: 'enum',
    target: 'transform',
    enum: [
      { reg: /scaleX\(\s*([\d.]+)\s*\)/, target: ['transform-width-proxy']},
      { reg: /scaleY\(\s*([\d.]+)\s*\)/, target: ['transform-height-proxy']},
      { reg: /scale\(\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/, target: ['transform-width-proxy', 'transform-height-proxy']},
    ]
  },

  // ----Padding----
  'padding-top': {
    type: 'coord',
    target: 'pad_top'
  },
  'padding-bottom': {
    type: 'coord',
    target: 'pad_bottom'
  },
  'padding-left': {
    type: 'coord',
    target: 'pad_left'
  },
  'padding-right': {
    type: 'coord',
    target: 'pad_right'
  },
  // pad_row
  // pad_column
  padding: {
    type: 'side',
    target: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left']
  },

  // ----Background----
  // ----Miscellaneous----
  // layout
  display: {
    type: 'enum',
    target: 'display',
    enum: ['flex', 'block'] // block is not the same as css display block
  },
  'flex-direction': {
    type: 'enum',
    target: 'flex-direction',
    enum: ['row', 'column', 'row-reverse', 'column-reverse']
  },
  'flex-wrap': {
    type: 'enum',
    target: 'flex-wrap',
    enum: ['nowrap', 'wrap']
  },
  'justify-content': {
    type: 'enum',
    target: 'justify-content',
    enum: ['start', 'end', 'center', 'space-evenly', 'space-around', 'space-between']
  },
  'align-items': {
    type: 'enum',
    target: 'align-items',
    enum: ['start', 'end', 'center', 'space-evenly', 'space-around', 'space-between']
  },
  'align-content': {
    type: 'enum',
    target: 'align-content',
    enum: ['start', 'end', 'center', 'space-evenly', 'space-around', 'space-between']
  },
  'flex-grow': {
    type: 'number',
    target: 'flex-grow'
  },
  'flex-merge': {
    type: 'merge',
    target: ['display', 'flex-direction', 'flex-wrap', 'justify-content', 'align-items', 'align-content'],
    transform: flexMergeTransform
  }
};

function flexMergeTransform(attributes: StyleItemAttributes): StyleItemAttributes {
  const map: Record<string, StyleItemAttributes[number]> = {};
  for (const attr of attributes) {
    map[attr.name] = attr;
  }
  if (!('display' in map) || map.display.value !== 'flex') return [];

  const [direction, reverse] = (map['flex-direction']?.value ?? 'row').split('-');
  let wrap = map['flex-wrap']?.value ?? 'nowrap';
  wrap = wrap === 'nowrap' ? '' : wrap;
  const flexFlow = `LV_FLEX_FLOW_${[direction, wrap, reverse].filter(i => !!i).join('_').toUpperCase()}`;

  const getAlignStr = (s: string) => s.split('-').join('_').toUpperCase();

  const justifyContent = map['justify-content']?.value ?? 'start';
  const alignItems = map['align-items']?.value ?? 'start';
  const alignContent = map['align-content']?.value ?? 'start';

  // todo: 如果没有配置默认不添加属性，目前是为了和css属性统一
  const mainPlaceAlign = `LV_FLEX_ALIGN_${getAlignStr(justifyContent)}`;
  const crossPlaceAlign = `LV_FLEX_ALIGN_${getAlignStr(alignItems)}`;
  const trackCrossPlaceAlign = `LV_FLEX_ALIGN_${getAlignStr(alignContent)}`;

  return [
    { name: 'LAYOUT', value: 'LV_LAYOUT_FLEX', type: 'dynamic' },
    { name: 'FLEX_FLOW', value: constants.lvFlexFlow[flexFlow].toString(), type: 'dynamic' },
    { name: 'FLEX_MAIN_PLACE', value: constants.lvFlexAlign[mainPlaceAlign].toString(), type: 'dynamic' },
    { name: 'FLEX_CROSS_PLACE', value: constants.lvFlexAlign[crossPlaceAlign].toString(), type: 'dynamic' },
    { name: 'FLEX_TRACK_PLACE', value: constants.lvFlexAlign[trackCrossPlaceAlign].toString(), type: 'dynamic' },
  ];
}

// export function defaultAlignConfig(): AttributeAlignConfig {
//   return {
//     width: {
//       type: 'coord',
//       target: 'width'
//     },
//     'min-width': {
//       type: 'coord',
//       target: 'min-width'
//     }
//   }
// }

  