import { describe, it, expect } from "vitest";
import { ltrl } from "../src";

describe("ltrl constants", () => {
  it("creates a string constant", () => {
    const c = ltrl("hello");
    expect(c.value).toBe("hello");
    expect(Object.isFrozen(c.value)).toBe(true);
    expect(c.eval("hello")).toBe(true);
    expect(c.eval("world")).toBe(false);
    expect(c.clone()).toBe("hello");
  });

  it("creates a number constant", () => {
    const c = ltrl(42);
    expect(c.value).toBe(42);
    expect(c.eval(42)).toBe(true);
    expect(c.eval(0)).toBe(false);
    expect(c.clone()).toBe(42);
  });

  it("creates a boolean constant", () => {
    const c = ltrl(true);
    expect(c.value).toBe(true);
    expect(c.eval(true)).toBe(true);
    expect(c.eval(false)).toBe(false);
    expect(c.clone()).toBe(true);
  });

  it("creates a negative number constant", () => {
    const c = ltrl(-14124);
    expect(c.value).toBe(-14124);
    expect(c.eval(-14124)).toBe(true);
    expect(c.eval(14124)).toBe(false);
  });

  it("creates a decimal number constant", () => {
    const c = ltrl(123.124);
    expect(c.value).toBe(123.124);
    expect(c.eval(123.124)).toBe(true);
  });
});

describe("ltrl tuples", () => {
  it("creates a string tuple", () => {
    const t = ltrl(["a", "b", "c", "d"]);
    expect(t.value).toStrictEqual(["a", "b", "c", "d"]);
    expect(Object.isFrozen(t.value)).toBe(true);
    expect(t.eval("a")).toBe(true);
    expect(t.eval("z")).toBe(false);
    expect(t.clone()).toStrictEqual(["a", "b", "c", "d"]);
  });

  it("creates a number tuple", () => {
    const t = ltrl([1, 2, 3, 4, 5, 6]);
    expect(t.value).toStrictEqual([1, 2, 3, 4, 5, 6]);
    expect(t.eval(1)).toBe(true);
    expect(t.eval(99)).toBe(false);
    expect(t.clone()).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });

  it("creates a negative number tuple", () => {
    const t = ltrl([-1, -2, -3, -4, -5, -6]);
    expect(t.value).toStrictEqual([-1, -2, -3, -4, -5, -6]);
    expect(t.eval(-1)).toBe(true);
    expect(t.eval(1)).toBe(false);
  });

  it("creates a string tuple with semantic values", () => {
    const t = ltrl(["GET", "PUT", "POST", "DELETE"]);
    expect(t.value).toStrictEqual(["GET", "PUT", "POST", "DELETE"]);
    expect(t.eval("GET")).toBe(true);
    expect(t.eval("PATCH")).toBe(false);
  });
});

describe("ltrl enums", () => {
  it("creates a string-value enum", () => {
    const e = ltrl({ a: "A", b: "B", c: "C", d: "D" });
    expect(e.value).toStrictEqual({ a: "A", b: "B", c: "C", d: "D" });
    expect(Object.isFrozen(e.value)).toBe(true);
    expect(e.evalKey("a")).toBe(true);
    expect(e.evalKey("z")).toBe(false);
    expect(e.eval("a", "A")).toBe(true);
    expect(e.eval("a", "B")).toBe(false);
    expect(e.resolve("a")).toBe("A");
    expect(e.keys()).toStrictEqual(["a", "b", "c", "d"]);
    expect(e.clone()).toStrictEqual({ a: "A", b: "B", c: "C", d: "D" });
  });

  it("creates a number-value enum", () => {
    const e = ltrl({ one: 1, two: 2, three: 3 });
    expect(e.value).toStrictEqual({ one: 1, two: 2, three: 3 });
    expect(e.evalKey("one")).toBe(true);
    expect(e.eval("one", 1)).toBe(true);
    expect(e.eval("one", 2)).toBe(false);
    expect(e.resolve("two")).toBe(2);
    expect(e.keys()).toStrictEqual(["one", "two", "three"]);
  });

  it("creates a number-key string-value enum", () => {
    const e = ltrl({ 100: "CONTINUE", 200: "OK", 404: "NOT_FOUND" });
    expect(e.value).toStrictEqual({
      100: "CONTINUE",
      200: "OK",
      404: "NOT_FOUND",
    });
    expect(e.evalKey(100)).toBe(true);
    expect(e.evalKey(999)).toBe(false);
    expect(e.resolve(200)).toBe("OK");
    expect(e.eval(404, "NOT_FOUND")).toBe(true);
  });

  it("creates a number-key number-value enum", () => {
    const e = ltrl({ 1: 100, 2: 200, 3: 300 });
    expect(e.value).toStrictEqual({ 1: 100, 2: 200, 3: 300 });
    expect(e.evalKey(1)).toBe(true);
    expect(e.resolve(2)).toBe(200);
  });

  it("creates an enum with negative values", () => {
    const e = ltrl({ foo: -1, bar: -2, baz: -3, qux: -437 });
    expect(e.value).toStrictEqual({ foo: -1, bar: -2, baz: -3, qux: -437 });
    expect(e.resolve("qux")).toBe(-437);
  });
});

