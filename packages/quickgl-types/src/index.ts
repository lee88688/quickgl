/* eslint-disable @typescript-eslint/no-misused-new */
export interface TimeoutObj {
  fn: (...argv: unknown[]) => void;
  timeout: number;
}

type OptLvglStyleType = 0 | 1; // 0 for delete, 1 for add

interface LvglStyleItem {
  className: string;
  selector: number;
}

export interface LvglObjClass {
  new (): LvglObjClass;
  optObjStyles(type: OptLvglStyleType, style_or_arr: LvglStyleItem | LvglStyleItem[]): void;
  appendChild(child: LvglObjClass): void;
  removeChild(child: LvglObjClass): void;
  insertBefore(child: LvglObjClass, before: LvglObjClass): void;
}

export interface LvglLabelClass extends LvglObjClass {
  new (): LvglLabelClass;
  setText(text: string): void;
}
