/**
 * Valid template types for a literal tuple: a homogeneous array of `string` or `number` values.
 */
export type LtrlTupleTemplate = string[] | number[];

/**
 * Utility interface returned by {@link useLtrlTuple} for working with a frozen literal tuple.
 *
 * @typeParam T - The literal tuple type
 */
export type LtrlTupleUtils<T extends LtrlTupleTemplate> = {
  /** The frozen literal tuple. */
  value: T;
  /** Type guard that narrows an unknown tuple element to a member of `T`. */
  evaluate: (item: LtrlTupleTemplate[number]) => item is T[number];
  /** Returns a deep clone of the tuple with a widened primitive array type. */
  clone: () => T extends string[]
    ? string[]
    : T extends number[]
      ? number[]
      : never;
};

/**
 * Type guard that checks whether an unknown value is a valid {@link LtrlTupleTemplate}.
 *
 * @param value - The value to check
 * @returns `true` if the value is a non-empty array of all `string` or all `number` elements
 */
export const isLtrlTuple = (value: unknown): value is LtrlTupleTemplate =>
  value !== null &&
  Array.isArray(value) &&
  value.length > 0 &&
  (value.every((v) => typeof v === "string") ||
    value.every((v) => typeof v === "number"));

/**
 * Creates a frozen literal tuple with type-safe utilities.
 *
 * @typeParam T - The literal tuple type
 * @param value - The tuple value to freeze
 * @returns A {@link LtrlTupleUtils} instance for the given tuple
 *
 * @example
 * ```ts
 * const roles = useLtrlTuple(["admin", "user", "guest"]);
 * roles.evaluate("admin"); // true
 * roles.evaluate("other"); // false
 * ```
 */
export const useLtrlTuple = <const T extends LtrlTupleTemplate>(
  value: T,
): LtrlTupleUtils<T> => {
  Object.freeze(value);
  return {
    value,
    evaluate: (key: unknown): key is (typeof value)[number] =>
      value.every((v) => typeof v === typeof key) &&
      value.map(String).includes(String(key)),
    clone: () => JSON.parse(JSON.stringify([...value])),
  };
};
