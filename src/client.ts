import { normalizeConfig } from "./core/config";
import { createHttpClient } from "./core/http";
import { nowSec, wait, prettyAliError } from "./core/utils";
import { createPhoneModule } from "./modules/phone";
import { createUploadModule } from "./modules/upload";
import { createTaskModule } from "./modules/task";
import { createTiktokModule } from "./modules/tiktok";
import { createInstagramModule } from "./modules/instagram";
import { createRedditModule } from "./modules/reddit";
import { createYouTubeModule } from "./modules/youtube";
import { createGoogleModule } from "./modules/google";
import { createSheinModule } from "./modules/shein";
import { createXModule } from "./modules/x";
import { createPinterestModule } from "./modules/pinterest";
import { createThreadsModule } from "./modules/threads";
import { createRpaUtilsModule } from "./modules/rpaUtils";
import { createFacebookModule } from "./modules/facebook";
import { createAdbModule } from "./modules/adb";
import { createAnalyticsModule } from "./modules/analytics";
import { createAppModule } from "./modules/app";
import { createFileManagementModule } from "./modules/fileManagement";
import { createLibraryModule } from "./modules/library";
import { createShellModule } from "./modules/shell";
import { createWebhookModule } from "./modules/webhook";
import { createOemModule } from "./modules/oem";
import { createBillingModule } from "./modules/billing";
import { createGroupModule } from "./modules/group";
import { createProxyMgmtModule } from "./modules/proxyMgmt";
import { createTagModule } from "./modules/tag";
import { createProxyDetectionModule } from "./modules/proxyDetection";
import { createBrowserModule } from "./modules/browser";

import { createUploadWorkflow } from "./workflows/uploadImageAndCreateTask";
import type { GeelarkClient, GeelarkConfig } from "./types";

export type { GeelarkClient, GeelarkConfig } from "./types";

export function createGeelarkClient(rawCfg: GeelarkConfig): GeelarkClient {
  const { appId, apiKey, baseUrl, browserBaseUrl, defaults, debug, hooks } = normalizeConfig(rawCfg);

  const http = createHttpClient({ appId, apiKey, baseUrl, hooks, debug });
  const browserHttp = createHttpClient({ appId, apiKey, baseUrl: browserBaseUrl, hooks, debug });

  const phone          = createPhoneModule(http);
  const upload         = createUploadModule(http);
  const task           = createTaskModule(http, defaults);
  const tiktok         = createTiktokModule(http, defaults);
  const instagram      = createInstagramModule(http);
  const reddit         = createRedditModule(http);
  const youtube        = createYouTubeModule(http);
  const google         = createGoogleModule(http);
  const shein          = createSheinModule(http);
  const x              = createXModule(http);
  const pinterest      = createPinterestModule(http);
  const threads        = createThreadsModule(http);
  const rpaUtils       = createRpaUtilsModule(http);
  const facebook       = createFacebookModule(http);
  const adb            = createAdbModule(http);
  const analytics      = createAnalyticsModule(http);
  const app            = createAppModule(http);
  const fileManagement = createFileManagementModule(http);
  const library        = createLibraryModule(http);
  const shell          = createShellModule(http);
  const webhook        = createWebhookModule(http);
  const oem            = createOemModule(http);
  const billing        = createBillingModule(http);
  const group          = createGroupModule(http);
  const proxyMgmt      = createProxyMgmtModule(http);
  const tag            = createTagModule(http);
  const proxyDetection = createProxyDetectionModule(http);
  const browser        = createBrowserModule(browserHttp);

  const uploadImageAndCreateTask = createUploadWorkflow({ phone, upload, task, debug, defaults });

  const api: GeelarkClient = {
    phone, upload, task, tiktok, instagram, reddit,
    youtube, google, shein, x, pinterest, threads, rpaUtils,
    facebook, adb, analytics, app, fileManagement, library,
    shell, webhook, oem, billing, group, proxyMgmt, tag,
    proxyDetection, browser,
    uploadImageAndCreateTask,
    utils: { nowSec, wait, prettyAliError },
    request: (pathname, body = {}, opts) => http.post(pathname, body, opts),
    with(next: Record<string, any> = {}) {
      return createGeelarkClient({ appId, apiKey, baseUrl, browserBaseUrl, defaults: { ...defaults, ...next }, debug, hooks });
    },
    get defaults() { return { ...defaults }; },
  };

  return api;
}
