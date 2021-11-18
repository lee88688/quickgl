/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import Reconciler from 'react-reconciler';
// import type { HostConfig } from 'react-reconciler';

import { EVENT_KEY_MAP } from '@quickgl/types';
import diffProperties from "./diffProperties";

export default {
  supportsMutation: true,

  createInstance(type: string, props: any) {
    let obj: LvglObj;
    switch (type) {
      case 'obj': {
        obj = new LvglObj();
        break;
      }
      case 'label': {
        const label = new LvglLabel();
        if (props.text) {
          label.setText(props.text);
        }
        obj = label;
        break;
      }
      default:
        throw new Error('unsupported element type!');
    }
    if (props.className) {
      obj.optObjStyles(1, props.className);
    }

    for (const propKey in props) {
      const value = props[propKey];
      if (propKey.startsWith('on') && (propKey in EVENT_KEY_MAP) && typeof value === 'function') {
        obj.addEventListener(EVENT_KEY_MAP[propKey], value);
      }
    }

    return obj;
  },

  createTextInstance(text: string) {
    const label = new LvglLabel();
    label.setText(text);
    return label;
  },

  finalizeInitialChildren() {
    return false;
  },

  prepareUpdate(ins: LvglObj, type, oldProps: null | undefined | Record<string, unknown>, newProps: null | undefined | Record<string, unknown>) {
    return diffProperties(oldProps, newProps);
  },

  shouldSetTextContent() {
    return false;
  },

  getRootHostContext() {
    return {};
  },

  getChildHostContext() {
    return {};
  },

  prepareForCommit() {
    return null;
  },

  resetAfterCommit() {
    // todo
  },

  appendChild(ins, child) {
    ins.appendChild(child);
  },

  appendChildToContainer(container, child) {
    container.appendChild(child);
  },

  appendInitialChild(parent, child) {
    parent.appendChild(child);
  },

  insertBefore(parent, child, before) {
    // todo: how to?
    parent.insertBefore(child, before);
  },

  removeChild(parent, child) {
    parent.removeChild(child);
  },

  commitTextUpdate(ins: LvglLabel, oldText: string, newText: string) {
    ins.setText(newText);
  },

  commitUpdate(ins: LvglObj, updatePayload: unknown[], type: string, oldProps, newProps) {
    for (let i = 0; i < updatePayload.length; i += 2) {
      const propKey = updatePayload[i] as string;
      const value = updatePayload[i + 1];

      switch(propKey) {
        case 'className': {
          const oldClassName = oldProps?.className;
          const newClassName = newProps?.className;
          // className
          oldClassName && ins.optObjStyles(0, oldClassName);
          newClassName && ins.optObjStyles(1, newClassName);
          break;
        }
        case 'style': {
          break;
        }
        default: {
          if (propKey.startsWith('on')) {
            const key = EVENT_KEY_MAP[propKey];
            if (typeof key === undefined) break;
            if (typeof oldProps[propKey] === 'function') {
              ins.removeEventListener(key, oldProps[propKey]);
            }
            if (typeof value === 'function') {
              console.log('add event listener');
              ins.addEventListener(key, value as (e) => void);
            }
            break;
          }
        }
      }
    }
  },

  clearContainer() {
    // todo
  },
};
