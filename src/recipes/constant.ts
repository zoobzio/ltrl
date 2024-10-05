export type LtrlConstantTemplate = string | number | boolean;

export type LtrlConstantConfig = {
  <const C extends LtrlConstantTemplate>(value: C): C;
};

export type LtrlConstantUtils<C extends LtrlConstantTemplate> = {
  value: C;
  eval: (key: LtrlConstantTemplate) => key is C;
};

export type LtrlConstantFactory = {
  <const C extends LtrlConstantTemplate>(value: C): LtrlConstantUtils<C>;
};

export const isLtrlConstant = (value: unknown): value is LtrlConstantTemplate =>
  value !== null &&
  value !== undefined &&
  ["string", "number", "boolean"].includes(typeof value);

export const defineLtrlConstant: LtrlConstantConfig = (config) => config;

export const useLtrlConstant: LtrlConstantFactory = (value) => ({
  value,
  eval: (key): key is typeof value => value === key,
});
