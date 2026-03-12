import * as crypto from "crypto";
import * as path from "path";

export const wait = (ms = 0) => new Promise<void>((r) => setTimeout(r, ms));
export const nowSec = () => Math.floor(Date.now() / 1000);

export function uuidLike(): string {
  return "yxxyxxxxyxyxxyxxyxxxyxxxyxxyxxyx"
    .replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .toUpperCase();
}

export const sha256Upper = (s: string) =>
  crypto.createHash("sha256").update(s, "utf8").digest("hex").toUpperCase();

export function prettyAliError(xml = ""): string {
  try {
    const code = xml.match(/<Code>(.*?)<\/Code>/i)?.[1];
    const msg = xml.match(/<Message>(.*?)<\/Message>/i)?.[1];
    const req = xml.match(/<RequestId>(.*?)<\/RequestId>/i)?.[1];
    return code ? `OSS ${code}: ${msg || "sin mensaje"} (requestId=${req || "-"})` : xml;
  } catch {
    return xml;
  }
}

export function guessMime(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".png": return "image/png";
    case ".jpg":
    case ".jpeg": return "image/jpeg";
    case ".webp": return "image/webp";
    case ".gif": return "image/gif";
    case ".mp4": return "video/mp4";
    case ".mov": return "video/quicktime";
    default: return "application/octet-stream";
  }
}

export const isTransientError = (e: unknown) => {
  const msg = (e as any)?.message ?? "";
  const http = (e as any)?.httpStatus;
  return /RequestTimeTooSkewed|timeout|ETIMEDOUT|ECONNRESET|ENOTFOUND|EAI_AGAIN/i.test(String(msg)) ||
         [500, 502, 503, 504].includes(Number(http));
};
