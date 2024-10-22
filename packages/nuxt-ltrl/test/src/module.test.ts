import type { Nuxt } from "@nuxt/schema";
import { describe, it, expect, vi } from "vitest";
import ltrlModule from "../../src/module";

const CONFIG = {
  constantExample: "example",
  tupleExample: [1, 2, 3, 4],
  enumExample: { a: "A", b: "B", c: "C" },
  congruentExample: [
    {
      key: 1,
      label: "One",
      active: true,
    },
    {
      key: 2,
      label: "Two",
      active: false,
    },
    {
      key: 3,
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

  const { constantExample, tupleExample, enumExample, congruentExample } =
    CONFIG;

  it("defines a nuxt module", () => {
    expect(kit.defineNuxtModule).toHaveBeenCalledOnce();
  });

  it("adds ltrl imports", () => {
    expect(kit.createResolver).toHaveBeenCalledOnce();
    expect(kit.addImportsSources).toHaveBeenCalledOnce();
  });

  it("checks for valid configs", () => {
    expect(ltrlKit.isLtrlConfig).toHaveBeenCalledOnce();
    expect(ltrlKit.isLtrlConfig).toHaveReturnedWith(true);
    expect(kit.addTemplate).toHaveBeenCalledOnce();
    expect(kit.addTemplate).toHaveReturnedWith(
      [
        "import { defineLtrlConfig } from 'nuxt-ltrl/config';",
        `export const nuxtLtrlConstants = defineLtrlConfig(${JSON.stringify({ constantExample })});`,
        `export const nuxtLtrlTuples = defineLtrlConfig(${JSON.stringify({ tupleExample })});`,
        `export const nuxtLtrlEnums = defineLtrlConfig(${JSON.stringify({ enumExample })});`,
        `export const nuxtLtrlCongruents = defineLtrlConfig(${JSON.stringify({ congruentExample })});`,
      ].join("\n"),
    );
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
