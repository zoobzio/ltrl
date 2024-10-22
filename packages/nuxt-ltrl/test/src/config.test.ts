import { describe, it, expect, vi } from "vitest";
import {
  nuxtLtrlConstants,
  nuxtLtrlTuples,
  nuxtLtrlEnums,
  nuxtLtrlCongruents,
} from "~/.stub/ltrl.config.mjs";
import { defineLtrlConfig } from "../../src/config";

const nuxtLtrl = {
  ...nuxtLtrlConstants,
  ...nuxtLtrlTuples,
  ...nuxtLtrlEnums,
  ...nuxtLtrlCongruents,
};

const viDefineLtrlConfig = vi.fn(defineLtrlConfig);

describe("defineLtrlConfig", () => {
  const ltrlConfig = viDefineLtrlConfig(nuxtLtrl);

  it("defines a ltrl configuration", () => {
    expect(viDefineLtrlConfig).toHaveBeenCalledOnce();
    expect(viDefineLtrlConfig).toHaveBeenCalledWith(nuxtLtrl);
    expect(ltrlConfig).toStrictEqual(nuxtLtrl);
    expect(Object.isFrozen(ltrlConfig)).toBe(true);
  });
});
