import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import { nowSec } from "../core/utils";
import { TiktokAPI } from "../types";


function ensureId(id?: string) {
  if (!id) throw new GeelarkError("tiktok: id (cloud phone) requerido");
}
function ensureSchedule(at?: number) {
  return typeof at === "number" ? at : nowSec();
}



export function createTiktokModule(http: HttpClient, defaults: Record<string, any> = {}): TiktokAPI {
  const post = <T = any>(path: string, body: any) => http.post<T>(path, body);

  return {
    async addVideo({
      envId, video, planName = defaults.planName, scheduleAt = nowSec(),
      videoDesc, productId, productTitle, refVideoId, maxTryTimes, timeoutMin,
      sameVideoVolume, sourceVideoVolume, markAI, cover, needShareLink,
    }) {
      ensureId(envId);
      if (!video) throw new GeelarkError("tiktok.addVideo: video requerido");
      if (!planName) throw new GeelarkError("tiktok.addVideo: planName requerido");

      const item = {
        scheduleAt,
        envId,
        video,
        videoDesc,
        productId,
        productTitle,
        refVideoId,
        maxTryTimes,
        timeoutMin,
        sameVideoVolume,
        sourceVideoVolume,
        markAI,
        cover,
        needShareLink,
      };
      return post("/task/add", { planName, taskType: 1, list: [item] });
    },

    async addImageSet({
      envId, images, planName = defaults.planName, scheduleAt = nowSec(),
      videoDesc, videoId, videoTitle, maxTryTimes, timeoutMin,
      sameVideoVolume, markAI, needShareLink,
    }) {
      ensureId(envId);
      if (!Array.isArray(images) || !images.length) throw new GeelarkError("tiktok.addImageSet: images[] requerido");
      if (!planName) throw new GeelarkError("tiktok.addImageSet: planName requerido");

      const item = {
        scheduleAt,
        envId,
        images,
        videoDesc,
        videoId,
        videoTitle,
        maxTryTimes,
        timeoutMin,
        sameVideoVolume,
        markAI,
        needShareLink,
      };
      return post("/task/add", { planName, taskType: 3, list: [item] });
    },

    async addWarmup({ envId, planName = defaults.planName, scheduleAt = nowSec(), action, keywords, duration }) {
      ensureId(envId);
      if (!action) throw new GeelarkError("tiktok.addWarmup: action requerido");
      if ((action === "search profile" || action === "search video") && (!keywords || !keywords.length))
        throw new GeelarkError("tiktok.addWarmup: keywords requerido para búsqueda");
      if (!planName) throw new GeelarkError("tiktok.addWarmup: planName requerido");

      const item = { scheduleAt, envId, action, keywords, duration };
      return post("/task/add", { planName, taskType: 2, list: [item] });
    },

    async login({ id, account, password, scheduleAt, name, remark }) {
      ensureId(id);
      if (!account) throw new GeelarkError("tiktok.login: account requerido");
      if (!password) throw new GeelarkError("tiktok.login: password requerido");
      return post("/rpa/task/tiktokLogin", { id, account, password, scheduleAt: ensureSchedule(scheduleAt), name, remark });
    },

    async editProfile({ id, scheduleAt, name, remark, avatar, nickName, bio, site }) {
      ensureId(id);
      return post("/rpa/task/tiktokEdit", { id, scheduleAt: ensureSchedule(scheduleAt), name, remark, avatar, nickName, bio, site });
    },

    async randomStar({ id, scheduleAt, name, remark }) {
      ensureId(id);
      return post("/rpa/task/tiktokRandomStar", { id, scheduleAt: ensureSchedule(scheduleAt), name, remark });
    },

    async randomStarAsia({ id, scheduleAt, name, remark }) {
      ensureId(id);
      return post("/rpa/task/tiktokRandomStarAsia", { id, scheduleAt: ensureSchedule(scheduleAt), name, remark });
    },

    async randomComment({ id, scheduleAt, name, remark, useAi, comment }) {
      ensureId(id);
      if (useAi !== 1 && useAi !== 2) throw new GeelarkError("tiktok.randomComment: useAi debe ser 1|2");
      if (useAi === 2 && !comment) throw new GeelarkError("tiktok.randomComment: comment requerido cuando useAi=2");
      return post("/rpa/task/tiktokRandomComment", { id, scheduleAt: ensureSchedule(scheduleAt), name, remark, useAi, comment });
    },

    async randomCommentAsia({ id, scheduleAt, name, remark, useAi, comment }) {
      ensureId(id);
      if (useAi !== 1 && useAi !== 2) throw new GeelarkError("tiktok.randomCommentAsia: useAi debe ser 1|2");
      if (useAi === 2 && !comment) throw new GeelarkError("tiktok.randomCommentAsia: comment requerido cuando useAi=2");
      return post("/rpa/task/tiktokRandomCommentAsia", { id, scheduleAt: ensureSchedule(scheduleAt), name, remark, useAi, comment });
    },

    async message({ id, scheduleAt, name, remark, usernames, content }) {
      ensureId(id);
      if (!Array.isArray(usernames) || !usernames.length) throw new GeelarkError("tiktok.message: usernames[] requerido");
      if (!content) throw new GeelarkError("tiktok.message: content requerido");
      return post("/rpa/task/tiktokMessage", { id, scheduleAt: ensureSchedule(scheduleAt), name, remark, usernames, content });
    },

    async messageAsia({ id, scheduleAt, name, remark, usernames, content }) {
      ensureId(id);
      if (!Array.isArray(usernames) || !usernames.length) throw new GeelarkError("tiktok.messageAsia: usernames[] requerido");
      if (!content) throw new GeelarkError("tiktok.messageAsia: content requerido");
      return post("/rpa/task/tiktokMessageAsia", { id, scheduleAt: ensureSchedule(scheduleAt), name, remark, usernames, content });
    },
  };
}
