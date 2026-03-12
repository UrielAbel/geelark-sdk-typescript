export type TaskIdResp = { taskIds: string[] } | { taskId: string };

export type Hooks = {
  beforeRequest?: (ctx: { url: string; headers: Record<string, string>; body: any; pathname: string }) => any | Promise<any>;
  afterResponse?: (ctx: { url: string; headers: Record<string, string>; body: any; pathname: string; status: number; json: any }) => any | Promise<any>;
};

export type GeelarkConfig = {
  appId: string;
  apiKey: string;
  baseUrl?: string;
  browserBaseUrl?: string;
  defaults?: Record<string, any>;
  debug?: boolean;
  hooks?: Hooks;
};

export type RequestOptions = { retries?: number; retryDelay?: number };

export type HttpClient = {
  post: <T = any>(pathname: string, body?: any, opts?: RequestOptions) => Promise<T>;
};

// ── Cloud Phone types ────────────────────────────────────────────

export type EquipmentInfo = {
  countryName?: string;
  phoneNumber?: string;
  enableSim?: number;
  imei?: string;
  osVersion?: string;
  wifiBssid?: string;
  mac?: string;
  bluetoothMac?: string;
  timeZone?: string;
  deviceBrand?: string;
  deviceModel?: string;
  deviceName?: string;
  netType?: number;
  language?: string;
  province?: string;
  city?: string;
};

export type PhoneGroup = {
  id: string;
  name: string;
  remark?: string;
};

export type PhoneTag = {
  name: string;
};

export type PhoneProxy = {
  type?: string;
  server?: string;
  port?: number;
  username?: string;
  password?: string;
};

export type Phone = {
  id: string;
  serialName: string;
  serialNo: string;
  group?: PhoneGroup;
  remark?: string;
  status: number;
  tags?: PhoneTag[];
  equipmentInfo?: EquipmentInfo;
  proxy?: PhoneProxy;
  chargeMode?: number;
  hasBind?: boolean;
  monthlyExpire?: number;
  rpaStatus?: number;
};

export type PhoneListResp = {
  total: number;
  page: number;
  pageSize: number;
  items: Phone[];
};

export type PhoneListParams = {
  page?: number;
  pageSize?: number;
  ids?: string[];
  serialName?: string;
  remark?: string;
  groupName?: string;
  tags?: string[];
  chargeMode?: number;
  openStatus?: number;
  proxyIds?: string[];
  serialNos?: string[];
};

export type EnvRowApi = {
  profileName: string;
  proxyInformation?: string;
  refreshUrl?: string;
  proxyNumber?: number;
  dynamicProxy?: string;
  dynamicProxyLocation?: string;
  mobileRegion?: string;
  mobileProvince?: string;
  mobileCity?: string;
  mobileLanguage?: string;
  profileGroup?: string;
  profileTags?: string[];
  profileNote?: string;
  surfaceBrandName?: string;
  surfaceModelName?: string;
  netType?: number;
  phoneNumber?: string;
  phoneName?: string;
};

export type AddNewParams = {
  mobileType: string;
  chargeMode?: number;
  region?: string;
  data: EnvRowApi[];
};

export type AddNewDetail = {
  index: number;
  code: number;
  msg: string;
  id?: string;
  profileName?: string;
  envSerialNo?: string;
  equipmentInfo?: EquipmentInfo;
};

export type AddNewResp = {
  totalAmount: number;
  successAmount: number;
  failAmount: number;
  details: AddNewDetail[];
};

export type PhoneStatusSuccess = {
  id: string;
  serialName: string;
  status: number;
};

export type PhoneStatusFail = {
  code: number;
  id: string;
  msg: string;
};

export type PhoneStatusResp = {
  totalAmount: number;
  successAmount: number;
  failAmount: number;
  successDetails: PhoneStatusSuccess[];
  failDetails: PhoneStatusFail[];
};

export type PhoneDeleteResp = {
  totalAmount: number;
  successAmount: number;
  failAmount: number;
  failDetails?: PhoneStatusFail[];
};

export type GpsItem = {
  id: string;
  latitude: number;
  longitude: number;
};

export type GpsGetResp = {
  totalAmount: number;
  successAmount: number;
  failAmount: number;
  list: GpsItem[];
};

export type ProxyConfig = {
  typeId: number;
  server?: string;
  port?: number;
  username?: string;
  password?: string;
  useProxyCfg?: boolean;
  protocol?: number;
  country?: string;
  region?: string;
  city?: string;
};

export type PhoneUpdateParams = {
  id: string;
  name?: string;
  remark?: string;
  groupID?: string;
  tagIDs?: string[];
  proxyConfig?: ProxyConfig;
  proxyId?: string;
  phoneNumber?: string;
};

