import { describe, it, expect } from "vitest";
import { defineLtrlEnum, isLtrlEnum, useLtrlEnum } from "../../src/recipes";

const _STRING_ENUM = {
  a: "A",
  b: "B",
  c: "C",
  d: "D",
};
const _NUMBER_ENUM = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
};
const _INVALID_ENUM = {
  one: "One",
  two: 2,
  three: true,
};

describe("ltrl enum typeguard", () => {
  it("determines if a value satisfies the enum template", () => {
    expect(isLtrlEnum(_STRING_ENUM)).toBe(true);
    expect(isLtrlEnum(_NUMBER_ENUM)).toBe(true);
  });
});

describe("ltrl enum config", () => {
  const _STRING_LTRL = defineLtrlEnum(_STRING_ENUM);
  const _NUMBER_LTRL = defineLtrlEnum(_NUMBER_ENUM);

  it("defines a readonly literal", () => {
    expect(_STRING_LTRL).toStrictEqual(_STRING_ENUM);
    expect(_NUMBER_LTRL).toStrictEqual(_NUMBER_ENUM);
    expect(Object.isFrozen(_STRING_LTRL)).toBe(true);
    expect(Object.isFrozen(_NUMBER_LTRL)).toBe(true);
  });

  it("throws an error w/ invalid config", () => {
    try {
      // @ts-expect-error testing invalid configuration
      defineLtrlEnum(_INVALID_ENUM);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});

describe("ltrl enum utils", () => {
  const _STRING_UTILS = useLtrlEnum(_STRING_ENUM);
  const _NUMBER_UTILS = useLtrlEnum(_NUMBER_ENUM);

  it("provides an enum", () => {
    expect(_STRING_UTILS.value).toEqual(_STRING_ENUM);
    expect(_NUMBER_UTILS.value).toEqual(_NUMBER_ENUM);
  });

  it("provides a list of enum keys", () => {
    _STRING_UTILS.keys.forEach((k) => {
      expect(k in _STRING_ENUM).toBe(true);
      expect(_STRING_ENUM[k]).toEqual(_STRING_UTILS.resolve(k));
    });
    _NUMBER_UTILS.keys.forEach((k) => {
      expect(k in _NUMBER_ENUM).toBe(true);
      expect(_NUMBER_ENUM[k]).toEqual(_NUMBER_UTILS.resolve(k));
    });
  });

  it("evaluates a potential enum key", () => {
    Object.keys(_STRING_ENUM).forEach((k) =>
      expect(_STRING_UTILS.evalKey(k)).toBe(true),
    );
    Object.keys(_NUMBER_ENUM).forEach((k) =>
      expect(_NUMBER_UTILS.evalKey(k)).toBe(true),
    );
  });

  it("evaluates a potential enum value", () => {
    _STRING_UTILS.keys.forEach((k) =>
      expect(_STRING_UTILS.eval(k, _STRING_ENUM[k])).toBe(true),
    );
    _NUMBER_UTILS.keys.forEach((k) =>
      expect(_NUMBER_UTILS.eval(k, _NUMBER_ENUM[k])).toBe(true),
    );
  });

  it("resolves a given enum key", () => {
    _STRING_UTILS.keys.forEach((k) =>
      expect(_STRING_UTILS.resolve(k)).toEqual(_STRING_ENUM[k]),
    );
    _NUMBER_UTILS.keys.forEach((k) =>
      expect(_NUMBER_UTILS.resolve(k)).toEqual(_NUMBER_ENUM[k]),
    );
  });
});
