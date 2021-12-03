import { transformExpect } from './lib';

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
          attributes: [{ name: 'aa', value: '10', type: 'pixel' }]
        },
        {
          className: 's2',
          stateSelector: [],
          partSelector: [],
          attributes: [{ name: 'aa', value: '10', type: 'percent' }]
        },
        {
          className: 's3',
          stateSelector: [],
          partSelector: [],
          attributes: [{ name: 'bb', value: '20', type: 'pixel' }]
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
    );
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
          attributes: [{ name: 'aa', value: 'rgb(242,86,196)', type: 'color' }]
        },
        {
          className: 's2',
          stateSelector: [],
          partSelector: [],
          attributes: [{ name: 'aa', value: 'rgb(12,12,12)', type: 'color' }]
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
      .s2 { b: B }
      .s3 { c: func(A, B) }`,
      [
        {
          className: 's1',
          stateSelector: [],
          partSelector: [],
          attributes: [{ name: 'aa', value: 'AA', type: 'enum' }]
        },
        {
          className: 's2',
          stateSelector: [],
          partSelector: [],
          attributes: [{ name: 'bb', value: 'B', type: 'enum' }]
        },
        {
          className: 's3',
          stateSelector: [],
          partSelector: [],
          attributes: [
            { name: 'aa', value: 'AA', type: 'enum' },
            { name: 'bb', value: 'B', type: 'enum' },
          ]
        },
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
        },
        c: {
          type: 'enum',
          target: 'c',
          enum: [{ reg: /func\((.*?),\s*(.*?)\)/, target: ['a', 'b']}]
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
            { name: 'aa', value: '15', type: 'pixel' }, 
            { name: 'bb', value: '15', type: 'pixel' }, 
            { name: 'cc', value: '15', type: 'pixel' },
            { name: 'dd', value: '15', type: 'pixel' }
          ]
        }
      ],
      {
        a: { type: 'coord', target: 'aa' },
        b: { type: 'coord', target: 'bb' },
        c: { type: 'coord', target: 'cc' },
        d: { type: 'coord', target: 'dd' },
        side: {
          type: 'side',
          target: ['a', 'b', 'c', 'd']
        }
      }
    );
  });

  it('proxy config', () => {
    transformExpect(
      `.s1 { x: 5 }`,
      [
        {
          className: 's1',
          stateSelector: [],
          partSelector: [],
          attributes: [
            { name: 'Y', value: '50', type: 'pixel' }
          ]
        }
      ],
      {
        x: {
          type: 'proxy',
          proxyConfig: [
            {
              type: 'dynamic',
              transform(decl) {
                const value = `${parseInt(decl.value) * 10}px`;
                return [{ name: 'x', value, type: 'dynamic' }];
              }
            },
            'y'
          ]
        },
        y: {
          type: 'coord',
          target: 'Y'
        }
      }
    );
  });

  it('merge config', () => {
    transformExpect(
      `.s1 {
        a: 1px;
        b: 3px;
      }`,
      [
        {
          className: 's1',
          stateSelector: [],
          partSelector: [],
          attributes: [
            { name: 'cc', value: '4', type: 'pixel' },
          ]
        }
      ],
      {
        a: { type: 'pixel', target: 'aa' },
        b: { type: 'pixel', target: 'bb' },
        c: {
          type: 'merge',
          target: ['aa', 'bb'],
          transform(attrs) {
            let sum = 0;
            for (const { value } of attrs) {
              sum += parseFloat(value);
            }
            return [{ value: sum.toString(), name: 'cc', type: 'pixel' }];
          }
        }
      }
    );
  });
});

describe('transform', () => {
  it('width', () => {
  });
});