import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/status"],
  clean: true,
  declaration: true,
  rollup: {
    inlineDependencies: true,
    emitCJS: true,
  },
  outDir: ".dist",
});
