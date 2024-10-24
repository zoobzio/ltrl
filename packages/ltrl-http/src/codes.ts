import { ltrl } from "ltrl";

const ltrlCodes = ltrl([
  {
    key: 100,
    label: "Continue",
    description:
      "The server has received the request headers, and the client should proceed to send the request body.",
  },
  {
    key: 101,
    label: "Switching Protocols",
    description: "The requester has asked the server to switch protocols.",
  },
  {
    key: 102,
    label: "Processing",
    description:
      "This code indicates that the server has received and is processing the request, but no response is available yet. This prevents the client from timing out and assuming the request was lost.",
  },
  {
    key: 103,
    label: "Early Hints",
    description:
      "Used to return some response headers before final HTTP message.",
  },
  {
    key: 200,
    label: "OK",
    description:
      "The request is OK (this is the standard response for successful HTTP requests).",
  },
  {
    key: 201,
    label: "Created",
    description:
      "The request has been fulfilled, and a new resource is created.",
  },
  {
    key: 202,
    label: "Accepted",
    description:
      "The request has been accepted for processing, but the processing has not been completed.",
  },
  {
    key: 203,
    label: "Non-Authoritative Information",
    description:
      "The request has been successfully processed, but is returning information that may be from another source.",
  },
  {
    key: 204,
    label: "No Content",
    description:
      "The request has been successfully processed, but is not returning any content.",
  },
  {
    key: 205,
    label: "Reset Content",
    description:
      "The request has been successfully processed, but is not returning any content, and requires that the requester reset the document view.",
  },
  {
    key: 206,
    label: "Partial Content",
    description:
      "The server is delivering only part of the resource due to a range header sent by the client.",
  },
  {
    key: 207,
    label: "Multi-Status",
    description:
      "The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.",
  },
  {
    key: 208,
    label: "Already Reported",
    description:
      "The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.",
  },
  {
    key: 218,
    label: "This is fine (Apache Web Server)",
    description:
      "Used as a catch-all error condition for allowing response bodies to flow through Apache when ProxyErrorOverride is enabled.",
  },
  {
    key: 226,
    label: "IM Used",
    description:
      "The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",
  },
  {
    key: 300,
    label: "Multiple Choices",
    description:
      "A link list. The user can select a link and go to that location. Maximum five addresses.",
  },
  {
    key: 301,
    label: "Moved Permanently",
    description: "The requested page has moved to a new URL.",
  },
  {
    key: 302,
    label: "Found",
    description: "The requested page has moved temporarily to a new URL.",
  },
  {
    key: 303,
    label: "See Other",
    description: "The requested page can be found under a different URL.",
  },
  {
    key: 304,
    label: "Not Modified",
    description:
      "Indicates the requested page has not been modified since last requested.",
  },
  {
    key: 306,
    label: "Switch Proxy",
    description:
      'No longer used. Originally meant "Subsequent requests should use the specified proxy."',
  },
  {
    key: 307,
    label: "Temporary Redirect",
    description: "The requested page has moved temporarily to a new URL.",
  },
  {
    key: 308,
    label: "Resume Incomplete",
    description:
      "Used in the resumable requests proposal to resume aborted PUT or POST requests.",
  },
  {
    key: 400,
    label: "Bad Request",
    description: "The request cannot be fulfilled due to bad syntax.",
  },
  {
    key: 401,
    label: "Unauthorized",
    description:
      "The request was a legal request, but the server is refusing to respond to it. For use when authentication is possible but has failed or not yet been provided.",
  },
  {
    key: 402,
    label: "Payment Required",
    description:
      "Not yet implemented by RFC standards, but reserved for future use.",
  },
  {
    key: 403,
    label: "Forbidden",
    description:
      "The request was a legal request, but the server is refusing to respond to it.",
  },
  {
    key: 404,
    label: "Not Found",
    description:
      "The requested page could not be found but may be available again in the future.",
  },
  {
    key: 405,
    label: "Method Not Allowed",
    description:
      "A request was made of a page using a request method not supported by that page.",
  },
  {
    key: 406,
    label: "Not Acceptable",
    description:
      "The server can only generate a response that is not accepted by the client.",
  },
  {
    key: 407,
    label: "Proxy Authentication Required",
    description: "The client must first authenticate itself with the proxy.",
  },
  {
    key: 408,
    label: "Request Timeout",
    description: "The server timed out waiting for the request.",
  },
  {
    key: 409,
    label: "Conflict",
    description:
      "The request could not be completed because of a conflict in the request.",
  },
  {
    key: 410,
    label: "Gone",
    description: "The requested page is no longer available.",
  },
  {
    key: 411,
    label: "Length Required",
    description:
      'The "Content-Length" is not defined. The server will not accept the request without it.',
  },
  {
    key: 412,
    label: "Precondition Failed",
    description:
      "The precondition given in the request evaluated to false by the server.",
  },
  {
    key: 413,
    label: "Request Entity Too Large",
    description:
      "The server will not accept the request, because the request entity is too large.",
  },
  {
    key: 414,
    label: "Request-URI Too Long",
    description:
      "The server will not accept the request, because the URL is too long. Occurs when you convert a POST request to a GET request with a long query information.",
  },
  {
    key: 415,
    label: "Unsupported Media Type",
    description:
      "The server will not accept the request, because the media type is not supported.",
  },
  {
    key: 416,
    label: "Requested Range Not Satisfiable",
    description:
      "The client has asked for a portion of the file, but the server cannot supply that portion.",
  },
  {
    key: 417,
    label: "Expectation Failed",
    description:
      "The server cannot meet the requirements of the Expect request-header field.",
  },
  {
    key: 418,
    label: "I'm a teapot",
    description:
      'Any attempt to brew coffee with a teapot should result in the error code "418 I\'m a teapot". The resulting entity body MAY be short and stout.',
  },
  {
    key: 419,
    label: "Page Expired (Laravel Framework)",
    description:
      "Used by the Laravel Framework when a CSRF Token is missing or expired.",
  },
  {
    key: 420,
    label: "Method Failure (Spring Framework)",
    description:
      "A deprecated response used by the Spring Framework when a method has failed.",
  },
  {
    key: 421,
    label: "Misdirected Request",
    description:
      "The request was directed at a server that is not able to produce a response (for example because a connection reuse).",
  },
  {
    key: 422,
    label: "Unprocessable Entity",
    description:
      "The request was well-formed but was unable to be followed due to semantic errors.",
  },
  {
    key: 423,
    label: "Locked",
    description: "The resource that is being accessed is locked.",
  },
  {
    key: 424,
    label: "Failed Dependency",
    description:
      "The request failed due to failure of a previous request (e.g., a PROPPATCH).",
  },
  {
    key: 426,
    label: "Upgrade Required",
    description:
      "The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.",
  },
  {
    key: 428,
    label: "Precondition Required",
    description: "The origin server requires the request to be conditional.",
  },
  {
    key: 429,
    label: "Too Many Requests",
    description:
      "The user has sent too many requests in a given amount of time. Intended for use with rate limiting schemes.",
  },
  {
    key: 431,
    label: "Request Header Fields Too Large",
    description:
      "The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.",
  },
  {
    key: 440,
    label: "Login Time-out",
    description:
      "The client's session has expired and must log in again. (IIS)",
  },
  {
    key: 444,
    label: "Connection Closed Without Response",
    description:
      "A non-standard status code used to instruct nginx to close the connection without sending a response to the client, most commonly used to deny malicious or malformed requests.",
  },
  {
    key: 449,
    label: "Retry With",
    description:
      "The server cannot honour the request because the user has not provided the required information. (IIS)",
  },
  {
    key: 450,
    label: "Blocked by Windows Parental Controls",
    description:
      "The Microsoft extension code indicated when Windows Parental Controls are turned on and are blocking access to the requested webpage.",
  },
  {
    key: 451,
    label: "Unavailable For Legal Reasons",
    description:
      "A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.",
  },
  {
    key: 494,
    label: "Request Header Too Large",
    description:
      "Used by nginx to indicate the client sent too large of a request or header line that is too long.",
  },
  {
    key: 495,
    label: "SSL Certificate Error",
    description:
      "An expansion of the 400 Bad Request response code, used when the client has provided an invalid client certificate.",
  },
  {
    key: 496,
    label: "SSL Certificate Required",
    description:
      "An expansion of the 400 Bad Request response code, used when a client certificate is required but not provided.",
  },
  {
    key: 497,
    label: "HTTP Request Sent to HTTPS Port",
    description:
      "An expansion of the 400 Bad Request response code, used when the client has made a HTTP request to a port listening for HTTPS requests.",
  },
  {
    key: 498,
    label: "Invalid Token (Esri)",
    description:
      "Returned by ArcGIS for Server. Code 498 indicates an expired or otherwise invalid token.",
  },
  {
    key: 499,
    label: "Client Closed Request",
    description:
      "A non-standard status code introduced by nginx for the case when a client closes the connection while nginx is processing the request.",
  },
  {
    key: 500,
    label: "Internal Server Error",
    description:
      "An error has occurred in a server side script, a no more specific message is suitable.",
  },
  {
    key: 501,
    label: "Not Implemented",
    description:
      "The server either does not recognize the request method, or it lacks the ability to fulfill the request.",
  },
  {
    key: 502,
    label: "Bad Gateway",
    description:
      "The server was acting as a gateway or proxy and received an invalid response from the upstream server.",
  },
  {
    key: 503,
    label: "Service Unavailable",
    description: "The server is currently unavailable (overloaded or down).",
  },
  {
    key: 504,
    label: "Gateway Timeout",
    description:
      "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.",
  },
  {
    key: 505,
    label: "HTTP Version Not Supported",
    description:
      "The server does not support the HTTP protocol version used in the request.",
  },
  {
    key: 506,
    label: "Variant Also Negotiates",
    description:
      "Transparent content negotiation for the request results in a circular reference.",
  },
  {
    key: 507,
    label: "Insufficient Storage",
    description:
      "The server is unable to store the representation needed to complete the request.",
  },
  {
    key: 508,
    label: "Loop Detected",
    description:
      "The server detected an infinite loop while processing the request (sent instead of 208 Already Reported).",
  },
  {
    key: 509,
    label: "Bandwidth Limit Exceeded",
    description:
      "The server has exceeded the bandwidth specified by the server administrator; this is often used by shared hosting providers to limit the bandwidth of customers.",
  },
  {
    key: 510,
    label: "Not Extended",
    description:
      "Further extensions to the request are required for the server to fulfil it.",
  },
  {
    key: 511,
    label: "Network Authentication Required",
    description: "The client needs to authenticate to gain network access.",
  },
  {
    key: 520,
    label: "Unknown Error",
    description:
      'The 520 error is used as a "catch-all response for when the origin server returns something unexpected", listing connection resets, large headers, and empty or invalid responses as common triggers.',
  },
  {
    key: 521,
    label: "Web Server Is Down",
    description:
      "The origin server has refused the connection from Cloudflare.",
  },
  {
    key: 522,
    label: "Connection Timed Out",
    description:
      "Cloudflare could not negotiate a TCP handshake with the origin server.",
  },
  {
    key: 523,
    label: "Origin Is Unreachable",
    description:
      "Cloudflare could not reach the origin server; for example, if the DNS records for the origin server are incorrect.",
  },
  {
    key: 524,
    label: "A Timeout Occurred",
    description:
      "Cloudflare was able to complete a TCP connection to the origin server, but did not receive a timely HTTP response.",
  },
  {
    key: 525,
    label: "SSL Handshake Failed",
    description:
      "Cloudflare could not negotiate a SSL/TLS handshake with the origin server.",
  },
  {
    key: 526,
    label: "Invalid SSL Certificate",
    description:
      "Used by Cloudflare and Cloud Foundry's gorouter to indicate failure to validate the SSL/TLS certificate that the origin server presented.",
  },
  {
    key: 527,
    label: "Railgun Listener to Origin Error",
    description:
      "Error 527 indicates that the request timed out or failed after the WAN connection had been established.",
  },
  {
    key: 530,
    label: "Origin DNS Error",
    description:
      "Error 530 indicates that the requested host name could not be resolved on the Cloudflare network to an origin server.",
  },
  {
    key: 598,
    label: "Network Read Timeout Error",
    description:
      "Used by some HTTP proxies to signal a network read timeout behind the proxy to a client in front of the proxy.",
  },
]);

export type HTTPCode = (typeof ltrlCodes.value)[number]["key"];

export const isHTTPCode = ltrlCodes.evalKey;
export const useHTTPCode = ltrlCodes.resolve;
export const useHTTPCodeConfig = () => ltrlCodes;
