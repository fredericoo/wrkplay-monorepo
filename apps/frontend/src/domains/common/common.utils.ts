export const isInstanceOf =
  <T, A>(constructor: new (...args: A[]) => T) =>
  (value: unknown): value is T =>
    value instanceof constructor;

export const objHas = <Obj extends Record<string, unknown>>(
  obj: Obj,
  key: PropertyKey
): key is keyof Obj => key in obj;

/** Function that asserts a key is within an object and mutate key’s type.  */
export function isKeyIn<O extends object>(
  key: PropertyKey,
  obj: O
): key is keyof O {
  return key in obj;
}

/** Asserts `condition` is met and throws otherwise */
export function invariant<T>(
  condition: T,
  message?: string
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
