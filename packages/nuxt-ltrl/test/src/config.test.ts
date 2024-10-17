import { describe, it, expect, vi } from "vitest";
import { nuxtLtrl } from "~/.stub/ltrl.config.mjs";
import { defineLtrlConfig } from "../../src/config";
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
