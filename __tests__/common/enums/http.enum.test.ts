import {
  ContentTypes,
  HttpMethods,
  ResponseEncodings,
  ResponseHeaders,
  ResponseTypes,
} from "../../common/enums/http.enum";

describe("HTTP Enums", () => {
  it("should have correct values for ContentTypes", () => {
    expect(ContentTypes.Html).toBe("text/html");
    expect(ContentTypes.Plain).toBe("text/plain");
    expect(ContentTypes.FormData).toBe("multipart/form-data");
    expect(ContentTypes.Json).toBe("application/json");
    expect(ContentTypes.UrlEncoded).toBe("application/x-www-form-urlencoded");
    expect(ContentTypes.OctetStream).toBe("application/octet-stream");
  });

  it("should have correct values for ResponseHeaders", () => {
    expect(ResponseHeaders.Server).toBe("Server");
    expect(ResponseHeaders.ContentType).toBe("Content-Type");
    expect(ResponseHeaders.ContentLength).toBe("Content-Length");
    expect(ResponseHeaders.CacheControl).toBe("Cache-Control");
    expect(ResponseHeaders.ContentEncoding).toBe("Content-Encoding");
  });

  it("should have correct values for HttpMethods", () => {
    expect(HttpMethods.Get).toBe("GET");
    expect(HttpMethods.Delete).toBe("DELETE");
    expect(HttpMethods.Head).toBe("HEAD");
    expect(HttpMethods.Options).toBe("OPTIONS");
    expect(HttpMethods.Post).toBe("POST");
    expect(HttpMethods.Put).toBe("PUT");
    expect(HttpMethods.Patch).toBe("PATCH");
    expect(HttpMethods.Purge).toBe("PURGE");
    expect(HttpMethods.Link).toBe("LINK");
    expect(HttpMethods.Unlink).toBe("UNLINK");
  });

  it("should have correct values for ResponseTypes", () => {
    expect(ResponseTypes.ArrayBuffer).toBe("arraybuffer");
    expect(ResponseTypes.Blob).toBe("blob");
    expect(ResponseTypes.Document).toBe("document");
    expect(ResponseTypes.Json).toBe("json");
    expect(ResponseTypes.Text).toBe("text");
    expect(ResponseTypes.Stream).toBe("stream");
  });

  it("should have correct values for ResponseEncodings", () => {
    expect(ResponseEncodings.Ascii).toBe("ascii");
    expect(ResponseEncodings.Ansi).toBe("ansi");
    expect(ResponseEncodings.Binary).toBe("binary");
    expect(ResponseEncodings.Base64).toBe("base64");
    expect(ResponseEncodings.Base64Url).toBe("base64url");
    expect(ResponseEncodings.Hex).toBe("hex");
    expect(ResponseEncodings.Latin1).toBe("latin1");
    expect(ResponseEncodings.Ucs2).toBe("ucs-2");
    expect(ResponseEncodings.Utf8).toBe("utf-8");
    expect(ResponseEncodings.Utf16le).toBe("utf16le");
  });
});
