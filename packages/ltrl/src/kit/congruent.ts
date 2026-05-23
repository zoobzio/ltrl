import type { LtrlUnionToTuple } from "./types";
import type { LtrlConstantTemplate } from "./constant";

/**
 * Valid template type for a congruent literal: an object with a required `id`
 * property (string or number) and additional properties of constant types.
 * All items in a congruent array must share the same shape.
 */
export type LtrlCongruentTemplate =
  | ({
      id: string;
    } & {
      [prop: string]: LtrlConstantTemplate;
    })
  | ({
      id: number;
    } & {
      [prop: string]: LtrlConstantTemplate;
    });

/**
 * Derives the base shape that all items in a congruent array must conform to,
 * widening literal property types to their primitive equivalents.
 *
 * @typeParam S - The congruent template shape
 */
export type LtrlCongruent<S extends LtrlCongruentTemplate> = {
  id: S["id"] extends string ? string : S["id"] extends number ? number : never;
} & {
  [Key in Exclude<keyof S, "id">]: S[Key] extends string
    ? string
    : S[Key] extends number
      ? number
      : S[Key] extends boolean
        ? boolean
        : never;
};

/**
 * Resolves the specific congruent item type from a congruent array by its `id` value.
 *
 * @typeParam S - The congruent template shape
 * @typeParam R - The remaining congruent items
 * @typeParam K - The id value to look up
 */
export type LtrlCongruentFromKey<
  S extends LtrlCongruentTemplate,
  R extends LtrlCongruent<S>[],
  K extends string | number,
> = K extends S["id"]
  ? S
  : R extends [infer First, ...infer Rest]
    ? First extends LtrlCongruent<S>
      ? K extends First["id"]
        ? First
        : Rest extends LtrlCongruent<S>[]
          ? LtrlCongruentFromKey<S, Rest, K>
          : never
      : Rest extends LtrlCongruent<S>[]
        ? LtrlCongruentFromKey<S, Rest, K>
        : never
    : never;

/**
 * Utility interface returned when creating a congruent literal via {@link useLtrlCongruent}.
 *
 * @typeParam S - The congruent template shape
 * @typeParam R - The remaining congruent items
 */
export type LtrlCongruentUtils<
  S extends LtrlCongruentTemplate,
  R extends LtrlCongruent<S>[],
> = {
  /** The frozen array of congruent items. */
  value: [S, ...R];
  /** Returns the `id` values of all items as a typed tuple. */
  keys: () => LtrlUnionToTuple<S["id"] | R[number]["id"]>;
  /** Type-narrowing predicate that checks if a value is a member of the congruent array. */
  evaluate: (val: unknown) => val is [S, ...R][number];
  /** Type-narrowing predicate that checks if a key matches any item's `id`. */
  identify: (key: LtrlCongruentTemplate["id"]) => key is [S, ...R][number]["id"];
  /** Returns a deep-cloned copy of the congruent array. */
  clone: () => LtrlCongruentTemplate[];
  /** Resolves the specific item from the array by its `id` value. */
  resolve: <K extends S["id"] | R[number]["id"]>(
    key: K,
  ) => LtrlCongruentFromKey<S, R, K>;
};

/**
 * Type guard that checks whether an unknown value qualifies as a congruent literal array.
 * Validates that all items are objects with an `id` property of consistent type and
 * that all items share the same set of keys.
 *
 * @typeParam T - The expected congruent template shape
 * @param value - The value to check
 * @returns `true` if the value is a valid congruent array
 */
export const isLtrlCongruent = <T extends LtrlCongruentTemplate>(
  value: unknown,
): value is [T, ...LtrlCongruent<T>[]] =>
  value !== null &&
  Array.isArray(value) &&
  value.length > 0 &&
  value.every((v) => typeof v === "object" && "id" in v) &&
  (value.every((v) => typeof v.id === "number") ||
    value.every((v) => typeof v.id === "string")) &&
  value.reduce((x, y, i) => {
    if (!x) {
      return x;
    }
    const keys = Object.keys(y);
    if (
      (value as object[]).slice(i + 1).some((r) => !keys.every((k) => k in r))
    ) {
      x = false;
    }
    return x;
  }, true);

/**
 * Creates a frozen congruent literal array with type-safe utility methods.
 * A congruent array is a collection of objects that all share the same shape,
 * each identified by a unique `id` property.
 *
 * @typeParam S - The congruent template shape
 * @typeParam R - The remaining congruent items
 * @param value - The congruent array to wrap
 * @returns A {@link LtrlCongruentUtils} object with resolution and evaluation utilities
 *
 * @example
 * ```ts
 * const users = useLtrlCongruent([
 *   { id: "admin", level: 10 },
 *   { id: "user", level: 1 },
 * ]);
 * users.resolve("admin"); // { id: "admin", level: 10 }
 * users.identify("user"); // true
 * ```
 */
export const useLtrlCongruent = <
  const S extends LtrlCongruentTemplate,
  const R extends LtrlCongruent<S>[],
>(
  value: [S, ...R],
): LtrlCongruentUtils<S, R> => {
  Object.freeze(value);
  return {
    value,
    keys: () =>
      value.map(({ id }) => id) as LtrlUnionToTuple<S["id"] | R[number]["id"]>,
    evaluate: (item): item is (typeof value)[number] =>
      item !== null &&
      typeof item === "object" &&
      "id" in item &&
      value.findIndex((v) => v.id === item.id) >= 0,
    identify: (key): key is (typeof value)[number]["id"] =>
      value.map(({ id }) => String(id)).includes(String(key)),
    clone: () => JSON.parse(JSON.stringify(value)),
    resolve: (key) =>
      value.find((v) => v.id === key) as LtrlCongruentFromKey<S, R, typeof key>,
  };
};
