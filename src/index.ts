import { createGeelarkClient } from "./client";
export { createGeelarkClient } from "./client";
export { GeelarkError } from "./core/errors";
export type { GeelarkClient, GeelarkConfig, PhoneAPI } from "./types";
export type {
  // Cloud Phone
  Phone, PhoneListParams, PhoneListResp,
  EquipmentInfo, PhoneGroup, PhoneTag, PhoneProxy,
  EnvRowApi, AddNewParams, AddNewResp, AddNewDetail,
  PhoneStatusResp, PhoneStatusSuccess, PhoneStatusFail, PhoneDeleteResp,
  GpsItem, GpsGetResp, ProxyConfig, PhoneUpdateParams,
  NewOneParams, ScreenShotResp, ScreenShotResultResp, SerialNumResp,
  SendSmsParams, BrandItem, TransferParams, TransferResp,
  ContactObject, ImportContactsResp, ImportContactsResultResp,
  // Common RPA
  RpaBaseParams, RpaTaskIdResp,
  // Platform APIs
  YouTubeAPI, GoogleAPI, SheinAPI, XAPI, PinterestAPI, ThreadsAPI,
  FacebookAPI,
  // Task Flow & RPA Utils
  TaskFlow, TaskFlowListResp, RpaUtilsAPI,
  // ADB
  AdbDataItem, AdbAPI,
  // Analytics
  AnalyticsAccount, AnalyticsAccountsListParams, AnalyticsAccountsListResp,
  AnalyticsAddAccountsParams, AnalyticsAddAccountsResp,
  AnalyticsDataItem, AnalyticsDataParams, AnalyticsDataResp,
  AnalyticsAPI,
  // Application Management
  AppTeamAppListItem, AppTeamAppListResp, AppVersionInfo, AppInfo,
  AppListResp, AppBatchOperateResp, AppUploadStatusResp, AppAPI,
  // File Management
  FileManagementAPI,
  // Library
  MaterialTag, MaterialItem, MaterialSearchResp, MaterialTagSearchResp,
  FailDetail, LibraryAPI,
  // Shell
  ShellAPI,
  // Webhook
  WebhookAPI,
  // OEM
  ToolBarSetting, OemAPI,
  // Billing
  BalanceResp, PlanProfile, PlanInfoResp, BillingAPI,
  // Group Management
  GroupCreateItem, GroupCreateResp, GroupUpdateItem, GroupItem,
  GroupQueryParams, GroupQueryResp, GroupAPI,
  // Proxy Management
  ProxyAddItem, ProxyAddResp, ProxyUpdateItem, ProxyListItem,
  ProxyListResp, ProxyMgmtAPI,
  // Tag Management
  TagCreateItem, TagCreateResp, TagUpdateItem, TagMgmtItem,
  TagQueryParams, TagQueryResp, TagAPI,
  // Proxy Detection
  ProxyCheckParams, ProxyCheckResp, ProxyDetectionAPI,
  // Browser API
  BrowserProxyConfig, BrowserCreateParams, BrowserEditParams,
  BrowserListParams, BrowserListResp, BrowserDeleteResp,
  BrowserTransferResp, BrowserTask, BrowserTaskQueryResp, BrowserAPI,
} from "./types";

export { CallbackType } from "./types";

export default function _default(cfg: import("./types").GeelarkConfig) {
  return createGeelarkClient(cfg);
}
