import type {
  LtrlConstantTemplate,
  LtrlConstantUtils,
  LtrlTupleTemplate,
  LtrlTupleUtils,
  LtrlEnumTemplate,
  LtrlEnumUtils,
  LtrlCongruentTemplate,
  LtrlCongruent,
  LtrlCongruentUtils,
  LtrlConfigTemplate,
  LtrlConfigUtils,
  LtrlConfig,
} from "./kit";
import {
  useLtrlConstant,
  isLtrlConstant,
  isLtrlTuple,
  useLtrlTuple,
  isLtrlEnum,
  useLtrlEnum,
  isLtrlCongruent,
  useLtrlCongruent,
  isLtrlConfig,
  useLtrlConfig,
} from "./kit";

export function ltrl<const T extends LtrlConstantTemplate>(
  template: T,
): LtrlConstantUtils<T>;

export function ltrl<const T extends LtrlTupleTemplate>(
  template: T,
): LtrlTupleUtils<T>;

export function ltrl<const T extends LtrlEnumTemplate>(
  template: T,
): LtrlEnumUtils<T>;

export function ltrl<
  const T extends LtrlCongruentTemplate,
  const R extends LtrlCongruent<T>[],
>(template: [T, ...R]): LtrlCongruentUtils<T, R>;

export function ltrl<const T extends LtrlConfigTemplate>(
  template: LtrlConfig<T>,
): LtrlConfigUtils<T>;

export function ltrl<const T>(template: T) {
  if (isLtrlConstant(template)) {
    return useLtrlConstant(template);
  }
  if (isLtrlTuple(template)) {
    return useLtrlTuple(template);
  }
  if (isLtrlEnum(template)) {
    return useLtrlEnum(template);
  }
  if (isLtrlCongruent(template)) {
    return useLtrlCongruent(template);
  }
  if (isLtrlConfig(template)) {
    return useLtrlConfig(template);
  }
  throw new Error("Invalid ltrl template!", {
    cause: template,
  });
}
