import postcss, { Rule } from 'postcss';
import {StyleItem, transform} from '../align';
import { AttributeAlignConfig } from '../align-config';

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
          attributes: [{name: 'aa', value: '10px', type: 'coord'}]
        },
        {
          className: 's2',
          stateSelector: [],
          partSelector: [],
          attributes: [{name: 'aa', value: '10%', type: 'coord'}]
        },
        {
          className: 's3',
          stateSelector: [],
          partSelector: [],
          attributes: [{name: 'bb', value: '20px', type: 'pixel'}]
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
          attributes: [{name: 'aa', value: 'rgb(242,86,196)', type: 'color'}]
        },
        {
          className: 's2',
          stateSelector: [],
          partSelector: [],
          attributes: [{name: 'aa', value: 'rgb(12,12,12)', type: 'color'}]
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

  it('enum config', () => {
    transformExpect(
      `.s1 { a: A }
      .s2 { b: B }`,
      [
        {
          className: 's1',
          stateSelector: [],
          partSelector: [],
          attributes: [{name: 'aa', value: 'AA', type: 'enum'}]
        },
        {
          className: 's2',
          stateSelector: [],
          partSelector: [],
          attributes: [{name: 'bb', value: 'B', type: 'enum'}]
        }
      ],
      {
        a: {
          type: 'enum',
          target: 'aa',
          enum: [{ value: 'A', mapTo: 'AA' }]
        },
        b: {
          type: 'enum',
          target: 'bb',
          enum: ['B']
        }
      }
    );
  });

  it('side config', () => {
    transformExpect(
      `.s1 { side: 15px }`,
      [
        {
          className: 's1',
          stateSelector: [],
          partSelector: [],
          attributes: [
            {name: 'aa', value: '15px', type: 'coord'}, 
            {name: 'bb', value: '15px', type: 'coord'}, 
            {name: 'cc', value: '15px', type: 'coord'},
            {name: 'dd', value: '15px', type: 'coord'}
          ]
        }
      ],
      {
        a: {type: 'coord', target: 'aa'},
        b: {type: 'coord', target: 'bb'},
        c: {type: 'coord', target: 'cc'},
        d: {type: 'coord', target: 'dd'},
        side: {
          type: 'side',
          target: ['a', 'b', 'c', 'd']
        }
      }
    );
  });
});

describe('transform', () => {
  it('width', () => {
  });
});