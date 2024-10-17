# ltrl

🍱 Compose literally-typed constants, tuples, enums, & more from standard JSON.

## Features

Define JSON configurations for:

- `constants` Literal strings, numbers, or booleans
- `tuples` Literal arrays of strings or numbers
- `enums` Literal key/value object w/ string keys & string or number values
- `congruents` Literal arrays of congruent key/value objects containing at least a `key` property

[Read more](/packages/ltrl/README.md)

## Packages

- [`ltrl`](/packages/ltrl/README.md) - The core engine, converts JSON into type-safe literals
- [`nuxt-ltrl`](/packages/nuxt-ltrl/README.md) - Compose global system literals for Nuxt

## Development

`ltrl` is a [`pnpm` workspace](https://pnpm.io/workspaces), here is how to get started:

```sh
pnpm i
pnpm lint
pnpm test
```

Dependencies can be added to the [`catalog`](/pnpm-workspace.yaml) & are available to any workspace package!

## Contributions

Contributions are welcome! `ltrl` relies on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to generate release notes, please feel free to open a PR following that specification and I will be happy to review!

## License

MIT License &copy; 2024-PRESENT [Alexander Thorwaldson](https://github.com/zoobzio)
