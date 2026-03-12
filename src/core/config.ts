import { GeelarkConfig } from "../types";

export function normalizeConfig(cfg: GeelarkConfig) {
  const {
    appId,
    apiKey,
    baseUrl = "https://openapi.geelark.com/open/v1",
    browserBaseUrl = "http://localhost:40185/api/v1",
    defaults = {},
    debug = false,
    hooks = {},
  } = cfg || ({} as any);

  if (!appId || !apiKey) throw new Error("createGeelarkClient: appId y apiKey son obligatorios");
  return { appId, apiKey, baseUrl, browserBaseUrl, defaults, debug, hooks };
}
