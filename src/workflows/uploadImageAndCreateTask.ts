import * as fs from "fs";
import * as path from "path";
import { wait } from "../core/utils";
import { GeelarkError } from "../core/errors";
import type { PhoneAPI } from "../types";
import type { UploadAPI } from "../types";
import type { TaskAPI } from "../types";

export function createUploadWorkflow(deps: { phone: PhoneAPI; upload: UploadAPI; task: TaskAPI; debug?: boolean; defaults?: Record<string, any> }) {
  const { phone, upload, task, debug = false, defaults = {} } = deps;

  return async function uploadImageAndCreateTask(args: {
    planName?: string; envId?: string; imagePath: string; videoId?: string; waitMs?: number; powerCycle?: boolean;
  }): Promise<{ taskIds: string[]; resourceUrl: string }> {
    const planName = args.planName ?? defaults.planName;
    const envId = args.envId ?? defaults.envId;
    const waitMs = args.waitMs ?? (defaults.waitMs ?? 5000);
    const powerCycle = args.powerCycle ?? true;

    if (!planName) throw new GeelarkError("uploadImageAndCreateTask: planName requerido");
    if (!envId) throw new GeelarkError("uploadImageAndCreateTask: envId requerido");
    if (!args.imagePath) throw new GeelarkError("uploadImageAndCreateTask: imagePath requerido");
    if (!fs.existsSync(args.imagePath)) throw new GeelarkError(`Archivo no existe: ${args.imagePath}`);

    let started = false;
    const taskType = 3;

    try {
      if (powerCycle) {
        await phone.start(envId);
        started = true;
        await wait(20_000);
      }
      const ext = (path.extname(args.imagePath).replace(".", "").toLowerCase()) || "png";
      const { uploadUrl, resourceUrl } = await upload.getUrl(ext);
      if (!uploadUrl || !resourceUrl) throw new GeelarkError("getUploadUrl no devolvió uploadUrl/resourceUrl");
      await upload.put(uploadUrl, args.imagePath);
      await phone.uploadFile(envId, resourceUrl);
      const { taskIds = [] } = await task.addOne({ planName, taskType, envId, images: [resourceUrl], videoId: args.videoId });
      if (!taskIds.length) throw new GeelarkError("Respuesta de /task/add sin taskIds");
      if (waitMs > 0) await wait(waitMs);
      return { taskIds, resourceUrl };
    } finally {
      if (powerCycle && started) {
        try { await phone.stop(envId); }
        catch (e: any) { if (debug) console.error("No se pudo apagar el phone:", e?.message || e); }
      }
    }
  };
}
