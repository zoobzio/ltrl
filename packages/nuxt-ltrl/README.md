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
  baz: [
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
- `congruents` Literal arrays of congruent key/value objects containing at least a `key` property

[Read more](/packages/ltrl/README.md)

> NOTE: system literals are not currently available within the `~/server` directory...
>
> You can still use the `ltrl` function to define literals available to your API endpoints.

## Utils

`nuxt-ltrl` exposes system literals to your Nuxt application to interact w/ your `ltrl` config:

| Function              | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| `useNuxtLtrlConfig()` | Access the entire `ltrl` config defined in `~/nuxt.config.ts`.  |
| `useNuxtLtrl(key)`    | Access a specific `ltrl` object by key (type helpers provided). |

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

In addition to the utilities, `nuxt-ltrl` also exposes some type helpers that can help you build powerful components:

| Type                           | Description                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------- |
| `LtrlConfig`                   | An interface that maps the `ltrl` key to the literal type of the given key.       |
| `LtrlKey`                      | A string-literal union type containing all available keys from the `ltrl` config. |
| `LtrlValue<K extends LtrlKey>` | Access the literal type of a given `ltrl` key.                                    |

### Usage

In this example, we are using the `bar` literal from our config to compose a string-literal union type & assigns the type to a prop in a button component:

```vue
<script setup lang="ts">
defineProps<{
  variant: LtrlValue<"bar">[number];
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
