import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { FacebookAPI } from "../types";

function ensureId(id?: string) {
  if (!id) throw new GeelarkError("facebook: id (cloud phone) required");
}

export function createFacebookModule(http: HttpClient): FacebookAPI {
  return {
    login({ id, name, remark, scheduleAt, email, password }) {
      ensureId(id);
      if (!email) throw new GeelarkError("facebook.login: email required");
      if (!password) throw new GeelarkError("facebook.login: password required");
      return http.post("/rpa/task/faceBookLogin", {
        id, name, remark, scheduleAt, email, password,
      });
    },

    autoComment({ id, name, remark, scheduleAt, postAddress, comment, keyword }) {
      ensureId(id);
      if (!postAddress) throw new GeelarkError("facebook.autoComment: postAddress required");
      if (!Array.isArray(comment) || !comment.length) throw new GeelarkError("facebook.autoComment: comment[] required");
      if (!Array.isArray(keyword) || !keyword.length) throw new GeelarkError("facebook.autoComment: keyword[] required");
      return http.post("/rpa/task/faceBookAutoComment", {
        id, name, remark, scheduleAt, postAddress, comment, keyword,
      });
    },

    maintenance({ id, name, remark, scheduleAt, browsePostsNum, keyword }) {
      ensureId(id);
      if (!browsePostsNum) throw new GeelarkError("facebook.maintenance: browsePostsNum required");
      if (!Array.isArray(keyword) || !keyword.length) throw new GeelarkError("facebook.maintenance: keyword[] required");
      return http.post("/rpa/task/faceBookActiveAccount", {
        id, name, remark, scheduleAt, browsePostsNum, keyword,
      });
    },

    publish({ id, name, remark, scheduleAt, title, video }) {
      ensureId(id);
      if (!title) throw new GeelarkError("facebook.publish: title required");
      if (!Array.isArray(video) || !video.length) throw new GeelarkError("facebook.publish: video[] required");
      return http.post("/rpa/task/faceBookPublish", {
        id, name, remark, scheduleAt, title, video,
      });
    },

    pubReels({ id, name, remark, scheduleAt, description, video }) {
      ensureId(id);
      if (!description) throw new GeelarkError("facebook.pubReels: description required");
      if (!video) throw new GeelarkError("facebook.pubReels: video required");
      return http.post("/rpa/task/faceBookPubReels", {
        id, name, remark, scheduleAt, description, video,
      });
    },

    message({ id, name, remark, scheduleAt, usernames, content }) {
      ensureId(id);
      if (!Array.isArray(usernames) || !usernames.length) throw new GeelarkError("facebook.message: usernames[] required");
      if (!content) throw new GeelarkError("facebook.message: content required");
      return http.post("/rpa/task/faceBookMessage", {
        id, name, remark, scheduleAt, usernames, content,
      });
    },
  };
}
