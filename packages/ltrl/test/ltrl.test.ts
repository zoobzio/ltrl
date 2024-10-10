import { describe, it, expect } from "vitest";
import { ltrl } from "../src";

const _CONSTANT = "banana";

const _TUPLE = [1, 2, 3, 4];

const _ENUM = {
  a: "A",
  b: "B",
  c: "C",
};

const _CONGRUENT = {
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
    {
      key: "c",
      label: "C",
    },
  ],
};

const _CONFIG = {
  example: _CONSTANT,
  numbers: _TUPLE,
  letters: _ENUM,
  options: _CONGRUENT,
};

const _INVALID = ["a", 2, { foo: false }];

function testLtrlConstant(
  item: typeof _CONSTANT extends string
    ? string
    : typeof _CONSTANT extends number
      ? number
      : typeof _CONSTANT extends boolean
        ? boolean
        : never,
) {
  const ltrlConstant = ltrl(item);

  expect(ltrlConstant.value).toStrictEqual(_CONSTANT);
  expect(Object.isFrozen(ltrlConstant.value)).toBe(true);

  expect(ltrlConstant.clone()).toStrictEqual(_CONSTANT);

  expect(ltrlConstant.eval(_CONSTANT)).toBe(true);
}

function testLtrlTuple(item: typeof _TUPLE) {
  const ltrlTuple = ltrl(item);

  expect(ltrlTuple.value).toStrictEqual(_TUPLE);
  expect(Object.isFrozen(ltrlTuple.value)).toBe(true);

  expect(ltrlTuple.clone()).toStrictEqual(_TUPLE);

  _TUPLE.forEach((t) => expect(ltrlTuple.eval(t)).toBe(true));
}

function testLtrlEnum(item: typeof _ENUM) {
  const ltrlEnum = ltrl(item);

  expect(ltrlEnum.value).toStrictEqual(_ENUM);
  expect(Object.isFrozen(ltrlEnum.value)).toBe(true);

  expect(ltrlEnum.keys()).toStrictEqual(Object.keys(_ENUM));

  ltrlEnum.keys().forEach((k) => {
    expect(ltrlEnum.eval(k, _ENUM[k])).toBe(true);
    expect(ltrlEnum.resolve(k)).toStrictEqual(_ENUM[k]);
  });

  Object.keys(_ENUM).forEach((k) => expect(ltrlEnum.evalKey(k)).toBe(true));

  expect(ltrlEnum.clone()).toStrictEqual(_ENUM);
}

function testLtrlCongruent(item: typeof _CONGRUENT) {
  const ltrlCongruent = ltrl(item);

  expect(ltrlCongruent.value).toStrictEqual(_CONGRUENT.records);
  expect(Object.isFrozen(ltrlCongruent.value)).toBe(true);

  expect(ltrlCongruent.keys()).toStrictEqual(
    _CONGRUENT.records.map((c) => c.key),
  );

  ltrlCongruent.keys().forEach((k, i) => {
    expect(ltrlCongruent.eval(_CONGRUENT.records[i])).toBe(true);
    expect(ltrlCongruent.resolve(k)).toStrictEqual(_CONGRUENT.records[i]);
  });

  _CONGRUENT.records
    .map((c) => c.key)
    .forEach((k) => expect(ltrlCongruent.evalKey(k)).toBe(true));

  expect(ltrlCongruent.clone()).toStrictEqual(_CONGRUENT.records);
}

describe("ltrl", () => {
  it("creates a 'constant' ltrl", () => testLtrlConstant(_CONSTANT));
  it("creates a 'tuple' ltrl", () => testLtrlTuple(_TUPLE));
  it("creates a 'enum' ltrl", () => testLtrlEnum(_ENUM));
  it("creates a 'congruent' ltrl", () => testLtrlCongruent(_CONGRUENT));

  it("creates a 'config' ltrl", () => {
    testLtrlConstant(_CONFIG.example);
    testLtrlTuple(_CONFIG.numbers);
    testLtrlEnum(_CONFIG.letters);
    testLtrlCongruent(_CONFIG.options);
  });

  it("throws an error w/ invalid ltrl", () => {
    try {
      // @ts-expect-error testing for errors
      ltrl(_INVALID);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
