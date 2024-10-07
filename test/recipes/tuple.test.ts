import { describe, it, expect } from "vitest";
import { defineLtrlTuple, isLtrlTuple, useLtrlTuple } from "src/recipes";

const _STRING_TUPLE = ["a", "b", "C", "D"];
const _NUMBER_TUPLE = [1, 4, 6, 9];

const _INVALID_TUPLE = [1, "a", 15, true];

describe("ltrl tuple typeguard", () => {
  it("determines if a value satisfies the tuple template", () => {
    expect(isLtrlTuple(_STRING_TUPLE)).toBe(true);
    expect(isLtrlTuple(_NUMBER_TUPLE)).toBe(true);
  });
});

describe("ltrl tuple config", () => {
  const _STRING_LTRL = defineLtrlTuple(_STRING_TUPLE);
  const _NUMBER_LTRL = defineLtrlTuple(_NUMBER_TUPLE);

  it("defines a readonly literal", () => {
    expect(_STRING_LTRL).toStrictEqual(_STRING_TUPLE);
    expect(_NUMBER_LTRL).toStrictEqual(_NUMBER_TUPLE);
    expect(Object.isFrozen(_STRING_LTRL)).toBe(true);
    expect(Object.isFrozen(_NUMBER_LTRL)).toBe(true);
  });

  it("throws an error w/ invalid config", () => {
    try {
      // @ts-expect-error testing invalid configuration
      defineLtrlTuple(_INVALID_TUPLE);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});

describe("ltrl tuple utils", () => {
  const _STRING_UTILS = useLtrlTuple(_STRING_TUPLE);
  const _NUMBER_UTILS = useLtrlTuple(_NUMBER_TUPLE);

  it("provides a tuple", () => {
    expect(_STRING_UTILS.value).toEqual(_STRING_TUPLE);
    expect(_NUMBER_UTILS.value).toEqual(_NUMBER_TUPLE);
  });

  it("evaluates a potential tuple", () => {
    _STRING_TUPLE.forEach((o) => expect(_STRING_UTILS.eval(o)).toBe(true));
    _NUMBER_TUPLE.forEach((o) => expect(_NUMBER_UTILS.eval(o)).toBe(true));
  });
});
