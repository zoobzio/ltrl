import { describe, it, expect } from "vitest";
import {
  defineLtrlKeyLabel,
  isLtrlKeyLabel,
  useLtrlKeyLabel,
} from "src/recipes";

const _STRING_KEYLABEL = [
  {
    key: "a",
    label: "A",
  },
  {
    key: "b",
    label: "B",
  },
];
const _NUMBER_KEYLABEL = [
  {
    key: 1,
    label: "One",
  },
  {
    key: 2,
    label: "Two",
  },
  {
    key: 3,
    label: "Three",
  },
];
const _INVALID_KEYLABEL = [
  {
    key: "a",
    label: "A",
  },
  {
    key: 2,
    label: "Two",
  },
  {
    key: 3,
    label: "Three",
  },
];

describe("ltrl key-label typeguard", () => {
  it("determines if a value satisfies the key-label template", () => {
    expect(isLtrlKeyLabel(_STRING_KEYLABEL)).toBe(true);
    expect(isLtrlKeyLabel(_NUMBER_KEYLABEL)).toBe(true);
  });
});

describe("ltrl key-label config", () => {
  const _STRING_LTRL = defineLtrlKeyLabel(_STRING_KEYLABEL);
  const _NUMBER_LTRL = defineLtrlKeyLabel(_NUMBER_KEYLABEL);

  it("defines a readonly literal", () => {
    expect(_STRING_LTRL).toStrictEqual(_STRING_KEYLABEL);
    expect(_NUMBER_LTRL).toStrictEqual(_NUMBER_KEYLABEL);
    expect(Object.isFrozen(_STRING_LTRL)).toBe(true);
    expect(Object.isFrozen(_NUMBER_LTRL)).toBe(true);
  });

  it("throws an error w/ invalid config", () => {
    try {
      // @ts-expect-error testing invalid configuration
      defineLtrlKeyLabel(_INVALID_KEYLABEL);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});

describe("ltrl key-label utils", () => {
  const _STRING_UTILS = useLtrlKeyLabel(_STRING_KEYLABEL);
  const _NUMBER_UTILS = useLtrlKeyLabel(_NUMBER_KEYLABEL);

  it("provides an key-label", () => {
    expect(_STRING_UTILS.value).toEqual(_STRING_KEYLABEL);
    expect(_NUMBER_UTILS.value).toEqual(_NUMBER_KEYLABEL);
  });

  it("provides a list of key-label keys", () => {
    _STRING_UTILS.keys.forEach((k) => {
      expect(_STRING_KEYLABEL.find((s) => s.key === k)).toBeTruthy();
    });
    _NUMBER_UTILS.keys.forEach((k) => {
      expect(_NUMBER_KEYLABEL.find((s) => s.key === k)).toBeTruthy();
    });
  });

  it("evaluates a potential key-label key", () => {
    _STRING_KEYLABEL
      .map((s) => s.key)
      .forEach((k) => expect(_STRING_UTILS.evalKey(k)).toBe(true));
    _NUMBER_KEYLABEL
      .map((s) => s.key)
      .forEach((k) => expect(_NUMBER_UTILS.evalKey(k)).toBe(true));
  });

  it("evaluates a potential key-label value", () => {
    _STRING_KEYLABEL.forEach((k) => expect(_STRING_UTILS.eval(k)).toBe(true));
    _NUMBER_KEYLABEL.forEach((k) => expect(_NUMBER_UTILS.eval(k)).toBe(true));
  });

  it("resolves a given key-label key", () => {
    _STRING_KEYLABEL.forEach((k) =>
      expect(_STRING_UTILS.resolve(k.key)).toStrictEqual(k),
    );
    _NUMBER_KEYLABEL.forEach((k) =>
      expect(_NUMBER_UTILS.resolve(k.key)).toStrictEqual(k),
    );
  });
});
