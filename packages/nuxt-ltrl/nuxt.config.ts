import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  alias: {
    "#build/types/ltrl.d.ts": "./.stub/types/ltrl.d.ts",
  },
});
