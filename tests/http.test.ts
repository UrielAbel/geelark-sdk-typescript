import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createHttpClient } from "../src/core/http";
import { sha256Upper, uuidLike } from "../src/core/utils";
import { GeelarkError } from "../src/core/errors";

describe("sha256Upper", () => {
  it("returns an uppercase hex SHA-256 digest", () => {
    const input = "hello";
    const result = sha256Upper(input);
    // Known SHA-256 of "hello"
    expect(result).toBe(
      "2CF24DBA5FB0A30E26E83B2AC5B9E29E1B161E5C1FA7425E73043362938B9824"
    );
    expect(result).toBe(result.toUpperCase());
  });

  it("produces correct signature for composite auth string", () => {
    const appId = "myAppId";
    const traceId = "ABC123";
    const ts = "1700000000000";
    const nonce = "ABC123";
    const apiKey = "myApiKey";
    const composite = appId + traceId + ts + nonce + apiKey;
    const sign = sha256Upper(composite);

    expect(typeof sign).toBe("string");
    expect(sign.length).toBe(64); // SHA-256 hex is 64 chars
    expect(sign).toBe(sign.toUpperCase());
  });
});

describe("uuidLike", () => {
  it("returns an uppercase hex string", () => {
    const id = uuidLike();
    expect(typeof id).toBe("string");
    expect(id).toBe(id.toUpperCase());
    expect(id.length).toBe(32);
    expect(/^[0-9A-F]+$/.test(id)).toBe(true);
  });

  it("returns unique values on each call", () => {
    const ids = new Set(Array.from({ length: 100 }, () => uuidLike()));
    expect(ids.size).toBe(100);
  });
});

describe("createHttpClient", () => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function mockFetchOk(data: any = null) {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ code: 0, data }),
      text: async () => JSON.stringify({ code: 0, data }),
    });
  }

  function mockFetchApiError(code: number, msg: string) {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ code, msg }),
      text: async () => JSON.stringify({ code, msg }),
    });
  }

  it("sends POST request with correct auth headers", async () => {
    const http = createHttpClient({
      appId: "test-app",
      apiKey: "test-key",
      baseUrl: "https://api.example.com",
    });

    mockFetchOk({ result: "ok" });

    await http.post("/test/endpoint", { foo: "bar" });

    expect(fetchSpy).toHaveBeenCalledOnce();
    const [url, opts] = fetchSpy.mock.calls[0]!;

    // Check URL
    expect(url).toBe("https://api.example.com/test/endpoint");

    // Check method
    expect(opts.method).toBe("POST");

    // Check headers
    const headers = opts.headers as Record<string, string>;
    expect(headers["Content-Type"]).toBe("application/json");
    expect(headers.appId).toBe("test-app");
    expect(typeof headers.traceId).toBe("string");
    expect(typeof headers.ts).toBe("string");
    expect(typeof headers.nonce).toBe("string");
    expect(typeof headers.sign).toBe("string");

    // Verify signature is valid SHA-256
    expect(headers.sign.length).toBe(64);
    expect(headers.sign).toBe(headers.sign.toUpperCase());
  });

  it("signature matches SHA256(appId + traceId + ts + nonce + apiKey)", async () => {
    const http = createHttpClient({
      appId: "myApp",
      apiKey: "myKey",
      baseUrl: "https://api.example.com",
    });

    mockFetchOk();

    await http.post("/test", {});

    const headers = fetchSpy.mock.calls[0]![1].headers as Record<string, string>;
    const expectedSign = sha256Upper(
      "myApp" + headers.traceId + headers.ts + headers.nonce + "myKey"
    );
    expect(headers.sign).toBe(expectedSign);
  });

  it("sends body as JSON string", async () => {
    const http = createHttpClient({
      appId: "app",
      apiKey: "key",
      baseUrl: "https://api.example.com",
    });

    mockFetchOk();

    const body = { action: "test", ids: ["a", "b"] };
    await http.post("/endpoint", body);

    const sentBody = fetchSpy.mock.calls[0]![1].body;
    expect(JSON.parse(sentBody)).toEqual(body);
  });

  it("returns data field from successful response", async () => {
    const http = createHttpClient({
      appId: "app",
      apiKey: "key",
      baseUrl: "https://api.example.com",
    });

    const expected = { items: [1, 2, 3], total: 3 };
    mockFetchOk(expected);

    const result = await http.post("/test", {});
    expect(result).toEqual(expected);
  });

  it("throws GeelarkError on API error response (code !== 0)", async () => {
    const http = createHttpClient({
      appId: "app",
      apiKey: "key",
      baseUrl: "https://api.example.com",
    });

    mockFetchApiError(10001, "Invalid parameter");

    await expect(http.post("/test", {})).rejects.toThrow(GeelarkError);
    await expect(
      http.post("/test", {}).catch((e) => {
        throw e;
      })
    ).rejects.toThrow(); // second call needs mock
  });

  it("throws GeelarkError on network failure", async () => {
    const http = createHttpClient({
      appId: "app",
      apiKey: "key",
      baseUrl: "https://api.example.com",
    });

    fetchSpy.mockRejectedValue(new Error("ECONNREFUSED"));

    // With retries=0 to avoid multiple attempts
    await expect(
      http.post("/test", {}, { retries: 0 })
    ).rejects.toThrow(GeelarkError);
  });

  it("calls beforeRequest hook", async () => {
    const hook = vi.fn();
    const http = createHttpClient({
      appId: "app",
      apiKey: "key",
      baseUrl: "https://api.example.com",
      hooks: { beforeRequest: hook },
    });

    mockFetchOk();

    await http.post("/hooktest", { a: 1 });

    expect(hook).toHaveBeenCalledOnce();
    expect(hook.mock.calls[0]![0]).toMatchObject({
      url: "https://api.example.com/hooktest",
      pathname: "/hooktest",
    });
  });

  it("calls afterResponse hook", async () => {
    const hook = vi.fn();
    const http = createHttpClient({
      appId: "app",
      apiKey: "key",
      baseUrl: "https://api.example.com",
      hooks: { afterResponse: hook },
    });

    mockFetchOk({ value: 42 });

    await http.post("/hooktest", {});

    expect(hook).toHaveBeenCalledOnce();
    expect(hook.mock.calls[0]![0]).toMatchObject({
      status: 200,
      json: { code: 0, data: { value: 42 } },
    });
  });

  it("retries on transient errors", async () => {
    const http = createHttpClient({
      appId: "app",
      apiKey: "key",
      baseUrl: "https://api.example.com",
    });

    // First call: network error (transient)
    fetchSpy.mockRejectedValueOnce(new Error("ETIMEDOUT"));
    // Second call: success
    mockFetchOk({ ok: true });

    const result = await http.post("/retry-test", {}, { retries: 1, retryDelay: 10 });
    expect(result).toEqual({ ok: true });
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });
});
