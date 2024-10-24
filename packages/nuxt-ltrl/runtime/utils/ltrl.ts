import {
  nuxtLtrlConstants,
  nuxtLtrlTuples,
  nuxtLtrlEnums,
  nuxtLtrlCongruents,
  // @ts-ignore
} from "#build/ltrl.config.mjs";
import { useLtrlConfig } from "ltrl/kit";

// ### Literals ###

const ltrlConstants = useLtrlConfig(nuxtLtrlConstants);
const ltrlTuples = useLtrlConfig(nuxtLtrlTuples);
const ltrlEnums = useLtrlConfig(nuxtLtrlEnums);
const ltrlCongruents = useLtrlConfig(nuxtLtrlCongruents);

// ### Types ###

type LtrlNever = "";

export type LtrlConstantConfig = typeof ltrlConstants;
export type LtrlTupleConfig = typeof ltrlTuples;
export type LtrlEnumConfig = typeof ltrlEnums;
export type LtrlCongruentConfig = typeof ltrlCongruents;

export type LtrlConstantKey = keyof LtrlConstantConfig extends string
  ? keyof LtrlConstantConfig
  : LtrlNever;
export type LtrlTupleKey = keyof LtrlTupleConfig extends string
  ? keyof LtrlTupleConfig
  : LtrlNever;
export type LtrlEnumKey = keyof LtrlEnumConfig extends string
  ? keyof LtrlEnumConfig
  : LtrlNever;
export type LtrlCongruentKey = keyof LtrlCongruentConfig extends string
  ? keyof LtrlCongruentConfig
  : LtrlNever;

export type LtrlConstant<K extends LtrlConstantKey> =
  LtrlConstantConfig[K]["value"];
export type LtrlTuple<K extends LtrlTupleKey> = LtrlTupleConfig[K]["value"];
export type LtrlEnum<K extends LtrlEnumKey> = LtrlEnumConfig[K]["value"];
export type LtrlCongruent<K extends LtrlCongruentKey> =
  LtrlCongruentConfig[K]["value"];

export type LtrlTupleItem<K extends LtrlTupleKey> = LtrlTuple<K>[number];
export type LtrlEnumItem<K extends LtrlEnumKey> = keyof LtrlEnum<K>;
export type LtrlCongruentItem<K extends LtrlCongruentKey> =
  LtrlCongruent<K>[number];

export type LtrlConfig = LtrlConstantConfig &
  LtrlTupleConfig &
  LtrlEnumConfig &
  LtrlCongruentConfig;

export type LtrlKey = Exclude<
  LtrlConstantKey | LtrlTupleKey | LtrlEnumKey | LtrlCongruentKey,
  LtrlNever
>;

export type LtrlValue<K extends LtrlKey> = LtrlConfig[K];

// ### Literal getters ###

export const useLtrlConstant = <K extends LtrlConstantKey>(
  key: K,
): LtrlConstantConfig[K] => ltrlConstants[key];

export const useLtrlTuple = <K extends LtrlTupleKey>(
  key: K,
): LtrlTupleConfig[K] => ltrlTuples[key];

export const useLtrlEnum = <K extends LtrlEnumKey>(key: K): LtrlEnumConfig[K] =>
  ltrlEnums[key];

export const useLtrlCongruent = <K extends LtrlCongruentKey>(
  key: K,
): LtrlCongruentConfig[K] => ltrlCongruents[key];

export const useNuxtLtrlConfig = () => ({
  ...ltrlConstants,
  ...ltrlTuples,
  ...ltrlEnums,
  ...ltrlCongruents,
});

// ### Generic getter w/ overloads ###

export function useNuxtLtrl<K extends LtrlConstantKey>(
  key: K,
): LtrlConstantConfig[K];
export function useNuxtLtrl<K extends LtrlTupleKey>(key: K): LtrlTupleConfig[K];
export function useNuxtLtrl<K extends LtrlEnumKey>(key: K): LtrlEnumConfig[K];
export function useNuxtLtrl<K extends LtrlCongruentKey>(
  key: K,
): LtrlCongruentConfig[K];

export function useNuxtLtrl<K extends LtrlKey>(key: K) {
  if (key in ltrlConstants) {
    return useLtrlConstant(key);
  }
  if (key in ltrlTuples) {
    return useLtrlTuple(key);
  }
  if (key in ltrlEnums) {
    return useLtrlEnum(key);
  }
  if (key in ltrlCongruents) {
    return useLtrlCongruent(key);
  }
  throw new Error("Invalid ltrl key!", {
    cause: key,
  });
}
