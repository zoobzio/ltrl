import type { LtrlUnionToTuple } from "./types";
import type { LtrlConstantTemplate } from "./constant";

export type LtrlCongruentTemplate =
  | ({
      id: string;
    } & {
      [prop: string]: LtrlConstantTemplate;
    })
  | ({
      id: number;
    } & {
      [prop: string]: LtrlConstantTemplate;
    });

export type LtrlCongruent<S extends LtrlCongruentTemplate> = {
  id: S["id"] extends string ? string : S["id"] extends number ? number : never;
} & {
  [Key in Exclude<keyof S, "id">]: S[Key] extends string
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
> = K extends S["id"]
  ? S
  : R extends [infer First, ...infer Rest]
    ? First extends LtrlCongruent<S>
      ? K extends First["id"]
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
  keys: () => LtrlUnionToTuple<S["id"] | R[number]["id"]>;
  eval: (val: unknown) => val is [S, ...R][number];
  evalKey: (key: LtrlCongruentTemplate["id"]) => key is [S, ...R][number]["id"];
  clone: () => LtrlCongruentTemplate[];
  resolve: <K extends S["id"] | R[number]["id"]>(
    key: K,
  ) => LtrlCongruentFromKey<S, R, K>;
};

export const isLtrlCongruent = <T extends LtrlCongruentTemplate>(
  value: unknown,
): value is [T, ...LtrlCongruent<T>[]] =>
  value !== null &&
  Array.isArray(value) &&
  value.length > 0 &&
  value.every((v) => typeof v === "object" && "id" in v) &&
  (value.every((v) => typeof v.id === "number") ||
    value.every((v) => typeof v.id === "string")) &&
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
    value,
    keys: () =>
      value.map(({ id }) => id) as LtrlUnionToTuple<S["id"] | R[number]["id"]>,
    eval: (item): item is (typeof value)[number] =>
      item !== null &&
      typeof item === "object" &&
      "id" in item &&
      value.findIndex((v) => v.id === item.id) >= 0,
    evalKey: (key): key is (typeof value)[number]["id"] =>
      value.map(({ id }) => String(id)).includes(String(key)),
    clone: () => JSON.parse(JSON.stringify(value)),
    resolve: (key) =>
      value.find((v) => v.id === key) as LtrlCongruentFromKey<S, R, typeof key>,
  };
};
