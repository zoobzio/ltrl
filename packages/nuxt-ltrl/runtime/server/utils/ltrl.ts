import { ltrl } from "ltrl";

export { ltrl };

export const useNuxtLtrl = async (key: string) => {
  const value = await useStorage().getItem("key");
  if (!value || isLtrlRecipe(value)) {
    throw new Error(`Could not locate "${key} ltrl!"`);
  }
  return ltrl(value);
};
