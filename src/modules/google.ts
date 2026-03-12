import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { GoogleAPI } from "../types";

function ensureId(id?: string) {
  if (!id) throw new GeelarkError("google: id (cloud phone) required");
}

export function createGoogleModule(http: HttpClient): GoogleAPI {
  return {
    login({ id, name, remark, scheduleAt, email, password }) {
      ensureId(id);
      if (!email) throw new GeelarkError("google.login: email required");
      if (!password) throw new GeelarkError("google.login: password required");
      return http.post("/rpa/task/googleLogin", {
        id, name, remark, scheduleAt, email, password,
      });
    },

    appDownload({ id, name, remark, scheduleAt, appName }) {
      ensureId(id);
      if (!appName) throw new GeelarkError("google.appDownload: appName required");
      return http.post("/rpa/task/googleAppDownload", {
        id, name, remark, scheduleAt, appName,
      });
    },

    appBrowser({ id, name, remark, scheduleAt, appName, description }) {
      ensureId(id);
      if (!appName) throw new GeelarkError("google.appBrowser: appName required");
      return http.post("/rpa/task/googleAppBrowser", {
        id, name, remark, scheduleAt, appName, description,
      });
    },
  };
}
