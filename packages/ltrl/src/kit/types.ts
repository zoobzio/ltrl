/**
 * Converts a union type into an intersection type.
 *
 * @typeParam U - The union type to convert
 *
 * @example
 * ```ts
 * type Result = LtrlUnionToIntersection<{ a: 1 } | { b: 2 }>;
 * // { a: 1 } & { b: 2 }
 * ```
 */
export type LtrlUnionToIntersection<U> = (
  U extends never ? never : (arg: U) => never
) extends (arg: infer I) => void
  ? I
  : never;

/**
 * Converts a union type into a tuple type.
 *
 * @typeParam T - The union type to convert
 *
 * @example
 * ```ts
 * type Result = LtrlUnionToTuple<"a" | "b" | "c">;
 * // ["a", "b", "c"]
 * ```
 */
export type LtrlUnionToTuple<T> =
  LtrlUnionToIntersection<T extends never ? never : (t: T) => T> extends (
    _: never,
  ) => infer W
    ? [...LtrlUnionToTuple<Exclude<T, W>>, W]
    : [];
