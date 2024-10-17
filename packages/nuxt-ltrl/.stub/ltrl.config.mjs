import { defineLtrlConfig } from "~/src/config";

export const nuxtLtrl = defineLtrlConfig({
  name: "Example",
  version: 11,
  modes: ["prod", "test", "dev", "local"],
  levels: {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
  },
  fruit: [
    {
      key: 1,
      label: "Banana",
    },
    {
      key: 2,
      label: "Apple",
    },
    {
      key: 3,
      label: "Mango",
    },
  ],
});
