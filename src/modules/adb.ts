import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { AdbAPI } from "../types";

export function createAdbModule(http: HttpClient): AdbAPI {
  return {
    getData(ids) {
      if (!Array.isArray(ids) || !ids.length) throw new GeelarkError("adb.getData: ids[] required");
      return http.post("/adb/getData", { ids });
    },

    setStatus(ids, open) {
      if (!Array.isArray(ids) || !ids.length) throw new GeelarkError("adb.setStatus: ids[] required");
      return http.post("/adb/setStatus", { ids, open });
    },
  };
}
