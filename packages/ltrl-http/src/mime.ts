import { ltrl } from "ltrl";

const httpMime = ltrl({
  // Application
  JSON: "application/json",
  XML: "application/xml",
  FORM_URLENCODED: "application/x-www-form-urlencoded",
  OCTET_STREAM: "application/octet-stream",
  PDF: "application/pdf",
  ZIP: "application/zip",
  GZIP: "application/gzip",
  JAVASCRIPT: "application/javascript",
  WASM: "application/wasm",
  GRAPHQL: "application/graphql+json",
  JWT: "application/jwt",
  YAML: "application/yaml",
  MSGPACK: "application/msgpack",
  PROTOBUF: "application/protobuf",
  PROBLEM_JSON: "application/problem+json",
  PROBLEM_XML: "application/problem+xml",
  JSONLD: "application/ld+json",
  CBOR: "application/cbor",

  // Text
  PLAIN: "text/plain",
  HTML: "text/html",
  CSS: "text/css",
  CSV: "text/csv",
  MARKDOWN: "text/markdown",
  EVENT_STREAM: "text/event-stream",
  XML_TEXT: "text/xml",

  // Multipart
  FORM_DATA: "multipart/form-data",
  MIXED: "multipart/mixed",
  ALTERNATIVE: "multipart/alternative",

  // Image
  PNG: "image/png",
  JPEG: "image/jpeg",
  GIF: "image/gif",
  WEBP: "image/webp",
  SVG: "image/svg+xml",
  AVIF: "image/avif",
  ICO: "image/x-icon",

  // Audio
  MP3: "audio/mpeg",
  OGG_AUDIO: "audio/ogg",
  WAV: "audio/wav",
  WEBM_AUDIO: "audio/webm",

  // Video
  MP4: "video/mp4",
  OGG_VIDEO: "video/ogg",
  WEBM_VIDEO: "video/webm",

  // Font
  WOFF: "font/woff",
  WOFF2: "font/woff2",
  TTF: "font/ttf",
  OTF: "font/otf",
});

export const mime = httpMime.value;

export type LtrlHTTPMime = typeof mime;

export type HTTPMime = keyof LtrlHTTPMime;
export type HTTPMimeValue = LtrlHTTPMime[HTTPMime];

export const isHTTPMime = httpMime.evaluate;
export const isHTTPMimeKey = httpMime.identify;

export const useHTTPMime = httpMime.resolve;
export const useHTTPMimeLookup = httpMime.lookup;

export const useHTTPMimeList = httpMime.list;
