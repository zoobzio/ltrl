export type LtrlConstantTemplate = string | number | boolean;

export type LtrlConstantUtils<T extends LtrlConstantTemplate> = {
  value: T;
  eval: (item: LtrlConstantTemplate) => item is T;
  clone: () => T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : never;
};

export const isLtrlConstant = (value: unknown): value is LtrlConstantTemplate =>
  value !== null &&
  value !== undefined &&
  !Array.isArray(value) &&
  typeof value !== "object" &&
  ["string", "number", "boolean"].includes(typeof value);

export const useLtrlConstant = <const T extends LtrlConstantTemplate>(
  value: T,
): LtrlConstantUtils<T> => {
  Object.freeze(value);
  return {
    value,
    eval: (item: LtrlConstantTemplate): item is typeof value => value === item,
    clone: () => JSON.parse(JSON.stringify(value)), // TODO is there a better way?
  };
};
