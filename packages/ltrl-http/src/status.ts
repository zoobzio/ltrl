import { ltrl } from "ltrl";

const httpStatus = ltrl({
  /**
   * The server has received the request headers and the client should proceed
   * to send the request body.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/100|MDN-100-Continue}
   */
  CONTINUE: 100,

  /**
   * The requester has asked the server to switch protocols and the server has
   * agreed to do so.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/101|MDN-101-Switching-Protocols}
   */
  SWITCHING_PROTOCOLS: 101,

  /**
   * The server has received and is processing the request, but no response is
   * available yet.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/102|MDN-102-Processing}
   */
  PROCESSING: 102,

  /**
   * Used to return some response headers before final HTTP message.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/103|MDN-103-Early-Hints}
   */
  EARLY_HINTS: 103,

  /**
   * The request has succeeded.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/200|MDN-200-OK}
   */
  OK: 200,

  /**
   * The request has been fulfilled, resulting in the creation of a new
   * resource.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/201|MDN-201-Created}
   */
  CREATED: 201,

  /**
   * The request has been accepted for processing, but the processing has not
   * been completed.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/202|MDN-202-Accepted}
   */
  ACCEPTED: 202,

  /**
   * The server is a transforming proxy that received a 200 OK from its origin
   * but is returning a modified version of the origin's response.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/203|MDN-203-Non-Authoritative-Information}
   */
  NON_AUTHORITATIVE_INFORMATION: 203,

  /**
   * The server successfully processed the request and is not returning any
   * content.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/204|MDN-204-No-Content}
   */
  NO_CONTENT: 204,

  /**
   * The server successfully processed the request, asks that the requester
   * reset its document view, and is not returning any content.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/205|MDN-205-Reset-Content}
   */
  RESET_CONTENT: 205,

  /**
   * The server is delivering only part of the resource due to a range header
   * sent by the client.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/206|MDN-206-Partial-Content}
   */
  PARTIAL_CONTENT: 206,

  /**
   * The message body that follows is by default an XML message and can contain
   * a number of separate response codes.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/207|MDN-207-Multi-Status}
   */
  MULTI_STATUS: 207,

  /**
   * The members of a DAV binding have already been enumerated in a preceding
   * part of the multistatus response, and are not being included again.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/208|MDN-208-Already-Reported}
   */
  ALREADY_REPORTED: 208,

  /**
   * Used as a catch-all for a successful request when no other status code is
   * appropriate.
   * @see {@link
   *     https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml|IANA-218-This-Is-Fine}
   */
  THIS_IS_FINE: 218,

  /**
   * The server has fulfilled a request for the resource, and the response is a
   * representation of the result of one or more instance-manipulations applied
   * to the current instance.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/226|MDN-226-IM-Used}
   */
  IM_USED: 226,

  /**
   * Indicates multiple options for the resource from which the client may
   * choose.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/300|MDN-300-Multiple-Choices}
   */
  MULTIPLE_CHOICES: 300,

  /**
   * This and all future requests should be directed to the given URI.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/301|MDN-301-Moved-Permanently}
   */
  MOVED_PERMANENTLY: 301,

  /**
   * Tells the client to look at another URL.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/302|MDN-302-Found}
   */
  FOUND: 302,

  /**
   * The response to the request can be found under another URI using the GET
   * method.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/303|MDN-303-See-Other}
   */
  SEE_OTHER: 303,

  /**
   * Indicates that the resource has not been modified since the version
   * specified by the request headers.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/304|MDN-304-Not-Modified}
   */
  NOT_MODIFIED: 304,

  /**
   * No longer used. Originally meant subsequent requests should use the
   * specified proxy.
   * @see {@link
   *     https://datatracker.ietf.org/doc/html/rfc7231#section-6.4.6|RFC-7231-306-Switch-Proxy}
   */
  SWITCH_PROXY: 306,

  /**
   * The request should be repeated with another URI, but future requests should
   * still use the original URI.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/307|MDN-307-Temporary-Redirect}
   */
  TEMPORARY_REDIRECT: 307,

  /**
   * The request and all future requests should be repeated using another URI.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/308|MDN-308-Permanent-Redirect}
   */
  RESUME_INCOMPLETE: 308,

  /**
   * The server cannot or will not process the request due to an apparent client
   * error.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/400|MDN-400-Bad-Request}
   */
  BAD_REQUEST: 400,

  /**
   * Authentication is required and has failed or has not yet been provided.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/401|MDN-401-Unauthorized}
   */
  UNAUTHORIZED: 401,

  /**
   * Reserved for future use. The original intention was that this code might be
   * used as part of some form of digital cash or micropayment scheme.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402|MDN-402-Payment-Required}
   */
  PAYMENT_REQUIRED: 402,

  /**
   * The request contained valid data and was understood by the server, but the
   * server is refusing action.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/403|MDN-403-Forbidden}
   */
  FORBIDDEN: 403,

  /**
   * The requested resource could not be found but may be available in the
   * future.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/404|MDN-404-Not-Found}
   */
  NOT_FOUND: 404,

  /**
   * A request method is not supported for the requested resource.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/405|MDN-405-Method-Not-Allowed}
   */
  METHOD_NOT_ALLOWED: 405,

  /**
   * The requested resource is capable of generating only content not acceptable
   * according to the Accept headers sent in the request.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/406|MDN-406-Not-Acceptable}
   */
  NOT_ACCEPTABLE: 406,

  /**
   * The client must first authenticate itself with the proxy.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/407|MDN-407-Proxy-Authentication-Required}
   */
  PROXY_AUTHENTICATION_REQUIRED: 407,

  /**
   * The server timed out waiting for the request.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/408|MDN-408-Request-Timeout}
   */
  REQUEST_TIMEOUT: 408,

  /**
   * Indicates that the request could not be processed because of conflict in
   * the current state of the resource.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/409|MDN-409-Conflict}
   */
  CONFLICT: 409,

  /**
   * Indicates that the resource requested was previously in use but is no
   * longer available and will not be available again.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/410|MDN-410-Gone}
   */
  GONE: 410,

  /**
   * The request did not specify the length of its content, which is required by
   * the requested resource.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/411|MDN-411-Length-Required}
   */
  LENGTH_REQUIRED: 411,

  /**
   * The server does not meet one of the preconditions that the requester put on
   * the request header fields.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/412|MDN-412-Precondition-Failed}
   */
  PRECONDITION_FAILED: 412,

  /**
   * The request is larger than the server is willing or able to process.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/413|MDN-413-Content-Too-Large}
   */
  REQUEST_ENTITY_TOO_LARGE: 413,

  /**
   * The URI provided was too long for the server to process.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/414|MDN-414-URI-Too-Long}
   */
  REQUEST_URI_TOO_LONG: 414,

  /**
   * The request entity has a media type which the server or resource does not
   * support.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/415|MDN-415-Unsupported-Media-Type}
   */
  UNSUPPORTED_MEDIA_TYPE: 415,

  /**
   * The client has asked for a portion of the file, but the server cannot
   * supply that portion.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/416|MDN-416-Range-Not-Satisfiable}
   */
  REQUESTED_RANGE_NOT_SATISFIABLE: 416,

  /**
   * The server cannot meet the requirements of the Expect request-header field.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/417|MDN-417-Expectation-Failed}
   */
  EXPECTATION_FAILED: 417,

  /**
   * This code was defined in 1998 as an April Fools' joke in RFC 2324, Hyper
   * Text Coffee Pot Control Protocol, and is not expected to be implemented by
   * actual HTTP servers.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/418|MDN-418-Im-A-Teapot}
   */
  IM_A_TEAPOT: 418,

  /**
   * Used when the session has expired and needs to be refreshed.
   * @see {@link
   *     https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml|IANA-419-Page-Expired}
   */
  PAGE_EXPIRED: 419,

  /**
   * A method failure has occurred.
   * @see {@link
   *     https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml|IANA-420-Method-Failure}
   */
  METHOD_FAILURE: 420,

  /**
   * The request was directed at a server that is not able to produce a
   * response.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/421|MDN-421-Misdirected-Request}
   */
  MISDIRECTED_REQUEST: 421,

  /**
   * The request was well-formed but was unable to be followed due to semantic
   * errors.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/422|MDN-422-Unprocessable-Content}
   */
  UNPROCESSABLE_ENTITY: 422,

  /**
   * The resource that is being accessed is locked.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/423|MDN-423-Locked}
   */
  LOCKED: 423,

  /**
   * The request failed because it depended on another request and that request
   * failed.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/424|MDN-424-Failed-Dependency}
   */
  FAILED_DEPENDENCY: 424,

  /**
   * The client should switch to a different protocol.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/426|MDN-426-Upgrade-Required}
   */
  UPGRADE_REQUIRED: 426,

  /**
   * The origin server requires the request to be conditional.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/428|MDN-428-Precondition-Required}
   */
  PRECONDITION_REQUIRED: 428,

  /**
   * The user has sent too many requests in a given amount of time.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429|MDN-429-Too-Many-Requests}
   */
  TOO_MANY_REQUESTS: 429,

  /**
   * The server is unwilling to process the request because either an individual
   * header field, or all the header fields collectively, are too large.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/431|MDN-431-Request-Header-Fields-Too-Large}
   */
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,

  /**
   * The client's session has expired and must log in again.
   * @see {@link
   *     https://learn.microsoft.com/en-us/troubleshoot/developer/webapps/iis/www-administration-management/http-status-code|IIS-440-Login-Timeout}
   */
  LOGIN_TIMEOUT: 440,

  /**
   * The connection was closed without sending any headers in response.
   * @see {@link
   *     https://nginx.org/en/docs/http/ngx_http_core_module.html|Nginx-444-No-Response}
   */
  CONNECTION_CLOSED_WITHOUT_RESPONSE: 444,

  /**
   * The server cannot honour the request because the user has not provided the
   * required information.
   * @see {@link
   *     https://learn.microsoft.com/en-us/troubleshoot/developer/webapps/iis/www-administration-management/http-status-code|IIS-449-Retry-With}
   */
  RETRY_WITH: 449,

  /**
   * Access to this resource has been denied by Windows Parental Controls.
   * @see {@link
   *     https://learn.microsoft.com/en-us/troubleshoot/developer/webapps/iis/www-administration-management/http-status-code|Microsoft-450-Blocked-By-Parental-Controls}
   */
  BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS: 450,

  /**
   * A server operator has received a legal demand to deny access to a resource
   * or to a set of resources that includes the requested resource.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/451|MDN-451-Unavailable-For-Legal-Reasons}
   */
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,

  /**
   * The client sent too large of a request header.
   * @see {@link
   *     https://nginx.org/en/docs/http/ngx_http_core_module.html|Nginx-494-Request-Header-Too-Large}
   */
  REQUEST_HEADER_TOO_LARGE: 494,

  /**
   * An SSL client certificate error occurred.
   * @see {@link
   *     https://nginx.org/en/docs/http/ngx_http_core_module.html|Nginx-495-SSL-Certificate-Error}
   */
  SSL_CERTIFICATE_ERROR: 495,

  /**
   * A client certificate is required but was not provided.
   * @see {@link
   *     https://nginx.org/en/docs/http/ngx_http_core_module.html|Nginx-496-SSL-Certificate-Required}
   */
  SSL_CERTIFICATE_REQUIRED: 496,

  /**
   * An HTTP request was sent to an HTTPS port.
   * @see {@link
   *     https://nginx.org/en/docs/http/ngx_http_core_module.html|Nginx-497-HTTP-To-HTTPS}
   */
  HTTP_REQUEST_SENT_TO_HTTPS_PORT: 497,

  /**
   * The provided token is expired or otherwise invalid.
   * @see {@link
   *     https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml|IANA-498-Invalid-Token}
   */
  INVALID_TOKEN: 498,

  /**
   * The client closed the request before the server could send a response.
   * @see {@link
   *     https://nginx.org/en/docs/http/ngx_http_core_module.html|Nginx-499-Client-Closed-Request}
   */
  CLIENT_CLOSED_REQUEST: 499,

  /**
   * A generic error message, given when an unexpected condition was encountered
   * and no more specific message is suitable.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/500|MDN-500-Internal-Server-Error}
   */
  INTERNAL_SERVER_ERROR: 500,

  /**
   * The server either does not recognize the request method, or it lacks the
   * ability to fulfil the request.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/501|MDN-501-Not-Implemented}
   */
  NOT_IMPLEMENTED: 501,

  /**
   * The server was acting as a gateway or proxy and received an invalid
   * response from the upstream server.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/502|MDN-502-Bad-Gateway}
   */
  BAD_GATEWAY: 502,

  /**
   * The server cannot handle the request because it is overloaded or down for
   * maintenance.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/503|MDN-503-Service-Unavailable}
   */
  SERVICE_UNAVAILABLE: 503,

  /**
   * The server was acting as a gateway or proxy and did not receive a timely
   * response from the upstream server.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/504|MDN-504-Gateway-Timeout}
   */
  GATEWAY_TIMEOUT: 504,

  /**
   * The server does not support the HTTP version used in the request.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/505|MDN-505-HTTP-Version-Not-Supported}
   */
  HTTP_VERSION_NOT_SUPPORTED: 505,

  /**
   * Transparent content negotiation for the request results in a circular
   * reference.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/506|MDN-506-Variant-Also-Negotiates}
   */
  VARIANT_ALSO_NEGOTIATES: 506,

  /**
   * The server is unable to store the representation needed to complete the
   * request.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/507|MDN-507-Insufficient-Storage}
   */
  INSUFFICIENT_STORAGE: 507,

  /**
   * The server detected an infinite loop while processing the request.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/508|MDN-508-Loop-Detected}
   */
  LOOP_DETECTED: 508,

  /**
   * The server has exceeded the bandwidth specified by the server
   * administrator.
   * @see {@link
   *     https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml|IANA-509-Bandwidth-Limit-Exceeded}
   */
  BANDWIDTH_LIMIT_EXCEEDED: 509,

  /**
   * Further extensions to the request are required for the server to fulfil it.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/510|MDN-510-Not-Extended}
   */
  NOT_EXTENDED: 510,

  /**
   * The client needs to authenticate to gain network access.
   * @see {@link
   *     https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/511|MDN-511-Network-Authentication-Required}
   */
  NETWORK_AUTHENTICATION_REQUIRED: 511,

  /**
   * An unknown error has occurred.
   * @see {@link
   *     https://developers.cloudflare.com/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/|Cloudflare-520-Unknown-Error}
   */
  UNKNOWN_ERROR: 520,

  /**
   * The origin server has refused the connection.
   * @see {@link
   *     https://developers.cloudflare.com/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/|Cloudflare-521-Web-Server-Is-Down}
   */
  WEB_SERVER_IS_DOWN: 521,

  /**
   * The connection to the origin server timed out.
   * @see {@link
   *     https://developers.cloudflare.com/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/|Cloudflare-522-Connection-Timed-Out}
   */
  CONNECTION_TIMED_OUT: 522,

  /**
   * The origin server is unreachable.
   * @see {@link
   *     https://developers.cloudflare.com/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/|Cloudflare-523-Origin-Is-Unreachable}
   */
  ORIGIN_IS_UNREACHABLE: 523,

  /**
   * A timeout occurred while waiting for the origin server.
   * @see {@link
   *     https://developers.cloudflare.com/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/|Cloudflare-524-A-Timeout-Occurred}
   */
  TIMEOUT_OCCURRED: 524,

  /**
   * The SSL/TLS handshake with the origin server failed.
   * @see {@link
   *     https://developers.cloudflare.com/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/|Cloudflare-525-SSL-Handshake-Failed}
   */
  SSL_HANDSHAKE_FAILED: 525,

  /**
   * The SSL/TLS certificate presented by the origin server is invalid.
   * @see {@link
   *     https://developers.cloudflare.com/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/|Cloudflare-526-Invalid-SSL-Certificate}
   */
  INVALID_SSL_CERTIFICATE: 526,

  /**
   * An error occurred between the Railgun listener and the origin server.
   * @see {@link
   *     https://developers.cloudflare.com/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/|Cloudflare-527-Railgun-Error}
   */
  RAILGUN_LISTENER_TO_ORIGIN_ERROR: 527,

  /**
   * The host DNS entry for the origin server could not be resolved.
   * @see {@link
   *     https://developers.cloudflare.com/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/|Cloudflare-530-Origin-DNS-Error}
   */
  ORIGIN_DNS_ERROR: 530,

  /**
   * A network read timeout occurred behind the proxy.
   * @see {@link
   *     https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml|IANA-598-Network-Read-Timeout-Error}
   */
  NETWORK_READ_TIMEOUT_ERROR: 598,
});

/** The frozen HTTP status enum value mapping status names to numeric codes. */
export const status = httpStatus.value;

/** The full HTTP status enum type. */
export type LtrlHTTPStatus = typeof status;

/** Union of all HTTP status name keys (e.g. `"OK"`, `"NOT_FOUND"`). */
export type HTTPStatus = keyof LtrlHTTPStatus;
/** Union of all HTTP numeric status codes (e.g. `200`, `404`). */
export type HTTPCode = LtrlHTTPStatus[HTTPStatus];
/** Resolves the numeric code for a specific HTTP status name. */
export type HTTPStatusCode<K extends HTTPStatus> = LtrlHTTPStatus[K];

/** Checks whether a given key-value pair matches the HTTP status enum. */
export const isHTTPStatus = httpStatus.evaluate;
/** Checks whether a string is a valid HTTP status name. */
export const isHTTPCode = httpStatus.identify;

/** Resolves the numeric code for an HTTP status name. */
export const useHTTPStatus = httpStatus.resolve;
/** Reverse-lookups the status name for a given numeric HTTP code. */
export const useHTTPCode = httpStatus.lookup;

/** Returns all HTTP statuses as an array of `{ key, value }` entries. */
export const useHTTPStatusList = httpStatus.list;
