import { LtrlUnionToTuple } from "./types";

/**
 * Valid template types for a literal enum: an object mapping string keys to
 * all-string or all-number values.
 */
export type LtrlEnumTemplate =
  | { [key: string]: string }
  | { [key: string]: number };

/**
 * Utility interface returned when creating a literal enum via {@link useLtrlEnum}.
 *
 * @typeParam E - The literal enum template type
 */
export type LtrlEnumUtils<E extends LtrlEnumTemplate> = {
  /** The frozen literal enum value. */
  value: E;
  /** Returns the enum keys as a typed tuple. */
  keys: () => LtrlUnionToTuple<keyof E>;
  /** Type-narrowing predicate that checks if a value matches the enum value for a given key. */
  evaluate: (key: keyof E, value: unknown) => value is E[typeof key];
  /** Type-narrowing predicate that checks if a string is a valid enum key. */
  identify: (key: string) => key is keyof E & string;
  /** Returns a deep-cloned copy of the enum with its base record type. */
  clone: () => E extends { [key: string]: string }
    ? { [key: string]: string }
    : E extends { [key: string]: number }
      ? { [key: string]: number }
      : never;
  /** Resolves the enum value for a given key. */
  resolve: <K extends keyof E>(key: K) => E[K];
  /** Reverse-lookups the enum key for a given value. */
  lookup: <V extends E[keyof E]>(
    value: V,
  ) => {
    [K in keyof E]: E[K] extends V ? K : never;
  }[keyof E];
  /** Returns the enum entries as an array of `{ key, value }` objects. */
  list: () => { [K in keyof E]: { key: K; value: E[K] } }[keyof E][];
};

/**
 * Type guard that checks whether an unknown value qualifies as a {@link LtrlEnumTemplate}.
 *
 * @param value - The value to check
 * @returns `true` if the value is a non-array object with all-string or all-number values
 */
export const isLtrlEnum = (value: unknown): value is LtrlEnumTemplate =>
  value !== null &&
  !Array.isArray(value) &&
  typeof value === "object" &&
  (Object.values(value).every((v) => typeof v === "string") ||
    Object.values(value).every((v) => typeof v === "number"));

/**
 * Creates a frozen literal enum with type-safe utility methods.
 *
 * @typeParam E - The literal enum template type
 * @param value - The enum object to wrap
 * @returns A {@link LtrlEnumUtils} object with resolution, lookup, and evaluation utilities
 *
 * @example
 * ```ts
 * const colors = useLtrlEnum({ RED: "#f00", GREEN: "#0f0", BLUE: "#00f" });
 * colors.resolve("RED");    // "#f00"
 * colors.lookup("#0f0");    // "GREEN"
 * colors.identify("BLUE");  // true
 * ```
 */
export const useLtrlEnum = <const E extends LtrlEnumTemplate>(
  value: E,
): LtrlEnumUtils<E> => {
  Object.freeze(value);

  const list = Object.entries(value).map(([k, v]) => ({
    key: k,
    value: v,
  }));

  return {
    value,
    keys: () => Object.keys(value) as LtrlUnionToTuple<keyof E>,
    evaluate: (key, val): val is (typeof value)[typeof key] =>
      value[key] === val,
    identify: (key): key is keyof typeof value & string => key in value,
    clone: () => JSON.parse(JSON.stringify(value)),
    resolve: (key) => value[key],
    lookup: ((val) =>
      Object.keys(value).find(
        (k) => value[k] === val,
      )) as LtrlEnumUtils<E>["lookup"],
    list: () => list as ReturnType<LtrlEnumUtils<E>["list"]>,
  };
};
