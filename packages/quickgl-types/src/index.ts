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
  (): void;
  optObjStyles(type: OptLvglStyleType, style_or_arr: LvglStyleItem | LvglStyleItem[]): void;
}

export interface LvglLabelClass extends LvglObjClass {
  setText(text: string): void;
}