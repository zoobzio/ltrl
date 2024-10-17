import { describe, it, expect, vi } from "vitest";
import ltrlModule from "../../src/module";
import type { Nuxt } from "@nuxt/schema";

const CONFIG = { example: "example" };
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
  isLtrlConfig: vi.fn((config) => "example" in config),
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
    expect(kit.addImportsSources).toHaveBeenCalledOnce();
  });

  it("checks for valid configs", () => {
    expect(ltrlKit.isLtrlConfig).toHaveBeenCalledOnce();
    expect(ltrlKit.isLtrlConfig).toHaveReturnedWith(true);
    expect(kit.addTemplate).toHaveBeenCalledOnce();
    expect(kit.addTemplate).toHaveReturnedWith(
      [
        "import { defineLtrlConfig } from 'nuxt-ltrl/config';",
        `export const nuxtLtrl = defineLtrlConfig(${JSON.stringify(CONFIG)});`,
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