export type NewOneParams = {
  id: string;
  changeBrandModel?: boolean;
  keepNetType?: boolean;
  keepPhoneNumber?: boolean;
  keepRegion?: boolean;
  keepLanguage?: boolean;
};

export type ScreenShotResp = {
  taskId: string;
};

export type ScreenShotResultResp = {
  status: number;
  downloadLink?: string;
};

export type SerialNumResp = {
  serialNum: string;
};

export type SendSmsParams = {
  id: string;
  phoneNumber: string;
  text: string;
};

export type BrandItem = {
  surfaceBrandName: string;
  surfaceModelName: string;
};

export type TransferParams = {
  account: string;
  ids: string[];
  transferOption?: string[];
};

export type TransferResp = {
  successCount: number;
  failCount: number;
  failEnvIds?: string[];
};

export type ContactObject = {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  work?: string;
  fax?: string;
  email1?: string;
  email2?: string;
};

export type ImportContactsResp = {
  taskId: string;
};

export type ImportContactsResultResp = {
  status: number;
};

export type PhoneAPI = {
  /** List cloud phones with optional filters */
  list: (params?: PhoneListParams) => Promise<PhoneListResp>;
  /** Create new cloud phone(s) */
  addNew: (params: AddNewParams) => Promise<AddNewResp>;
  /** Query cloud phone status by IDs */
  status: (ids: string[]) => Promise<PhoneStatusResp>;
  /** Start a cloud phone */
  start: (ids: string | string[]) => Promise<BulkOpResp>;
  /** Stop a cloud phone */
  stop: (ids: string | string[]) => Promise<BulkOpResp>;
  /** Delete cloud phone(s) */
  delete: (ids: string[]) => Promise<PhoneDeleteResp>;
  /** Get GPS info for cloud phones */
  getGps: (ids: string[]) => Promise<GpsGetResp>;
  /** Set GPS for cloud phones */
  setGps: (list: GpsItem[]) => Promise<BulkOpResp>;
  /** Modify cloud phone information */
  update: (params: PhoneUpdateParams) => Promise<any>;
  /** One-click new machine V2 */
  newOne: (params: NewOneParams) => Promise<void>;
  /** Request a screenshot from a cloud phone */
  screenShot: (id: string) => Promise<ScreenShotResp>;
  /** Get screenshot result */
  screenShotResult: (taskId: string) => Promise<ScreenShotResultResp>;
  /** Set root status */
  setRoot: (ids: string[], open: boolean) => Promise<any>;
  /** Get device serial number */
  getSerialNum: (id: string) => Promise<SerialNumResp>;
  /** Send SMS to cloud phone */
  sendSms: (params: SendSmsParams) => Promise<void>;
  /** List cloud phone brand models */
  brandList: (androidVer: number) => Promise<BrandItem[]>;
  /** Transfer cloud phones to another account */
  transfer: (params: TransferParams) => Promise<TransferResp>;
  /** Set network type (Wi-Fi / Mobile) */
  setNetType: (id: string, netType: number) => Promise<void>;
  /** Hide accessibility in app for cloud phones */
  hideAccessibility: (ids: string[], pkgName: string[]) => Promise<any>;
  /** Move cloud phones to a group */
  moveGroup: (envIds: string[], groupId: string) => Promise<void>;
  /** Upload file to cloud phone */
  uploadFile: (id: string, fileUrl: string) => Promise<any>;
  /** Batch import contacts to a cloud phone */
  importContacts: (id: string, contacts: ContactObject[]) => Promise<ImportContactsResp>;
  /** Get batch import contacts result */
  importContactsResult: (taskId: string) => Promise<ImportContactsResultResp>;
};

export type UploadAPI = {
  getUrl: (fileType: string) => Promise<{ uploadUrl: string; resourceUrl: string }>;
  put: (uploadUrl: string, filePath: string) => Promise<boolean>;
};

export type TaskAPI = {
  add: (args: { planName: string; taskType?: number; list: any[] }) => Promise<{ taskIds: string[] }>;
  addOne: (args: {
    planName?: string; envId?: string; images: string[]; videoId?: string; taskType?: number; scheduleAt?: number;[k: string]: any;
  }) => Promise<{ taskIds: string[] }>;
  restart: (ids: string | string[]) => Promise<any>;
  cancel: (ids: string | string[]) => Promise<any>;
  detail: (id: string) => Promise<any>;
};

export enum TaskType {
  TiktokVideo = 1,
  TiktokWarmup = 2,
  TiktokImageSet = 3,
  TiktokLogin = 4,
  TiktokEditProfile = 6,
  Custom = 42,
}

export enum TaskStatus {
  Waiting = 1,
  InProgress = 2,
  Completed = 3,
  Failed = 4,
  Cancelled = 7,
}

