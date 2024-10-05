import type {
  LtrlConstantTemplate,
  LtrlConstantUtils,
  LtrlOptionTemplate,
  LtrlOptionUtils,
  LtrlEnumTemplate,
  LtrlEnumUtils,
  LtrlKeyLabelTemplate,
  LtrlKeyLabelUtils,
} from "./recipes";
import {
  isLtrlConstant,
  useLtrlConstant,
  isLtrlOption,
  useLtrlOption,
  isLtrlEnum,
  useLtrlEnum,
  isLtrlKeyLabel,
  useLtrlKeyLabel,
} from "./recipes";

export type LtrlTemplate = {
  [key: string]:
    | LtrlConstantTemplate
    | LtrlOptionTemplate
    | LtrlEnumTemplate
    | LtrlKeyLabelTemplate;
};

export type LtrlConfig = {
  <const L extends LtrlTemplate>(values: L): L;
};

export type LtrlUtils<L extends LtrlTemplate> = {
  [K in keyof L]: L[K] extends LtrlConstantTemplate
    ? LtrlConstantUtils<L[K]>
    : L[K] extends LtrlOptionTemplate
      ? LtrlOptionUtils<L[K]>
      : L[K] extends LtrlEnumTemplate
        ? LtrlEnumUtils<L[K]>
        : L[K] extends LtrlKeyLabelTemplate
          ? LtrlKeyLabelUtils<L[K]>
          : never;
};

export type LtrlFactory = {
  <const L extends LtrlTemplate>(values: L): LtrlUtils<L>;
};

export const defineLtrl: LtrlConfig = (values) => values;

export const useLtrl: LtrlFactory = (values) =>
  (Object.keys(values) as (keyof typeof values)[]).reduce(
    (results, key) => {
      const value = values[key];

      type Util = LtrlUtils<typeof values>[typeof key];

      if (isLtrlConstant(value)) {
        results[key] = useLtrlConstant(value) as Util;
      } else if (isLtrlOption(value)) {
        results[key] = useLtrlOption(value) as Util;
      } else if (isLtrlEnum(value)) {
        results[key] = useLtrlEnum(value) as Util;
      } else if (isLtrlKeyLabel(value)) {
        results[key] = useLtrlKeyLabel(value) as Util;
      }

      return results;
    },
    {} as LtrlUtils<typeof values>,
  );

export const ltrl = useLtrl;

export default ltrl;
