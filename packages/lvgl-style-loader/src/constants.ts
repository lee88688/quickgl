export const STATE_SELECTOR: Record<string, number> = {
  LV_STATE_DEFAULT: 0x0000, // (0x0000) Normal, released state
  LV_STATE_CHECKED: 0x0001, // (0x0001) Toggled or checked state
  LV_STATE_FOCUSED: 0x0002, // (0x0002) Focused via keypad or encoder or clicked via touchpad/mouse
  LV_STATE_FOCUS_KEY: 0x0004, // (0x0004) Focused via keypad or encoder but not via touchpad/mouse
  LV_STATE_EDITED: 0x0008, // (0x0008) Edit by an encoder
  LV_STATE_HOVERED: 0x0010, // (0x0010) Hovered by mouse (not supported now)
  LV_STATE_PRESSED: 0x0020, // (0x0020) Being pressed
  LV_STATE_SCROLLED: 0x0040, // (0x0040) Being scrolled
  LV_STATE_DISABLED: 0x0080, // (0x0080) Disabled state
  LV_STATE_USER_1: 0x1000, // (0x1000) Custom state
  LV_STATE_USER_2: 0x2000, // (0x2000) Custom state
  LV_STATE_USER_3: 0x4000, // (0x4000) Custom state
  LV_STATE_USER_4: 0x8000, // (0x8000) Custom state
};

export const PART_SELECTOR: Record<string, number> = {
  LV_PART_MAIN: 0x000000, // A background like rectangle*/
  LV_PART_SCROLLBAR: 0x010000, // The scrollbar(s)
  LV_PART_INDICATOR: 0x020000, // Indicator, e.g. for slider, bar, switch, or the tick box of the checkbox
  LV_PART_KNOB: 0x030000, // Like a handle to grab to adjust a value
  LV_PART_SELECTED: 0x040000, // Indicate the currently selected option or section
  LV_PART_ITEMS: 0x050000, // Used if the widget has multiple similar elements (e.g. table cells)
  LV_PART_TICKS: 0x060000, // Ticks on scales e.g. for a chart or meter
  LV_PART_CURSOR: 0x070000, // Mark a specific place e.g. text area's or chart's cursor
  LV_PART_CUSTOM_FIRST: 0x080000, // Custom part identifiers can be added starting from here.

  LV_PART_ANY: 0x0F0000,
};

