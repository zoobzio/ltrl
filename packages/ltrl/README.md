# ltrl

🍱 Compose literally-typed constants, tuples, enums, & more from standard JSON.

[✨ &nbsp;Release Notes](/CHANGELOG.md)

## Getting started

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
- `congruents` Literal arrays of congruent key/value objects containing at least a `key` property

Each variation of literal is readonly & comes equipped w/ fully type-safe utils to interact w/ the underlying data.

### Constants

Constants can be any `string`, `number`, or `boolean` value that cannot be changed at runtime.

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
| `clone()`    | Clone a writeable copy of the literal value.                     |

### Tuples

Tuples are any array of numbers or array of strings that cannot be changed.

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
| `clone()`    | Clone a writeable copy of the literal value.                                |

### Enums

Enums are key/value objects w/ a consistent value type (i.e. `string` or `number`).

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
| `clone()`      | Clone a writeable copy of the literal value.                                 |
| `resolve(key)` | Resolve a given key to it's corresponding enum value literal.                |

### Congruentss

Congruents are arrays of symmetric objects where every object contains atleast a `key` property. Typeguards are in place to help w/ definitions & prevent invalid values.

#### Usage

```ts
const fruit = ltrl([
  [
    { key: "apples", label: "Apples", fruit: true },
    { key: "bananas", label: "Bananas", fruit: true },
    { key: "oranges", label: "Oranges", fruit: true },
    { key: "carrots", label: "Carrots", fruit: false },
  ],
]);

fruit.value; // array literal
fruit.keys; // ["apples", "bananas", "oranges", "carrots"];
fruit.eval("Bananas"); // true, cast type
fruit.evalKey("oranges"); // true, cast type
fruit.resolve("oranges"); // { key: "oranges", label: "Oranges" }
```

#### Utils

| Util           | Description                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------- |
| `value`        | The literal value of the congruent array.                                                   |
| `keys`         | A typed array of keys available in the congruent array.                                     |
| `eval(item)`   | Compare an unknown value to a congruent & cast the type if valid.                           |
| `evalKey(key)` | Compare a string or number value to the congruent keys & cast the type if it's a valid key. |
| `clone()`      | Clone a writeable copy of the literal value.                                                |
| `resolve(key)` | Resolve a given key to it's corresponding congruent value literal.                          |

### Config

`ltrl` also supports config objects that have `string` keys & any valid `ltrl` object as a value. It will analyze the config & dynamically compose `ltrl` objects w/ in-depth typeguards.

#### Usage

```ts
const config = ltrl({
  name: "Example",
  version: 11,
  modes: ["prod", "test", "dev", "local"],
  levels: {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
  },
  fruit: [
    {
      key: 1,
      label: "Banana",
    },
    {
      key: 2,
      label: "Apple",
    },
    {
      key: 3,
      label: "Mango",
    },
  ],
});

config.name; // a `constant` literal
config.version; // a `constant` literal
config.modes: // a `tuple` literal
config.levels; // an `enum` literal
config.fruit; // a `congruent` literal
```

#### Utils

Utilities will be generated automatically dependent on the type of value detected for any given property.

## Future recipes

Thought of a useful literal that is not covered here? Open an issue & I will be happy to take a look!

## License

MIT License &copy; 2024-PRESENT [Alexander Thorwaldson](https://github.com/zoobzio)
