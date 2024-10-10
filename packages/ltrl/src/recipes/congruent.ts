import type { UnionToTuple } from "../types";
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

export type LtrlCongruentFactory = {
  stringKeyLabel: {
    key: string;
    label: string;
  };
  numberKeyLabel: {
    key: number;
    label: string;
  };
  // TODO come up w/ more schemas for our factory
};

export type LtrlCongruentSchema =
  | LtrlCongruentTemplate
  | keyof LtrlCongruentFactory;

export type LtrlCongruent<S extends LtrlCongruentSchema> =
  S extends keyof LtrlCongruentFactory
    ? {
        [Key in keyof LtrlCongruentFactory[S]]: LtrlCongruentFactory[S][Key];
      }
    : {
        [Key in keyof S]: S[Key];
      };

export type LtrlCongruentBlueprintTemplate = {
  schema: LtrlCongruentSchema;
  records: LtrlCongruentTemplate[];
};

export type LtrlCongruentBlueprint<
  S extends LtrlCongruentSchema,
  R extends LtrlCongruent<S>[],
> = {
  schema: S;
  records: R;
};

export type LtrlCongruentFromKey<
  R extends LtrlCongruentTemplate[],
  K extends string | number,
> = R extends [infer First, ...infer Rest]
  ? First extends LtrlCongruentTemplate
    ? K extends First["key"]
      ? First
      : Rest extends LtrlCongruentTemplate[]
        ? LtrlCongruentFromKey<Rest, K>
        : never
    : Rest extends LtrlCongruentTemplate[]
      ? LtrlCongruentFromKey<Rest, K>
      : never
  : never;

export type LtrlCongruentUtils<
  S extends LtrlCongruentSchema,
  R extends LtrlCongruent<S>[],
> = {
  value: R;
  keys: () => UnionToTuple<R[number]["key"]>;
  eval: (val: unknown) => val is R[number];
  evalKey: (key: LtrlCongruentTemplate["key"]) => key is R[number]["key"];
  clone: () => LtrlCongruentTemplate[];
  resolve: <K extends R[number]["key"]>(key: K) => LtrlCongruentFromKey<R, K>;
};

export const isLtrlCongruent = (
  value: unknown,
): value is LtrlCongruentBlueprintTemplate =>
  value !== null &&
  typeof value === "object" &&
  "schema" in value &&
  (typeof value.schema === "string" || typeof value.schema === "object") &&
  "records" in value &&
  Array.isArray(value.records) &&
  value.records.length > 0 &&
  value.records.every((v) => typeof v === "object" && "key" in v) &&
  value.records.reduce((x, y, i) => {
    if (!x) {
      return x;
    }
    const keys = Object.keys(y);
    if (
      (value.records as object[])
        .slice(i + 1)
        .some((r) => !keys.every((k) => k in r))
    ) {
      x = false;
    }
    return x;
  }, true);

export function defineLtrlCongruent<
  S extends LtrlCongruentSchema,
  const R extends LtrlCongruent<S>[],
>(config: { schema: S; records: R }) {
  const template = config;
  if (!isLtrlCongruent(template)) {
    throw new Error("Invalid ltrl congruent", {
      cause: template,
    });
  }
  Object.freeze(config.records);
  return config;
}

export const useLtrlCongruent = <
  S extends LtrlCongruentSchema,
  const R extends LtrlCongruent<S>[],
>(config: {
  schema: S;
  records: R;
}): LtrlCongruentUtils<S, R> => {
  const value = defineLtrlCongruent(config);
  return {
    value: value.records,
    keys: () =>
      value.records.map(({ key }) => key) as UnionToTuple<R[number]["key"]>,
    eval: (item): item is (typeof value.records)[number] =>
      item !== null &&
      typeof item === "object" &&
      "key" in item &&
      value.records.findIndex((v) => v.key === item.key) >= 0,
    evalKey: (key): key is (typeof value.records)[number]["key"] =>
      value.records.map(({ key }) => String(key)).includes(String(key)),
    clone: () => JSON.parse(JSON.stringify(value.records)),
    resolve: (key) =>
      value.records.find((v) => v.key === key) as LtrlCongruentFromKey<
        typeof value.records,
        typeof key
      >,
  };
};
