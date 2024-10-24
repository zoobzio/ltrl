import {
  createResolver,
  defineNuxtModule,
  addTemplate,
  addImportsSources,
  useLogger,
  addImportsDir,
  addTypeTemplate,
} from "@nuxt/kit";
import type { LtrlConfigTemplate } from "ltrl/kit";
import { isLtrlConfig } from "ltrl/kit";
import {
  defineLtrlTypegenConfig,
  generateLtrlClassnames,
  generateLtrlCongruentTypes,
  generateLtrlConstantTypes,
  generateLtrlEnumTypes,
  generateLtrlTupleTypes,
} from "./typegen";

export default defineNuxtModule<LtrlConfigTemplate>({
  meta: {
    name: "nuxt-ltrl",
    configKey: "ltrl",
  },
  setup(config) {
    const logger = useLogger();
    const { resolve } = createResolver(import.meta.url);

    const { constants, tuples, enums, congruents } =
      defineLtrlTypegenConfig(config);

    addImportsSources({
      from: "ltrl",
      imports: ["ltrl"] as Array<keyof typeof import("ltrl")>,
    });

    if (isLtrlConfig(config)) {
      addTemplate({
        filename: "ltrl.config.mjs",
        write: true,
        getContents: () =>
          [
            "import { defineLtrlConfig } from 'nuxt-ltrl/config';",
            `export const nuxtLtrlConstants = defineLtrlConfig(${JSON.stringify(constants)});`,
            `export const nuxtLtrlTuples = defineLtrlConfig(${JSON.stringify(tuples)});`,
            `export const nuxtLtrlEnums = defineLtrlConfig(${JSON.stringify(enums)});`,
            `export const nuxtLtrlCongruents = defineLtrlConfig(${JSON.stringify(congruents)});`,
          ].join("\n"),
      });

      addTypeTemplate({
        filename: "types/ltrl.d.ts",
        getContents: () => {
          return [
            ...generateLtrlConstantTypes(constants),
            ...generateLtrlTupleTypes(tuples),
            ...generateLtrlEnumTypes(enums),
            ...generateLtrlCongruentTypes(congruents),
          ].join("\n");
        },
      });

      addImportsSources({
        from: "#build/types/ltrl.d.ts",
        type: true,
        imports: [constants, tuples, enums, congruents].flatMap(
          generateLtrlClassnames,
        ),
      });

      addImportsDir(resolve("../runtime/utils"));
    } else {
      logger.info("Invalid ltrl config! Skipping initialization...");
    }
  },
});
