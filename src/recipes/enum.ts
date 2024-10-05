export type LtrlEnumTemplate =
  | {
      [key: string]: string;
    }
  | {
      [key: string]: number;
    };

export type LtrlEnumConfig = {
  <const E extends LtrlEnumTemplate>(value: E): E;
};

export type LtrlEnumUtils<E extends LtrlEnumTemplate> = {
  value: E;
  keys: (keyof E)[];
  eval: (key: string) => key is keyof E & string;
  resolve: (key: keyof E) => E[typeof key];
};

export type LtrlEnumFactory = {
  <const E extends LtrlEnumTemplate>(value: E): LtrlEnumUtils<E>;
};

export const isLtrlEnum = (value: unknown): value is LtrlEnumTemplate =>
  value !== null &&
  typeof value === "string" &&
  (Object.values(value).every((v) => typeof v === "string") ||
    Object.values(value).every((v) => typeof v === "number"));

export const defineLtrlEnum: LtrlEnumConfig = (value) => value;

export const useLtrlEnum: LtrlEnumFactory = (value) => ({
  value,
  keys: Object.keys(value),
  eval: (key): key is keyof typeof value & string => key in value,
  resolve: (key) => value[key],
});
