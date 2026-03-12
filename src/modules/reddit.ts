import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import { nowSec } from "../core/utils";
import { RedditAPI, TaskIdResp } from "../types";

function ensureId(id?: string) {
    if (!id) throw new GeelarkError("reddit: id (cloud phone) is required");
}
function sched(at?: number) { return typeof at === "number" ? at : nowSec(); }
function ensureNonEmptyArray(arr: any[], label: string) {
    if (!Array.isArray(arr) || arr.length === 0) throw new GeelarkError(`reddit: ${label}[] is required`);
}
function ensureStr(v: unknown, label: string) {
    if (!v || typeof v !== "string") throw new GeelarkError(`reddit: ${label} is required`);
}

export function createRedditModule(http: HttpClient): RedditAPI {
    const post = <T = any>(path: string, body: any) => http.post<T>(path, body);

    return {
        warmup({ id, scheduleAt, name, remark, keyword }) {
            ensureId(id);
            return post<{ data: TaskIdResp }>("/rpa/task/redditWarmup", {
                id,
                scheduleAt: sched(scheduleAt),
                name,
                remark,
                ...(keyword ? { keyword } : {}),
            });
        },

        postVideo({ id, title, community, video, description, scheduleAt, name, remark }) {
            ensureId(id);
            ensureStr(title, "title");
            ensureStr(community, "community");
            ensureNonEmptyArray(video as any[], "video");
            return post<{ data: TaskIdResp }>("/rpa/task/redditVideo", {
                id,
                title,
                community,
                video,
                ...(description ? { description } : {}),
                scheduleAt: sched(scheduleAt),
                name,
                remark,
            });
        },

        postImages({ id, title, community, images, description, scheduleAt, name, remark }) {
            ensureId(id);
            ensureStr(title, "title");
            ensureStr(community, "community");
            ensureNonEmptyArray(images as any[], "images");
            return post<{ data: TaskIdResp }>("/rpa/task/redditImage", {
                id,
                title,
                community,
                images,
                ...(description ? { description } : {}),
                scheduleAt: sched(scheduleAt),
                name,
                remark,
            });
        },
    };
}
