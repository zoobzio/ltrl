// TODO consider extracting this into a `typegen` package for wider usage
import type {
  LtrlConfigTemplate,
  LtrlConstantTemplate,
  LtrlTupleTemplate,
  LtrlEnumTemplate,
  LtrlCongruentTemplate,
} from "ltrl/kit";
import {
  isLtrlCongruent,
  isLtrlConstant,
  isLtrlEnum,
  isLtrlTuple,
} from "ltrl/kit";

export type LtrlTypegenTemplate<T> = Record<string, T>;

export type LtrlConstantTypegenTemplate =
  LtrlTypegenTemplate<LtrlConstantTemplate>;
export type LtrlTupleTypegenTemplate = LtrlTypegenTemplate<LtrlTupleTemplate>;
export type LtrlEnumTypegenTemplate = LtrlTypegenTemplate<LtrlEnumTemplate>;
export type LtrlCongruentTypegenTemplate = LtrlTypegenTemplate<
  LtrlCongruentTemplate[]
>;

export type LtrlTypegenTemplateUnion =
  | LtrlConstantTypegenTemplate
  | LtrlTupleTypegenTemplate
  | LtrlEnumTypegenTemplate
  | LtrlCongruentTypegenTemplate;

export type LtrlTypegenConfig = {
  constants: LtrlConstantTypegenTemplate;
  tuples: LtrlTupleTypegenTemplate;
  enums: LtrlEnumTypegenTemplate;
  congruents: LtrlCongruentTypegenTemplate;
};

const defaults: LtrlTypegenConfig = {
  constants: {},
  tuples: {},
  enums: {},
  congruents: {},
};

function toPascalCase(item: string): string {
  return (
    item
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]|\d+/g)
      ?.map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
      .join("") ?? item
  );
}

export function defineLtrlTypegenConfig(template: LtrlConfigTemplate) {
  return Object.keys(template).reduce((config, literal) => {
    const configLiteral = template[literal];
    if (isLtrlConstant(configLiteral)) {
      config.constants[literal] = configLiteral;
    } else if (isLtrlTuple(configLiteral)) {
      config.tuples[literal] = configLiteral;
    } else if (isLtrlEnum(configLiteral)) {
      config.enums[literal] = configLiteral;
    } else if (isLtrlCongruent(configLiteral)) {
      config.congruents[literal] = configLiteral;
    }
    return config;
  }, defaults);
}

export function generateLtrlConstantTypes(
  template: LtrlConstantTypegenTemplate,
) {
  return Object.entries(template).map(
    ([key, value]) =>
      `export type Ltrl${toPascalCase(key)} = ${typeof value === "string" ? `"${value}"` : value};`,
  );
}

export function generateLtrlTupleTypes(template: LtrlTupleTypegenTemplate) {
  return Object.entries(template).map(
    ([key, value]) =>
      `export type Ltrl${toPascalCase(key)} = [${value.map((v: string | number) => (typeof v === "string" ? `"${v}"` : v)).join(", ")}];`,
  );
}

export function generateLtrlEnumTypes(template: LtrlEnumTypegenTemplate) {
  return Object.entries(template).map(
    ([key, value]) =>
      `export enum Ltrl${toPascalCase(key)} { ${Object.entries(value)
        .map(
          ([k, v]) =>
            `${toPascalCase(k)} = ${typeof v === "string" ? `"${v}"` : v}`,
        )
        .join(", ")} };`,
  );
}

export function generateLtrlCongruentTypes(
  template: LtrlCongruentTypegenTemplate,
) {
  return Object.entries(template).flatMap(([key, value]) =>
    [
      `export namespace Ltrl${toPascalCase(key)} {`,
      `  export type Template = { ${Object.entries(value[0])
        .map(([k, v]) => k + ": " + typeof v)
        .join("; ")} };`,
      ...value.map(
        (v) =>
          `  export type ${toPascalCase(v.label)} = { ${Object.entries(v)
            .map(([k, f]) => k + ": " + (typeof f === "string" ? `"${f}"` : f))
            .join("; ")} };`,
      ),
      "};",
    ].join("\n"),
  );
}

export function generateLtrlClassnames(template: LtrlTypegenTemplateUnion) {
  return Object.keys(template).map((key) => `Ltrl${toPascalCase(key)}`);
}
