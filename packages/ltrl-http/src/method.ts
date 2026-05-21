import { ltrl } from "ltrl";

const httpMethod = ltrl([
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "CONNECT",
  "OPTIONS",
  "TRACE",
  "PATCH",
]);

export const method = httpMethod.value;

export type LtrlHTTPMethod = typeof method;

export type HTTPMethod = LtrlHTTPMethod[number];

export const isHTTPMethod = httpMethod.evaluate;
