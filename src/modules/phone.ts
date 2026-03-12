import type {
  HttpClient,
  PhoneAPI,
  PhoneListParams,
  AddNewParams,
  PhoneUpdateParams,
  NewOneParams,
  SendSmsParams,
  TransferParams,
  GpsItem,
  ContactObject,
} from "../types";

export function createPhoneModule(http: HttpClient): PhoneAPI {
  const toArray = (v: string | string[]) => (Array.isArray(v) ? v : [v]);

  return {
    // ── List / Query ──────────────────────────────────────────────
    list: (params: PhoneListParams = {}) => {
      const { page = 1, pageSize = 10, ...rest } = params;
      return http.post("/phone/list", { page, pageSize, ...rest });
    },

    status: (ids) => http.post("/phone/status", { ids }),

    // ── Create / Delete ───────────────────────────────────────────
    addNew: (params: AddNewParams) => http.post("/phone/addNew", params),

    delete: (ids) => http.post("/phone/delete", { ids }),

    // ── Power ─────────────────────────────────────────────────────
    start: (ids) => http.post("/phone/start", { ids: toArray(ids) }),

    stop: (ids) => http.post("/phone/stop", { ids: toArray(ids) }),

    // ── GPS ───────────────────────────────────────────────────────
    getGps: (ids) => http.post("/phone/gps/get", { ids }),

    setGps: (list) => http.post("/phone/gps/set", { list }),

    // ── Update / Modify ───────────────────────────────────────────
    update: (params: PhoneUpdateParams) =>
      http.post("/phone/detail/update", params),

    // ── One-click new machine (V2 endpoint) ───────────────────────
    newOne: (params: NewOneParams) => {
      // This endpoint lives under /open/v2, so we go up one level
      // from the default baseUrl (.../open/v1) by using a relative trick.
      // We post to the raw path and let the http client prepend baseUrl.
      // Since baseUrl = .../open/v1, we need /../v2/phone/newOne
      return http.post("/../v2/phone/newOne", params);
    },

    // ── Screenshot ────────────────────────────────────────────────
    screenShot: (id) => http.post("/phone/screenShot", { id }),

    screenShotResult: (taskId) =>
      http.post("/phone/screenShot/result", { taskId }),

    // ── Root ──────────────────────────────────────────────────────
    setRoot: (ids, open) => http.post("/root/setStatus", { ids, open }),

    // ── Device ID ─────────────────────────────────────────────────
    getSerialNum: (id) => http.post("/phone/serialNum/get", { id }),

    // ── SMS ───────────────────────────────────────────────────────
    sendSms: (params: SendSmsParams) => http.post("/phone/sendSms", params),

    // ── Brands ────────────────────────────────────────────────────
    brandList: (androidVer) =>
      http.post("/phone/brand/list", { androidVer }),

    // ── Transfer ──────────────────────────────────────────────────
    transfer: (params: TransferParams) =>
      http.post("/phone/transfer", params),

    // ── Network type ──────────────────────────────────────────────
    setNetType: (id, netType) =>
      http.post("/phone/net/set", { id, netType }),

    // ── Hide Accessibility ────────────────────────────────────────
    hideAccessibility: (ids, pkgName) =>
      http.post("/phone/hideAccessibility", { ids, pkgName }),

    // ── Move Group ────────────────────────────────────────────────
    moveGroup: (envIds, groupId) =>
      http.post("/phone/moveGroup", { envIds, groupId }),

    // ── Upload file ───────────────────────────────────────────────
    uploadFile: (id, fileUrl) =>
      http.post("/phone/uploadFile", { id, fileUrl }),

    // ── Contacts ──────────────────────────────────────────────────
    importContacts: (id, contacts) =>
      http.post("/phone/importContacts", { id, contacts }),

    importContactsResult: (taskId) =>
      http.post("/phone/importContactsResult", { taskId }),
  };
}
