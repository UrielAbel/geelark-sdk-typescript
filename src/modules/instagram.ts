import { GeelarkError } from "../core/errors";
import { nowSec } from "../core/utils";
import { InstagramAPI, TaskIdResp, HttpClient } from "../types"

function ensureId(id?: string) {
    if (!id) throw new GeelarkError("instagram: id (cloud phone) requerido");
}
function sched(at?: number) { return typeof at === "number" ? at : nowSec(); }
function capLen(s: string, max: number, label: string) {
    if (s.length > max) throw new GeelarkError(`instagram: ${label} excede ${max} chars`);
}

export function createInstagramModule(http: HttpClient): InstagramAPI {
    const post = <T = any>(path: string, body: any) => http.post<T>(path, body);

    return {
        login({ id, account, password, scheduleAt, name, remark }) {
            ensureId(id);
            if (!account) throw new GeelarkError("instagram.login: account requerido");
            if (!password) throw new GeelarkError("instagram.login: password requerido");
            return post<{ data: TaskIdResp }>("/rpa/task/instagramLogin", {
                id, account, password, scheduleAt: sched(scheduleAt), name, remark,
            });
        },

        pubReels({ id, description, video, scheduleAt, name, remark }) {
            ensureId(id);
            if (!description) throw new GeelarkError("instagram.pubReels: description requerido");
            capLen(description, 2200, "description");
            if (!Array.isArray(video) || video.length === 0) {
                throw new GeelarkError("instagram.pubReels: video[] requerido");
            }
            if (video.length > 10) throw new GeelarkError("instagram.pubReels: máximo 10 videos");
            return post<{ data: TaskIdResp }>("/rpa/task/instagramPubReels", {
                id, description, video, scheduleAt: sched(scheduleAt), name, remark,
            });
        },

        pubReelsImages({ id, description, image, scheduleAt, name, remark }) {
            ensureId(id);
            if (!description) throw new GeelarkError("instagram.pubReelsImages: description requerido");
            capLen(description, 2200, "description");
            if (!Array.isArray(image) || image.length === 0) {
                throw new GeelarkError("instagram.pubReelsImages: image[] requerido");
            }
            if (image.length > 10) throw new GeelarkError("instagram.pubReelsImages: máximo 10 imágenes");
            return post<{ data: TaskIdResp }>("/rpa/task/instagramPubReelsImages", {
                id, description, image, scheduleAt: sched(scheduleAt), name, remark,
            });
        },

        warmup({ id, browseVideo, scheduleAt, name, remark }) {
            ensureId(id);
            if (!Number.isInteger(browseVideo)) {
                throw new GeelarkError("instagram.warmup: browseVideo debe ser entero 1..100");
            }
            if (browseVideo < 1 || browseVideo > 100) {
                throw new GeelarkError("instagram.warmup: browseVideo fuera de rango (1..100)");
            }
            return post<{ data: TaskIdResp }>("/rpa/task/instagramWarmup", {
                id, browseVideo, scheduleAt: sched(scheduleAt), name, remark,
            });
        },

        message({ id, usernames, content, scheduleAt, name, remark }) {
            ensureId(id);
            if (!Array.isArray(usernames) || usernames.length === 0) {
                throw new GeelarkError("instagram.message: usernames[] requerido");
            }
            if (!content) throw new GeelarkError("instagram.message: content requerido");
            return post<{ data: TaskIdResp }>("/rpa/task/instagramMessage", {
                id, usernames, content, scheduleAt: sched(scheduleAt), name, remark,
            });
        },
    };
}
