import type { LtrlUnionToTuple } from "../types";
import type { LtrlConstantTemplate } from "./constant";

export type LtrlCongruentTemplate =
  | ({
      key: string;
    } & {
      [prop: string]: LtrlConstantTemplate;
    })
  | ({
      key: number;
    } & {
      [prop: string]: LtrlConstantTemplate;
    });

export type LtrlCongruent<S extends LtrlCongruentTemplate> = {
  key: S["key"] extends string
    ? string
    : S["key"] extends number
      ? number
      : never;
} & {
  [Key in Exclude<keyof S, "key">]: S[Key] extends string
    ? string
    : S[Key] extends number
      ? number
      : S[Key] extends boolean
        ? boolean
        : never;
};

export type LtrlCongruentFromKey<
  S extends LtrlCongruentTemplate,
  R extends LtrlCongruent<S>[],
  K extends string | number,
> = K extends S["key"]
  ? S
  : R extends [infer First, ...infer Rest]
    ? First extends LtrlCongruent<S>
      ? K extends First["key"]
        ? First
        : Rest extends LtrlCongruent<S>[]
          ? LtrlCongruentFromKey<S, Rest, K>
          : never
      : Rest extends LtrlCongruent<S>[]
        ? LtrlCongruentFromKey<S, Rest, K>
        : never
    : never;

export type LtrlCongruentUtils<
  S extends LtrlCongruentTemplate,
  R extends LtrlCongruent<S>[],
> = {
  value: [S, ...R];
  keys: () => LtrlUnionToTuple<S["key"] | R[number]["key"]>;
  eval: (val: unknown) => val is [S, ...R][number];
  evalKey: (
    key: LtrlCongruentTemplate["key"],
  ) => key is [S, ...R][number]["key"];
  clone: () => LtrlCongruentTemplate[];
  resolve: <K extends S["key"] | R[number]["key"]>(
    key: K,
  ) => LtrlCongruentFromKey<S, R, K>;
};

export const isLtrlCongruent = <T extends LtrlCongruentTemplate>(
  value: unknown,
): value is [T, ...LtrlCongruent<T>[]] =>
  value !== null &&
  Array.isArray(value) &&
  value.length > 0 &&
  value.every((v) => typeof v === "object" && "key" in v) &&
  (value.every((v) => typeof v.key === "number") ||
    value.every((v) => typeof v.key === "string")) &&
  value.reduce((x, y, i) => {
    if (!x) {
      return x;
    }
    const keys = Object.keys(y);
    if (
      (value as object[]).slice(i + 1).some((r) => !keys.every((k) => k in r))
    ) {
      x = false;
    }
    return x;
  }, true);

export const useLtrlCongruent = <
  const S extends LtrlCongruentTemplate,
  const R extends LtrlCongruent<S>[],
>(
  value: [S, ...R],
): LtrlCongruentUtils<S, R> => {
  Object.freeze(value);
  return {
    value: value,
    keys: () =>
      value.map(({ key }) => key) as LtrlUnionToTuple<
        S["key"] | R[number]["key"]
      >,
    eval: (item): item is (typeof value)[number] =>
      item !== null &&
      typeof item === "object" &&
      "key" in item &&
      value.findIndex((v) => v.key === item.key) >= 0,
    evalKey: (key): key is (typeof value)[number]["key"] =>
      value.map(({ key }) => String(key)).includes(String(key)),
    clone: () => JSON.parse(JSON.stringify(value)),
    resolve: (key) =>
      value.find((v) => v.key === key) as LtrlCongruentFromKey<
        S,
        R,
        typeof key
      >,
  };
};
