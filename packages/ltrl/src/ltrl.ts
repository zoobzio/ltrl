import type { LtrlRecipeUtils, LtrlRecipeTemplate } from "./recipes";
import type { LtrlConfigTemplate, LtrlConfigUtils } from "./config";
import { isLtrlRecipe, useLtrlRecipe } from "./recipes";
import { isLtrlConfig, useLtrlConfig } from "./config";

export type LtrlTemplate = LtrlConfigTemplate | LtrlRecipeTemplate;

export type LtrlReturn<L> = L extends LtrlConfigTemplate[string]
  ? LtrlRecipeUtils<L>
  : L extends LtrlConfigTemplate
    ? LtrlConfigUtils<L>
    : never;

export const ltrl = <const L extends LtrlTemplate>(value: L): LtrlReturn<L> => {
  if (isLtrlRecipe(value)) {
    return useLtrlRecipe(value) as LtrlReturn<L>;
  }
  if (isLtrlConfig(value)) {
    return useLtrlConfig(value) as LtrlReturn<L>;
  }
  throw new Error("Invalid ltrl!", {
    cause: value,
  });
};
