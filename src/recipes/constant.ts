export type LtrlConstantTemplate = string | number | boolean;

export type LtrlConstantUtils<C extends LtrlConstantTemplate> = {
  value: C;
  eval: (item: LtrlConstantTemplate) => item is C;
};

export const isLtrlConstant = (value: unknown): value is LtrlConstantTemplate =>
  value !== null &&
  value !== undefined &&
  ["string", "number", "boolean"].includes(typeof value);

export const defineLtrlConstant = <const C extends LtrlConstantTemplate>(
  config: C,
) => {
  const template = config;
  if (!isLtrlConstant(template)) {
    throw new Error("Invalid ltrl constant", {
      cause: template,
    });
  }
  Object.freeze(config);
  return config;
};

export const useLtrlConstant = <const C extends LtrlConstantTemplate>(
  config: C,
): LtrlConstantUtils<C> => {
  const value = defineLtrlConstant(config);
  return {
    value,
    eval: (item: LtrlConstantTemplate): item is typeof value => value === item,
  };
};
