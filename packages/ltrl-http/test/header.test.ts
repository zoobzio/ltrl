import { describe, it, expect } from "vitest";
import {
  header,
  isHTTPHeaderKey,
  useHTTPHeader,
  useHTTPHeaderLookup,
  useHTTPHeaderList,
} from "../src";

describe("http headers", () => {
  it("resolves header keys to their values", () => {
    expect(useHTTPHeader("CONTENT_TYPE")).toBe("Content-Type");
    expect(useHTTPHeader("AUTHORIZATION")).toBe("Authorization");
    expect(useHTTPHeader("ACCEPT")).toBe("Accept");
    expect(useHTTPHeader("CACHE_CONTROL")).toBe("Cache-Control");
  });

  it("identifies valid header keys", () => {
    expect(isHTTPHeaderKey("CONTENT_TYPE")).toBe(true);
    expect(isHTTPHeaderKey("AUTHORIZATION")).toBe(true);
    expect(isHTTPHeaderKey("FAKE_HEADER")).toBe(false);
  });

  it("looks up a key from a header value", () => {
    expect(useHTTPHeaderLookup("Content-Type")).toBe("CONTENT_TYPE");
    expect(useHTTPHeaderLookup("Authorization")).toBe("AUTHORIZATION");
    expect(useHTTPHeaderLookup("Set-Cookie")).toBe("SET_COOKIE");
  });

  it("lists all header entries", () => {
    const list = useHTTPHeaderList();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBe(Object.keys(header).length);
    expect(list).toContainEqual({ key: "CONTENT_TYPE", value: "Content-Type" });
  });
});
