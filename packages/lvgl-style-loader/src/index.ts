import postcss from "postcss";
import { LoaderContext } from 'webpack';

export default function LvglStyleLoader(this: LoaderContext<{}>, source: string) {
  this.cacheable();

  const ast = postcss.parse(source);
}
