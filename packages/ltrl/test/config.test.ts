import { describe, it, expect } from "vitest";
import { defineLtrlConfig, isLtrlConfig, useLtrlConfig } from "../src/config";

const _LTRL = {
  string: "banana",
  number: 777,
  boolean: false,
  stringTuple: ["a", "b", "c"],
  numberTuple: [1, 2, 3, 4],
  stringEnum: {
    a: "A",
    b: "B",
    c: "C",
  },
  numberEnum: {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
  },
  stringCongruent: {
    schema: "stringKeyLabel" as const,
    records: [
      {
        key: "a",
        label: "A",
      },
      {
        key: "b",
        label: "B",
      },
    ],
  },
  numberCongruent: {
    schema: "numberKeyLabel" as const,
    records: [
      {
        key: 1,
        label: "ONE",
      },
      {
        key: 2,
        label: "TWO",
      },
      {
        key: 3,
        label: "THREE",
      },
    ],
  },
};

const _INVALID_LTRL = {
  stringTuple: ["a", 3, "c"],
  numberTuple: [1, "four", 3, 4],
  stringEnum: {
    a: "A",
    b: "B",
    c: 13,
  },
  numberEnum: {
    one: 1,
    two: "Two",
    three: 3,
    four: "Four",
  },
};

describe("ltrl typeguard", () => {
  it("determines if a value satisfies the ltrl template", () => {
    expect(isLtrlConfig(_LTRL)).toBe(true);
  });
});

describe("ltrl config", () => {
  const _LTRL_LTRL = defineLtrlConfig(_LTRL);

  it("defines a readonly literal config", () => {
    expect(_LTRL_LTRL).toStrictEqual(_LTRL);
    expect(Object.isFrozen(_LTRL_LTRL)).toBe(true);
  });

  it("throws an error w/ invalid config", () => {
    try {
      // @ts-expect-error testing invalid configuration
      defineLtrlConfig(_INVALID_LTRL);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});

describe("ltrl utils", () => {
  const _LTRL_UTILS = useLtrlConfig(_LTRL);
  const properties = {
    constant: ["value", "eval", "clone"],
    tuple: ["value", "eval", "clone"],
    enum: ["value", "keys", "eval", "evalKey", "clone", "resolve"],
    congruent: ["value", "keys", "eval", "evalKey", "clone", "resolve"],
  };

  it("applies ltrl recipe based on type", () => {
    expect(Object.keys(_LTRL_UTILS.string)).toStrictEqual(properties.constant);
    expect(Object.keys(_LTRL_UTILS.number)).toStrictEqual(properties.constant);
    expect(Object.keys(_LTRL_UTILS.boolean)).toStrictEqual(properties.constant);

    expect(Object.keys(_LTRL_UTILS.stringTuple)).toStrictEqual(
      properties.tuple,
    );
    expect(Object.keys(_LTRL_UTILS.numberTuple)).toStrictEqual(
      properties.tuple,
    );

    expect(Object.keys(_LTRL_UTILS.stringEnum)).toStrictEqual(properties.enum);
    expect(Object.keys(_LTRL_UTILS.numberEnum)).toStrictEqual(properties.enum);

    expect(Object.keys(_LTRL_UTILS.stringCongruent)).toStrictEqual(
      properties.congruent,
    );
    expect(Object.keys(_LTRL_UTILS.numberCongruent)).toStrictEqual(
      properties.congruent,
    );
  });
});
