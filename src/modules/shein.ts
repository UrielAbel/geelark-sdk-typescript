import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { SheinAPI } from "../types";

export function createSheinModule(http: HttpClient): SheinAPI {
  return {
    login({ id, name, remark, scheduleAt, email, password }) {
      if (!id) throw new GeelarkError("shein: id (cloud phone) required");
      if (!email) throw new GeelarkError("shein.login: email required");
      if (!password) throw new GeelarkError("shein.login: password required");
      return http.post("/rpa/task/sheinLogin", {
        id, name, remark, scheduleAt, email, password,
      });
    },
  };
}
