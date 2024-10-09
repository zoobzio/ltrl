// @ts-ignore
import { nuxtLtrl } from "#build/ltrl.config.mjs";
import { useLtrl } from "ltrl";

const ltrl = useLtrl(nuxtLtrl);

export type LtrlConfig = {
  [K in keyof typeof ltrl]: (typeof ltrl)[K]["value"];
};
export type LtrlKey = keyof LtrlConfig;
export type LtrlValue<K extends LtrlKey> = LtrlConfig[K];

export const useNuxtLtrl = <K extends LtrlKey>(key: K) => ltrl[key];
