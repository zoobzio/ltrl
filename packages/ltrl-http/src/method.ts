import { ltrl } from "ltrl";

const httpMethod = ltrl({
  /**
   * Transfer a current representation of the target resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/GET|MDN-GET}
   */
  GET: "GET",

  /**
   * Same as GET, but only transfer the status line and header section.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/HEAD|MDN-HEAD}
   */
  HEAD: "HEAD",

  /**
   * Perform resource-specific processing on the request payload.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/POST|MDN-POST}
   */
  POST: "POST",

  /**
   * Replace all current representations of the target resource with the request payload.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/PUT|MDN-PUT}
   */
  PUT: "PUT",

  /**
   * Remove all current representations of the target resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/DELETE|MDN-DELETE}
   */
  DELETE: "DELETE",

  /**
   * Establish a tunnel to the server identified by the target resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/CONNECT|MDN-CONNECT}
   */
  CONNECT: "CONNECT",

  /**
   * Describe the communication options for the target resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/OPTIONS|MDN-OPTIONS}
   */
  OPTIONS: "OPTIONS",

  /**
   * Perform a message loop-back test along the path to the target resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/TRACE|MDN-TRACE}
   */
  TRACE: "TRACE",

  /**
   * Apply partial modifications to a resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/PATCH|MDN-PATCH}
   */
  PATCH: "PATCH",
});

/** The frozen HTTP method enum value mapping method names to their string values. */
export const method = httpMethod.value;

/** The full HTTP method enum type. */
export type LtrlHTTPMethod = typeof method;

/** Union of all HTTP method keys (e.g. `"GET"`, `"POST"`). */
export type HTTPMethod = keyof LtrlHTTPMethod;

/** Checks whether a given key-value pair matches the HTTP method enum. */
export const isHTTPMethod = httpMethod.evaluate;

/** Resolves the string value for an HTTP method name. */
export const useHTTPMethod = httpMethod.resolve;
/** Returns all HTTP methods as an array of `{ key, value }` entries. */
export const useHTTPMethodList = httpMethod.list;
