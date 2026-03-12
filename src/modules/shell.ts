import { HttpClient } from "../core/types";
import { GeelarkError } from "../core/errors";
import type { ShellAPI } from "../types";

export function createShellModule(http: HttpClient): ShellAPI {
  return {
    execute(id, cmd) {
      if (!id) throw new GeelarkError("shell.execute: id required");
      if (!cmd) throw new GeelarkError("shell.execute: cmd required");
      return http.post("/shell/execute", { id, cmd });
    },
  };
}
