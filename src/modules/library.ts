import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { LibraryAPI } from "../types";

export function createLibraryModule(http: HttpClient): LibraryAPI {
  return {
    createMaterial(params) {
      if (!params.url) throw new GeelarkError("library.createMaterial: url required");
      return http.post("/material/create", params);
    },

    createTag(params) {
      if (!params.name) throw new GeelarkError("library.createTag: name required");
      return http.post("/material/tag/create", params);
    },

    deleteMaterial(ids) {
      if (!Array.isArray(ids) || !ids.length) throw new GeelarkError("library.deleteMaterial: ids[] required");
      return http.post("/material/del", { ids });
    },

    deleteTag(ids) {
      if (!Array.isArray(ids) || !ids.length) throw new GeelarkError("library.deleteTag: ids[] required");
      return http.post("/material/tag/del", { ids });
    },

    searchMaterial(params) {
      return http.post("/material/search", params);
    },

    searchMaterialTag(params) {
      return http.post("/material/tag/search", params);
    },

    setMaterialTag(materialsId, tagsId) {
      if (!Array.isArray(materialsId) || !materialsId.length) throw new GeelarkError("library.setMaterialTag: materialsId[] required");
      return http.post("/material/tag/set", { materialsId, tagsId });
    },
  };
}
