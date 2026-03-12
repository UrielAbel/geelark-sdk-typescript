import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { RpaUtilsAPI } from "../types";

function ensureId(id?: string) {
  if (!id) throw new GeelarkError("rpaUtils: id (cloud phone) required");
}

export function createRpaUtilsModule(http: HttpClient): RpaUtilsAPI {
  return {
    multiPlatformVideoDistribution({ id, name, remark, scheduleAt, title, video }) {
      ensureId(id);
      if (!title) throw new GeelarkError("rpaUtils.multiPlatformVideoDistribution: title required");
      if (!Array.isArray(video) || !video.length) throw new GeelarkError("rpaUtils.multiPlatformVideoDistribution: video[] required");
      return http.post("/rpa/task/multiPlatformVideoDistribution", {
        id, name, remark, scheduleAt, title, video,
      });
    },

    fileUpload({ id, name, remark, scheduleAt, files }) {
      ensureId(id);
      if (!Array.isArray(files) || !files.length) throw new GeelarkError("rpaUtils.fileUpload: files[] required");
      return http.post("/rpa/task/fileUpload", {
        id, name, remark, scheduleAt, files,
      });
    },

    importContacts({ id, name, remark, scheduleAt, contacts }) {
      ensureId(id);
      if (!Array.isArray(contacts) || !contacts.length) throw new GeelarkError("rpaUtils.importContacts: contacts[] required");
      return http.post("/rpa/task/importContacts", {
        id, name, remark, scheduleAt, contacts,
      });
    },

    keyboxUpload({ id, name, remark, scheduleAt, files }) {
      ensureId(id);
      if (!Array.isArray(files) || !files.length) throw new GeelarkError("rpaUtils.keyboxUpload: files[] required");
      return http.post("/rpa/task/keyboxUpload", {
        id, name, remark, scheduleAt, files,
      });
    },

    flowList(page, pageSize) {
      return http.post("/task/flow/list", { page, pageSize });
    },

    rpaAdd({ id, name, remark, scheduleAt, flowId, paramMap }) {
      ensureId(id);
      if (!flowId) throw new GeelarkError("rpaUtils.rpaAdd: flowId required");
      return http.post("/task/rpa/add", {
        id, name, remark, scheduleAt, flowId, paramMap,
      });
    },
  };
}
