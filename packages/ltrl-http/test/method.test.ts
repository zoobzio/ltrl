import { describe, it, expect } from "vitest";
import {
  method,
  useHTTPMethod,
  useHTTPMethodList,
} from "../src";

describe("http methods", () => {
  it("exposes all standard HTTP methods", () => {
    expect(method.GET).toBe("GET");
    expect(method.POST).toBe("POST");
    expect(method.PUT).toBe("PUT");
    expect(method.DELETE).toBe("DELETE");
    expect(method.PATCH).toBe("PATCH");
    expect(method.HEAD).toBe("HEAD");
    expect(method.OPTIONS).toBe("OPTIONS");
    expect(method.CONNECT).toBe("CONNECT");
    expect(method.TRACE).toBe("TRACE");
  });

  it("resolves a method key to its value", () => {
    expect(useHTTPMethod("GET")).toBe("GET");
    expect(useHTTPMethod("PATCH")).toBe("PATCH");
  });

  it("lists all method entries", () => {
    const list = useHTTPMethodList();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBe(Object.keys(method).length);
    expect(list).toContainEqual({ key: "GET", value: "GET" });
    expect(list).toContainEqual({ key: "POST", value: "POST" });
  });
});
