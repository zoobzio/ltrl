import type { LtrlConfig, LtrlConfigTemplate } from "ltrl/kit";

export const defineLtrlConfig = <const T extends LtrlConfigTemplate>(
  config: LtrlConfig<T>,
) => Object.freeze(config);
