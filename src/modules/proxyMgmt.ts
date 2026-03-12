import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { ProxyMgmtAPI } from "../types";

export function createProxyMgmtModule(http: HttpClient): ProxyMgmtAPI {
  return {
    add(list) {
      if (!Array.isArray(list) || !list.length) throw new GeelarkError("proxyMgmt.add: list[] required");
      return http.post("/proxy/add", { list });
    },

    delete(ids) {
      if (!Array.isArray(ids) || !ids.length) throw new GeelarkError("proxyMgmt.delete: ids[] required");
      return http.post("/proxy/delete", { ids });
    },

    list(params) {
      return http.post("/proxy/list", params);
    },

    update(list) {
      if (!Array.isArray(list) || !list.length) throw new GeelarkError("proxyMgmt.update: list[] required");
      return http.post("/proxy/update", { list });
    },
  };
}
