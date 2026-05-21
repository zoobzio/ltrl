import { ltrl } from "ltrl";

const httpHeader = ltrl({
  ACCEPT: "Accept",
  ACCEPT_CHARSET: "Accept-Charset",
  ACCEPT_ENCODING: "Accept-Encoding",
  ACCEPT_LANGUAGE: "Accept-Language",
  ACCEPT_RANGES: "Accept-Ranges",
  ACCESS_CONTROL_ALLOW_CREDENTIALS: "Access-Control-Allow-Credentials",
  ACCESS_CONTROL_ALLOW_HEADERS: "Access-Control-Allow-Headers",
  ACCESS_CONTROL_ALLOW_METHODS: "Access-Control-Allow-Methods",
  ACCESS_CONTROL_ALLOW_ORIGIN: "Access-Control-Allow-Origin",
  ACCESS_CONTROL_EXPOSE_HEADERS: "Access-Control-Expose-Headers",
  ACCESS_CONTROL_MAX_AGE: "Access-Control-Max-Age",
  ACCESS_CONTROL_REQUEST_HEADERS: "Access-Control-Request-Headers",
  ACCESS_CONTROL_REQUEST_METHOD: "Access-Control-Request-Method",
  AGE: "Age",
  ALLOW: "Allow",
  AUTHORIZATION: "Authorization",
  CACHE_CONTROL: "Cache-Control",
  CONNECTION: "Connection",
  CONTENT_DISPOSITION: "Content-Disposition",
  CONTENT_ENCODING: "Content-Encoding",
  CONTENT_LANGUAGE: "Content-Language",
  CONTENT_LENGTH: "Content-Length",
  CONTENT_LOCATION: "Content-Location",
  CONTENT_RANGE: "Content-Range",
  CONTENT_SECURITY_POLICY: "Content-Security-Policy",
  CONTENT_TYPE: "Content-Type",
  COOKIE: "Cookie",
  DATE: "Date",
  ETAG: "ETag",
  EXPECT: "Expect",
  EXPIRES: "Expires",
  FORWARDED: "Forwarded",
  FROM: "From",
  HOST: "Host",
  IF_MATCH: "If-Match",
  IF_MODIFIED_SINCE: "If-Modified-Since",
  IF_NONE_MATCH: "If-None-Match",
  IF_RANGE: "If-Range",
  IF_UNMODIFIED_SINCE: "If-Unmodified-Since",
  KEEP_ALIVE: "Keep-Alive",
  LAST_MODIFIED: "Last-Modified",
  LINK: "Link",
  LOCATION: "Location",
  MAX_FORWARDS: "Max-Forwards",
  ORIGIN: "Origin",
  PRAGMA: "Pragma",
  PROXY_AUTHENTICATE: "Proxy-Authenticate",
  PROXY_AUTHORIZATION: "Proxy-Authorization",
  RANGE: "Range",
  REFERER: "Referer",
  RETRY_AFTER: "Retry-After",
  SEC_FETCH_DEST: "Sec-Fetch-Dest",
  SEC_FETCH_MODE: "Sec-Fetch-Mode",
  SEC_FETCH_SITE: "Sec-Fetch-Site",
  SEC_FETCH_USER: "Sec-Fetch-User",
  SERVER: "Server",
  SET_COOKIE: "Set-Cookie",
  STRICT_TRANSPORT_SECURITY: "Strict-Transport-Security",
  TE: "TE",
  TRAILER: "Trailer",
  TRANSFER_ENCODING: "Transfer-Encoding",
  UPGRADE: "Upgrade",
  UPGRADE_INSECURE_REQUESTS: "Upgrade-Insecure-Requests",
  USER_AGENT: "User-Agent",
  VARY: "Vary",
  VIA: "Via",
  WARNING: "Warning",
  WWW_AUTHENTICATE: "WWW-Authenticate",
  X_CONTENT_TYPE_OPTIONS: "X-Content-Type-Options",
  X_FORWARDED_FOR: "X-Forwarded-For",
  X_FORWARDED_HOST: "X-Forwarded-Host",
  X_FORWARDED_PROTO: "X-Forwarded-Proto",
  X_FRAME_OPTIONS: "X-Frame-Options",
  X_REQUESTED_WITH: "X-Requested-With",
  X_XSS_PROTECTION: "X-XSS-Protection",
});

export const header = httpHeader.value;

export type LtrlHTTPHeader = typeof header;

export type HTTPHeader = keyof LtrlHTTPHeader;
export type HTTPHeaderValue = LtrlHTTPHeader[HTTPHeader];

export const isHTTPHeader = httpHeader.evaluate;
export const isHTTPHeaderKey = httpHeader.identify;

export const useHTTPHeader = httpHeader.resolve;
export const useHTTPHeaderLookup = httpHeader.lookup;

export const useHTTPHeaderList = httpHeader.list;
