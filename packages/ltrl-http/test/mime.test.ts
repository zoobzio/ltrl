import { describe, it, expect } from "vitest";
import {
  mime,
  isHTTPMimeKey,
  useHTTPMime,
  useHTTPMimeLookup,
  useHTTPMimeList,
} from "../src";

describe("http mime types", () => {
  it("resolves mime keys to their values", () => {
    expect(useHTTPMime("JSON")).toBe("application/json");
    expect(useHTTPMime("HTML")).toBe("text/html");
    expect(useHTTPMime("FORM_DATA")).toBe("multipart/form-data");
    expect(useHTTPMime("PNG")).toBe("image/png");
  });

  it("identifies valid mime keys", () => {
    expect(isHTTPMimeKey("JSON")).toBe(true);
    expect(isHTTPMimeKey("HTML")).toBe(true);
    expect(isHTTPMimeKey("FAKE")).toBe(false);
  });

  it("looks up a key from a mime value", () => {
    expect(useHTTPMimeLookup("application/json")).toBe("JSON");
    expect(useHTTPMimeLookup("text/html")).toBe("HTML");
    expect(useHTTPMimeLookup("image/png")).toBe("PNG");
  });

  it("lists all mime entries", () => {
    const list = useHTTPMimeList();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBe(Object.keys(mime).length);
    expect(list).toContainEqual({ key: "JSON", value: "application/json" });
  });
});
