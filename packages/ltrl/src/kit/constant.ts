/**
 * Valid template types for a literal constant: a single `string`, `number`, or `boolean` value.
 */
export type LtrlConstantTemplate = string | number | boolean;

/**
 * Utility interface returned by {@link useLtrlConstant} for working with a frozen literal constant.
 *
 * @typeParam T - The literal constant type
 */
export type LtrlConstantUtils<T extends LtrlConstantTemplate> = {
  /** The frozen literal value. */
  value: T;
  /** Type guard that narrows an unknown constant to `T`. */
  evaluate: (item: LtrlConstantTemplate) => item is T;
  /** Returns a deep clone of the constant with a widened primitive type. */
  clone: () => T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : never;
};

/**
 * Type guard that checks whether an unknown value is a valid {@link LtrlConstantTemplate}.
 *
 * @param value - The value to check
 * @returns `true` if the value is a `string`, `number`, or `boolean`
 */
export const isLtrlConstant = (value: unknown): value is LtrlConstantTemplate =>
  value !== null &&
  value !== undefined &&
  !Array.isArray(value) &&
  typeof value !== "object" &&
  ["string", "number", "boolean"].includes(typeof value);

/**
 * Creates a frozen literal constant with type-safe utilities.
 *
 * @typeParam T - The literal constant type
 * @param value - The constant value to freeze
 * @returns A {@link LtrlConstantUtils} instance for the given value
 *
 * @example
 * ```ts
 * const pi = useLtrlConstant(3.14);
 * pi.value;          // 3.14
 * pi.evaluate(3.14); // true
 * ```
 */
export const useLtrlConstant = <const T extends LtrlConstantTemplate>(
  value: T,
): LtrlConstantUtils<T> => {
  Object.freeze(value);
  return {
    value,
    evaluate: (item: LtrlConstantTemplate): item is typeof value => value === item,
    clone: () => JSON.parse(JSON.stringify(value)),
  };
};
