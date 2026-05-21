import { describe, it, expect } from "vitest";
import {
  status,
  isHTTPStatus,
  isHTTPCode,
  useHTTPStatus,
  useHTTPCode,
  useHTTPStatusList,
} from "../src";

describe("http statuses", () => {
  it("identifies valid HTTP statuses", () => {
    expect(isHTTPStatus("OK", 200)).toBe(true);
    expect(isHTTPStatus("NOT_FOUND", 404)).toBe(true);
    expect(isHTTPStatus("OK", 999)).toBe(false);
  });

  it("identifies valid HTTP status keys", () => {
    expect(isHTTPCode("OK")).toBe(true);
    expect(isHTTPCode("NOT_FOUND")).toBe(true);
    expect(isHTTPCode("INTERNAL_SERVER_ERROR")).toBe(true);
    expect(isHTTPCode("FAKE")).toBe(false);
    expect(isHTTPCode("")).toBe(false);
  });

  it("resolves a status to its code", () => {
    expect(useHTTPStatus("OK")).toBe(200);
    expect(useHTTPStatus("NOT_FOUND")).toBe(404);
    expect(useHTTPStatus("INTERNAL_SERVER_ERROR")).toBe(500);
    expect(useHTTPStatus("IM_A_TEAPOT")).toBe(418);
  });

  it("looks up a status from its code", () => {
    expect(useHTTPCode(200)).toBe("OK");
    expect(useHTTPCode(404)).toBe("NOT_FOUND");
    expect(useHTTPCode(500)).toBe("INTERNAL_SERVER_ERROR");
    expect(useHTTPCode(418)).toBe("IM_A_TEAPOT");
  });

  it("lists all status entries as key-value pairs", () => {
    const list = useHTTPStatusList();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBe(Object.keys(status).length);
    expect(list).toContainEqual({ key: "OK", value: 200 });
    expect(list).toContainEqual({ key: "NOT_FOUND", value: 404 });
    expect(list).toContainEqual({ key: "IM_A_TEAPOT", value: 418 });
  });

  it("exposes the raw status value object", () => {
    expect(status.OK).toBe(200);
    expect(status.NOT_FOUND).toBe(404);
    expect(status.INTERNAL_SERVER_ERROR).toBe(500);
  });
});
