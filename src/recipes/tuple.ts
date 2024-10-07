export type LtrlTupleTemplate = string[] | number[];

export type LtrlTupleUtils<O extends LtrlTupleTemplate> = {
  value: O;
  eval: (item: LtrlTupleTemplate[number]) => item is O[number];
};

export const isLtrlTuple = (value: unknown): value is LtrlTupleTemplate =>
  value !== null &&
  Array.isArray(value) &&
  value.length > 0 &&
  (value.every((v) => typeof v === "string") ||
    value.every((v) => typeof v === "number"));

export const defineLtrlTuple = <const O extends LtrlTupleTemplate>(
  config: O,
) => {
  const template = config;
  if (!isLtrlTuple(template)) {
    throw new Error("Invalid ltrl tuple", {
      cause: template,
    });
  }
  Object.freeze(config);
  return config;
};

export const useLtrlTuple = <const O extends LtrlTupleTemplate>(
  config: O,
): LtrlTupleUtils<O> => {
  const value = defineLtrlTuple(config);
  return {
    value,
    eval: (key: unknown): key is (typeof value)[number] =>
      value.every((v) => typeof v === typeof key) &&
      value.map(String).includes(String(key)),
  };
};
