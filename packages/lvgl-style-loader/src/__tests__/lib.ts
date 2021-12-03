import postcss, { Rule } from 'postcss';
import { StyleItem, transform } from '../align';
import { AttributeAlignConfig } from '../align-config';

export function transformExpect(css: string, expectArr: StyleItem[], config?: AttributeAlignConfig) {
  const ast = postcss.parse(css);
  expect(ast.nodes.length).toBe(expectArr.length);
  for (let i = 0; i < expectArr.length; i++) {
    expect(transform(ast.nodes[i] as Rule, config)).toEqual(expectArr[i]);
  }
}