import type { TimeoutObj } from "@quickgl/types";

export function setTimeout(fn: (...argv: unknown[]) => void, timeout: number): TimeoutObj {
  const timeoutObj = { fn, timeout: timeout + Date.now() };
  timeoutArr.push(timeoutObj);
  return timeoutObj;
}

export function clearTimeout(timeoutObj: TimeoutObj): void {
  const index = timeoutArr.indexOf(timeoutObj);
  if (index >= 0) {
    timeoutArr.splice(index, 1);
  }
}

export function execTimeoutFn(): boolean {
  const newArr = [];
  let executed = false;
  for(let i = 0; i < timeoutArr.length; i++) {
    const now = Date.now();
    if (timeoutArr[i].timeout <= now) {
      executed = true;
      try {
        timeoutArr[i].fn();
      } catch (e) {
        // todo
      }
    } else {
      newArr.push(timeoutArr[i]);
    }
  }
  timeoutArr = newArr;
  return executed;
}