import type { Nuxt } from "@nuxt/schema";
import { describe, it, expect, vi } from "vitest";
import ltrlModule from "../../src/module";

const CONFIG = {
  constantExample: "example",
  tupleExample: [1, 2, 3, 4],
  enumExample: { a: "A", b: "B", c: "C" },
  congruentExample: [
    {
      id: 1,
      label: "One",
      active: true,
    },
    {
      id: 2,
      label: "Two",
      active: false,
    },
    {
      id: 3,
      label: "Three",
      active: true,
    },
  ],
};
const NUXT = {} as Nuxt;

const infoLogger = vi.fn();

const kit = vi.hoisted(() => {
  return {
    defineNuxtModule: vi.fn(
      (module: {
        meta: {
          name: string;
          configKey: string;
        };
        setup: (options: unknown, nuxt: Nuxt) => void;
      }) =>
        (options: unknown, nuxt: Nuxt) =>
          module.setup(options, nuxt),
    ),
    useLogger: vi.fn(() => ({
      info: infoLogger,
    })),
    createResolver: vi.fn(() => ({
      resolve: vi.fn(),
    })),
    addImportsSources: vi.fn(),
    addTemplate: vi.fn(
      (template: {
        filename: string;
        write: boolean;
        getContents: () => string;
      }) => template.getContents(),
    ),
    addTypeTemplate: vi.fn(
      (template: { filename: string; getContents: () => string }) =>
        template.getContents(),
    ),
    addImportsDir: vi.fn(),
  };
});

const ltrlKit = vi.hoisted(() => ({
  isLtrlConfig: vi.fn((config) =>
    Object.keys(CONFIG).every((key) => key in config),
  ),
  isLtrlConstant: vi.fn((config) =>
    ["string", "number", "boolean"].includes(typeof config),
  ),
  isLtrlTuple: vi.fn(
    (config) => Array.isArray(config) && config.every(ltrlKit.isLtrlConstant),
  ),
  isLtrlEnum: vi.fn(
    (config) =>
      typeof config === "object" &&
      Object.values(config).every(ltrlKit.isLtrlConstant),
  ),
  isLtrlCongruent: vi.fn(
    (config) => Array.isArray(config) && config.every(ltrlKit.isLtrlEnum),
  ),
}));

vi.mock("@nuxt/kit", () => kit);
vi.mock("ltrl/kit", () => ltrlKit);

describe("nuxt-ltrl", () => {
  ltrlModule(CONFIG, NUXT);

  it("defines a nuxt module", () => {
    expect(kit.defineNuxtModule).toHaveBeenCalledOnce();
  });

  it("adds ltrl imports", () => {
    expect(kit.createResolver).toHaveBeenCalledOnce();
    expect(kit.addImportsSources).toHaveBeenCalledTimes(2);
  });

  it("checks for valid configs", () => {
    expect(ltrlKit.isLtrlConfig).toHaveBeenCalledOnce();
    expect(ltrlKit.isLtrlConfig).toHaveReturnedWith(true);
    expect(kit.addTemplate).toHaveBeenCalledOnce();
    expect(kit.addTemplate).toHaveReturned();
    expect(kit.addTypeTemplate).toHaveBeenCalledOnce();
    expect(kit.addTypeTemplate).toHaveReturned();
    expect(kit.addImportsDir).toHaveBeenCalledOnce();
  });

  it("ignores invalid configs", () => {
    vi.clearAllMocks();
    ltrlModule({ invalid: true }, NUXT);
    expect(kit.addImportsSources).toHaveBeenCalledOnce();
    expect(ltrlKit.isLtrlConfig).toHaveBeenCalledOnce();
    expect(ltrlKit.isLtrlConfig).toHaveReturnedWith(false);
    expect(kit.addTemplate).toHaveBeenCalledTimes(0);
    expect(kit.addImportsDir).toHaveBeenCalledTimes(0);
    expect(infoLogger).toHaveBeenCalledOnce();
  });
});
