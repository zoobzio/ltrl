export type LtrlKeyLabelTemplate =
  | {
      key: string;
      label: string;
    }[]
  | {
      key: number;
      label: string;
    }[];

export type LtrlKeyLabelConfig = {
  <const KL extends LtrlKeyLabelTemplate>(value: KL): KL;
};

export type LtrlKeyLabelUtils<KL extends LtrlKeyLabelTemplate> = {
  value: KL;
  keys: KL[number]["key"][];
  eval: (key: LtrlKeyLabelTemplate[number]["key"]) => key is KL[number]["key"];
};

export type LtrlKeyLabelFactory = {
  <const KL extends LtrlKeyLabelTemplate>(value: KL): LtrlKeyLabelUtils<KL>;
};

export const isLtrlKeyLabel = (value: unknown): value is LtrlKeyLabelTemplate =>
  value !== null &&
  Array.isArray(value) &&
  value.every(
    (v) => typeof v === "object" && ["key", "label"].every((k) => k in v),
  );

export const defineLtrlKeyLabel: LtrlKeyLabelConfig = (value) => value;

export const useLtrlKeyLabel: LtrlKeyLabelFactory = (value) => ({
  value,
  keys: value.map(({ key }) => key),
  eval: (key): key is (typeof value)[number]["key"] =>
    value.map(({ key }) => String(key)).includes(String(key)),
});
