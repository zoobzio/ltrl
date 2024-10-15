import { LtrlUnionToTuple } from "../types";

export type LtrlEnumTemplate =
  | {
      [key: string]: string;
    }
  | {
      [key: string]: number;
    };

export type LtrlEnumUtils<E extends LtrlEnumTemplate> = {
  value: E;
  keys: () => LtrlUnionToTuple<keyof E>;
  eval: (key: keyof E, value: unknown) => value is E[typeof key];
  evalKey: (key: string) => key is keyof E & string;
  clone: () => E extends { [key: string]: string }
    ? { [key: string]: string }
    : E extends { [key: string]: number }
      ? { [key: string]: number }
      : never;
  resolve: <K extends keyof E>(key: K) => E[K];
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
  return {
    value,
    keys: () => Object.keys(value) as LtrlUnionToTuple<keyof E>,
    eval: (key, val): val is (typeof value)[typeof key] => value[key] === val,
    evalKey: (key): key is keyof typeof value & string => key in value,
    clone: () => JSON.parse(JSON.stringify(value)),
    resolve: (key) => value[key],
  };
};
