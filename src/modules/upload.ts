import * as fs from "fs";
import { GeelarkError } from "../core/errors";
import { guessMime, prettyAliError } from "../core/utils";
import { UploadAPI, HttpClient } from "../types";

declare global {
  interface RequestInit { duplex?: "half"; }
}

export function createUploadModule(http: HttpClient): UploadAPI {
  return {
    getUrl: (fileType: string) => http.post("/upload/getUrl", { fileType }),
    put: async (uploadUrl: string, filePath: string) => {
      const tryOnce = async (withHeaders: boolean) => {
        const stream = fs.createReadStream(filePath) as any;
        const stat = fs.statSync(filePath);
        const headers = withHeaders ? { "Content-Type": guessMime(filePath), "Content-Length": String(stat.size) } : undefined;
        const res = await fetch(uploadUrl, { method: "PUT", headers, body: stream, duplex: "half" });
        if (res.ok || res.status === 200 || res.status === 201) return true;
        const text = await res.text().catch(() => "");
        throw new Error(`${res.status} ${res.statusText} - ${prettyAliError(text)}`);
      };
      try { return await tryOnce(false); }
      catch { try { return await tryOnce(true); } catch (e: any) { throw new GeelarkError(`Upload failed: ${e.message}`, { code: "UPLOAD_FAILED" }); } }
    },
  };
}
