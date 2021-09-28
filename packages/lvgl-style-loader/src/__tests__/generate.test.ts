import { StyleItem } from '../align';
import { PART_SELECTOR, STATE_SELECTOR, STYLE_PROP } from '../constants';
import { generateJSStyleItem } from '../generate';

describe('generateJSStyleItem', () => {
  it('generateJS selector', () => {
    const styleItem: StyleItem = {
      className: 's1',
      partSelector: ['LV_PART_ITEMS'], 
      stateSelector: ['LV_STATE_CHECKED'],
      attributes: [{ name: 'width', type: 'pixel', value: '34' }]
    };
    const res = generateJSStyleItem(styleItem);
    expect(res).toEqual({
      className: 's1',
      selector: STATE_SELECTOR.LV_STATE_CHECKED | PART_SELECTOR.LV_PART_ITEMS,
      attributes: [{ name: STYLE_PROP.LV_STYLE_WIDTH, value: 34 }]
    });
  });
});