export type Task = {
  id: string;
  planName: string;
  taskType: TaskType;
  serialName: string;
  envId: string;
  scheduleAt: number;
  status: TaskStatus;
  failCode?: number;
  failDesc?: string;
  cost?: number;
  shareLink?: string;
};

export type QueryResp = { total: number; items: Task[] };
export type HistoryResp = { total: number; items: Task[] };

export type BulkOpResp = {
  totalAmount: number;
  successAmount: number;
  failAmount: number;
  failDetails?: { id: string; code: number | string; msg: string }[];
};

export type TaskDetail = {
  id: string;
  planName: string;
  taskType: TaskType;
  serialName: string;
  envId: string;
  scheduleAt: number;
  status: TaskStatus;
  failCode?: number;
  failDesc?: string;
  cost?: number;
  resultImages?: string[];
  logs?: string[];
  searchAfter?: any[];
  logContinue?: boolean;
};


export type UtilsAPI = {
  nowSec: () => number;
  wait: (ms?: number) => Promise<void>;
  prettyAliError: (xml?: string) => string;
};

export type TiktokAPI = {
  addVideo: (args: {
    envId: string;
    video: string;
    planName?: string;
    scheduleAt?: number;
    videoDesc?: string;
    productId?: string;
    productTitle?: string;
    refVideoId?: string;
    maxTryTimes?: 0 | 1 | 2 | 3;
    timeoutMin?: number;
    sameVideoVolume?: number;
    sourceVideoVolume?: number;
    markAI?: boolean;
    cover?: string;
    needShareLink?: boolean;
  }) => Promise<TaskIdResp>;

  addImageSet: (args: {
    envId: string;
    images: string[];
    planName?: string;
    scheduleAt?: number;
    videoDesc?: string;
    videoId?: string;
    videoTitle?: string;
    maxTryTimes?: 0 | 1 | 2 | 3;
    timeoutMin?: number;
    sameVideoVolume?: number;
    markAI?: boolean;
    needShareLink?: boolean;
  }) => Promise<TaskIdResp>;

  addWarmup: (args: {
    envId: string;
    planName?: string;
    scheduleAt?: number;
    action: "search profile" | "search video" | "browse video";
    keywords?: string[];
    duration?: number;
  }) => Promise<TaskIdResp>;

  login: (args: { id: string; account: string; password: string; scheduleAt?: number; name?: string; remark?: string }) => Promise<TaskIdResp>;
  editProfile: (args: { id: string; scheduleAt?: number; name?: string; remark?: string; avatar?: string; nickName?: string; bio?: string; site?: string }) => Promise<TaskIdResp>;
  randomStar: (args: { id: string; scheduleAt?: number; name?: string; remark?: string }) => Promise<TaskIdResp>;
  randomStarAsia: (args: { id: string; scheduleAt?: number; name?: string; remark?: string }) => Promise<TaskIdResp>;
  randomComment: (args: { id: string; scheduleAt?: number; name?: string; remark?: string; useAi: 1 | 2; comment?: string }) => Promise<TaskIdResp>;
  randomCommentAsia: (args: { id: string; scheduleAt?: number; name?: string; remark?: string; useAi: 1 | 2; comment?: string }) => Promise<TaskIdResp>;
  message: (args: { id: string; scheduleAt?: number; name?: string; remark?: string; usernames: string[]; content: string }) => Promise<TaskIdResp>;
  messageAsia: (args: { id: string; scheduleAt?: number; name?: string; remark?: string; usernames: string[]; content: string }) => Promise<TaskIdResp>;
};

export type InstagramAPI = {
  login: (args: {
    id: string;
    account: string;
    password: string;
    scheduleAt?: number;
    name?: string;
    remark?: string;
  }) => Promise<{ data: TaskIdResp }>;

  pubReels: (args: {
    id: string;
    description: string;
    video: string[];
    scheduleAt?: number;
    name?: string;
    remark?: string;
  }) => Promise<{ data: TaskIdResp }>;

  pubReelsImages: (args: {
    id: string;
    description: string;
    image: string[];
    scheduleAt?: number;
    name?: string;
    remark?: string;
  }) => Promise<{ data: TaskIdResp }>;

  warmup: (args: {
    id: string;
    browseVideo: number;
    scheduleAt?: number;
    name?: string;
    remark?: string;
  }) => Promise<{ data: TaskIdResp }>;

  message: (args: {
    id: string;
    usernames: string[];
    content: string;
    scheduleAt?: number;
    name?: string;
    remark?: string;
  }) => Promise<{ data: TaskIdResp }>;
};

