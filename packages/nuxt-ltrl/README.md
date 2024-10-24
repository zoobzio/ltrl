# nuxt-ltrl

🍱 Compose system literals from JSON in Nuxt.

[✨ &nbsp;Release Notes](/CHANGELOG.md)

## Getting started

1. Install the module

```bash
pnpm add nuxt-ltrl
```

2. Create a config

```ts
// ~/ltrl.config.ts
import { defineLtrlConfig } from "nuxt-ltrl/config";

export default defineLtrlConfig({
  foo: "an example string",
  bar: ["primary", "secondary", "tertiary"],
  baz: {
    a: "A",
    b: "B",
    c: "C",
  },
  qux: [
    { key: 1, label: "One" },
    { key: 2, label: "Two" },
  ],
});
```

3. Activate the module

```ts
// ~/nuxt.config.ts
import ltrl from "./ltrl.config";

export default defineNuxtConfig({
  modules: ["nuxt-ltrl"],
  ltrl,
});
```

4. You are done, literally!

## Features

Define system-level JSON configurations in Nuxt for:

- `constants` Literal strings, numbers, or booleans
- `tuples` Literal arrays of strings or numbers
- `enums` Literal key/value object w/ string keys & string or number values
- `congruents` Literal arrays of congruent key/value objects containing at least a `key` & `label` property

[Read more](/packages/ltrl/README.md)

> NOTE: system literals are not available within the `~/server` directory

## Utils

`nuxt-ltrl` exposes system literals to your Nuxt application to interact w/ your `ltrl` config:

| Function                | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| `useNuxtConstant(key)`  | Access a `ltrl` constant extracted from your Nuxt config.      |
| `useNuxtTuple(key)`     | Access a `ltrl` tuple extracted from your Nuxt config.         |
| `useNuxtEnum(key)`      | Access a `ltrl` enum extracted from your Nuxt config.          |
| `useNuxtCongruent(key)` | Access a `ltrl` congruent extracted from your Nuxt config.     |
| `useNuxtLtrlConfig()`   | Access the entire `ltrl` config defined in `~/nuxt.config.ts`. |
| `useNuxtLtrl(key)`      | Access a specific `ltrl` object w/ a given key.                |

### Usage

```ts
export function useLtrlFoo() {
  const { foo } = useNuxtLtrlConfig();
  return foo;
}

export function useLtrlBar() {
  return useNuxtLtrl("bar");
}
```

## Types

`nuxt-ltrl` will generate types based on your configuration that are globally available within Nuxt. A type name is derived from the `ltrl` key in PascalCase w/ a `Ltrl` prefix, the type itself will depend on the literal that was defined.

### Constants

Our example defines a constant literal w/ the `foo` key, which generates a [literal constant](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types):

```ts
export type LtrlFoo = "example";
```

### Tuples

Our example defines a tuple literal w/ the `bar` key, which generates a [literal tuple](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-tuple-types):

```ts
export type LtrlBar = ["primary", "secondary", "plain"];
```

### Enums

Our example defines an enum literal w/ the `baz` key, which generates a [literal enum](https://www.typescriptlang.org/docs/handbook/enums.html):

```ts
export enum LtrlBaz {
  A = "A",
  B = "",
}
```

### Congruents

Our example defines a congruent literal w/ the `qux` key, which generates a [namespace](https://www.typescriptlang.org/docs/handbook/namespaces.html#handbook-content) containing a `Template` type & literal types for every supplied option:

```ts
export namespace LtrlQuz {
  export type Template = { key: number; label: string };
  export type One = { key: 1; label: "One" };
  export type Two = { key: 2; label: "Two" };
}
```

Option type names are derived from the `label` property.

### Helpers

In addition to the generated types, `nuxt-ltrl` also exposes some type helpers:

| Type                                            | Description                                                                                              |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `LtrlConstantConfig`                            | An interface that maps `ltrl` constant keys to the literal type of the value resolved by the given key.  |
| `LtrlTupleConfig`                               | An interface that maps `ltrl` tuple keys to the literal type of the value resolved by the given key.     |
| `LtrlEnumConfig`                                | An interface that maps `ltrl` enum keys to the literal type of the value resolved by the given key.      |
| `LtrlCongruentConfig`                           | An interface that maps `ltrl` congruent keys to the literal type of the value resolved by the given key. |
| `LtrlConfig`                                    | An interface that maps the `ltrl` key to the literal type of value resolved by the given key.            |
| `LtrlConstantKey`                               | A string-literal union type containing all available `ltrl` constant keys.                               |
| `LtrlTupleKey`                                  | A string-literal union type containing all available `ltrl` tuple keys.                                  |
| `LtrlEnumKey`                                   | A string-literal union type containing all available `ltrl` enum keys.                                   |
| `LtrlCongruentKey`                              | A string-literal union type containing all available `ltrl` congruent keys.                              |
| `LtrlKey`                                       | A string-literal union type containing all available keys from the `ltrl` config.                        |
| `LtrlConstant<K extends LtrlConstantKey>`       | Access the literal type of a given `ltrl` constant key.                                                  |
| `LtrlTuple<K extends LtrlTupleKey>`             | Access the literal type of a given `ltrl` tuple key.                                                     |
| `LtrlEnum<K extends LtrlEnumKey>`               | Access the literal type of a given `ltrl` enum key.                                                      |
| `LtrlCongruent<K extends LtrlCongruentKey>`     | Access the literal type of a given `ltrl` congruent key.                                                 |
| `LtrlValue<K extends LtrlKey>`                  | Access the literal type of a given `ltrl` key.                                                           |
| `LtrlTupleItem<K extends LtrlTupleKey>`         | Access a union-type representing the available options in a `ltrl` tuple.                                |
| `LtrlEnumItem<K extends LtrlEnumKey>`           | Access a union-type representing the available options in a `ltrl` enum.                                 |
| `LtrlCongruentItem<K extends LtrlCongruentKey>` | Access a union-type representing the available options in a `ltrl` congruent.                            |

### Usage

In this example, we are using the `bar` literal from our config to compose a string-literal union type & assigns the type to a prop in a button component:

```vue
<script setup lang="ts">
defineProps<{
  variant: LtrlTupleItem<"bar">; // or `LtrlBar[number]`
}>();
</script>

<template>
  <button :data-variant="variant">
    <slot />
  </button>
</template>
```

The component will have a string-literal type-helper when implementing the `variant` prop, complete w/ errors in the IDE if an invalid option is provided!

## License

MIT License &copy; 2024-PRESENT [Alexander Thorwaldson](https://github.com/zoobzio)
