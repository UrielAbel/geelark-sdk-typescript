import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import { nowSec } from "../core/utils";
import { TaskAPI, Task, TaskStatus, TaskType, TaskDetail, QueryResp, HistoryResp, BulkOpResp } from "../types";

const normIds = (ids: string | string[]) => ([] as string[]).concat(ids).filter(Boolean);
const clamp = (n: number, a: number, b: number) => Math.min(Math.max(n, a), b);

export function createTaskModule(
  http: HttpClient,
  defaults: Record<string, any> = {}
): TaskAPI & {
  query: (ids: string[]) => Promise<QueryResp>;
  historyRecords: (args?: { size?: number; lastId?: string }) => Promise<HistoryResp>;

  restart: (ids: string | string[]) => Promise<{ data?: BulkOpResp }>;
  cancel:  (ids: string | string[]) => Promise<{ data?: BulkOpResp }>;

  detail: (id: string, searchAfter?: any[]) => Promise<TaskDetail>;
  detailNext: (args: { id: string; searchAfter?: any[] }) => Promise<TaskDetail>;
} {
  return {

    add: ({ planName, taskType = defaults.taskType ?? TaskType.TiktokImageSet, list }) => {
      if (!planName) throw new GeelarkError("task.add: planName requerido");
      if (!Array.isArray(list) || !list.length) throw new GeelarkError("task.add: list vacío/ inválido");
      return http.post("/task/add", { planName, taskType, list });
    },

    addOne: ({
      planName = defaults.planName,
      taskType = defaults.taskType ?? TaskType.TiktokImageSet,
      envId = defaults.envId,
      images,
      videoId,
      scheduleAt = nowSec(),
      ...rest
    }) => {
      if (!planName) throw new GeelarkError("task.addOne: planName requerido");
      if (!envId) throw new GeelarkError("task.addOne: envId requerido");
      if (!Array.isArray(images) || !images.length) throw new GeelarkError("task.addOne: images[] requerido");
      const item = { scheduleAt, envId, images, ...(videoId ? { videoId } : {}), ...rest };
      return http.post("/task/add", { planName, taskType, list: [item] });
    },

    restart: (ids) =>
      http.post<{ data?: BulkOpResp }>("/task/restart", { ids: normIds(ids) }),
    cancel: (ids) =>
      http.post<{ data?: BulkOpResp }>("/task/cancel", { ids: normIds(ids) }),

    detail: (id: string, searchAfter?: any[]) =>
      http.post<{ data: TaskDetail }>("/task/detail", { id, ...(searchAfter ? { searchAfter } : {}) }).then(r => r.data),

    detailNext: ({ id, searchAfter }: { id: string; searchAfter?: any[] }) =>
      http.post<{ data: TaskDetail }>("/task/detail", { id, ...(searchAfter ? { searchAfter } : {}) }).then(r => r.data),

    query: (ids: string[]) => {
      if (!Array.isArray(ids) || !ids.length) throw new GeelarkError("task.query: ids[] requerido");
      return http.post<{ data: QueryResp }>("/task/query", { ids }).then(r => r.data);
    },

    historyRecords: ({ size, lastId }: { size?: number; lastId?: string } = {}) => {
      const body: any = {};
      if (typeof size === "number") body.size = clamp(size, 1, 100);
      if (lastId) body.lastId = lastId;
      return http.post<{ data: HistoryResp }>("/task/historyRecords", body).then(r => r.data);
    },
  };
}

export const isDone   = (t: Task) => t.status === TaskStatus.Completed;
export const isFailed = (t: Task) => t.status === TaskStatus.Failed;
export const isActive = (t: Task) => t.status === TaskStatus.Waiting || t.status === TaskStatus.InProgress;

export async function fetchAllLogs(
  http: HttpClient,
  id: string,
  maxPages = 20
): Promise<{ detail: TaskDetail; allLogs: string[]; allImages: string[] }> {
  let searchAfter: any[] | undefined;
  let pages = 0;
  let allLogs: string[] = [];
  let allImages: string[] = [];
  let last: TaskDetail | null = null;

  while (pages < maxPages) {
    const { data } = await http.post<{ data: TaskDetail }>("/task/detail", { id, ...(searchAfter ? { searchAfter } : {}) });
    last = data;
    if (Array.isArray(data.logs)) allLogs = allLogs.concat(data.logs);
    if (Array.isArray(data.resultImages)) allImages = allImages.concat(data.resultImages);
    if (!data.logContinue || !data.searchAfter?.length) break;
    searchAfter = data.searchAfter;
    pages++;
  }
  if (!last) throw new GeelarkError("task.fetchAllLogs: detalle no disponible");
  return { detail: last, allLogs, allImages };
}
