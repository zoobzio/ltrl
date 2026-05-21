import { ltrl } from "ltrl";

const httpMime = ltrl({
  /**
   * JavaScript Object Notation; a lightweight data interchange format.
   * @see {@link https://www.iana.org/assignments/media-types/application/json|IANA-application/json}
   */
  JSON: "application/json",

  /**
   * Extensible Markup Language; a markup language for encoding structured data.
   * @see {@link https://www.iana.org/assignments/media-types/application/xml|IANA-application/xml}
   */
  XML: "application/xml",

  /**
   * URL-encoded form data; the default encoding for HTML form submissions.
   * @see {@link https://www.iana.org/assignments/media-types/application/x-www-form-urlencoded|IANA-application/x-www-form-urlencoded}
   */
  FORM_URLENCODED: "application/x-www-form-urlencoded",

  /**
   * Arbitrary binary data; used when the media type is unknown.
   * @see {@link https://www.iana.org/assignments/media-types/application/octet-stream|IANA-application/octet-stream}
   */
  OCTET_STREAM: "application/octet-stream",

  /**
   * Portable Document Format; a file format for documents with fixed layout.
   * @see {@link https://www.iana.org/assignments/media-types/application/pdf|IANA-application/pdf}
   */
  PDF: "application/pdf",

  /**
   * ZIP archive; a compressed archive file format.
   * @see {@link https://www.iana.org/assignments/media-types/application/zip|IANA-application/zip}
   */
  ZIP: "application/zip",

  /**
   * Gzip compressed data.
   * @see {@link https://www.iana.org/assignments/media-types/application/gzip|IANA-application/gzip}
   */
  GZIP: "application/gzip",

  /**
   * JavaScript source code.
   * @see {@link https://www.iana.org/assignments/media-types/application/javascript|IANA-application/javascript}
   */
  JAVASCRIPT: "application/javascript",

  /**
   * WebAssembly binary format.
   * @see {@link https://www.iana.org/assignments/media-types/application/wasm|IANA-application/wasm}
   */
  WASM: "application/wasm",

  /**
   * GraphQL query responses encoded as JSON.
   * @see {@link https://www.iana.org/assignments/media-types/application/graphql+json|IANA-application/graphql+json}
   */
  GRAPHQL: "application/graphql+json",

  /**
   * JSON Web Token; a compact token format for securely transmitting claims.
   * @see {@link https://www.iana.org/assignments/media-types/application/jwt|IANA-application/jwt}
   */
  JWT: "application/jwt",

  /**
   * YAML Ain't Markup Language; a human-readable data serialization format.
   * @see {@link https://www.iana.org/assignments/media-types/application/yaml|IANA-application/yaml}
   */
  YAML: "application/yaml",

  /**
   * MessagePack; an efficient binary serialization format.
   * @see {@link https://www.iana.org/assignments/media-types/application/msgpack|IANA-application/msgpack}
   */
  MSGPACK: "application/msgpack",

  /**
   * Protocol Buffers; a binary serialization format developed by Google.
   * @see {@link https://www.iana.org/assignments/media-types/application/protobuf|IANA-application/protobuf}
   */
  PROTOBUF: "application/protobuf",

  /**
   * Problem Details for HTTP APIs expressed as JSON.
   * @see {@link https://www.iana.org/assignments/media-types/application/problem+json|IANA-application/problem+json}
   */
  PROBLEM_JSON: "application/problem+json",

  /**
   * Problem Details for HTTP APIs expressed as XML.
   * @see {@link https://www.iana.org/assignments/media-types/application/problem+xml|IANA-application/problem+xml}
   */
  PROBLEM_XML: "application/problem+xml",

  /**
   * JSON-LD; JSON-based format for linked data.
   * @see {@link https://www.iana.org/assignments/media-types/application/ld+json|IANA-application/ld+json}
   */
  JSONLD: "application/ld+json",

  /**
   * Concise Binary Object Representation; a binary data format modeled on JSON.
   * @see {@link https://www.iana.org/assignments/media-types/application/cbor|IANA-application/cbor}
   */
  CBOR: "application/cbor",

  /**
   * Plain text with no specific formatting.
   * @see {@link https://www.iana.org/assignments/media-types/text/plain|IANA-text/plain}
   */
  PLAIN: "text/plain",

  /**
   * HyperText Markup Language; the standard markup language for web pages.
   * @see {@link https://www.iana.org/assignments/media-types/text/html|IANA-text/html}
   */
  HTML: "text/html",

  /**
   * Cascading Style Sheets; a stylesheet language for describing presentation of documents.
   * @see {@link https://www.iana.org/assignments/media-types/text/css|IANA-text/css}
   */
  CSS: "text/css",

  /**
   * Comma-Separated Values; a plain text format for tabular data.
   * @see {@link https://www.iana.org/assignments/media-types/text/csv|IANA-text/csv}
   */
  CSV: "text/csv",

  /**
   * Markdown; a lightweight markup language for creating formatted text.
   * @see {@link https://www.iana.org/assignments/media-types/text/markdown|IANA-text/markdown}
   */
  MARKDOWN: "text/markdown",

  /**
   * Server-Sent Events; a streaming format for pushing events from server to client.
   * @see {@link https://www.iana.org/assignments/media-types/text/event-stream|IANA-text/event-stream}
   */
  EVENT_STREAM: "text/event-stream",

  /**
   * XML encoded as text; used when XML is treated as plain text content.
   * @see {@link https://www.iana.org/assignments/media-types/text/xml|IANA-text/xml}
   */
  XML_TEXT: "text/xml",

  /**
   * Form data encoded as a multipart message; used for file uploads.
   * @see {@link https://www.iana.org/assignments/media-types/multipart/form-data|IANA-multipart/form-data}
   */
  FORM_DATA: "multipart/form-data",

  /**
   * Multiple independent body parts bundled together in a single message.
   * @see {@link https://www.iana.org/assignments/media-types/multipart/mixed|IANA-multipart/mixed}
   */
  MIXED: "multipart/mixed",

  /**
   * Multiple alternative representations of the same content.
   * @see {@link https://www.iana.org/assignments/media-types/multipart/alternative|IANA-multipart/alternative}
   */
  ALTERNATIVE: "multipart/alternative",

  /**
   * Portable Network Graphics; a lossless raster image format.
   * @see {@link https://www.iana.org/assignments/media-types/image/png|IANA-image/png}
   */
  PNG: "image/png",

  /**
   * JPEG image; a lossy compressed raster image format.
   * @see {@link https://www.iana.org/assignments/media-types/image/jpeg|IANA-image/jpeg}
   */
  JPEG: "image/jpeg",

  /**
   * Graphics Interchange Format; supports animation and lossless compression.
   * @see {@link https://www.iana.org/assignments/media-types/image/gif|IANA-image/gif}
   */
  GIF: "image/gif",

  /**
   * WebP image; a modern format providing both lossy and lossless compression.
   * @see {@link https://www.iana.org/assignments/media-types/image/webp|IANA-image/webp}
   */
  WEBP: "image/webp",

  /**
   * Scalable Vector Graphics; an XML-based vector image format.
   * @see {@link https://www.iana.org/assignments/media-types/image/svg+xml|IANA-image/svg+xml}
   */
  SVG: "image/svg+xml",

  /**
   * AV1 Image File Format; a modern image format based on the AV1 video codec.
   * @see {@link https://www.iana.org/assignments/media-types/image/avif|IANA-image/avif}
   */
  AVIF: "image/avif",

  /**
   * ICO image; a file format for icons on Windows.
   * @see {@link https://www.iana.org/assignments/media-types/image/x-icon|IANA-image/x-icon}
   */
  ICO: "image/x-icon",

  /**
   * MPEG audio; the most common format for lossy audio compression.
   * @see {@link https://www.iana.org/assignments/media-types/audio/mpeg|IANA-audio/mpeg}
   */
  MP3: "audio/mpeg",

  /**
   * Ogg audio; a free, open container format for audio.
   * @see {@link https://www.iana.org/assignments/media-types/audio/ogg|IANA-audio/ogg}
   */
  OGG_AUDIO: "audio/ogg",

  /**
   * Waveform Audio; an uncompressed audio file format.
   * @see {@link https://www.iana.org/assignments/media-types/audio/wav|IANA-audio/wav}
   */
  WAV: "audio/wav",

  /**
   * WebM audio; an open media container format for audio.
   * @see {@link https://www.iana.org/assignments/media-types/audio/webm|IANA-audio/webm}
   */
  WEBM_AUDIO: "audio/webm",

  /**
   * MPEG-4 Part 14 video; a widely-used multimedia container format.
   * @see {@link https://www.iana.org/assignments/media-types/video/mp4|IANA-video/mp4}
   */
  MP4: "video/mp4",

  /**
   * Ogg video; a free, open container format for video.
   * @see {@link https://www.iana.org/assignments/media-types/video/ogg|IANA-video/ogg}
   */
  OGG_VIDEO: "video/ogg",

  /**
   * WebM video; an open media container format for video.
   * @see {@link https://www.iana.org/assignments/media-types/video/webm|IANA-video/webm}
   */
  WEBM_VIDEO: "video/webm",

  /**
   * Web Open Font Format; a compressed font format for web use.
   * @see {@link https://www.iana.org/assignments/media-types/font/woff|IANA-font/woff}
   */
  WOFF: "font/woff",

  /**
   * Web Open Font Format 2; an improved version of WOFF with better compression.
   * @see {@link https://www.iana.org/assignments/media-types/font/woff2|IANA-font/woff2}
   */
  WOFF2: "font/woff2",

  /**
   * TrueType Font; an outline font standard developed by Apple and Microsoft.
   * @see {@link https://www.iana.org/assignments/media-types/font/ttf|IANA-font/ttf}
   */
  TTF: "font/ttf",

  /**
   * OpenType Font; an extension of TrueType with support for advanced typographic features.
   * @see {@link https://www.iana.org/assignments/media-types/font/otf|IANA-font/otf}
   */
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
