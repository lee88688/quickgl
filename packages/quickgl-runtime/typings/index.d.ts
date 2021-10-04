import type { LvglLabelClass, LvglObjClass, TimeoutObj } from '@quickgl/types';

declare global {
  let timeoutArr: TimeoutObj[];

  type LvglObj = LvglObjClass;
  type LvglLabel = LvglLabelClass;

  const LvglObj: LvglObjClass;
  const LvglLabel: LvglLabelClass;
}