export type RedditAPI = {
  warmup: (args: {
    id: string;
    scheduleAt?: number;
    name?: string;
    remark?: string;
    keyword?: string;
  }) => Promise<{ data: TaskIdResp }>;

  postVideo: (args: {
    id: string;
    title: string;
    community: string;
    video: string[];
    description?: string;
    scheduleAt?: number;
    name?: string;
    remark?: string;
  }) => Promise<{ data: TaskIdResp }>;

  postImages: (args: {
    id: string;
    title: string;
    community: string;
    images: string[];
    description?: string;
    scheduleAt?: number;
    name?: string;
    remark?: string;
  }) => Promise<{ data: TaskIdResp }>;
};

// ── Common RPA task base params ──────────────────────────────────

export type RpaBaseParams = {
  id: string;
  name?: string;
  remark?: string;
  scheduleAt: number;
};

export type RpaTaskIdResp = { taskId: string };

// ── YouTube types ───────────────────────────────────────────────

export type YouTubeAPI = {
  /** Publish a YouTube Short */
  pubShort: (args: RpaBaseParams & {
    title: string;
    video: string;
    sameStyleUrl?: string;
    sameStyleVoice: number;
    originalVoice: number;
  }) => Promise<RpaTaskIdResp>;

  /** Publish a YouTube Video */
  pubVideo: (args: RpaBaseParams & {
    title: string;
    description: string;
    video: string;
  }) => Promise<RpaTaskIdResp>;

  /** YouTube account maintenance (warmup) */
  maintenance: (args: RpaBaseParams & {
    browseVideoNum: number;
    keyword: string[];
  }) => Promise<RpaTaskIdResp>;
};

// ── Google types ────────────────────────────────────────────────

export type GoogleAPI = {
  /** Google auto login */
  login: (args: RpaBaseParams & {
    email: string;
    password: string;
  }) => Promise<RpaTaskIdResp>;

  /** Download app from Google Play */
  appDownload: (args: RpaBaseParams & {
    appName: string;
  }) => Promise<RpaTaskIdResp>;

  /** Open app on Google for browsing */
  appBrowser: (args: RpaBaseParams & {
    appName: string;
    description?: string;
  }) => Promise<RpaTaskIdResp>;
};

// ── SHEIN types ─────────────────────────────────────────────────

export type SheinAPI = {
  /** SHEIN auto login */
  login: (args: RpaBaseParams & {
    email: string;
    password: string;
  }) => Promise<RpaTaskIdResp>;
};

// ── X (Twitter) types ───────────────────────────────────────────

export type XAPI = {
  /** Publish content on X (Twitter) */
  publish: (args: RpaBaseParams & {
    description: string;
    video: string[];
  }) => Promise<RpaTaskIdResp>;
};

// ── Pinterest types ─────────────────────────────────────────────

export type PinterestAPI = {
  /** Publish video on Pinterest */
  video: (args: RpaBaseParams & {
    title: string;
    description: string;
    video: string[];
    link?: string;
  }) => Promise<RpaTaskIdResp>;

  /** Publish pictures and text on Pinterest */
  image: (args: RpaBaseParams & {
    title: string;
    description: string;
    images: string[];
    link?: string;
  }) => Promise<RpaTaskIdResp>;
};

// ── Threads types ───────────────────────────────────────────────

export type ThreadsAPI = {
  /** Publish video on Threads */
  video: (args: RpaBaseParams & {
    title: string;
    video: string[];
    topic?: string;
  }) => Promise<RpaTaskIdResp>;

  /** Publish pictures and text on Threads */
  image: (args: RpaBaseParams & {
    title: string;
    images: string[];
    topic?: string;
  }) => Promise<RpaTaskIdResp>;
};

// ── Task Flow types ─────────────────────────────────────────────

export type TaskFlow = {
  id: string;
  title: string;
  desc: string;
  params: string[];
};

export type TaskFlowListResp = {
  total: number;
  page: number;
  pageSize: number;
  items: TaskFlow[];
};

// ── RPA Utility types ───────────────────────────────────────────

export type RpaUtilsAPI = {
  /** Multichannel video distribution (TikTok/IG Reels/YouTube Shorts) */
  multiPlatformVideoDistribution: (args: RpaBaseParams & {
    title: string;
    video: string[];
  }) => Promise<RpaTaskIdResp>;

  /** Upload files to cloud phone in batches */
  fileUpload: (args: RpaBaseParams & {
    files: string[];
  }) => Promise<RpaTaskIdResp>;

  /** Batch import contacts to cloud phone (RPA) */
  importContacts: (args: RpaBaseParams & {
    contacts: ContactObject[];
  }) => Promise<RpaTaskIdResp>;

  /** Upload Keybox to cloud phone */
  keyboxUpload: (args: RpaBaseParams & {
    files: string[];
  }) => Promise<RpaTaskIdResp>;

  /** Query task flows */
  flowList: (page: number, pageSize: number) => Promise<TaskFlowListResp>;

  /** Create custom task from a task flow */
  rpaAdd: (args: RpaBaseParams & {
    flowId: string;
    paramMap?: Record<string, any>;
  }) => Promise<RpaTaskIdResp>;
};