export const STYLE_PROP: Record<string, number> = {
  LV_STYLE_PROP_INV               : 0,
  LV_STYLE_WIDTH                  : 4097,
  LV_STYLE_MIN_WIDTH              : 4098,
  LV_STYLE_MAX_WIDTH              : 4099,
  LV_STYLE_HEIGHT                 : 4100,
  LV_STYLE_MIN_HEIGHT             : 4101,
  LV_STYLE_MAX_HEIGHT             : 4102,
  LV_STYLE_X                      : 4103,
  LV_STYLE_Y                      : 4104,
  LV_STYLE_ALIGN                  : 4105,
  LV_STYLE_TRANSFORM_WIDTH        : 2058,
  LV_STYLE_TRANSFORM_HEIGHT       : 2059,
  LV_STYLE_TRANSLATE_X            : 12300,
  LV_STYLE_TRANSLATE_Y            : 12301,
  LV_STYLE_TRANSFORM_ZOOM         : 2062,
  LV_STYLE_TRANSFORM_ANGLE        : 2063,
  LV_STYLE_PAD_TOP                : 4112,
  LV_STYLE_PAD_BOTTOM             : 4113,
  LV_STYLE_PAD_LEFT               : 4114,
  LV_STYLE_PAD_RIGHT              : 4115,
  LV_STYLE_PAD_ROW                : 4116,
  LV_STYLE_PAD_COLUMN             : 4117,
  LV_STYLE_BG_COLOR               : 32,
  LV_STYLE_BG_COLOR_FILTERED      : 16416,
  LV_STYLE_BG_OPA                 : 33,
  LV_STYLE_BG_GRAD_COLOR          : 34,
  LV_STYLE_BG_GRAD_COLOR_FILTERED : 16418,
  LV_STYLE_BG_GRAD_DIR            : 35,
  LV_STYLE_BG_MAIN_STOP           : 36,
  LV_STYLE_BG_GRAD_STOP           : 37,
  LV_STYLE_BG_IMG_SRC             : 38,
  LV_STYLE_BG_IMG_OPA             : 39,
  LV_STYLE_BG_IMG_RECOLOR         : 40,
  LV_STYLE_BG_IMG_RECOLOR_FILTERED: 16424,
  LV_STYLE_BG_IMG_RECOLOR_OPA     : 41,
  LV_STYLE_BG_IMG_TILED           : 42,
  LV_STYLE_BORDER_COLOR           : 48,
  LV_STYLE_BORDER_COLOR_FILTERED  : 16432,
  LV_STYLE_BORDER_OPA             : 49,
  LV_STYLE_BORDER_WIDTH           : 4146,
  LV_STYLE_BORDER_SIDE            : 51,
  LV_STYLE_BORDER_POST            : 52,
  LV_STYLE_OUTLINE_WIDTH          : 2106,
  LV_STYLE_OUTLINE_COLOR          : 59,
  LV_STYLE_OUTLINE_COLOR_FILTERED : 16443,
  LV_STYLE_OUTLINE_OPA            : 2108,
  LV_STYLE_OUTLINE_PAD            : 2109,
  LV_STYLE_SHADOW_WIDTH           : 2112,
  LV_STYLE_SHADOW_OFS_X           : 2113,
  LV_STYLE_SHADOW_OFS_Y           : 2114,
  LV_STYLE_SHADOW_SPREAD          : 2115,
  LV_STYLE_SHADOW_COLOR           : 68,
  LV_STYLE_SHADOW_COLOR_FILTERED  : 16452,
  LV_STYLE_SHADOW_OPA             : 2117,
  LV_STYLE_IMG_OPA                : 70,
  LV_STYLE_IMG_RECOLOR            : 71,
  LV_STYLE_IMG_RECOLOR_FILTERED   : 16455,
  LV_STYLE_IMG_RECOLOR_OPA        : 72,
  LV_STYLE_LINE_WIDTH             : 2121,
  LV_STYLE_LINE_DASH_WIDTH        : 74,
  LV_STYLE_LINE_DASH_GAP          : 75,
  LV_STYLE_LINE_ROUNDED           : 76,
  LV_STYLE_LINE_COLOR             : 77,
  LV_STYLE_LINE_COLOR_FILTERED    : 16461,
  LV_STYLE_LINE_OPA               : 78,
  LV_STYLE_ARC_WIDTH              : 2128,
  LV_STYLE_ARC_ROUNDED            : 81,
  LV_STYLE_ARC_COLOR              : 82,
  LV_STYLE_ARC_COLOR_FILTERED     : 16466,
  LV_STYLE_ARC_OPA                : 83,
  LV_STYLE_ARC_IMG_SRC            : 84,
  LV_STYLE_TEXT_COLOR             : 1111,
  LV_STYLE_TEXT_COLOR_FILTERED    : 17495,
  LV_STYLE_TEXT_OPA               : 1112,
  LV_STYLE_TEXT_FONT              : 5209,
  LV_STYLE_TEXT_LETTER_SPACE      : 5210,
  LV_STYLE_TEXT_LINE_SPACE        : 5211,
  LV_STYLE_TEXT_DECOR             : 1116,
  LV_STYLE_TEXT_ALIGN             : 5213,
  LV_STYLE_RADIUS                 : 96,
  LV_STYLE_CLIP_CORNER            : 97,
  LV_STYLE_OPA                    : 1122,
  LV_STYLE_COLOR_FILTER_DSC       : 99,
  LV_STYLE_COLOR_FILTER_OPA       : 100,
  LV_STYLE_ANIM_TIME              : 101,
  LV_STYLE_ANIM_SPEED             : 102,
  LV_STYLE_TRANSITION             : 103,
  LV_STYLE_BLEND_MODE             : 104,
  LV_STYLE_LAYOUT                 : 4201,
  LV_STYLE_BASE_DIR               : 5226,
  _LV_STYLE_LAST_BUILT_IN_PROP    : 111,
};