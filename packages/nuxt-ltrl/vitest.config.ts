import { defineVitestConfig } from "@nuxt/test-utils/config";
import { resolve } from "node:path";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    coverage: {
      provider: "v8",
    },
    alias: [
      {
        find: "#build/ltrl.config.mjs",
        replacement: resolve(__dirname, "./.stub/ltrl.config.mjs"),
      },
    ],
  },
});
