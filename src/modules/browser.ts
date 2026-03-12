import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { BrowserAPI } from "../types";

export function createBrowserModule(http: HttpClient): BrowserAPI {
  return {
    status() {
      return http.post("/status", {});
    },

    create(params) {
      if (!params.serialName) throw new GeelarkError("browser.create: serialName required");
      if (!params.browserOs) throw new GeelarkError("browser.create: browserOs required");
      return http.post("/browser/create", params);
    },

    edit(params) {
      if (!params.id) throw new GeelarkError("browser.edit: id required");
      return http.post("/browser/update", params);
    },

    list(params = {}) {
      return http.post("/browser/list", params);
    },

    launch(id) {
      if (!id) throw new GeelarkError("browser.launch: id required");
      return http.post("/browser/start", { id });
    },

    close(id) {
      if (!id) throw new GeelarkError("browser.close: id required");
      return http.post("/browser/stop", { id });
    },

    delete(envIds) {
      if (!Array.isArray(envIds) || !envIds.length) throw new GeelarkError("browser.delete: envIds[] required");
      return http.post("/browser/delete", { envIds });
    },

    transfer(params) {
      if (!params.username) throw new GeelarkError("browser.transfer: username required");
      if (!Array.isArray(params.envIds) || !params.envIds.length) throw new GeelarkError("browser.transfer: envIds[] required");
      return http.post("/browser/transfer", params);
    },

    taskFlowQuery(page, pageSize) {
      return http.post("/browser/task/flow", { page, pageSize });
    },

    createCustomTask(params) {
      if (!params.eid) throw new GeelarkError("browser.createCustomTask: eid required");
      if (!params.flowId) throw new GeelarkError("browser.createCustomTask: flowId required");
      return http.post("/browser/task/add", params);
    },

    queryTask(params) {
      return http.post("/browser/task/search", params);
    },

    cancelTask(taskId) {
      if (!taskId) throw new GeelarkError("browser.cancelTask: taskId required");
      return http.post("/browser/task/cancel", { taskId });
    },

    retryTask(taskId) {
      if (!taskId) throw new GeelarkError("browser.retryTask: taskId required");
      return http.post("/browser/task/restart", { taskId });
    },
  };
}
