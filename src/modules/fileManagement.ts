import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { FileManagementAPI } from "../types";

export function createFileManagementModule(http: HttpClient): FileManagementAPI {
  return {
    uploadFileResult(taskId) {
      if (!taskId) throw new GeelarkError("fileManagement.uploadFileResult: taskId required");
      return http.post("/phone/uploadFile/result", { taskId });
    },

    keyboxUpload(id, fileUrl) {
      if (!id) throw new GeelarkError("fileManagement.keyboxUpload: id required");
      if (!fileUrl) throw new GeelarkError("fileManagement.keyboxUpload: fileUrl required");
      return http.post("/phone/keyboxUpload", { id, fileUrl });
    },

    keyboxUploadResult(taskId) {
      if (!taskId) throw new GeelarkError("fileManagement.keyboxUploadResult: taskId required");
      return http.post("/phone/keyboxUpload/result", { taskId });
    },
  };
}
