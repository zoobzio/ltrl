import { describe, it, expect, vi } from "vitest";
import nuxtConfig from "../nuxt.config";

const config = vi.hoisted(() => ({
  defineNuxtConfig: vi.fn((config) => config),
}));

vi.mock("nuxt/config", () => config);

describe("nuxt.config.ts", () => {
  it("defines a nuxt configuration", () => {
    expect(config.defineNuxtConfig).toHaveBeenCalledOnce();
    expect(config.defineNuxtConfig).toHaveBeenCalledWith(nuxtConfig);
  });
});