// ── Facebook types ──────────────────────────────────────────────

export type FacebookAPI = {
  login: (args: RpaBaseParams & { email: string; password: string }) => Promise<RpaTaskIdResp>;
  autoComment: (args: RpaBaseParams & { postAddress: string; comment: string[]; keyword: string[] }) => Promise<RpaTaskIdResp>;
  maintenance: (args: RpaBaseParams & { browsePostsNum: number; keyword: string[] }) => Promise<RpaTaskIdResp>;
  publish: (args: RpaBaseParams & { title: string; video: string[] }) => Promise<RpaTaskIdResp>;
  pubReels: (args: RpaBaseParams & { description: string; video: string }) => Promise<RpaTaskIdResp>;
  message: (args: RpaBaseParams & { usernames: string[]; content: string }) => Promise<RpaTaskIdResp>;
};

// ── ADB types ───────────────────────────────────────────────────

export type AdbDataItem = {
  code: number;
  id: string;
  ip: string;
  port: string;
  pwd: string;
};

export type AdbAPI = {
  getData: (ids: string[]) => Promise<{ items: AdbDataItem[] }>;
  setStatus: (ids: string[], open: boolean) => Promise<void>;
};

// ── Analytics types ─────────────────────────────────────────────

export type AnalyticsAccount = {
  id: string;
  account: string;
  channel: number;
  remark: string;
  operator: string;
  created_time: number;
  updated_time: number;
};

export type AnalyticsAccountsListParams = {
  page: number;
  pageSize: number;
  account?: string;
  channel?: number;
  userAccount?: string;
};

export type AnalyticsAccountsListResp = {
  total: number;
  page: number;
  items: AnalyticsAccount[];
};

export type AnalyticsAddAccountsParams = {
  channel: number;
  accountsData: { account: string; remark?: string }[];
};

export type AnalyticsAddAccountsResp = {
  bizCode: number;
  successCount: number;
  failCount: number;
  repeatCount: number;
};

export type AnalyticsDataItem = {
  id: string;
  channel: number;
  account: string;
  playCount: number;
  followerCount: number;
  diggCount: number;
  commentCount: number;
  collectCount: number;
  shareCount: number;
  dataDate: number;
  addAccDate: number;
  remark: string;
  createdId: string;
  username: string;
};

export type AnalyticsDataParams = {
  page: number;
  pageSize: number;
  account?: string;
  dataDate?: number;
  createdId?: string;
  channel?: number;
};

export type AnalyticsDataResp = {
  total: number;
  page: number;
  pageSize: number;
  items: AnalyticsDataItem[];
};

export type AnalyticsAPI = {
  accountsList: (params: AnalyticsAccountsListParams) => Promise<AnalyticsAccountsListResp>;
  addAccounts: (params: AnalyticsAddAccountsParams) => Promise<AnalyticsAddAccountsResp>;
  deleteAccount: (channel: number, account: string) => Promise<void>;
  getData: (params: AnalyticsDataParams) => Promise<AnalyticsDataResp>;
  updateAccount: (params: { id: string; account?: string; channel?: number; remark?: string }) => Promise<void>;
};

// ── Application Management types ────────────────────────────────

export type AppTeamAppListItem = {
  id: string;
  appName: string;
  appIcon: string;
  versionId: string;
  versionCode: number;
  versionName: string;
  status: number;
  isUpload: boolean;
  uploadStatus: number;
  appAuth: number;
  appRoot: number;
  envGroups: string[];
};

export type AppTeamAppListResp = {
  total: number;
  page: number;
  pageSize: number;
  items: AppTeamAppListItem[];
};

export type AppVersionInfo = {
  id: string;
  installStatus?: number;
  versionCode: string | number;
  versionName: string;
};

export type AppInfo = {
  appIcon: string;
  id?: string;
  appId?: string;
  appName: string;
  packageName?: string;
  appVersionInfoList?: AppVersionInfo[];
  appVersionList?: AppVersionInfo[];
  appVersionId?: string;
  installStatus?: number;
  installTime?: string;
  versionCode?: string;
  versionName?: string;
};

export type AppListResp = {
  total: number;
  page: number;
  pageSize: number;
  items: AppInfo[];
};

export type AppBatchOperateResp = {
  items: { id: number; errCode: number }[];
};

export type AppUploadStatusResp = {
  status: number;
  appName: string;
  appIcon: string;
  appId: string;
  versionId: string;
};

