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
}

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
}