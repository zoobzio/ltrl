import type { LtrlConstantTemplate, LtrlConstantUtils } from "./constant";
import type { LtrlTupleTemplate, LtrlTupleUtils } from "./tuple";
import type { LtrlEnumTemplate, LtrlEnumUtils } from "./enum";
import type { LtrlCongruentTemplate, LtrlCongruentUtils } from "./congruent";
import { isLtrlConstant, useLtrlConstant } from "./constant";
import { isLtrlTuple, useLtrlTuple } from "./tuple";
import { isLtrlEnum, useLtrlEnum } from "./enum";
import { isLtrlCongruent, useLtrlCongruent } from "./congruent";

export type LtrlRecipeTemplate =
  | LtrlConstantTemplate
  | LtrlTupleTemplate
  | LtrlEnumTemplate
  | LtrlCongruentTemplate;

export type LtrlRecipeUtils<T extends LtrlRecipeTemplate> =
  T extends LtrlConstantTemplate
    ? LtrlConstantUtils<T>
    : T extends LtrlTupleTemplate
      ? LtrlTupleUtils<T>
      : T extends LtrlEnumTemplate
        ? LtrlEnumUtils<T>
        : T extends LtrlCongruentTemplate
          ? LtrlCongruentUtils<T>
          : never;

export function isLtrlRecipe(item: unknown): item is LtrlRecipeTemplate {
  return (
    isLtrlConstant(item) ||
    isLtrlTuple(item) ||
    isLtrlEnum(item) ||
    isLtrlCongruent(item)
  );
}

export const useLtrlRecipe = <
  const T extends LtrlRecipeTemplate,
  R extends LtrlRecipeUtils<T>,
>(
  value: T,
): R => {
  if (isLtrlConstant(value)) {
    return useLtrlConstant(value) as R;
  }
  if (isLtrlTuple(value)) {
    return useLtrlTuple(value) as R;
  }
  if (isLtrlEnum(value)) {
    return useLtrlEnum(value) as R;
  }
  if (isLtrlCongruent(value)) {
    return useLtrlCongruent(value) as R;
  }
  throw new Error("Invalid ltrl template", {
    cause: value,
  });
};
