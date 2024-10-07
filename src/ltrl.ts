import type {
  LtrlConstantTemplate,
  LtrlConstantUtils,
  LtrlTupleTemplate,
  LtrlTupleUtils,
  LtrlEnumTemplate,
  LtrlEnumUtils,
  LtrlKeyLabelTemplate,
  LtrlKeyLabelUtils,
} from "./recipes";
import {
  isLtrlConstant,
  useLtrlConstant,
  isLtrlTuple,
  useLtrlTuple,
  isLtrlEnum,
  useLtrlEnum,
  isLtrlKeyLabel,
  useLtrlKeyLabel,
} from "./recipes";

export type LtrlTemplate = {
  [key: string]:
    | LtrlConstantTemplate
    | LtrlTupleTemplate
    | LtrlEnumTemplate
    | LtrlKeyLabelTemplate;
};

export type LtrlUtils<L extends LtrlTemplate> = {
  [K in keyof L]: L[K] extends LtrlConstantTemplate
    ? LtrlConstantUtils<L[K]>
    : L[K] extends LtrlTupleTemplate
      ? LtrlTupleUtils<L[K]>
      : L[K] extends LtrlEnumTemplate
        ? LtrlEnumUtils<L[K]>
        : L[K] extends LtrlKeyLabelTemplate
          ? LtrlKeyLabelUtils<L[K]>
          : never;
};

export const isValidLtrl = (item: unknown): item is LtrlTemplate =>
  item !== null &&
  typeof item === "object" &&
  Object.values(item).every(
    (v) =>
      isLtrlConstant(v) || isLtrlTuple(v) || isLtrlEnum(v) || isLtrlKeyLabel(v),
  );

export const defineLtrl = <const L extends LtrlTemplate>(config: L) => {
  const template = config;
  if (!isValidLtrl(template)) {
    throw new Error("Invalid ltrl configuration", {
      cause: template,
    });
  }
  Object.freeze(config);
  return config;
};

export const useLtrl = <const L extends LtrlTemplate>(values: L) => {
  const config = defineLtrl(values);
  return (Object.keys(config) as (keyof typeof config)[]).reduce(
    (results, key) => {
      const value = config[key];

      type Util = LtrlUtils<typeof config>[typeof key];

      // TODO using if/else here causes the last statement to not be picked up in test coverage, need to investigate & optimize
      if (!results[key] && isLtrlConstant(value)) {
        results[key] = useLtrlConstant(value) as Util;
      }
      if (!results[key] && isLtrlTuple(value)) {
        results[key] = useLtrlTuple(value) as Util;
      }
      if (!results[key] && isLtrlEnum(value)) {
        results[key] = useLtrlEnum(value) as Util;
      }
      if (!results[key] && isLtrlKeyLabel(value)) {
        results[key] = useLtrlKeyLabel(value) as Util;
      }

      return results;
    },
    {} as LtrlUtils<typeof config>,
  );
};

export const ltrl = useLtrl;
