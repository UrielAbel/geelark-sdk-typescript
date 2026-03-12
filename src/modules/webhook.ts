import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { WebhookAPI } from "../types";

export function createWebhookModule(http: HttpClient): WebhookAPI {
  return {
    setUrl(url) {
      if (!url) throw new GeelarkError("webhook.setUrl: url required");
      return http.post("/callback/set", { url });
    },

    getUrl() {
      return http.post("/callback/get", {});
    },
  };
}
