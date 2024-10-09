import type { LtrlConstantTemplate } from "./constant";

export type LtrlCongruentTemplate =
  | ({
      key: string;
    } & {
      [prop: string]: LtrlConstantTemplate;
    })[]
  | ({
      key: number;
    } & {
      [prop: string]: LtrlConstantTemplate;
    })[];

export type LtrlCongruent<T extends LtrlCongruentTemplate> = {
  [Key in keyof T]: T[Key];
};

export type LtrlCongruentFromKey<
  L extends LtrlCongruentTemplate,
  K extends string | number,
> = L extends [infer First, ...infer Rest]
  ? First extends LtrlCongruentTemplate[number]
    ? K extends First["key"]
      ? First
      : Rest extends LtrlCongruentTemplate
        ? LtrlCongruentFromKey<Rest, K>
        : never
    : Rest extends LtrlCongruentTemplate
      ? LtrlCongruentFromKey<Rest, K>
      : never
  : never;

export type LtrlCongruentUtils<C extends LtrlCongruentTemplate> = {
  value: C;
  keys: C[number]["key"][]; // TODO can this be a tuple type?
  eval: (val: unknown) => val is C[number];
  evalKey: (
    key: LtrlCongruentTemplate[number]["key"],
  ) => key is C[number]["key"];
  resolve: <K extends C[number]["key"]>(key: K) => LtrlCongruentFromKey<C, K>;
};

export const isLtrlCongruent = (
  value: unknown,
): value is LtrlCongruentTemplate =>
  value !== null &&
  Array.isArray(value) &&
  value.every((v) => typeof v === "object" && "key" in v) &&
  (value.every((v) => typeof v.key === "number") ||
    value.every((v) => typeof v.key === "string")) &&
  value.every((i) =>
    Object.entries(i).every(
      (e) => e[0] in value[0] && typeof e[1] === typeof value[0][e[0]],
    ),
  );

export const defineLtrlCongruent = <const C extends LtrlCongruentTemplate>(
  config: C,
) => {
  const template = config;
  if (!isLtrlCongruent(template)) {
    throw new Error("Invalid ltrl congruent", {
      cause: template,
    });
  }
  Object.freeze(config);
  return config;
};

export const useLtrlCongruent = <const C extends LtrlCongruentTemplate>(
  config: C,
): LtrlCongruentUtils<C> => {
  const value = defineLtrlCongruent(config);
  return {
    value,
    keys: value.map(({ key }) => key),
    eval: (item): item is (typeof value)[number] =>
      item !== null &&
      typeof item === "object" &&
      "key" in item &&
      value.findIndex((v) => v.key === item.key) >= 0,
    evalKey: (key): key is (typeof value)[number]["key"] =>
      value.map(({ key }) => String(key)).includes(String(key)),
    resolve: (key) =>
      value.find((v) => v.key === key) as LtrlCongruentFromKey<
        typeof value,
        typeof key
      >,
  };
};
