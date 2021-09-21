export const StateSelector: Record<string, string> = {
  LV_STATE_DEFAULT: 'LV_STATE_DEFAULT', // (0x0000) Normal, released state
  LV_STATE_CHECKED: 'LV_STATE_CHECKED', // (0x0001) Toggled or checked state
  LV_STATE_FOCUSED: 'LV_STATE_FOCUSED', // (0x0002) Focused via keypad or encoder or clicked via touchpad/mouse
  LV_STATE_FOCUS_KEY: 'LV_STATE_FOCUS_KEY', // (0x0004) Focused via keypad or encoder but not via touchpad/mouse
  LV_STATE_EDITED: 'LV_STATE_EDITED', // (0x0008) Edit by an encoder
  LV_STATE_HOVERED: 'LV_STATE_HOVERED', // (0x0010) Hovered by mouse (not supported now)
  LV_STATE_PRESSED: 'LV_STATE_PRESSED', // (0x0020) Being pressed
  LV_STATE_SCROLLED: 'LV_STATE_SCROLLED', // (0x0040) Being scrolled
  LV_STATE_DISABLED: 'LV_STATE_DISABLED', // (0x0080) Disabled state
  LV_STATE_USER_1: 'LV_STATE_USER_1', // (0x1000) Custom state
  LV_STATE_USER_2: 'LV_STATE_USER_2', // (0x2000) Custom state
  LV_STATE_USER_3: 'LV_STATE_USER_3', // (0x4000) Custom state
  LV_STATE_USER_4: 'LV_STATE_USER_4', // (0x8000) Custom state
}

export const PartSelector: Record<string, string> = {
  LV_PART_MAIN: 'LV_PART_MAIN', // A background like rectangle*/
  LV_PART_SCROLLBAR: 'LV_PART_SCROLLBAR', // The scrollbar(s)
  LV_PART_INDICATOR: 'LV_PART_INDICATOR', // Indicator, e.g. for slider, bar, switch, or the tick box of the checkbox
  LV_PART_KNOB: 'LV_PART_KNOB', // Like a handle to grab to adjust a value
  LV_PART_SELECTED: 'LV_PART_SELECTED', // Indicate the currently selected option or section
  LV_PART_ITEMS: 'LV_PART_ITEMS', // Used if the widget has multiple similar elements (e.g. table cells)
  LV_PART_TICKS: 'LV_PART_TICKS', // Ticks on scales e.g. for a chart or meter
  LV_PART_CURSOR: 'LV_PART_CURSOR', // Mark a specific place e.g. text area's or chart's cursor
  LV_PART_CUSTOM_FIRST: 'LV_PART_CUSTOM_FIRST', // Custom part identifiers can be added starting from here.
}