export type AppAPI = {
  add: (params: { id: string; versionId: string; installGroupIds?: string[] }) => Promise<void>;
  batchOperate: (params: { action: number; groupIds?: string[]; packageName?: string; versionId?: string }) => Promise<AppBatchOperateResp>;
  getTeamAppList: (page: number, pageSize: number) => Promise<AppTeamAppListResp>;
  getInstallable: (params: { envId: string; page: number; pageSize: number; name?: string; getUploadApp?: boolean }) => Promise<AppListResp>;
  getInstalled: (params: { envId: string; page: number; pageSize: number }) => Promise<AppListResp>;
  getAppShopList: (params: { page: number; pageSize: number; key?: string; getUploadApp?: boolean }) => Promise<AppListResp>;
  install: (envId: string, appVersionId: string) => Promise<void>;
  queryUploadStatus: (taskId: string) => Promise<AppUploadStatusResp>;
  remove: (id: string) => Promise<void>;
  setAuth: (id: string, appAuth: number) => Promise<void>;
  setAutoStart: (id: string, opera: number) => Promise<void>;
  setKeepAlive: (id: string, opera: number) => Promise<void>;
  setRoot: (id: string, opera: number) => Promise<void>;
  setAutoInstall: (params: { id: string; status: number; installGroupIds?: string[] }) => Promise<void>;
  start: (params: { envId: string; appVersionId?: string; packageName?: string }) => Promise<void>;
  stop: (params: { envId: string; appVersionId?: string; packageName?: string }) => Promise<void>;
  uninstall: (envId: string, packageName: string) => Promise<void>;
  upload: (params: { fileUrl: string; desc?: string }) => Promise<{ taskId: string }>;
};

// ── File Management types ───────────────────────────────────────

export type FileManagementAPI = {
  uploadFileResult: (taskId: string) => Promise<{ status: number }>;
  keyboxUpload: (id: string, fileUrl: string) => Promise<{ taskId: string }>;
  keyboxUploadResult: (taskId: string) => Promise<{ status: number }>;
};

// ── Library types ───────────────────────────────────────────────

export type MaterialTag = {
  id: string;
  name: string;
  color: number;
};

export type MaterialItem = {
  id: string;
  createdTime: number;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  fileType: number;
  width: number;
  height: number;
  source: number;
  tags: MaterialTag[];
  userName: string;
};

export type MaterialSearchResp = {
  total: number;
  page: number;
  pageSize: number;
  list: MaterialItem[];
};

export type MaterialTagSearchResp = {
  total: number;
  page: number;
  pageSize: number;
  list: MaterialTag[];
};

export type FailDetail = {
  code: number;
  id: string;
  msg: string;
};

export type LibraryAPI = {
  createMaterial: (params: { url: string; tagsId?: string[]; fileName?: string }) => Promise<{ id: string; failDetails?: FailDetail[] }>;
  createTag: (params: { name: string; color?: number }) => Promise<{ id: string }>;
  deleteMaterial: (ids: string[]) => Promise<BulkOpResp>;
  deleteTag: (ids: string[]) => Promise<BulkOpResp>;
  searchMaterial: (params: { page?: number; pageSize?: number; fileName?: string; tagsId?: string[]; source?: number; fileType?: number[]; ids?: string[] }) => Promise<MaterialSearchResp>;
  searchMaterialTag: (params: { page?: number; pageSize?: number; name?: string }) => Promise<MaterialTagSearchResp>;
  setMaterialTag: (materialsId: string[], tagsId?: string[]) => Promise<{ failDetails?: FailDetail[] }>;
};

// ── Shell types ─────────────────────────────────────────────────

export type ShellAPI = {
  execute: (id: string, cmd: string) => Promise<{ status: boolean; output: string }>;
};

// ── Webhook types ───────────────────────────────────────────────

export enum CallbackType {
  CloudPhoneStartup = 1,
  CloudPhoneFileUpload = 4,
  CloudPhoneScreenshot = 5,
  CloudPhoneRpaTaskCompletion = 6,
  CloudPhoneShutdown = 8,
  CloudPhoneNameChange = 9,
  CloudPhoneDeletion = 10,
  CloudPhoneTagChange = 11,
  CloudPhoneRpaTaskCreation = 12,
  CloudPhoneRpaTaskCancellation = 13,
  BatchImportContacts = 14,
  AppInstallation = 15,
}

export type WebhookAPI = {
  setUrl: (url: string) => Promise<void>;
  getUrl: () => Promise<{ url: string }>;
};

// ── OEM types ───────────────────────────────────────────────────

export type ToolBarSetting = {
  toolBar: string;
  visible: boolean;
};

