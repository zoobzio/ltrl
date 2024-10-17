export type LtrlTupleTemplate = string[] | number[];

export type LtrlTupleUtils<T extends LtrlTupleTemplate> = {
  value: T;
  eval: (item: LtrlTupleTemplate[number]) => item is T[number];
  clone: () => T extends string[]
    ? string[]
    : T extends number[]
      ? number[]
      : never;
};

export const isLtrlTuple = (value: unknown): value is LtrlTupleTemplate =>
  value !== null &&
  Array.isArray(value) &&
  value.length > 0 &&
  (value.every((v) => typeof v === "string") ||
    value.every((v) => typeof v === "number"));

export const useLtrlTuple = <const T extends LtrlTupleTemplate>(
  value: T,
): LtrlTupleUtils<T> => {
  Object.freeze(value);
  return {
    value,
    eval: (key: unknown): key is (typeof value)[number] =>
      value.every((v) => typeof v === typeof key) &&
      value.map(String).includes(String(key)),
    clone: () => JSON.parse(JSON.stringify([...value])),
  };
};
