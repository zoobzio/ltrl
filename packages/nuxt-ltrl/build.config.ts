import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/module"],
  externals: ["ltrl", "@nuxt/schema"],
  clean: true,
  declaration: true,
  outDir: ".dist",
});
