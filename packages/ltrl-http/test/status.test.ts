import { describe, it, expect } from "vitest";
import { isHTTPStatus, useHTTPStatus } from "../src/status";

describe("http statuses", () => {
  it("identifies valid HTTP statuses", () => {
    expect(isHTTPStatus("OK")).toBe(true);
    expect(isHTTPStatus("NOT_FOUND")).toBe(true);
    expect(isHTTPStatus("INTERNAL_SERVER_ERROR")).toBe(true);
  });

  it("rejects invalid HTTP statuses", () => {
    expect(isHTTPStatus("FAKE")).toBe(false);
    expect(isHTTPStatus("")).toBe(false);
  });

  it("resolves a status to its code", () => {
    expect(useHTTPStatus("OK")).toBe(200);
    expect(useHTTPStatus("NOT_FOUND")).toBe(404);
    expect(useHTTPStatus("INTERNAL_SERVER_ERROR")).toBe(500);
    expect(useHTTPStatus("IM_A_TEAPOT")).toBe(418);
  });
});
