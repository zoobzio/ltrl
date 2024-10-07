import { describe, it, expect } from "vitest";
import {
  defineLtrlConstant,
  isLtrlConstant,
  useLtrlConstant,
} from "src/recipes";

const _STRING_CONSTANT = "test_value";
const _NUMBER_CONSTANT = 77;
const _BOOLEAN_CONSTANT = false;
const _INVALID_CONSTANT = ["fake"];

describe("ltrl constant typeguard", () => {
  it("determines if a value satisfies the constant template", () => {
    expect(isLtrlConstant(_STRING_CONSTANT)).toBe(true);
    expect(isLtrlConstant(_NUMBER_CONSTANT)).toBe(true);
    expect(isLtrlConstant(_BOOLEAN_CONSTANT)).toBe(true);
  });
});

describe("ltrl constant config", () => {
  const _STRING_LTRL = defineLtrlConstant(_STRING_CONSTANT);
  const _NUMBER_LTRL = defineLtrlConstant(_NUMBER_CONSTANT);
  const _BOOLEAN_LTRL = defineLtrlConstant(_BOOLEAN_CONSTANT);
  it("defines a readonly literal", () => {
    expect(_STRING_LTRL).toStrictEqual(_STRING_CONSTANT);
    expect(_NUMBER_LTRL).toStrictEqual(_NUMBER_CONSTANT);
    expect(_BOOLEAN_LTRL).toStrictEqual(_BOOLEAN_CONSTANT);
    expect(Object.isFrozen(_STRING_LTRL)).toBe(true);
    expect(Object.isFrozen(_NUMBER_LTRL)).toBe(true);
    expect(Object.isFrozen(_BOOLEAN_LTRL)).toBe(true);
  });

  it("throws an error w/ invalid config", () => {
    try {
      // @ts-expect-error testing invalid configuration
      defineLtrlConstant(_INVALID_CONSTANT);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});

describe("ltrl constant utils", () => {
  const _STRING_UTILS = useLtrlConstant(_STRING_CONSTANT);
  const _NUMBER_UTILS = useLtrlConstant(_NUMBER_CONSTANT);
  const _BOOLEAN_UTILS = useLtrlConstant(_BOOLEAN_CONSTANT);

  it("provides a constant", () => {
    expect(_STRING_UTILS.value).toEqual(_STRING_CONSTANT);
    expect(_NUMBER_UTILS.value).toEqual(_NUMBER_CONSTANT);
    expect(_BOOLEAN_UTILS.value).toEqual(_BOOLEAN_CONSTANT);
  });

  it("evaluates a potential constant", () => {
    expect(_STRING_UTILS.eval(_STRING_CONSTANT)).toBe(true);
    expect(_NUMBER_UTILS.eval(_NUMBER_CONSTANT)).toBe(true);
    expect(_BOOLEAN_UTILS.eval(_BOOLEAN_CONSTANT)).toBe(true);
  });
});
