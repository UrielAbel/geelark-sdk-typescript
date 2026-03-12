import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { BillingAPI } from "../types";

export function createBillingModule(http: HttpClient): BillingAPI {
  return {
    balanceInquiry() {
      return http.post("/pay/wallet", {});
    },

    changePlan(params) {
      if (!params.profilesId) throw new GeelarkError("billing.changePlan: profilesId required");
      return http.post("/pay/plan/upgrade", params);
    },

    getPlanList() {
      return http.post("/pay/profiles/list", {});
    },

    getCurrentPlanInfo() {
      return http.post("/pay/plan/info", {});
    },

    renewPlan(days, promoCode) {
      if (!days) throw new GeelarkError("billing.renewPlan: days required");
      return http.post("/pay/plan/continue", { days, promoCode });
    },
  };
}
