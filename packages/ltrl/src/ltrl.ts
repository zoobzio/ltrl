import type { LtrlRecipeUtils, LtrlRecipeTemplate } from "./recipes";
import type { LtrlConfigTemplate, LtrlConfigUtils } from "./config";
import { useLtrlRecipe } from "./recipes";
import { isLtrlConfig, useLtrlConfig } from "./config";

export type LtrlTemplate = LtrlConfigTemplate | LtrlRecipeTemplate;

export type LtrlReturn<L> = L extends LtrlConfigTemplate[string]
  ? LtrlRecipeUtils<L>
  : L extends LtrlConfigTemplate
    ? LtrlConfigUtils<L>
    : never;

export const ltrl = <const L extends LtrlTemplate>(
  values: L,
): LtrlReturn<L> => {
  if (!isLtrlConfig(values)) {
    return useLtrlRecipe(values) as LtrlReturn<L>;
  } else {
    return useLtrlConfig(values) as LtrlReturn<L>;
  }
};
