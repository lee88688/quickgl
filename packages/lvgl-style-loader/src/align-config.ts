import { decl, Declaration } from "postcss";
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
      { reg: /scale\(\s*([\d.]+)\s*, \s*([\d.]+)\s*\)/, target: ['transform-width-proxy', 'transform-height-proxy']},
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
};

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

  