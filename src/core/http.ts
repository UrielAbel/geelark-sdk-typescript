import { GeelarkError } from "./errors";
import { HttpClient, RequestOptions, GeelarkConfig } from "../types";
import { isTransientError, sha256Upper, uuidLike, wait } from "./utils";

export function createHttpClient(cfg: GeelarkConfig): HttpClient {
  const { appId, apiKey, baseUrl = "", hooks = {}, debug = false } = cfg;

  async function post<T = any>(pathname: string, body: any = {}, { retries = 2, retryDelay = 600 }: RequestOptions = {}): Promise<T> {
    const attempt = async () => {
      const ts = Date.now().toString();
      const traceId = uuidLike();
      const nonce = traceId.slice(0, 6);
      const sign = sha256Upper(appId + traceId + ts + nonce + apiKey);

      const url = `${baseUrl}${pathname}`;
      const headers: Record<string, string> = { "Content-Type": "application/json", appId, traceId, ts, nonce, sign };

      const ctx = { url, headers, body, pathname };
      try { await hooks.beforeRequest?.(ctx); } catch {}

      if (debug) {
        const safe = { ...headers, sign: "[redacted]" };
        console.log("Geelark → POST", url, { headers: safe, body });
      }

      const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) }).catch((e: any) => {
        throw new GeelarkError(`Network error: ${e.message}`, { endpoint: pathname });
      });

      let json: any;
      try { json = await res.json(); }
      catch {
        const txt = await res.text().catch(() => "");
        throw new GeelarkError(`Respuesta no JSON: ${txt?.slice(0, 200)}`, { endpoint: pathname, httpStatus: res.status });
      }

      if (debug) console.log("Geelark ←", res.status, json);
      try { await hooks.afterResponse?.({ ...ctx, status: res.status, json }); } catch {}

      if (!json || typeof json.code === "undefined") {
        throw new GeelarkError("Formato de respuesta inesperado", { endpoint: pathname, httpStatus: res.status });
      }
      if (json.code !== 0) {
        const msg = json.msg || "Error desconocido";
        throw new GeelarkError(`${pathname} error: ${msg}`, {
          code: String(json.code), endpoint: pathname, httpStatus: res.status, details: json,
        });
      }
      return json.data as T;
    };

    for (let i = 0; i <= retries; i++) {
      try { return await attempt(); }
      catch (e) {
        if (i < retries && isTransientError(e)) {
          if (debug) console.warn(`Retry ${i + 1}/${retries} → ${pathname}: ${(e as any)?.message}`);
          await wait(retryDelay * (1 + Math.random() * 0.5));
          continue;
        }
        throw e;
      }
    }
    
    throw new GeelarkError("Retry loop fell through", { endpoint: pathname });
  }

  return { post };
}
