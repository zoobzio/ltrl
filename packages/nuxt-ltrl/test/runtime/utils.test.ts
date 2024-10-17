import { describe, it, expect } from "vitest";
import { useNuxtLtrlConfig, useNuxtLtrl } from "../../runtime/utils/ltrl";
import { nuxtLtrl } from "../../.stub/ltrl.config.mjs";

describe("useNuxtLtrl", () => {
  const config = useNuxtLtrlConfig();

  it("defines a set of system ltrl's", () => {
    expect(Object.keys(config)).toStrictEqual(Object.keys(nuxtLtrl));
    expect(Object.isFrozen(config));
  });
  it("accesses a system ltrl by key", () => {
    const keys = Object.keys(nuxtLtrl) as (keyof typeof config)[];
    keys.forEach((key) =>
      expect(useNuxtLtrl(key).value).toStrictEqual(
        nuxtLtrl[key as keyof typeof nuxtLtrl],
      ),
    );
  });
});
