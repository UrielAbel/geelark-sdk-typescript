import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { AppAPI } from "../types";

export function createAppModule(http: HttpClient): AppAPI {
  return {
    add(params) {
      if (!params.id) throw new GeelarkError("app.add: id required");
      if (!params.versionId) throw new GeelarkError("app.add: versionId required");
      return http.post("/app/add", params);
    },

    batchOperate(params) {
      if (!params.action) throw new GeelarkError("app.batchOperate: action required");
      return http.post("/app/operation/batch", params);
    },

    getTeamAppList(page, pageSize) {
      return http.post("/app/teamApp/list", { page, pageSize });
    },

    getInstallable(params) {
      if (!params.envId) throw new GeelarkError("app.getInstallable: envId required");
      return http.post("/app/installable/list", params);
    },

    getInstalled(params) {
      if (!params.envId) throw new GeelarkError("app.getInstalled: envId required");
      return http.post("/app/list", params);
    },

    getAppShopList(params) {
      return http.post("/app/shop/list", params);
    },

    install(envId, appVersionId) {
      if (!envId) throw new GeelarkError("app.install: envId required");
      if (!appVersionId) throw new GeelarkError("app.install: appVersionId required");
      return http.post("/app/install", { envId, appVersionId });
    },

    queryUploadStatus(taskId) {
      if (!taskId) throw new GeelarkError("app.queryUploadStatus: taskId required");
      return http.post("/app/upload/status", { taskId });
    },

    remove(id) {
      if (!id) throw new GeelarkError("app.remove: id required");
      return http.post("/app/remove", { id });
    },

    setAuth(id, appAuth) {
      if (!id) throw new GeelarkError("app.setAuth: id required");
      return http.post("/app/auth/status", { id, appAuth });
    },

    setAutoStart(id, opera) {
      if (!id) throw new GeelarkError("app.setAutoStart: id required");
      return http.post("/app/setAutoStart", { id, opera });
    },

    setKeepAlive(id, opera) {
      if (!id) throw new GeelarkError("app.setKeepAlive: id required");
      return http.post("/app/setKeepAlive", { id, opera });
    },

    setRoot(id, opera) {
      if (!id) throw new GeelarkError("app.setRoot: id required");
      return http.post("/app/root", { id, opera });
    },

    setAutoInstall(params) {
      if (!params.id) throw new GeelarkError("app.setAutoInstall: id required");
      return http.post("/app/setStatus", params);
    },

    start(params) {
      if (!params.envId) throw new GeelarkError("app.start: envId required");
      return http.post("/app/start", params);
    },

    stop(params) {
      if (!params.envId) throw new GeelarkError("app.stop: envId required");
      return http.post("/app/stop", params);
    },

    uninstall(envId, packageName) {
      if (!envId) throw new GeelarkError("app.uninstall: envId required");
      if (!packageName) throw new GeelarkError("app.uninstall: packageName required");
      return http.post("/app/uninstall", { envId, packageName });
    },

    upload(params) {
      if (!params.fileUrl) throw new GeelarkError("app.upload: fileUrl required");
      return http.post("/app/upload", params);
    },
  };
}