describe("ltrl congruents", () => {
  it("creates a string-id congruent", () => {
    const c = ltrl([
      { id: "a", label: "A" },
      { id: "b", label: "B" },
      { id: "c", label: "C" },
    ]);
    expect(c.value).toStrictEqual([
      { id: "a", label: "A" },
      { id: "b", label: "B" },
      { id: "c", label: "C" },
    ]);
    expect(Object.isFrozen(c.value)).toBe(true);
    expect(c.keys()).toStrictEqual(["a", "b", "c"]);
    expect(c.evalKey("a")).toBe(true);
    expect(c.evalKey("z")).toBe(false);
    expect(c.eval({ id: "a", label: "A" })).toBe(true);
    expect(c.eval({ id: "z", label: "Z" })).toBe(false);
    expect(c.resolve("b")).toStrictEqual({ id: "b", label: "B" });
    expect(c.clone()).toStrictEqual([
      { id: "a", label: "A" },
      { id: "b", label: "B" },
      { id: "c", label: "C" },
    ]);
  });

  it("creates a number-id congruent", () => {
    const c = ltrl([
      { id: 1, label: "One" },
      { id: 2, label: "Two" },
      { id: 3, label: "Three" },
    ]);
    expect(c.keys()).toStrictEqual([1, 2, 3]);
    expect(c.evalKey(1)).toBe(true);
    expect(c.evalKey(99)).toBe(false);
    expect(c.resolve(2)).toStrictEqual({ id: 2, label: "Two" });
  });

  it("creates a congruent with extra properties", () => {
    const c = ltrl([
      { id: "apple", label: "Apple", fruit: true },
      { id: "carrot", label: "Carrot", fruit: false },
    ]);
    expect(c.resolve("apple")).toStrictEqual({
      id: "apple",
      label: "Apple",
      fruit: true,
    });
    expect(c.eval({ id: "apple", label: "Apple", fruit: true })).toBe(true);
  });
});

describe("ltrl invalid", () => {
  it("throws on mixed-type arrays", () => {
    expect(() => ltrl(["a", 1, true] as never)).toThrow();
  });

  it("throws on non-congruent object arrays", () => {
    expect(() =>
      ltrl([{ label: "true" }, { pineapple: true }] as never),
    ).toThrow();
  });

  it("throws on object arrays missing id", () => {
    expect(() =>
      ltrl([
        { key: 1, label: "one", icon: true },
        { key: 2, label: "two" },
      ] as never),
    ).toThrow();
  });

  it("throws on congruents with mixed id types", () => {
    expect(() =>
      ltrl([
        { id: "on1", label: "One" },
        { id: 2, label: "two" },
      ] as never),
    ).toThrow();
  });

  it("throws on nested arrays", () => {
    expect(() => ltrl([[], ["a", "b", "c"]] as never)).toThrow();
  });

  it("throws on arrays with trailing objects", () => {
    expect(() => ltrl([1, 2, 3, {}] as never)).toThrow();
  });
});
