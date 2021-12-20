import { transformExpect } from './lib';
import { defaultAttributeAlignConfig } from '../align-config';
import * as constants from '@quickgl/constants';

describe('default config', () => {
  it('transform', () => {
    transformExpect(
      `.s1 { transform: scaleX(0.5) }
      .s2 { transform: scale(1, 0.5) }`,
      [
        {
          className: 's1',
          stateSelector: [],
          partSelector: [],
          attributes: [{ name: 'transform_width', value: '50', type: 'percent' }]
        },
        {
          className: 's2',
          stateSelector: [],
          partSelector: [],
          attributes: [
            { name: 'transform_width', value: '100', type: 'percent' },
            { name: 'transform_height', value: '50', type: 'percent' },
          ]
        }
      ],
      defaultAttributeAlignConfig
    );
  });

  it('display flex', () => {
    transformExpect(
      `.s1 {
        display: flex;
      }`,
      [
        {
          className: 's1',
          stateSelector: [],
          partSelector: [],
          attributes: [
            { name: 'LAYOUT', value: 'LV_LAYOUT_FLEX', type: 'dynamic' },
            { name: 'FLEX_FLOW', value: constants.lvFlexFlow.LV_FLEX_FLOW_ROW.toString(), type: 'dynamic' },
            { name: 'FLEX_MAIN_PLACE', value: constants.lvFlexAlign.LV_FLEX_ALIGN_START.toString(), type: 'dynamic' },
            { name: 'FLEX_CROSS_PLACE', value: constants.lvFlexAlign.LV_FLEX_ALIGN_START.toString(), type: 'dynamic' },
            { name: 'FLEX_TRACK_PLACE', value: constants.lvFlexAlign.LV_FLEX_ALIGN_START.toString(), type: 'dynamic' },
          ]
        }
      ],
      defaultAttributeAlignConfig
    );
    
    // column
    transformExpect(
      `.s1 {
        display: flex;
        flex-direction: column;
      }`,
      [
        {
          className: 's1',
          stateSelector: [],
          partSelector: [],
          attributes: [
            { name: 'LAYOUT', value: 'LV_LAYOUT_FLEX', type: 'dynamic' },
            { name: 'FLEX_FLOW', value: constants.lvFlexFlow.LV_FLEX_FLOW_COLUMN.toString(), type: 'dynamic' },
            { name: 'FLEX_MAIN_PLACE', value: constants.lvFlexAlign.LV_FLEX_ALIGN_START.toString(), type: 'dynamic' },
            { name: 'FLEX_CROSS_PLACE', value: constants.lvFlexAlign.LV_FLEX_ALIGN_START.toString(), type: 'dynamic' },
            { name: 'FLEX_TRACK_PLACE', value: constants.lvFlexAlign.LV_FLEX_ALIGN_START.toString(), type: 'dynamic' },
          ]
        }
      ],
      defaultAttributeAlignConfig
    );
  });
});