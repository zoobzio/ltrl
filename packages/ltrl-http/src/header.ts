import { ltrl } from "ltrl";

const httpHeader = ltrl({
  /**
   * Informs the server about the types of data that can be sent back.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept|MDN-Accept}
   */
  ACCEPT: "Accept",

  /**
   * Indicates which character encodings the client understands.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Charset|MDN-Accept-Charset}
   */
  ACCEPT_CHARSET: "Accept-Charset",

  /**
   * Indicates which content encoding the client understands.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Encoding|MDN-Accept-Encoding}
   */
  ACCEPT_ENCODING: "Accept-Encoding",

  /**
   * Indicates which natural languages the client prefers.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Language|MDN-Accept-Language}
   */
  ACCEPT_LANGUAGE: "Accept-Language",

  /**
   * Indicates whether the server supports range requests and the unit for the range.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Ranges|MDN-Accept-Ranges}
   */
  ACCEPT_RANGES: "Accept-Ranges",

  /**
   * Indicates whether the response can be shared when request credentials mode is "include".
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Credentials|MDN-Access-Control-Allow-Credentials}
   */
  ACCESS_CONTROL_ALLOW_CREDENTIALS: "Access-Control-Allow-Credentials",

  /**
   * Indicates which headers can be used during the actual request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Headers|MDN-Access-Control-Allow-Headers}
   */
  ACCESS_CONTROL_ALLOW_HEADERS: "Access-Control-Allow-Headers",

  /**
   * Specifies the methods allowed when accessing the resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Methods|MDN-Access-Control-Allow-Methods}
   */
  ACCESS_CONTROL_ALLOW_METHODS: "Access-Control-Allow-Methods",

  /**
   * Indicates whether the response can be shared with the given origin.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin|MDN-Access-Control-Allow-Origin}
   */
  ACCESS_CONTROL_ALLOW_ORIGIN: "Access-Control-Allow-Origin",

  /**
   * Indicates which headers can be exposed as part of the response.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Expose-Headers|MDN-Access-Control-Expose-Headers}
   */
  ACCESS_CONTROL_EXPOSE_HEADERS: "Access-Control-Expose-Headers",

  /**
   * Indicates how long the results of a preflight request can be cached.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Max-Age|MDN-Access-Control-Max-Age}
   */
  ACCESS_CONTROL_MAX_AGE: "Access-Control-Max-Age",

  /**
   * Used in preflight requests to indicate which headers will be used in the actual request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Request-Headers|MDN-Access-Control-Request-Headers}
   */
  ACCESS_CONTROL_REQUEST_HEADERS: "Access-Control-Request-Headers",

  /**
   * Used in preflight requests to indicate which method will be used in the actual request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Request-Method|MDN-Access-Control-Request-Method}
   */
  ACCESS_CONTROL_REQUEST_METHOD: "Access-Control-Request-Method",

  /**
   * The time in seconds the object has been in a proxy cache.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Age|MDN-Age}
   */
  AGE: "Age",

  /**
   * Lists the set of methods supported by a resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Allow|MDN-Allow}
   */
  ALLOW: "Allow",

  /**
   * Contains credentials for authenticating a user-agent with a server.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Authorization|MDN-Authorization}
   */
  AUTHORIZATION: "Authorization",

  /**
   * Directives for caching mechanisms in both requests and responses.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control|MDN-Cache-Control}
   */
  CACHE_CONTROL: "Cache-Control",

  /**
   * Controls whether the network connection stays open after the current transaction.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Connection|MDN-Connection}
   */
  CONNECTION: "Connection",

  /**
   * Indicates if the content should be displayed inline or as an attachment.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Disposition|MDN-Content-Disposition}
   */
  CONTENT_DISPOSITION: "Content-Disposition",

  /**
   * Specifies the encoding applied to the message body.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Encoding|MDN-Content-Encoding}
   */
  CONTENT_ENCODING: "Content-Encoding",

  /**
   * Describes the natural language(s) of the intended audience for the body.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Language|MDN-Content-Language}
   */
  CONTENT_LANGUAGE: "Content-Language",

  /**
   * Indicates the size of the message body in bytes.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Length|MDN-Content-Length}
   */
  CONTENT_LENGTH: "Content-Length",

  /**
   * Indicates an alternate location for the returned data.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Location|MDN-Content-Location}
   */
  CONTENT_LOCATION: "Content-Location",

  /**
   * Indicates where in a full body message a partial message belongs.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Range|MDN-Content-Range}
   */
  CONTENT_RANGE: "Content-Range",

  /**
   * Controls resources the user agent is allowed to load for a given page.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy|MDN-Content-Security-Policy}
   */
  CONTENT_SECURITY_POLICY: "Content-Security-Policy",

  /**
   * Indicates the media type of the resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type|MDN-Content-Type}
   */
  CONTENT_TYPE: "Content-Type",

  /**
   * Contains stored HTTP cookies previously sent by the server with Set-Cookie.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cookie|MDN-Cookie}
   */
  COOKIE: "Cookie",

  /**
   * The date and time at which the message was originated.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Date|MDN-Date}
   */
  DATE: "Date",

  /**
   * An identifier for a specific version of a resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/ETag|MDN-ETag}
   */
  ETAG: "ETag",

  /**
   * Indicates expectations that need to be met by the server to handle the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Expect|MDN-Expect}
   */
  EXPECT: "Expect",

  /**
   * The date/time after which the response is considered stale.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Expires|MDN-Expires}
   */
  EXPIRES: "Expires",

  /**
   * Contains information from the client-facing side of proxy servers.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Forwarded|MDN-Forwarded}
   */
  FORWARDED: "Forwarded",

  /**
   * An email address for the human user who controls the requesting user agent.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/From|MDN-From}
   */
  FROM: "From",

  /**
   * The domain name of the server and optionally the TCP port number.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Host|MDN-Host}
   */
  HOST: "Host",

  /**
   * Makes the request conditional; only applies if the resource matches one of the given ETags.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/If-Match|MDN-If-Match}
   */
  IF_MATCH: "If-Match",

  /**
   * Makes the request conditional; only sends the resource if it has been modified after the given date.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/If-Modified-Since|MDN-If-Modified-Since}
   */
  IF_MODIFIED_SINCE: "If-Modified-Since",

  /**
   * Makes the request conditional; only sends the resource if it does not match any of the given ETags.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/If-None-Match|MDN-If-None-Match}
   */
  IF_NONE_MATCH: "If-None-Match",

  /**
   * Makes the request conditional; asks for a range of the resource only if it matches the given ETag or date.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/If-Range|MDN-If-Range}
   */
  IF_RANGE: "If-Range",

  /**
   * Makes the request conditional; only sends the resource if it has not been modified after the given date.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/If-Unmodified-Since|MDN-If-Unmodified-Since}
   */
  IF_UNMODIFIED_SINCE: "If-Unmodified-Since",

  /**
   * Controls how long a persistent connection should stay open.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Keep-Alive|MDN-Keep-Alive}
   */
  KEEP_ALIVE: "Keep-Alive",

  /**
   * The date and time at which the resource was last modified.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Last-Modified|MDN-Last-Modified}
   */
  LAST_MODIFIED: "Last-Modified",

  /**
   * Allows the server to point an interested client to another resource containing metadata about the requested resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Link|MDN-Link}
   */
  LINK: "Link",

  /**
   * Indicates the URL to redirect a page to.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Location|MDN-Location}
   */
  LOCATION: "Location",

  /**
   * Limits the number of times the message can be forwarded through proxies or gateways.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Max-Forwards|MDN-Max-Forwards}
   */
  MAX_FORWARDS: "Max-Forwards",

  /**
   * Indicates the origin that caused the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Origin|MDN-Origin}
   */
  ORIGIN: "Origin",

  /**
   * Implementation-specific directives that may apply to any agent along the request-response chain.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Pragma|MDN-Pragma}
   */
  PRAGMA: "Pragma",

  /**
   * Defines the authentication method that should be used to access a resource behind a proxy server.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Proxy-Authenticate|MDN-Proxy-Authenticate}
   */
  PROXY_AUTHENTICATE: "Proxy-Authenticate",

  /**
   * Contains credentials for authenticating a user agent with a proxy server.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Proxy-Authorization|MDN-Proxy-Authorization}
   */
  PROXY_AUTHORIZATION: "Proxy-Authorization",

  /**
   * Indicates the part of a document that the server should return.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Range|MDN-Range}
   */
  RANGE: "Range",

  /**
   * The address of the previous web page from which a link to the currently requested page was followed.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referer|MDN-Referer}
   */
  REFERER: "Referer",

  /**
   * Indicates how long the user agent should wait before making a follow-up request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After|MDN-Retry-After}
   */
  RETRY_AFTER: "Retry-After",

  /**
   * Indicates the request's destination, i.e., what type of content is being requested.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-Fetch-Dest|MDN-Sec-Fetch-Dest}
   */
  SEC_FETCH_DEST: "Sec-Fetch-Dest",

  /**
   * Indicates the mode of the request, e.g., cors, no-cors, same-origin, or navigate.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-Fetch-Mode|MDN-Sec-Fetch-Mode}
   */
  SEC_FETCH_MODE: "Sec-Fetch-Mode",

  /**
   * Indicates the relationship between the request initiator's origin and the target's origin.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-Fetch-Site|MDN-Sec-Fetch-Site}
   */
  SEC_FETCH_SITE: "Sec-Fetch-Site",

  /**
   * Indicates whether the navigation request was triggered by user activation.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-Fetch-User|MDN-Sec-Fetch-User}
   */
  SEC_FETCH_USER: "Sec-Fetch-User",

  /**
   * Contains information about the software used by the origin server to handle the request.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Server|MDN-Server}
   */
  SERVER: "Server",

  /**
   * Sends cookies from the server to the user agent.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie|MDN-Set-Cookie}
   */
  SET_COOKIE: "Set-Cookie",

  /**
   * Tells the browser that the site should only be accessed using HTTPS.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security|MDN-Strict-Transport-Security}
   */
  STRICT_TRANSPORT_SECURITY: "Strict-Transport-Security",

  /**
   * Specifies the transfer codings the user agent is willing to accept.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/TE|MDN-TE}
   */
  TE: "TE",

  /**
   * Indicates fields present in the trailer part of a chunked transfer coding message.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Trailer|MDN-Trailer}
   */
  TRAILER: "Trailer",

  /**
   * Specifies the form of encoding used to safely transfer the payload body.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Transfer-Encoding|MDN-Transfer-Encoding}
   */
  TRANSFER_ENCODING: "Transfer-Encoding",

  /**
   * Asks the server to upgrade to another protocol.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Upgrade|MDN-Upgrade}
   */
  UPGRADE: "Upgrade",

  /**
   * Sends a signal to the server expressing the client's preference for an encrypted and authenticated response.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Upgrade-Insecure-Requests|MDN-Upgrade-Insecure-Requests}
   */
  UPGRADE_INSECURE_REQUESTS: "Upgrade-Insecure-Requests",

  /**
   * Contains a string that identifies the requesting user agent.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent|MDN-User-Agent}
   */
  USER_AGENT: "User-Agent",

  /**
   * Determines how to match request headers to decide whether a cached response can be used.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Vary|MDN-Vary}
   */
  VARY: "Vary",

  /**
   * Lists the intermediate proxies through which the message was forwarded.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Via|MDN-Via}
   */
  VIA: "Via",

  /**
   * General warning information about possible problems with the message body.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Warning|MDN-Warning}
   */
  WARNING: "Warning",

  /**
   * Defines the authentication method that should be used to access a resource.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/WWW-Authenticate|MDN-WWW-Authenticate}
   */
  WWW_AUTHENTICATE: "WWW-Authenticate",

  /**
   * Prevents MIME type sniffing by the browser.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Content-Type-Options|MDN-X-Content-Type-Options}
   */
  X_CONTENT_TYPE_OPTIONS: "X-Content-Type-Options",

  /**
   * Identifies the originating IP address of a client connecting through a proxy.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-For|MDN-X-Forwarded-For}
   */
  X_FORWARDED_FOR: "X-Forwarded-For",

  /**
   * Identifies the original host requested by the client in the Host HTTP request header.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-Host|MDN-X-Forwarded-Host}
   */
  X_FORWARDED_HOST: "X-Forwarded-Host",

  /**
   * Identifies the protocol that a client used to connect to the proxy or load balancer.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-Proto|MDN-X-Forwarded-Proto}
   */
  X_FORWARDED_PROTO: "X-Forwarded-Proto",

  /**
   * Indicates whether a browser should be allowed to render a page in a frame, iframe, embed, or object.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options|MDN-X-Frame-Options}
   */
  X_FRAME_OPTIONS: "X-Frame-Options",

  /**
   * Identifies Ajax requests; commonly set to "XMLHttpRequest" by JavaScript frameworks.
   * @see {@link https://www.iana.org/assignments/message-headers/message-headers.xhtml|IANA-X-Requested-With}
   */
  X_REQUESTED_WITH: "X-Requested-With",

  /**
   * Enables cross-site scripting filtering in the browser.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-XSS-Protection|MDN-X-XSS-Protection}
   */
  X_XSS_PROTECTION: "X-XSS-Protection",
});

/** The frozen HTTP header enum value mapping header keys to their canonical string values. */
export const header = httpHeader.value;

/** The full HTTP header enum type. */
export type LtrlHTTPHeader = typeof header;

/** Union of all HTTP header keys (e.g. `"CONTENT_TYPE"`, `"AUTHORIZATION"`). */
export type HTTPHeader = keyof LtrlHTTPHeader;
/** Union of all HTTP header canonical values (e.g. `"Content-Type"`, `"Authorization"`). */
export type HTTPHeaderValue = LtrlHTTPHeader[HTTPHeader];

/** Checks whether a given key-value pair matches the HTTP header enum. */
export const isHTTPHeader = httpHeader.evaluate;
/** Checks whether a string is a valid HTTP header key. */
export const isHTTPHeaderKey = httpHeader.identify;

/** Resolves the canonical header value for an HTTP header key. */
export const useHTTPHeader = httpHeader.resolve;
/** Reverse-lookups the header key for a given canonical header value. */
export const useHTTPHeaderLookup = httpHeader.lookup;

/** Returns all HTTP headers as an array of `{ key, value }` entries. */
export const useHTTPHeaderList = httpHeader.list;
