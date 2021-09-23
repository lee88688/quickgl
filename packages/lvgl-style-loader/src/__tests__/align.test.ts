import postcss, { Rule } from 'postcss';
import {transform, AttributeAlignConfig, StyleItem} from '../align';

function transformExpect(css: string, expectArr: StyleItem[], config?: AttributeAlignConfig) {
  const ast = postcss.parse(css);
  expect(ast.nodes.length).toBe(expectArr.length);
  for (let i = 0; i < expectArr.length; i++) {
    expect(transform(ast.nodes[i] as Rule, config)).toEqual(expectArr[i]);
  }
}

describe('align config', () => {
  it('coord and pixel config', () => {
    transformExpect(
      `.s1 { a: 10px; }
      .s2 { a: 10%; }
      .s3 { b: 20px; }`,
      [
        {
          className: 's1',
          stateSelector: [],
          partSelector: [],
          attributes: [{name: 'aa', value: '10'}]
        },
        {
          className: 's2',
          stateSelector: [],
          partSelector: [],
          attributes: [{name: 'aa', value: 'LV_PCT(10)'}]
        },
        {
          className: 's3',
          stateSelector: [],
          partSelector: [],
          attributes: [{name: 'bb', value: '20'}]
        }
      ],
      {
        a: {
          type: 'coord',
          target: 'aa'
        },
        b: {
          type: 'pixel',
          target: 'bb'
        }
      }
    )
  });

  it('color config', () => {
    transformExpect(
      `.s1 { a: #f256c4 }
      .s2 {a: rgb(12, 12, 12) }`,
      [
        {
          className: 's1',
          stateSelector: [],
          partSelector: [],
          attributes: [{name: 'aa', value: 'LV_COLOR_MAKE(242,86,196)'}]
        },
        {
          className: 's2',
          stateSelector: [],
          partSelector: [],
          attributes: [{name: 'aa', value: 'LV_COLOR_MAKE(12,12,12)'}]
        }
      ],
      {
        a: {
          type: 'color',
          target: 'aa'
        }
      }
    );
  });

  it('enum config', () => {});

  it('side config', () => {});
});

describe('transform', () => {
  it('width', () => {
    const css = `.s1 { width: 30px; } .s2 { width: 40%; }`
    const ast = postcss.parse(css);
    const [r1, r2] = ast.nodes;
    // s1
    const res1 = transform(r1 as Rule);
    
    expect(res1).toEqual({
      className: 's1',
      stateSelector: [],
      partSelector: [],
      attributes: [{name: 'width', value: '30'}]
    })
    // s2
    const res2 = transform(r2 as Rule);
    
    expect(res2).toEqual({
      className: 's2',
      stateSelector: [],
      partSelector: [],
      attributes: [{name: 'width', value: 'LV_PCT(40)'}]
    })
  });
});