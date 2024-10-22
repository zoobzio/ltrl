import { describe, it, expect } from "vitest";
import { useNuxtLtrlConfig, useNuxtLtrl } from "../../runtime/utils/ltrl";
import {
  nuxtLtrlConstants,
  nuxtLtrlTuples,
  nuxtLtrlEnums,
  nuxtLtrlCongruents,
} from "../../.stub/ltrl.config.mjs";

const CONFIG = {
  ...nuxtLtrlConstants,
  ...nuxtLtrlTuples,
  ...nuxtLtrlEnums,
  ...nuxtLtrlCongruents,
};

describe("useNuxtLtrl", () => {
  const config = useNuxtLtrlConfig();

  it("defines a set of system ltrls", () => {
    expect(Object.keys(config)).toStrictEqual(Object.keys(CONFIG));
    expect(Object.isFrozen(config));
  });
  it("accesses a system ltrl by key", () => {
    const keys = Object.keys(config) as (keyof typeof config)[];
    keys.forEach((key) =>
      expect(useNuxtLtrl(key).value).toStrictEqual(
        CONFIG[key as keyof typeof CONFIG],
      ),
    );
  });
  it("throws an error on invalid keys", () => {
    let errored = false;
    try {
      // @ts-expect-error testing error path
      useNuxtLtrl("fake");
    } catch (err) {
      errored = true;
      expect(err).toBeInstanceOf(Error);
    }
    expect(errored).toBe(true);
  });
});
