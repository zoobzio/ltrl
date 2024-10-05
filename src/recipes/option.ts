export type LtrlOptionTemplate = string[] | number[];

export type LtrlOptionConfig = {
  <const O extends LtrlOptionTemplate>(value: O): O;
};

export type LtrlOptionUtils<O extends LtrlOptionTemplate> = {
  value: O;
  eval: (key: LtrlOptionTemplate[number]) => key is O[number];
};

export type LtrlOptionFactory = {
  <const O extends LtrlOptionTemplate>(value: O): LtrlOptionUtils<O>;
};

export const isLtrlOption = (value: unknown): value is LtrlOptionTemplate =>
  value !== null &&
  Array.isArray(value) &&
  value.length > 0 &&
  (value.every((v) => typeof v === "string") ||
    value.every((v) => typeof v === "number"));

export const defineLtrlOption: LtrlOptionConfig = (value) => value;

export const useLtrlOption: LtrlOptionFactory = (value) => ({
  value,
  eval: (key): key is (typeof value)[number] =>
    value.every((v) => typeof v === typeof key) &&
    value.map(String).includes(String(key)),
});
