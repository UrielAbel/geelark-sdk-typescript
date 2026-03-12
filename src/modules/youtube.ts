import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { YouTubeAPI } from "../types";

function ensureId(id?: string) {
  if (!id) throw new GeelarkError("youtube: id (cloud phone) required");
}

export function createYouTubeModule(http: HttpClient): YouTubeAPI {
  return {
    pubShort({ id, name, remark, scheduleAt, title, video, sameStyleUrl, sameStyleVoice, originalVoice }) {
      ensureId(id);
      if (!title) throw new GeelarkError("youtube.pubShort: title required");
      if (!video) throw new GeelarkError("youtube.pubShort: video required");
      return http.post("/rpa/task/youtubePubShort", {
        id, name, remark, scheduleAt, title, video,
        sameStyleUrl, sameStyleVoice, originalVoice,
      });
    },

    pubVideo({ id, name, remark, scheduleAt, title, description, video }) {
      ensureId(id);
      if (!title) throw new GeelarkError("youtube.pubVideo: title required");
      if (!description) throw new GeelarkError("youtube.pubVideo: description required");
      if (!video) throw new GeelarkError("youtube.pubVideo: video required");
      return http.post("/rpa/task/youtubePubVideo", {
        id, name, remark, scheduleAt, title, description, video,
      });
    },

    maintenance({ id, name, remark, scheduleAt, browseVideoNum, keyword }) {
      ensureId(id);
      if (!browseVideoNum || browseVideoNum < 1) throw new GeelarkError("youtube.maintenance: browseVideoNum required (min 1)");
      if (!Array.isArray(keyword) || !keyword.length) throw new GeelarkError("youtube.maintenance: keyword[] required");
      return http.post("/rpa/task/youTubeActiveAccount", {
        id, name, remark, scheduleAt, browseVideoNum, keyword,
      });
    },
  };
}
