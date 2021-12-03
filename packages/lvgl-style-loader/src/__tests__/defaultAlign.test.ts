import { transformExpect } from './lib';
import { defaultAttributeAlignConfig } from '../align-config';

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
});