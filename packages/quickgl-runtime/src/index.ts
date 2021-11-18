import * as React from 'react';
import * as ReactReconciler from 'react-reconciler';
import hostConfig from "./hostConfig";
import './polyfill';

export const LvglReactReconciler = ReactReconciler(hostConfig as any);

export function render(element: React.ReactElement | null, root: any): void {
  const container = LvglReactReconciler.createContainer(root, 0, false, null);
  LvglReactReconciler.updateContainer(element, container, null, null);
}
