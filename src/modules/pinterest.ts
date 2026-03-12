import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { PinterestAPI } from "../types";

function ensureId(id?: string) {
  if (!id) throw new GeelarkError("pinterest: id (cloud phone) required");
}

export function createPinterestModule(http: HttpClient): PinterestAPI {
  return {
    video({ id, name, remark, scheduleAt, title, description, video, link }) {
      ensureId(id);
      if (!title) throw new GeelarkError("pinterest.video: title required");
      if (!description) throw new GeelarkError("pinterest.video: description required");
      if (!Array.isArray(video) || !video.length) throw new GeelarkError("pinterest.video: video[] required");
      return http.post("/rpa/task/pinterestVideo", {
        id, name, remark, scheduleAt, title, description, video, link,
      });
    },

    image({ id, name, remark, scheduleAt, title, description, images, link }) {
      ensureId(id);
      if (!title) throw new GeelarkError("pinterest.image: title required");
      if (!description) throw new GeelarkError("pinterest.image: description required");
      if (!Array.isArray(images) || !images.length) throw new GeelarkError("pinterest.image: images[] required");
      return http.post("/rpa/task/pinterestImage", {
        id, name, remark, scheduleAt, title, description, images, link,
      });
    },
  };
}
