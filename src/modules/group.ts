import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { GroupAPI } from "../types";

export function createGroupModule(http: HttpClient): GroupAPI {
  return {
    create(list) {
      if (!Array.isArray(list) || !list.length) throw new GeelarkError("group.create: list[] required");
      return http.post("/group/add", { list });
    },

    delete(ids) {
      if (!Array.isArray(ids) || !ids.length) throw new GeelarkError("group.delete: ids[] required");
      return http.post("/group/delete", { ids });
    },

    modify(list) {
      if (!Array.isArray(list) || !list.length) throw new GeelarkError("group.modify: list[] required");
      return http.post("/group/update", { list });
    },

    query(params) {
      return http.post("/group/list", params);
    },
  };
}