export type OemAPI = {
  customization: (params: {
    title?: string;
    logo?: string;
    hideHeader?: boolean;
    mirrorUrl?: string;
    toolBarSettings?: ToolBarSetting[];
  }) => Promise<void>;
};

// ── Billing types ───────────────────────────────────────────────

export type BalanceResp = {
  balance: number;
  giftMoney: number;
  availableTimeAddOn: number;
};

export type PlanProfile = {
  id: string;
  price: number;
  level: number;
  envNum: number;
  freeTime: number;
  openEnvNumOneDay: number;
  createEnvNumOneDay: number;
};

export type PlanInfoResp = {
  plan: number;
  profiles: number;
  monthlyRental: number;
  parallels: number;
  expirationTime: number;
  monthlyFee: number;
  availableProfiles: number;
  availableMonthlyRentals: number;
};

export type BillingAPI = {
  balanceInquiry: () => Promise<BalanceResp>;
  changePlan: (params: { profilesId: string; parallelsNum: number; monthlyRentalNum: number; days?: number; promoCode?: string }) => Promise<void>;
  getPlanList: () => Promise<PlanProfile[]>;
  getCurrentPlanInfo: () => Promise<PlanInfoResp>;
  renewPlan: (days: number, promoCode?: string) => Promise<void>;
};

// ── Group Management types ──────────────────────────────────────

export type GroupCreateItem = { name: string; remark?: string };

export type GroupCreateResp = {
  totalAmount: number;
  successAmount: number;
  failAmount: number;
  successDetails: { id: string; name: string; remark?: string }[];
  failDetails?: FailDetail[];
};

export type GroupUpdateItem = { id: string; name?: string; remark?: string };

export type GroupItem = { id: string; name: string; remark?: string };

export type GroupQueryParams = {
  page: number;
  pageSize: number;
  ids?: string[];
  names?: string[];
  remarks?: string[];
};

export type GroupQueryResp = {
  total: number;
  page: number;
  pageSize: number;
  list: GroupItem[];
};

export type GroupAPI = {
  create: (list: GroupCreateItem[]) => Promise<GroupCreateResp>;
  delete: (ids: string[]) => Promise<BulkOpResp>;
  modify: (list: GroupUpdateItem[]) => Promise<BulkOpResp>;
  query: (params: GroupQueryParams) => Promise<GroupQueryResp>;
};

// ── Proxy Management types ──────────────────────────────────────

export type ProxyAddItem = {
  scheme: string;
  server: string;
  port: number;
  username?: string;
  password?: string;
};

export type ProxyAddResp = {
  totalAmount: number;
  successAmount: number;
  failAmount: number;
  failDetails?: { index: number; code: number; msg: string }[];
  successDetails?: { index: number; id: string }[];
};

export type ProxyUpdateItem = ProxyAddItem & { id: string };

export type ProxyListItem = {
  id: string;
  serialNo: string;
  scheme: string;
  server: string;
  port: number;
  username?: string;
  password?: string;
};

export type ProxyListResp = {
  total: number;
  page: number;
  pageSize: number;
  list: ProxyListItem[];
};

export type ProxyMgmtAPI = {
  add: (list: ProxyAddItem[]) => Promise<ProxyAddResp>;
  delete: (ids: string[]) => Promise<BulkOpResp>;
  list: (params: { page: number; pageSize: number; ids?: string[] }) => Promise<ProxyListResp>;
  update: (list: ProxyUpdateItem[]) => Promise<BulkOpResp>;
};

// ── Tag Management types ────────────────────────────────────────

export type TagCreateItem = { name: string; color?: string };

export type TagCreateResp = {
  totalAmount: number;
  successAmount: number;
  failAmount: number;
  successDetails: { id: string; name: string; color?: string }[];
  failDetails?: FailDetail[];
};

export type TagUpdateItem = { id: string; name?: string; color?: string };

export type TagMgmtItem = { id: string; name: string; color?: string };

export type TagQueryParams = {
  page: number;
  pageSize: number;
  ids?: string[];
  names?: string[];
  colors?: string[];
};

export type TagQueryResp = {
  total: number;
  page: number;
  pageSize: number;
  list: TagMgmtItem[];
};

export type TagAPI = {
  create: (list: TagCreateItem[]) => Promise<TagCreateResp>;
  delete: (ids: string[]) => Promise<BulkOpResp>;
  modify: (list: TagUpdateItem[]) => Promise<BulkOpResp>;
  query: (params: TagQueryParams) => Promise<TagQueryResp>;
};

// ── Proxy Detection types ───────────────────────────────────────

export type ProxyCheckParams = {
  detect_type: string;
  proxy_type: string;
  server: string;
  port: number;
  username?: string;
  password?: string;
};

export type ProxyCheckResp = {
  detectStatus: boolean;
  message?: string;
  outboundIP: string;
  countryCode: string;
  countryName: string;
  subdivision: string;
  city: string;
  timezone: string;
  isp: string;
};

