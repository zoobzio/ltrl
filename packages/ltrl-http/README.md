# ltrl-http

🍱 Literal HTTP codes & statuses.

[✨ &nbsp;Release Notes](/CHANGELOG.md)

## Getting Started

1. Install the module

```bash
pnpm add ltrl-http
```

2. Start using HTTP codes

```bash
import { status } from "ltrl-http";

status.OK; // 200
status.FORBIDDEN; // 401
status.UNAUTHORIZED; // 403
// etc
```

3. HTTP status codes are ready to go!

### Utils

| Function                | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| `isHTTPCode(code)`      | Check if a given value is a valid HTTP code.               |
| `useHTTPCode(code)`     | Resolve a given HTTP code to an HTTP status configuration. |
| `useHTTPCodeConfig()`   | Access the `ltrl` HTTP code definition.                    |
| `isHTTPStatus(status)`  | Check if a given value is a valid HTTP status.             |
| `useHTTPStatus(status)` | Exchange an HTTP status for an HTTP code.                  |
| `useHTTPStatusConfig()` | Access the `ltrl` HTTP status definition.                  |

### Types

| Type                                   | Description                                                                |
| -------------------------------------- | -------------------------------------------------------------------------- |
| `HTTPCode`                             | A number-literal union type of all available HTTP status codes.            |
| `HTTPStatus`                           | A string-literal union type of all available HTTP statuses.                |
| `HTTPStatusCode<S extends HTTPStatus>` | Resolve the expected literal HTTP code type of a given HTTP status string; |

## License

MIT License &copy; 2024-PRESENT [Alexander Thorwaldson](https://github.com/zoobzio)
