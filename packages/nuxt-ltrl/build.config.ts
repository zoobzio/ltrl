import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/module", "src/config"],
  externals: ["ltrl", "@nuxt/schema"],
  clean: true,
  declaration: true,
  outDir: ".dist",
});
