import type {
  LtrlConstantTemplate,
  LtrlConstantUtils,
  LtrlTupleTemplate,
  LtrlTupleUtils,
  LtrlEnumTemplate,
  LtrlEnumUtils,
  LtrlCongruentTemplate,
  LtrlCongruent,
  LtrlCongruentUtils,
} from "./kit";
import {
  useLtrlConstant,
  isLtrlConstant,
  isLtrlTuple,
  useLtrlTuple,
  isLtrlEnum,
  useLtrlEnum,
  isLtrlCongruent,
  useLtrlCongruent,
} from "./kit";

/**
 * Creates a type-safe literal constant from a primitive value.
 *
 * @typeParam T - The literal constant type
 * @param template - A string, number, or boolean value
 * @returns A {@link LtrlConstantUtils} with evaluation and cloning utilities
 *
 * @example
 * ```ts
 * const pi = ltrl(3.14);
 * pi.value;          // 3.14
 * pi.evaluate(3.14); // true
 * ```
 */
export function ltrl<const T extends LtrlConstantTemplate>(
  template: T,
): LtrlConstantUtils<T>;

/**
 * Creates a type-safe literal tuple from an array of primitives.
 *
 * @typeParam T - The literal tuple type
 * @param template - A homogeneous array of strings or numbers
 * @returns A {@link LtrlTupleUtils} with membership evaluation and cloning utilities
 *
 * @example
 * ```ts
 * const roles = ltrl(["admin", "user", "guest"]);
 * roles.evaluate("admin"); // true
 * ```
 */
export function ltrl<const T extends LtrlTupleTemplate>(
  template: T,
): LtrlTupleUtils<T>;

/**
 * Creates a type-safe literal enum from a key-value object.
 *
 * @typeParam T - The literal enum type
 * @param template - An object mapping string keys to all-string or all-number values
 * @returns A {@link LtrlEnumUtils} with resolution, lookup, and evaluation utilities
 *
 * @example
 * ```ts
 * const colors = ltrl({ RED: "#f00", GREEN: "#0f0" });
 * colors.resolve("RED");   // "#f00"
 * colors.lookup("#0f0");   // "GREEN"
 * ```
 */
export function ltrl<const T extends LtrlEnumTemplate>(
  template: T,
): LtrlEnumUtils<T>;

/**
 * Creates a type-safe congruent literal from an array of same-shaped objects.
 *
 * @typeParam T - The congruent template shape
 * @typeParam R - The remaining congruent items
 * @param template - A non-empty array of objects sharing the same shape, each with a unique `id`
 * @returns A {@link LtrlCongruentUtils} with resolution and evaluation utilities
 *
 * @example
 * ```ts
 * const users = ltrl([
 *   { id: "admin", level: 10 },
 *   { id: "user", level: 1 },
 * ]);
 * users.resolve("admin"); // { id: "admin", level: 10 }
 * ```
 */
export function ltrl<
  const T extends LtrlCongruentTemplate,
  const R extends LtrlCongruent<T>[],
>(template: [T, ...R]): LtrlCongruentUtils<T, R>;

export function ltrl<const T>(template: T) {
  if (isLtrlConstant(template)) {
    return useLtrlConstant(template);
  }
  if (isLtrlTuple(template)) {
    return useLtrlTuple(template);
  }
  if (isLtrlEnum(template)) {
    return useLtrlEnum(template);
  }
  if (isLtrlCongruent(template)) {
    return useLtrlCongruent(template);
  }
  throw new Error("Invalid ltrl template!", {
    cause: template,
  });
}
