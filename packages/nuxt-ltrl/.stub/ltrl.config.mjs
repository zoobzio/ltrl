import { defineLtrlConfig } from "../src/config";

export const nuxtLtrlConstants = defineLtrlConfig({
  name: "Example",
  version: 11,
});

export const nuxtLtrlTuples = defineLtrlConfig({
  modes: ["prod", "test", "dev", "local"],
  levels: [0, 1, 2, 3, 4],
});

export const nuxtLtrlEnums = defineLtrlConfig({
  appModes: {
    PROD: "prod",
    TEST: "test",
    DEV: "dev",
    LOCAL: "local",
  },
  logLevels: {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
  },
});

export const nuxtLtrlCongruents = defineLtrlConfig({
  fruit: [
    {
      id: 1,
      label: "Banana",
    },
    {
      id: 2,
      label: "Apple",
    },
    {
      id: 3,
      label: "Mango",
    },
  ],
  veggies: [
    {
      id: "carrot",
      label: "Carrot",
      delicious: true,
    },
    {
      id: "broccoli",
      label: "Broccoli",
      delicious: true,
    },
    {
      id: "beet",
      label: "Beet",
      delicious: false,
    },
  ],
});
