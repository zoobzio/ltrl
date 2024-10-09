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
  numKeyLabel: {
    key: number;
    label: string;
  };
  // TODO come up w/ more schemas for our factory
};

export type LtrlCongruentSchema =
  | LtrlCongruentTemplate
  | keyof LtrlCongruentFactory;

export type LtrlCongruentBlueprint = {
  schema: LtrlCongruentSchema;
  records: LtrlCongruentTemplate[];
};

export type LtrlCongruent<S extends LtrlCongruentSchema> =
  S extends keyof LtrlCongruentFactory
    ? {
        [Key in keyof LtrlCongruentFactory[S]]: LtrlCongruentFactory[S][Key];
      }
    : {
        [Key in keyof S]: S[Key];
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
  keys: R[number]["key"][]; // TODO can this be a tuple type?
  eval: (val: unknown) => val is R[number];
  evalKey: (key: LtrlCongruentTemplate["key"]) => key is R[number]["key"];
  resolve: <K extends R[number]["key"]>(key: K) => LtrlCongruentFromKey<R, K>;
};

export const isLtrlCongruent = (
  value: unknown,
): value is LtrlCongruentBlueprint =>
  value !== null &&
  typeof value === "object" &&
  "schema" in value &&
  "records" in value &&
  Array.isArray(value.records) &&
  value.records.every(
    (v) =>
      typeof v === "object" &&
      "key" in v &&
      Object.entries(v).every(
        (e) =>
          value.schema !== null &&
          typeof value.schema === "object" &&
          e[0] in value.schema,
      ),
  );

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
  Object.freeze(config);
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
    keys: value.records.map(({ key }) => key),
    eval: (item): item is (typeof value.records)[number] =>
      item !== null &&
      typeof item === "object" &&
      "key" in item &&
      value.records.findIndex((v) => v.key === item.key) >= 0,
    evalKey: (key): key is (typeof value.records)[number]["key"] =>
      value.records.map(({ key }) => String(key)).includes(String(key)),
    resolve: (key) =>
      value.records.find((v) => v.key === key) as LtrlCongruentFromKey<
        typeof value.records,
        typeof key
      >,
  };
};
