import { describe, it, expect } from "vitest";
import { isHTTPCode, useHTTPCode, useHTTPCodeConfig } from "../src";

const cases = [400, 401, 402, 403, 404, 500];

describe("http codes", () => {
  const config = useHTTPCodeConfig();
  it("validates possible HTTP codes", () =>
    expect(cases.every(isHTTPCode)).toBe(true));
  it("resolves a given HTTP code", () =>
    expect(cases.filter(isHTTPCode).map(useHTTPCode).every(config.eval)).toBe(
      true,
    ));
});
