export class GeelarkError extends Error {
  code: string | number;
  endpoint?: string;
  httpStatus?: number;
  details?: any;
  constructor(message: string, meta: { code?: string | number; endpoint?: string; httpStatus?: number; details?: any } = {}) {
    super(message);
    this.name = "GeelarkError";
    this.code = meta.code ?? "UNKNOWN";
    this.endpoint = meta.endpoint ?? "";
    this.httpStatus = meta.httpStatus ?? 0;
    this.details = meta.details ?? null;
  }
}
