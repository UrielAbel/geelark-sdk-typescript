import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { ProxyDetectionAPI } from "../types";

export function createProxyDetectionModule(http: HttpClient): ProxyDetectionAPI {
  return {
    check(params) {
      if (!params.detect_type) throw new GeelarkError("proxyDetection.check: detect_type required");
      if (!params.proxy_type) throw new GeelarkError("proxyDetection.check: proxy_type required");
      if (!params.server) throw new GeelarkError("proxyDetection.check: server required");
      if (!params.port) throw new GeelarkError("proxyDetection.check: port required");
      return http.post("/proxy/check", params);
    },
  };
}
