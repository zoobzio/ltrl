export type LtrlUnionToIntersection<U> = (
  U extends never ? never : (arg: U) => never
) extends (arg: infer I) => void
  ? I
  : never;

export type LtrlUnionToTuple<T> =
  LtrlUnionToIntersection<T extends never ? never : (t: T) => T> extends (
    _: never,
  ) => infer W
    ? [...LtrlUnionToTuple<Exclude<T, W>>, W]
    : [];
