import { describe, it, expect } from "vitest";
import { method, isHTTPMethod } from "../src";

describe("http methods", () => {
  it("contains all standard HTTP methods", () => {
    expect(method).toContain("GET");
    expect(method).toContain("POST");
    expect(method).toContain("PUT");
    expect(method).toContain("DELETE");
    expect(method).toContain("PATCH");
    expect(method).toContain("HEAD");
    expect(method).toContain("OPTIONS");
    expect(method).toContain("CONNECT");
    expect(method).toContain("TRACE");
  });

  it("evaluates valid HTTP methods", () => {
    expect(isHTTPMethod("GET")).toBe(true);
    expect(isHTTPMethod("POST")).toBe(true);
    expect(isHTTPMethod("PATCH")).toBe(true);
  });

  it("rejects invalid HTTP methods", () => {
    expect(isHTTPMethod("FAKE")).toBe(false);
    expect(isHTTPMethod("")).toBe(false);
    expect(isHTTPMethod("get")).toBe(false);
  });
});
