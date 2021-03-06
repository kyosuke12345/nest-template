export function isObject(obj: unknown): obj is object {
  return typeof obj === 'object';
}

export function isString(obj: unknown): obj is string {
  return typeof obj === 'string';
}
