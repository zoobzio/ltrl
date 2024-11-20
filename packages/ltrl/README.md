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

export const foo = ltrl("an example string");
export const bar = ltrl(["primary", "secondary", "tertiary"]);
export baz = ltrl({
    a: "A",
    b: "B",
    c: "C"
});
export qux = ltrl([
    { id: 1, label: "One" },
    { id: 2, label: "Two" },
]);
```

3. You are done, literally!

## Features

Define JSON configurations for:

- `constants` Literal strings, numbers, or booleans
- `tuples` Literal arrays of strings or numbers
- `enums` Literal key/value object w/ string keys & string or number values
- `congruents` Literal arrays of congruent key/value objects containing at least an `id` property

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

Congruents are arrays of symmetric objects where every object contains atleast an `id` property. Typeguards are in place to help w/ definitions & prevent invalid values.

#### Usage

```ts
const fruit = ltrl([
  [
    { id: "apples", label: "Apples", fruit: true },
    { id: "bananas", label: "Bananas", fruit: true },
    { id: "oranges", label: "Oranges", fruit: true },
    { id: "carrots", label: "Carrots", fruit: false },
  ],
]);

fruit.value; // array literal
fruit.keys; // ["apples", "bananas", "oranges", "carrots"];
fruit.eval("Bananas"); // true, cast type
fruit.evalKey("oranges"); // true, cast type
fruit.resolve("oranges"); // { id: "oranges", label: "Oranges" }
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

## Future plans

Thought of a useful literal that is not covered here? Open an issue & I will be happy to take a look!

## License

MIT License &copy; 2024-PRESENT [Alexander Thorwaldson](https://github.com/zoobzio)
