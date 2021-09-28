import postcss, { Rule } from "postcss";
import { LoaderContext } from 'webpack';
import { transform } from "./align";
import { defaultAttributeAlignConfig } from "./align-config";
import { generateJS, generateJSStyleItem, JSStyleItem } from "./generate";

export default function LvglStyleLoader(this: LoaderContext<{static: boolean}>, source: string): string {
  this.cacheable();

  const ast = postcss.parse(source);
  const cssStyleItems: Record<string, JSStyleItem> = {};
  for (const node of ast.nodes) {
    if (node.type !== 'rule') continue;
    const styleItem = transform(node as Rule, defaultAttributeAlignConfig);
    cssStyleItems[styleItem.className] = generateJSStyleItem(styleItem);
  }
  return generateJS(cssStyleItems);
}
