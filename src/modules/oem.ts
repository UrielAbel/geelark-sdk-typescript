import { HttpClient } from "../core/types";
import type { OemAPI } from "../types";

export function createOemModule(http: HttpClient): OemAPI {
  return {
    customization(params) {
      return http.post("/phone/customization", params);
    },
  };
}
