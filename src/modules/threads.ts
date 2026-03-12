import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { ThreadsAPI } from "../types";

function ensureId(id?: string) {
  if (!id) throw new GeelarkError("threads: id (cloud phone) required");
}

export function createThreadsModule(http: HttpClient): ThreadsAPI {
  return {
    video({ id, name, remark, scheduleAt, title, video, topic }) {
      ensureId(id);
      if (!title) throw new GeelarkError("threads.video: title required");
      if (!Array.isArray(video) || !video.length) throw new GeelarkError("threads.video: video[] required");
      return http.post("/rpa/task/threadsVideo", {
        id, name, remark, scheduleAt, title, video, topic,
      });
    },

    image({ id, name, remark, scheduleAt, title, images, topic }) {
      ensureId(id);
      if (!title) throw new GeelarkError("threads.image: title required");
      if (!Array.isArray(images) || !images.length) throw new GeelarkError("threads.image: images[] required");
      return http.post("/rpa/task/threadsImage", {
        id, name, remark, scheduleAt, title, images, topic,
      });
    },
  };
}