export type ProxyDetectionAPI = {
  check: (params: ProxyCheckParams) => Promise<ProxyCheckResp>;
};

// ── Browser API types (local API) ───────────────────────────────

export type BrowserProxyConfig = {
  typeId: number;
  server?: string;
  port?: number;
  username?: string;
  password?: string;
  country?: string;
  region?: string;
  city?: string;
  useProxyCfg?: boolean;
  protocol?: number;
};

export type BrowserCreateParams = {
  serialName: string;
  groupId?: string;
  tagIds?: string[];
  remark?: string;
  cookie?: string;
  accountPlatform?: string;
  accountUsername?: string;
  accountPassword?: string;
  openTabs?: string;
  browserOs: number;
  browserUa?: string;
  simulateConfig?: Record<string, any>;
  proxyId?: string;
  proxyConfig?: BrowserProxyConfig;
  browserStartArg?: string;
};

export type BrowserEditParams = Partial<BrowserCreateParams> & { id: string };

export type BrowserListParams = {
  page?: number;
  pageSize?: number;
  ids?: string[];
  serialName?: string;
  remark?: string;
  groupName?: string;
  tags?: string[];
};

export type BrowserListResp = {
  total: number;
  page: number;
  pageSize: number;
  items: any[];
};

export type BrowserDeleteResp = {
  successIds: string[];
  busyIds: string[];
  serverErrIds: string[];
};

export type BrowserTransferResp = {
  successCount: number;
  failCount: number;
  failEnvIds?: string[];
};

export type BrowserTask = {
  id: string;
  eid: string;
  name: string;
  remark: string;
  serialName: string;
  status: number;
  startAt: number;
  finishAt: number;
  cost: number;
  resultCode: number;
  resultDesc: string;
  scheduleAt: number;
};

export type BrowserTaskQueryResp = {
  total: number;
  page: number;
  pageSize: number;
  list: BrowserTask[];
};

export type BrowserAPI = {
  status: () => Promise<void>;
  create: (params: BrowserCreateParams) => Promise<{ id: string }>;
  edit: (params: BrowserEditParams) => Promise<void>;
  list: (params?: BrowserListParams) => Promise<BrowserListResp>;
  launch: (id: string) => Promise<{ debugPort: number }>;
  close: (id: string) => Promise<void>;
  delete: (envIds: string[]) => Promise<BrowserDeleteResp>;
  transfer: (params: { username: string; envIds: string[]; transferOption?: string[] }) => Promise<BrowserTransferResp>;
  taskFlowQuery: (page?: number, pageSize?: number) => Promise<TaskFlowListResp>;
  createCustomTask: (params: { eid: string; name?: string; remark?: string; scheduleAt: number; flowId: string; paramMap?: Record<string, any> }) => Promise<{ taskId: string }>;
  queryTask: (params: { page?: number; pageSize?: number; taskIds?: string[] }) => Promise<BrowserTaskQueryResp>;
  cancelTask: (taskId: string) => Promise<void>;
  retryTask: (taskId: string) => Promise<void>;
};

// ── Client type ─────────────────────────────────────────────────

export type GeelarkClient = {
  phone: PhoneAPI;
  upload: UploadAPI;
  task: TaskAPI;
  tiktok: TiktokAPI;
  instagram: InstagramAPI;
  reddit: RedditAPI;
  youtube: YouTubeAPI;
  google: GoogleAPI;
  shein: SheinAPI;
  x: XAPI;
  pinterest: PinterestAPI;
  threads: ThreadsAPI;
  rpaUtils: RpaUtilsAPI;
  facebook: FacebookAPI;
  adb: AdbAPI;
  analytics: AnalyticsAPI;
  app: AppAPI;
  fileManagement: FileManagementAPI;
  library: LibraryAPI;
  shell: ShellAPI;
  webhook: WebhookAPI;
  oem: OemAPI;
  billing: BillingAPI;
  group: GroupAPI;
  proxyMgmt: ProxyMgmtAPI;
  tag: TagAPI;
  proxyDetection: ProxyDetectionAPI;
  browser: BrowserAPI;
  uploadImageAndCreateTask: (args: {
    planName?: string;
    envId?: string;
    taskType?: number;
    imagePath: string;
    videoId?: string;
    waitMs?: number;
    powerCycle?: boolean;
  }) => Promise<{ taskIds: string[]; resourceUrl: string }>;
  utils: UtilsAPI;
  request: (pathname: string, body?: any, opts?: { retries?: number; retryDelay?: number }) => Promise<any>;
  with: (next?: Record<string, any>) => GeelarkClient;
  readonly defaults: Record<string, any>;
};
