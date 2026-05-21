import { describe, it, expect } from "vitest";
import { isHTTPCode, useHTTPCode } from "../src";

describe("http codes", () => {
  it("identifies valid HTTP codes", () => {
    expect(isHTTPCode(200)).toBe(true);
    expect(isHTTPCode(404)).toBe(true);
    expect(isHTTPCode(500)).toBe(true);
  });

  it("rejects invalid HTTP codes", () => {
    expect(isHTTPCode(999)).toBe(false);
    expect(isHTTPCode(0)).toBe(false);
  });

  it("resolves a code to its status", () => {
    expect(useHTTPCode(200)).toBe("OK");
    expect(useHTTPCode(404)).toBe("NOT_FOUND");
    expect(useHTTPCode(500)).toBe("INTERNAL_SERVER_ERROR");
    expect(useHTTPCode(418)).toBe("IM_A_TEAPOT");
  });
});
