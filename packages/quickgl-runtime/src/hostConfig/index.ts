/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import Reconciler from 'react-reconciler';
// import type { HostConfig } from 'react-reconciler';

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

  prepareUpdate(ins: LvglObj, type, oldProps: null | undefined | Record<string, any>, newProps: null | undefined | Record<string, any>) {
    // if no need to update return null, else return diff object
    return {};
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

  commitUpdate(ins, updatePayload, type, oldProps, newProps) {
    const oldClassName = oldProps?.className;
    const newClassName = newProps?.className;
    // className
    if (oldClassName != newClassName) {
      oldClassName && ins.optObjStyles(0, oldClassName);
      newClassName && ins.optObjStyles(1, newClassName);
    }
  },

  clearContainer() {
    // todo
  },
};
