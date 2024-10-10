// @ts-ignore
import { nuxtLtrl } from "#build/ltrl.config.mjs";
import { ltrl } from "ltrl";

const config = ltrl(nuxtLtrl);

export type LtrlConfig = {
  [K in keyof typeof config]: (typeof config)[K]["value"];
};
export type LtrlKey = keyof LtrlConfig;
export type LtrlValue<K extends LtrlKey> = LtrlConfig[K];

export const useNuxtLtrl = <K extends LtrlKey>(key: K) => config[key];
