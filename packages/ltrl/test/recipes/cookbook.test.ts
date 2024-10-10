import { isLtrlRecipe, useLtrlRecipe } from "../../src";
import { describe, expect, it } from "vitest";

const _RECIPE_CONSTANT = "testing";
const _RECIPE_TUPLE = [1, 2, 3, 4];
const _RECIPE_ENUM = {
  a: "A",
  b: "B",
  c: "C",
};
const _RECIPE_CONGRUENT = {
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
const _RECIPE_INVALID = ["a", 2, false];

describe("ltrl recipe typeguard", () => {
  it("determines if a value satisfies a recipe template", () => {
    expect(isLtrlRecipe(_RECIPE_CONSTANT)).toBe(true);
    expect(isLtrlRecipe(_RECIPE_TUPLE)).toBe(true);
    expect(isLtrlRecipe(_RECIPE_ENUM)).toBe(true);
    expect(isLtrlRecipe(_RECIPE_CONGRUENT)).toBe(true);
    expect(isLtrlRecipe(_RECIPE_INVALID)).toBe(false);
  });
});

describe("ltrl recipe utils", () => {
  const ltrlConstant = useLtrlRecipe(_RECIPE_CONSTANT);
  const ltrlTuple = useLtrlRecipe(_RECIPE_TUPLE);
  const ltrlEnum = useLtrlRecipe(_RECIPE_ENUM);
  const ltrlCongruent = useLtrlRecipe(_RECIPE_CONGRUENT);

  it("provides a ltrl", () => {
    expect(ltrlConstant.value).toBe(_RECIPE_CONSTANT);
    expect(ltrlTuple.value).toBe(_RECIPE_TUPLE);
    expect(ltrlEnum.value).toBe(_RECIPE_ENUM);
    expect(ltrlCongruent.value).toBe(_RECIPE_CONGRUENT.records);
  });

  it("throws an error w/ invalid ltrl", () => {
    try {
      // @ts-expect-error testing for errors
      useLtrlRecipe(_RECIPE_INVALID);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
