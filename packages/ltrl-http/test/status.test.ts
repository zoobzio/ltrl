import {} from "../src/codes";
import {
  status,
  isHTTPCode,
  isHTTPStatus,
  useHTTPStatus,
  useHTTPStatusConfig,
} from "../src";
import { describe, it, expect } from "vitest";

const cases = [
  "NOT_FOUND",
  "FORBIDDEN",
  "UNAUTHORIZED",
  "INTERNAL_SERVER_ERROR",
];

describe("http statuses", () => {
  const config = useHTTPStatusConfig();
  it("provides a status enum", () =>
    Object.entries(status).every(
      (s) => isHTTPStatus(s[0]) && isHTTPCode(s[1]),
    ));
  it("validates possible HTTP statuses", () =>
    expect(cases.every(isHTTPStatus)).toBe(true));
  it("resolves a given HTTP status", () =>
    expect(
      cases.filter(isHTTPStatus).map(useHTTPStatus).every(isHTTPCode),
    ).toBe(true));
  it("provides an HTTP status config", () =>
    expect(config.clone()).toStrictEqual(status));
});
