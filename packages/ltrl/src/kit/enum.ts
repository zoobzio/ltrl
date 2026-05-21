import { LtrlUnionToTuple } from "./types";

export type LtrlEnumTemplate =
  | { [key: string]: string }
  | { [key: string]: number };

export type LtrlEnumUtils<E extends LtrlEnumTemplate> = {
  value: E;
  keys: () => LtrlUnionToTuple<keyof E>;
  evaluate: (key: keyof E, value: unknown) => value is E[typeof key];
  identify: (key: string) => key is keyof E & string;
  clone: () => E extends { [key: string]: string }
    ? { [key: string]: string }
    : E extends { [key: string]: number }
      ? { [key: string]: number }
      : never;
  resolve: <K extends keyof E>(key: K) => E[K];
  lookup: <V extends E[keyof E]>(
    value: V,
  ) => {
    [K in keyof E]: E[K] extends V ? K : never;
  }[keyof E];
  list: () => { [K in keyof E]: { key: K; value: E[K] } }[keyof E][];
};

export const isLtrlEnum = (value: unknown): value is LtrlEnumTemplate =>
  value !== null &&
  !Array.isArray(value) &&
  typeof value === "object" &&
  (Object.values(value).every((v) => typeof v === "string") ||
    Object.values(value).every((v) => typeof v === "number"));

export const useLtrlEnum = <const E extends LtrlEnumTemplate>(
  value: E,
): LtrlEnumUtils<E> => {
  Object.freeze(value);

  const list = Object.entries(value).map(([k, v]) => ({
    key: k,
    value: v,
  }));

  return {
    value,
    keys: () => Object.keys(value) as LtrlUnionToTuple<keyof E>,
    evaluate: (key, val): val is (typeof value)[typeof key] =>
      value[key] === val,
    identify: (key): key is keyof typeof value & string => key in value,
    clone: () => JSON.parse(JSON.stringify(value)),
    resolve: (key) => value[key],
    lookup: ((val) =>
      Object.keys(value).find(
        (k) => value[k] === val,
      )) as LtrlEnumUtils<E>["lookup"],
    list: () => list as ReturnType<LtrlEnumUtils<E>["list"]>,
  };
};
