import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { AnalyticsAPI } from "../types";

export function createAnalyticsModule(http: HttpClient): AnalyticsAPI {
  return {
    accountsList(params) {
      return http.post("/analytics/accounts/list", params);
    },

    addAccounts(params) {
      if (!Array.isArray(params.accountsData) || !params.accountsData.length)
        throw new GeelarkError("analytics.addAccounts: accountsData[] required");
      return http.post("/analytics/accounts/add", params);
    },

    deleteAccount(channel, account) {
      if (!account) throw new GeelarkError("analytics.deleteAccount: account required");
      return http.post("/analytics/accounts/delete", { channel, account });
    },

    getData(params) {
      return http.post("/analytics/data", params);
    },

    updateAccount(params) {
      if (!params.id) throw new GeelarkError("analytics.updateAccount: id required");
      return http.post("/analytics/accounts/update", params);
    },
  };
}
