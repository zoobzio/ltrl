import {
  nuxtLtrlConstants,
  nuxtLtrlTuples,
  nuxtLtrlEnums,
  nuxtLtrlCongruents,
  // @ts-ignore
} from "#build/ltrl.config.mjs";
import { ltrl } from "ltrl";

const ltrlConstants = ltrl(nuxtLtrlConstants);
const ltrlTuples = ltrl(nuxtLtrlTuples);
const ltrlEnums = ltrl(nuxtLtrlEnums);
const ltrlCongruents = ltrl(nuxtLtrlCongruents);

export type LtrlConstantConfig = {
  [K in keyof typeof ltrlConstants]: (typeof ltrlConstants)[K]["value"];
};

export type LtrlTupleConfig = {
  [K in keyof typeof ltrlTuples]: (typeof ltrlTuples)[K]["value"];
};

export type LtrlEnumConfig = {
  [K in keyof typeof ltrlEnums]: (typeof ltrlEnums)[K]["value"];
};

export type LtrlCongruentConfig = {
  [K in keyof typeof ltrlCongruents]: (typeof ltrlCongruents)[K]["value"];
};

export type LtrlConstantKey = keyof LtrlConstantConfig;
export type LtrlTupleKey = keyof LtrlTupleConfig;
export type LtrlEnumKey = keyof LtrlEnumConfig;
export type LtrlCongruentKey = keyof LtrlCongruentConfig;

export type LtrlConstant<K extends LtrlConstantKey> = LtrlConstantConfig[K];
export type LtrlTuple<K extends LtrlTupleKey> = LtrlTupleConfig[K];
export type LtrlEnum<K extends LtrlEnumKey> = LtrlEnumConfig[K];
export type LtrlCongruent<K extends LtrlCongruentKey> = LtrlCongruentConfig[K];

export type LtrlTupleItem<K extends LtrlTupleKey> = LtrlTuple<K>[number];
export type LtrlEnumItem<K extends LtrlEnumKey> = keyof LtrlEnum<K>;
export type LtrlCongruentItem<K extends LtrlCongruentKey> =
  LtrlCongruent<K>[number];

export type LtrlConfig = LtrlConstantConfig &
  LtrlTupleConfig &
  LtrlEnumConfig &
  LtrlCongruentConfig;

export type LtrlKey =
  | LtrlConstantKey
  | LtrlTupleKey
  | LtrlEnumKey
  | LtrlCongruentKey;

export type LtrlValue<K extends LtrlKey> = LtrlConfig[K];

export type NuxtLtrl<K extends LtrlKey> = K extends LtrlConstantKey
  ? LtrlConstant<K>
  : K extends LtrlTupleKey
    ? LtrlTuple<K>
    : K extends LtrlEnumKey
      ? LtrlEnum<K>
      : K extends LtrlCongruentKey
        ? LtrlCongruent<K>
        : never;

export const useNuxtConstant = (key: LtrlConstantKey) => ltrlConstants[key];
export const useNuxtTuple = (key: LtrlTupleKey) => ltrlTuples[key];
export const useNuxtEnum = (key: LtrlEnumKey) => ltrlEnums[key];
export const useNuxtCongruent = (key: LtrlCongruentKey) => ltrlCongruents[key];

export const useNuxtLtrlConfig = () => ({
  ...ltrlConstants,
  ...ltrlTuples,
  ...ltrlEnums,
  ...ltrlCongruents,
});

// nuxt config is defined as a flat object, duplicate keys not possible @ runtime
export const useNuxtLtrl = <K extends LtrlKey>(key: K): NuxtLtrl<K> => {
  if (key in ltrlConstants) {
    return useNuxtConstant(key);
  } else if (key in ltrlTuples) {
    return useNuxtTuple(key);
  } else if (key in ltrlEnums) {
    return useNuxtEnum(key);
  } else if (key in ltrlCongruents) {
    return useNuxtCongruent(key);
  }
  throw new Error("Invalid ltrl key!", {
    cause: key,
  });
};
