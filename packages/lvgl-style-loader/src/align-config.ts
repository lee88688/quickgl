import { Declaration } from "postcss";
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
  | StaticAlignPercentType
  | StaticAlignColorType
  | StaticAlignEnumType
  | StaticAlignSideType

interface DynamicAlign {
  type: 'dynamic';
  transform: (decl: Declaration) => StyleItemAttributes;
}

export type AttributeAlignConfig = Record<string, StaticAlign | DynamicAlign>;
export type AttributeAlignType = (StaticAlign | DynamicAlign)['type'];
  
/**
 * key is css attribute name
 */
export const attributeAlignConfig: AttributeAlignConfig = {
  width: {
    type: 'coord',
    target: 'width'
  },
  'min-width': {
    type: 'coord',
    target: 'min_width'
  }
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

  