export default function diffProperties(lastProps: Record<string, unknown>, nextProps: Record<string, unknown>): unknown[] | null {
  const updatePayload: unknown[] = [];

  const hasOwnProperty = Object.prototype.hasOwnProperty;

  for (const propKey in lastProps) {
    if (
      hasOwnProperty.call(nextProps, propKey) ||
      !hasOwnProperty.call(lastProps, propKey) ||
      lastProps[propKey] === null
    ) {
      continue;
    }

    if (propKey === 'style') {
      // special key style
    } else {
      updatePayload.push(propKey, null);
    }
  }

  for (const propKey in nextProps) {
    const lastProp = lastProps !== null ? lastProps[propKey] : undefined;
    const nextProp = nextProps[propKey];
    if (
      !hasOwnProperty.call(nextProps, propKey) ||
      lastProp === nextProp ||
      (lastProp == null && nextProp == null)
    ) {
      continue;
    }

    if (propKey === 'style') {
      // noop
    } else {
      updatePayload.push(propKey, nextProp);
    }
  }

  return updatePayload.length ? updatePayload : null;
}