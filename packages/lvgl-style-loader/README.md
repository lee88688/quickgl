# `lvgl-style-loader`

transform css to lvgl style struct. lvgl style is similar to css. only a subset of css is supported.

## Usage

```
const lvglStyleLoader = require('lvgl-style-loader');
```


## implement styles

### Size and position
- [x] width
- [x] min_width
- [x] max_width
- [x] height
- [x] min_height
- [x] max_height
- [x] x
- [x] y
- [ ] align
- [x] transform_width
- [x] transform_height
- [ ] translate_x
- [ ] translate_y
- [ ] transform_zoom
- [ ] transform_angle

### Padding
- [x] pad_top
- [x] pad_bottom
- [x] pad_left
- [x] pad_right
- [ ] pad_row
- [ ] pad_column

### Background
- [ ] bg_color
- [ ] bg_opa
- [ ] bg_grad_color
- [ ] bg_grad_dir
- [ ] bg_main_stop
- [ ] bg_grad_stop
- [ ] bg_img_src
- [ ] bg_img_opa
- [ ] bg_img_recolor
- [ ] bg_img_recolor_opa
- [ ] bg_img_tiled

### Border
- [ ] border_color
- [ ] border_opa
- [ ] border_width
- [ ] border_side
- [ ] border_post

### Outline
- [ ] outline_width
- [ ] outline_color
- [ ] outline_opa
- [ ] outline_pad

### Shadow
- [ ] shadow_width
- [ ] shadow_ofs_x
- [ ] shadow_ofs_y
- [ ] shadow_spread
- [ ] shadow_color
- [ ] shadow_opa

### Image
- [ ] img_opa
- [ ] img_recolor
- [ ] img_recolor_opa

### Line
- [ ] line_width
- [ ] line_dash_width
- [ ] line_dash_gap
- [ ] line_rounded
- [ ] line_color
- [ ] line_opa

### Arc
- [ ] arc_width
- [ ] arc_rounded
- [ ] arc_color
- [ ] arc_opa
- [ ] arc_img_src

### Text
- [ ] text_color
- [ ] text_opa
- [ ] text_font
- [ ] text_letter_space
- [ ] text_line_space
- [ ] text_decor
- [ ] text_align

### Miscellaneous
- [ ] radius
- [ ] clip_corner
- [ ] opa
- [ ] color_filter_dsc
- [ ] color_filter_opa
- [ ] anim_time
- [ ] anim_speed
- [ ] transition
- [ ] blend_mode
- [ ] layout
- [ ] base_dir