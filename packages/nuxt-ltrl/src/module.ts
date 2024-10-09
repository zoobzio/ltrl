import {
  createResolver,
  defineNuxtModule,
  addTemplate,
  addImportsSources,
  useLogger,
  addImportsDir,
  useNitro,
  addServerImportsDir,
} from "@nuxt/kit";
import type { LtrlConfigTemplate } from "ltrl";
import { isLtrlConfig } from "ltrl";

export default defineNuxtModule<LtrlConfigTemplate>({
  meta: {
    name: "nuxt-ltrl",
    configKey: "ltrl",
  },
  setup(config, nuxt) {
    const logger = useLogger();
    const configString = JSON.stringify(config);
    const { resolve } = createResolver(import.meta.url);

    nuxt.options.typescript.tsConfig = {
      compilerOptions: {
        plugins: [{ name: "ltrl-ts-plugin" }],
      },
    };

    addImportsSources({
      from: "ltrl",
      imports: ["ltrl"] as Array<keyof typeof import("ltrl")>,
    });

    if (isLtrlConfig(config)) {
      nuxt.hook("ready", async () => {
        const nitro = useNitro();
        await nitro.storage.setItems(
          Object.entries(config).map((e) => ({
            key: e[0],
            value: e[1],
          })),
        );
      });

      addTemplate({
        filename: "ltrl.config.mjs",
        write: true,
        getContents: () =>
          [
            "import { defineLtrl } from 'ltrl';",
            `export const nuxtLtrl = defineLtrl(${configString});`,
          ].join("\n"),
      });

      addImportsDir(resolve("../runtime/utils"));
      addServerImportsDir(resolve("../runtime/server/utils"));
    } else {
      logger.info("Invalid ltrl config! Skipping initialization...");
    }
  },
});
