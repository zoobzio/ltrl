import { describe, it, expect } from "vitest";
import {
  isLtrlCongruent,
  isLtrlConstant,
  isLtrlEnum,
  isLtrlTuple,
  ltrl,
} from "../src";
import type {
  LtrlConstantTemplate,
  LtrlTupleTemplate,
  LtrlEnumTemplate,
  LtrlCongruent,
  LtrlCongruentTemplate,
  LtrlConfigTemplate,
  useLtrlConstant,
  useLtrlTuple,
  useLtrlEnum,
  useLtrlCongruent,
  useLtrlConfig,
} from "../src";
import constantCases from "./case/constant";
import tupleCases from "./case/tuple";
import enumCases from "./case/enum";
import congruentCases from "./case/congruent";
import invalidCases from "./case/invalid";
import config from "./case/config";

function testLtrlConstant(
  template: LtrlConstantTemplate,
  ltrlConstant: ReturnType<typeof useLtrlConstant>,
) {
  expect(ltrlConstant.value).toStrictEqual(template);
  expect(Object.isFrozen(ltrlConstant.value)).toBe(true);
  expect(ltrlConstant.clone()).toStrictEqual(template);
  expect(ltrlConstant.eval(template)).toBe(true);
}

function testLtrlTuple(
  template: LtrlTupleTemplate,
  ltrlTuple: ReturnType<typeof useLtrlTuple>,
) {
  expect(ltrlTuple.value).toStrictEqual(template);
  expect(Object.isFrozen(ltrlTuple.value)).toBe(true);
  expect(ltrlTuple.clone()).toStrictEqual(template);
  template.forEach((t) => expect(ltrlTuple.eval(t)).toBe(true));
}

function testLtrlEnum(
  template: LtrlEnumTemplate,
  ltrlEnum: ReturnType<typeof useLtrlEnum>,
) {
  expect(ltrlEnum.value).toStrictEqual(template);
  expect(Object.isFrozen(ltrlEnum.value)).toBe(true);
  expect(ltrlEnum.keys()).toStrictEqual(Object.keys(template));
  ltrlEnum.keys().forEach((k) => {
    expect(ltrlEnum.eval(k, template[k])).toBe(true);
    expect(ltrlEnum.resolve(k)).toStrictEqual(template[k]);
  });
  Object.keys(template).forEach((k) => expect(ltrlEnum.evalKey(k)).toBe(true));
  expect(ltrlEnum.clone()).toStrictEqual(template);
}

function testLtrlCongruent<S extends LtrlCongruentTemplate>(
  template: [S, ...LtrlCongruent<S>[]],
  ltrlCongruent: ReturnType<typeof useLtrlCongruent>,
) {
  expect(ltrlCongruent.value).toStrictEqual(template);
  expect(Object.isFrozen(ltrlCongruent.value)).toBe(true);
  expect(ltrlCongruent.keys()).toStrictEqual(template.map((c) => c.key));
  ltrlCongruent.keys().forEach((k, i) => {
    expect(ltrlCongruent.eval(template[i])).toBe(true);
    expect(ltrlCongruent.resolve(k)).toStrictEqual(template[i]);
  });
  template
    .map((c) => c.key)
    .forEach((k) => expect(ltrlCongruent.evalKey(k)).toBe(true));
  expect(ltrlCongruent.clone()).toStrictEqual(template);
}

function testLtrlConfig(
  template: LtrlConfigTemplate,
  configLtrl: ReturnType<typeof useLtrlConfig>,
) {
  Object.keys(template).forEach((k) => {
    if (isLtrlConstant(template[k])) {
      testLtrlConstant(template[k], configLtrl[k]);
    } else if (isLtrlTuple(template[k])) {
      testLtrlTuple(template[k], configLtrl[k]);
    } else if (isLtrlEnum(template[k])) {
      testLtrlEnum(template[k], configLtrl[k]);
    } else if (isLtrlCongruent(template[k])) {
      testLtrlCongruent(template[k], configLtrl[k]);
    }
  });
}

function testLtrlInvalid(template: unknown) {
  let valid = true;
  try {
    // @ts-expect-error testing for errors
    ltrl(template);
  } catch (err) {
    valid = false;
    expect(err).toBeInstanceOf(Error);
  }
  expect(valid).toBe(false);
}

describe("ltrl", () => {
  it("creates ltrl constants", () =>
    constantCases.forEach((c) => testLtrlConstant(c, ltrl(c))));
  it("creates ltrl tuples", () =>
    tupleCases.forEach((c) => testLtrlTuple(c, ltrl(c))));
  it("creates ltrl enums", () =>
    // @ts-expect-error proper types cannot be inferred here
    enumCases.forEach((c) => testLtrlEnum(c, ltrl(c))));
  it("creates ltrl congruents", () =>
    // @ts-expect-error proper types cannot be inferred here
    congruentCases.forEach((c) => testLtrlCongruent(c, ltrl(c))));
  it("creates ltrl configs", () =>
    // @ts-expect-error proper types cannot be inferred here
    config.forEach((c) => testLtrlConfig(c, ltrl(c))));
  it("throws error for invalid ltrls", () =>
    invalidCases.forEach(testLtrlInvalid));
});
