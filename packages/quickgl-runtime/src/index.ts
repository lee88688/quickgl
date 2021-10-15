import * as React from 'react';
import ReactReconciler = require("react-reconciler");
import hostConfig from "./hostConfig";
import './polyfill';

export const LvglReactReconciler = ReactReconciler(hostConfig as any);

export function render(element: React.ReactElement | null, container: any): void {
  LvglReactReconciler.updateContainer(element, container);
}
