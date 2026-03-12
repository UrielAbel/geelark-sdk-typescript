import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { XAPI } from "../types";

export function createXModule(http: HttpClient): XAPI {
  return {
    publish({ id, name, remark, scheduleAt, description, video }) {
      if (!id) throw new GeelarkError("x: id (cloud phone) required");
      if (!description) throw new GeelarkError("x.publish: description required");
      if (!Array.isArray(video) || !video.length) throw new GeelarkError("x.publish: video[] required");
      return http.post("/rpa/task/xPublish", {
        id, name, remark, scheduleAt, description, video,
      });
    },
  };
}
