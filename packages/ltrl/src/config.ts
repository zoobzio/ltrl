import type { LtrlRecipeTemplate, LtrlRecipeUtils } from "./recipes";
import { isLtrlRecipe, useLtrlRecipe } from "./recipes";

export type LtrlConfigTemplate = {
  [key: string]: LtrlRecipeTemplate;
};

export type LtrlConfigUtils<L extends LtrlConfigTemplate> = {
  [K in keyof L]: LtrlRecipeUtils<L[K]>;
};

export const isLtrlConfig = (item: unknown): item is LtrlConfigTemplate =>
  item !== null &&
  typeof item === "object" &&
  Object.values(item).every((v) => isLtrlRecipe(v));

export const defineLtrlConfig = <const L extends LtrlConfigTemplate>(
  config: L,
) => {
  const template = config;
  if (!isLtrlConfig(template)) {
    throw new Error("Invalid ltrl configuration", {
      cause: template,
    });
  }
  Object.freeze(config);
  return config;
};

export const useLtrlConfig = <const L extends LtrlConfigTemplate>(
  values: L,
) => {
  const config = defineLtrlConfig(values);
  return (Object.keys(config) as (keyof typeof config)[]).reduce(
    (results, key) => {
      results[key] = useLtrlRecipe(config[key]);
      return results;
    },
    {} as LtrlConfigUtils<typeof config>,
  );
};
