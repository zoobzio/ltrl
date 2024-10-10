import { describe, it, expect } from "vitest";
import {
  defineLtrlCongruent,
  isLtrlCongruent,
  useLtrlCongruent,
} from "../../src/recipes";

const _STRING_CONGRUENT = {
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
};

const _NUMBER_CONGRUENT = {
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
};

const _OBJECT_CONGRUENT = {
  schema: {
    key: "string",
    label: "string",
    foo: 123,
    bar: true,
  },
  records: [
    {
      key: "a",
      label: "A",
      foo: 321,
      bar: true,
    },
    {
      key: "b",
      label: "B",
      foo: 789,
      bar: false,
    },
  ],
};

const _INVALID_CONGRUENT = {
  schema: "banana",
  records: [
    {
      key: 1,
      label: "ONE",
      lemon: false,
    },
    {
      key: "b",
      label: "B",
    },
  ],
};

describe("ltrl congruent typeguard", () => {
  it("determines if a value satisfies the congruent template", () => {
    expect(isLtrlCongruent(_STRING_CONGRUENT)).toBe(true);
    expect(isLtrlCongruent(_NUMBER_CONGRUENT)).toBe(true);
    expect(isLtrlCongruent(_OBJECT_CONGRUENT)).toBe(true);
    expect(isLtrlCongruent(_INVALID_CONGRUENT)).toBe(false);
    expect(isLtrlCongruent(null)).toBe(false);
  });
});

describe("ltrl congruent config", () => {
  const _STRING_LTRL = defineLtrlCongruent(_STRING_CONGRUENT);
  const _NUMBER_LTRL = defineLtrlCongruent(_NUMBER_CONGRUENT);
  const _OBJECT_LTRL = defineLtrlCongruent(_OBJECT_CONGRUENT);

  it("defines a readonly literal", () => {
    expect(_STRING_LTRL).toStrictEqual(_STRING_CONGRUENT);
    expect(_NUMBER_LTRL).toStrictEqual(_NUMBER_CONGRUENT);
    expect(_OBJECT_CONGRUENT).toStrictEqual(_OBJECT_CONGRUENT);
    expect(Object.isFrozen(_STRING_LTRL.records)).toBe(true);
    expect(Object.isFrozen(_NUMBER_LTRL.records)).toBe(true);
    expect(Object.isFrozen(_OBJECT_LTRL.records)).toBe(true);
  });

  it("throws an error w/ invalid config", () => {
    try {
      // @ts-expect-error testing invalid configuration
      defineLtrlCongruent(_INVALID_CONGRUENT);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});

describe("ltrl congruent utils", () => {
  const _STRING_UTILS = useLtrlCongruent(_STRING_CONGRUENT);
  const _NUMBER_UTILS = useLtrlCongruent(_NUMBER_CONGRUENT);
  const _OBJECT_UTILS = useLtrlCongruent(_OBJECT_CONGRUENT);

  it("provides an congruent", () => {
    expect(_STRING_UTILS.value).toEqual(_STRING_CONGRUENT.records);
    expect(_NUMBER_UTILS.value).toEqual(_NUMBER_CONGRUENT.records);
    expect(_OBJECT_UTILS.value).toEqual(_OBJECT_CONGRUENT.records);
  });

  it("provides a list of congruent keys", () => {
    _STRING_UTILS.keys().forEach((k) => {
      expect(_STRING_CONGRUENT.records.find((r) => r.key === k)).toBeTruthy();
    });
    _NUMBER_UTILS.keys().forEach((k) => {
      expect(_NUMBER_CONGRUENT.records.find((r) => r.key === k)).toBeTruthy();
    });
    _OBJECT_UTILS.keys().forEach((k) => {
      expect(_OBJECT_CONGRUENT.records.find((r) => r.key === k)).toBeTruthy();
    });
  });

  it("evaluates a potential congruent key", () => {
    _STRING_CONGRUENT.records
      .map((r) => r.key)
      .forEach((k) => expect(_STRING_UTILS.evalKey(k)).toBe(true));
    _NUMBER_CONGRUENT.records
      .map((r) => r.key)
      .forEach((k) => expect(_NUMBER_UTILS.evalKey(k)).toBe(true));
  });

  it("evaluates a potential congruent value", () => {
    _STRING_CONGRUENT.records.forEach((k) =>
      expect(_STRING_UTILS.eval(k)).toBe(true),
    );
    _NUMBER_CONGRUENT.records.forEach((k) =>
      expect(_NUMBER_UTILS.eval(k)).toBe(true),
    );
  });

  it("clones an congruent", () => {
    const stringClone = _STRING_UTILS.clone();
    const numberClone = _NUMBER_UTILS.clone();
    const objectClone = _OBJECT_UTILS.clone();

    expect(stringClone).toStrictEqual(_STRING_CONGRUENT.records);
    expect(numberClone).toStrictEqual(_NUMBER_CONGRUENT.records);
    expect(objectClone).toStrictEqual(_OBJECT_CONGRUENT.records);

    expect(Object.isFrozen(stringClone)).toBe(false);
    expect(Object.isFrozen(numberClone)).toBe(false);
    expect(Object.isFrozen(objectClone)).toBe(false);
  });

  it("resolves a given congruent key", () => {
    _STRING_UTILS
      .keys()
      .forEach((k, i) =>
        expect(_STRING_UTILS.resolve(k)).toEqual(_STRING_CONGRUENT.records[i]),
      );
    _NUMBER_UTILS
      .keys()
      .forEach((k, i) =>
        expect(_NUMBER_UTILS.resolve(k)).toEqual(_NUMBER_CONGRUENT.records[i]),
      );
    _OBJECT_UTILS
      .keys()
      .forEach((k, i) =>
        expect(_OBJECT_UTILS.resolve(k)).toEqual(_OBJECT_CONGRUENT.records[i]),
      );
  });
});
