import {
  createResolver,
  defineNuxtModule,
  addTemplate,
  addImportsSources,
  useLogger,
  addImportsDir,
} from "@nuxt/kit";
import type {
  LtrlConfigTemplate,
  LtrlConstantTemplate,
  LtrlTupleTemplate,
  LtrlEnumTemplate,
  LtrlCongruentTemplate,
} from "ltrl/kit";
import {
  isLtrlConfig,
  isLtrlCongruent,
  isLtrlConstant,
  isLtrlEnum,
  isLtrlTuple,
} from "ltrl/kit";

const buildNuxtLtrl = (template: LtrlConfigTemplate) => {
  const { constants, tuples, enums, congruents } = Object.keys(template).reduce(
    (config, literal) => {
      const configLiteral = template[literal];
      if (isLtrlConstant(configLiteral)) {
        config.constants[literal] = configLiteral;
      } else if (isLtrlTuple(configLiteral)) {
        config.tuples[literal] = configLiteral;
      } else if (isLtrlEnum(configLiteral)) {
        config.enums[literal] = configLiteral;
      } else if (isLtrlCongruent(configLiteral)) {
        config.congruents[literal] = configLiteral;
      }
      return config;
    },
    {
      constants: {},
      tuples: {},
      enums: {},
      congruents: {},
    } as {
      constants: Record<string, LtrlConstantTemplate>;
      tuples: Record<string, LtrlTupleTemplate>;
      enums: Record<string, LtrlEnumTemplate>;
      congruents: Record<string, LtrlCongruentTemplate[]>;
    },
  );
  return {
    constants: JSON.stringify(constants),
    tuples: JSON.stringify(tuples),
    enums: JSON.stringify(enums),
    congruents: JSON.stringify(congruents),
  };
};

export default defineNuxtModule<LtrlConfigTemplate>({
  meta: {
    name: "nuxt-ltrl",
    configKey: "ltrl",
  },
  setup(config) {
    const logger = useLogger();
    const { resolve } = createResolver(import.meta.url);

    addImportsSources({
      from: "ltrl",
      imports: ["ltrl"] as Array<keyof typeof import("ltrl")>,
    });

    if (isLtrlConfig(config)) {
      const { constants, tuples, enums, congruents } = buildNuxtLtrl(config);

      addTemplate({
        filename: "ltrl.config.mjs",
        write: true,
        getContents: () =>
          [
            "import { defineLtrlConfig } from 'nuxt-ltrl/config';",
            `export const nuxtLtrlConstants = defineLtrlConfig(${constants});`,
            `export const nuxtLtrlTuples = defineLtrlConfig(${tuples});`,
            `export const nuxtLtrlEnums = defineLtrlConfig(${enums});`,
            `export const nuxtLtrlCongruents = defineLtrlConfig(${congruents});`,
          ].join("\n"),
      });

      addImportsDir(resolve("../runtime/utils"));
    } else {
      logger.info("Invalid ltrl config! Skipping initialization...");
    }
  },
});
