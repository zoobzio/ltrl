import type { LtrlConstantTemplate, LtrlConstantUtils } from "./constant";
import type { LtrlTupleTemplate, LtrlTupleUtils } from "./tuple";
import type { LtrlEnumTemplate, LtrlEnumUtils } from "./enum";
import type {
  LtrlCongruentBlueprint,
  LtrlCongruentBlueprintTemplate,
  LtrlCongruentUtils,
} from "./congruent";
import { isLtrlConstant, useLtrlConstant } from "./constant";
import { isLtrlTuple, useLtrlTuple } from "./tuple";
import { isLtrlEnum, useLtrlEnum } from "./enum";
import { isLtrlCongruent, useLtrlCongruent } from "./congruent";

export type LtrlRecipeTemplate =
  | LtrlConstantTemplate
  | LtrlTupleTemplate
  | LtrlEnumTemplate
  | LtrlCongruentBlueprintTemplate;

export type LtrlRecipeUtils<T extends LtrlRecipeTemplate> =
  T extends LtrlConstantTemplate
    ? LtrlConstantUtils<T>
    : T extends LtrlTupleTemplate
      ? LtrlTupleUtils<T>
      : T extends LtrlEnumTemplate
        ? LtrlEnumUtils<T>
        : T extends LtrlCongruentBlueprint<infer S, infer C>
          ? C[number]["key"] extends string
            ? LtrlCongruentUtils<S, C>
            : C[number]["key"] extends number
              ? LtrlCongruentUtils<S, C>
              : never
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
