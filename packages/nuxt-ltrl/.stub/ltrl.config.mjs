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
  veggies: [
    {
      key: "carrot",
      label: "Carrot",
      delicious: true,
    },
    {
      key: "broccoli",
      label: "Broccoli",
      delicious: true,
    },
    {
      key: "beet",
      label: "Beet",
      delicious: false,
    },
  ],
});
