import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { TagAPI } from "../types";

export function createTagModule(http: HttpClient): TagAPI {
  return {
    create(list) {
      if (!Array.isArray(list) || !list.length) throw new GeelarkError("tag.create: list[] required");
      return http.post("/tag/add", { list });
    },

    delete(ids) {
      if (!Array.isArray(ids) || !ids.length) throw new GeelarkError("tag.delete: ids[] required");
      return http.post("/tag/delete", { ids });
    },

    modify(list) {
      if (!Array.isArray(list) || !list.length) throw new GeelarkError("tag.modify: list[] required");
      return http.post("/tag/update", { list });
    },

    query(params) {
      return http.post("/tag/list", params);
    },
  };
}
