export type LtrlKeyLabelTemplate =
  | {
      key: string;
      label: string;
    }[]
  | {
      key: number;
      label: string;
    }[];

export type LtrlKeyLabelFromKey<
  L extends LtrlKeyLabelTemplate,
  K extends string | number,
> = L extends [infer First, ...infer Rest]
  ? First extends LtrlKeyLabelTemplate[number]
    ? K extends First["key"]
      ? First
      : Rest extends LtrlKeyLabelTemplate
        ? LtrlKeyLabelFromKey<Rest, K>
        : never
    : Rest extends LtrlKeyLabelTemplate
      ? LtrlKeyLabelFromKey<Rest, K>
      : never
  : never;

export type LtrlKeyLabelUtils<KL extends LtrlKeyLabelTemplate> = {
  value: KL;
  keys: KL[number]["key"][]; // TODO can this be a tuple type?
  eval: (val: unknown) => val is KL[number];
  evalKey: (
    key: LtrlKeyLabelTemplate[number]["key"],
  ) => key is KL[number]["key"];
  resolve: <K extends KL[number]["key"]>(key: K) => LtrlKeyLabelFromKey<KL, K>;
};

export const isLtrlKeyLabel = (value: unknown): value is LtrlKeyLabelTemplate =>
  value !== null &&
  Array.isArray(value) &&
  value.every((v) => typeof v === "object" && "key" in v && "label" in v) &&
  (value.every((v) => typeof v.key === "number") ||
    value.every((v) => typeof v.key === "string"));

export const defineLtrlKeyLabel = <const KL extends LtrlKeyLabelTemplate>(
  config: KL,
) => {
  const template = config;
  if (!isLtrlKeyLabel(template)) {
    throw new Error("Invalid ltrl constant", {
      cause: template,
    });
  }
  Object.freeze(config);
  return config;
};

export const useLtrlKeyLabel = <const KL extends LtrlKeyLabelTemplate>(
  config: KL,
): LtrlKeyLabelUtils<KL> => {
  const value = defineLtrlKeyLabel(config);
  return {
    value,
    keys: value.map(({ key }) => key),
    eval: (item): item is (typeof value)[number] =>
      item !== null &&
      typeof item === "object" &&
      "key" in item &&
      "label" in item &&
      value.findIndex((v) => v.key === item.key && v.label === item.label) >= 0,
    evalKey: (key): key is (typeof value)[number]["key"] =>
      value.map(({ key }) => String(key)).includes(String(key)),
    resolve: (key) =>
      value.find((v) => v.key === key) as LtrlKeyLabelFromKey<
        typeof value,
        typeof key
      >,
  };
};
