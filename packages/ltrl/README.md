# ltrl

🍱 Compose literally-typed constants, tuples, enums, & more from standard JSON.

[✨ &nbsp;Release Notes](/CHANGELOG.md)

## Configuration

1. Install the module

```bash
pnpm add ltrl
```

2. Define any literal

```ts
import { ltrl } from "ltrl";

export const literals = ltrl({
  foo: "an example string",
  bar: ["primary", "secondary", "tertiary"],
  baz: {
    a: "A",
    b: "B",
    c: "C"
  },
  qux: [
    { key: 1, label: "One" },
    { key: 2, label: "Two" },
  },
});
```

3. You are done, literally!

## Features

Define JSON configurations for:

- `constants` Literal strings, numbers, or booleans
- `tuples` Literal arrays of strings or numbers
- `enums` Literal key/value object w/ string keys & string or number values
- `keylabels` Literal arrays of key/value objects containing `key` & `label` properties

Each variation of literal is readonly & comes equipped w/ fully type-safe utils to interact w/ the underlying data.

### Constants

Constants can be any string, number, or boolean value that is not expected to change at runtime.

#### Usage

```ts
const banana = ltrl("banana");

banana.value; // strongly typed as "banana";
banana.eval("apple"); // false, not a banana
```

#### Utils

| Util         | Description                                                      |
| ------------ | ---------------------------------------------------------------- |
| `value`      | The literal value of the constant.                               |
| `eval(item)` | Compare an unknown value to a constant & cast the type if valid. |

### Tuples

Tuples are any array of numbers or array of strings that are not expected to mutuate.

#### Usage

```ts
const fruit = ltrl(["apples", "bananas", "oranges", "mangos"]);

fruit.value; // string literal array

const banana = "bananas";
fruit.eval(banana); // true, bananas is a fruit and is now literally-typed as "bananas";
```

#### Utils

| Util         | Description                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| `value`      | The literal value of the tuple.                                             |
| `eval(item)` | Compare an unknown value to a tuple & cast the type if it is a valid entry. |

### Enums

Enums are key/value objects w/ a consistent value type (i.e. string | number).

#### Usage

```ts
const fruit = ltrl({
  apples: "Apples",
  bananas: "Bananas",
  oranges: "Oranges",
  mangos: "Mangos",
});

fruit.value; // object literal
fruit.keys; // array literal (["apples", "bananas", "oranges", "mangos"])
fruit.eval("Bananas"); // true, bananas is a valid enum value
fruit.evalKey("oranges"); // true, oranges is a valid enum key
fruit.resolve("mangoes"); // string literal "Mangos"
```

#### Utils

| Util           | Description                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| `value`        | The literal value of the enum.                                               |
| `keys`         | A typed array of keys available in the enum.                                 |
| `eval(item)`   | Compare an unknown value to an enum & cast the type if valid.                |
| `evalKey(key)` | Compare a string value to the enum keys & cast the type if it's a valid key. |
| `resolve(key)` | Resolve a given key to it's corresponding enum value literal.                |

### KeyLabels

Keylabels are arrays of symmetric objects where every object contains a `key` & `label` property.

#### Usage

```ts
const fruit = ltrl([
  [
    { key: "apples", label: "Apples" },
    { key: "bananas", label: "Bananas" },
    { key: "oranges", label: "Oranges" },
    { key: "mangos", label: "Mangos" },
  ],
]);

fruit.value; // array literal
fruit.keys; // ["apples", "bananas", "oranges", "mangos"];
fruit.eval("Bananas"); // true, cast type
fruit.evalKey("oranges"); // true, cast type
fruit.resolve("oranges"); // { key: "oranges", label: "Mangos" }
```

#### Utils

| Util           | Description                                                                                |
| -------------- | ------------------------------------------------------------------------------------------ |
| `value`        | The literal value of the keylabel array.                                                   |
| `keys`         | A typed array of keys available in the keylabel array.                                     |
| `eval(item)`   | Compare an unknown value to a keylabel & cast the type if valid.                           |
| `evalKey(key)` | Compare a string or number value to the keylabel keys & cast the type if it's a valid key. |
| `resolve(key)` | Resolve a given key to it's corresponding keylabel value literal.                          |

## License

MIT License &copy; 2024-PRESENT [Alexander Thorwaldson](https://github.com/zoobzio)
