import {
  createResolver,
  defineNuxtModule,
  addTemplate,
  addImportsSources,
  useLogger,
  addImportsDir,
} from "@nuxt/kit";
import type { LtrlConfigTemplate } from "ltrl";
import { isLtrlConfig } from "ltrl";

export default defineNuxtModule<LtrlConfigTemplate>({
  meta: {
    name: "nuxt-ltrl",
    configKey: "ltrl",
  },
  setup(config) {
    const logger = useLogger();
    const configString = JSON.stringify(config);
    const { resolve } = createResolver(import.meta.url);

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
            "import { defineLtrlConfig } from 'ltrl';",
            `export const nuxtLtrl = defineLtrlConfig(${configString});`,
          ].join("\n"),
      });

      addImportsDir(resolve("../runtime/utils"));
    } else {
      logger.info("Invalid ltrl config! Skipping initialization...");
    }
  },
});
