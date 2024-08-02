export enum ContentTypes {
  Html = "text/html",
  Plain = "text/plain",
  FormData = "multipart/form-data",
  Json = "application/json",
  UrlEncoded = "application/x-www-form-urlencoded",
  OctetStream = "application/octet-stream",
}

export enum ResponseHeaders {
  Server = "Server",
  ContentType = "Content-Type",
  ContentLength = "Content-Length",
  CacheControl = "Cache-Control",
  ContentEncoding = "Content-Encoding",
}

export enum HttpMethods {
  Get = "GET",
  Delete = "DELETE",
  Head = "HEAD",
  Options = "OPTIONS",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Purge = "PURGE",
  Link = "LINK",
  Unlink = "UNLINK",
}

export enum ResponseTypes {
  ArrayBuffer = "arraybuffer",
  Blob = "blob",
  Document = "document",
  Json = "json",
  Text = "text",
  Stream = "stream",
}

export enum ResponseEncodings {
  Ascii = "ascii",
  Ansi = "ansi",
  Binary = "binary",
  Base64 = "base64",
  Base64Url = "base64url",
  Hex = "hex",
  Latin1 = "latin1",
  Ucs2 = "ucs-2",
  Utf8 = "utf-8",
  Utf16le = "utf16le",
}
