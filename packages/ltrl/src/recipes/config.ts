import type { LtrlConstantTemplate, LtrlConstantUtils } from "./constant";
import type { LtrlTupleTemplate, LtrlTupleUtils } from "./tuple";
import type { LtrlEnumTemplate, LtrlEnumUtils } from "./enum";
import type {
  LtrlCongruentTemplate,
  LtrlCongruent,
  LtrlCongruentUtils,
} from "./congruent";
import { isLtrlConstant, useLtrlConstant } from "./constant";
import { isLtrlTuple, useLtrlTuple } from "./tuple";
import { isLtrlEnum, useLtrlEnum } from "./enum";
import { isLtrlCongruent, useLtrlCongruent } from "./congruent";

export type LtrlConfigTemplate = {
  [key: string]:
    | LtrlConstantTemplate
    | LtrlTupleTemplate
    | LtrlEnumTemplate
    | LtrlCongruentTemplate[];
};

export type LtrlConfig<T extends LtrlConfigTemplate> = {
  [K in keyof T]: T[K] extends LtrlCongruentTemplate[]
    ? T[K] extends [infer First]
      ? First extends LtrlCongruentTemplate
        ? [First, ...LtrlCongruent<First>[]]
        : never
      : never
    : T[K];
};

export type LtrlConfigUtils<L extends LtrlConfigTemplate> = {
  [K in keyof L]: L[K] extends LtrlConstantTemplate
    ? LtrlConstantUtils<L[K]>
    : L[K] extends LtrlTupleTemplate
      ? LtrlTupleUtils<L[K]>
      : L[K] extends LtrlEnumTemplate
        ? LtrlEnumUtils<L[K]>
        : L[K] extends LtrlCongruentTemplate[]
          ? L[K] extends [infer First, ...infer Rest]
            ? First extends LtrlCongruentTemplate
              ? Rest extends LtrlCongruent<First>[]
                ? LtrlCongruentUtils<First, Rest>
                : never
              : never
            : never
          : never;
};

export const isLtrlConfig = (item: unknown): item is LtrlConfigTemplate =>
  item !== null &&
  !Array.isArray(item) &&
  typeof item === "object" &&
  Object.values(item).every(
    (v) =>
      isLtrlConstant(v) ||
      isLtrlTuple(v) ||
      isLtrlEnum(v) ||
      isLtrlCongruent(v),
  );

export const useLtrlConfig = <const L extends LtrlConfigTemplate>(
  config: LtrlConfig<L>,
) => {
  Object.freeze(config);
  const keys = Object.keys(config) as (keyof L)[];
  return keys.reduce((results, key) => {
    const item = config[key];
    type Item = LtrlConfigUtils<L>[typeof key];
    if (isLtrlConstant(item)) {
      results[key] = useLtrlConstant(item) as Item;
    } else if (isLtrlTuple(item)) {
      results[key] = useLtrlTuple(item) as Item;
    } else if (isLtrlEnum(item)) {
      results[key] = useLtrlEnum(item) as Item;
    } else if (isLtrlCongruent(item)) {
      results[key] = useLtrlCongruent(item) as Item;
    }
    return results;
  }, {} as LtrlConfigUtils<L>);
};
