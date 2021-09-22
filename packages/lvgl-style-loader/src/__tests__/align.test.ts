import postcss, { Rule } from 'postcss';
import {transform} from '../align';

describe('transform', () => {
  it('width', () => {
    const css = `.s1 { width: 30px; } .s2 { width: 40%; }`
    const ast = postcss.parse(css);
    const [r1, r2] = ast.nodes;
    // s1
    const res1 = transform(r1 as Rule);
    expect(res1.className).toBe('s1');
    expect(res1.attributes.length).toBe(1);
    expect(res1.attributes[0]).toEqual({name: 'width', value: '30'});
    // s2
    const res2 = transform(r2 as Rule);
    expect(res2.className).toBe('s2');
    expect(res2.attributes.length).toBe(1);
    expect(res2.attributes[0]).toEqual({name: 'width', value: 'LV_PCT(40)'});
  });
});