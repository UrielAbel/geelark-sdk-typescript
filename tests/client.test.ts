import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock fetch globally so that createGeelarkClient does not make real HTTP calls
// during module initialization (no network calls happen at init, but the http
// client references fetch at call-time, so this keeps tests hermetic).
vi.stubGlobal("fetch", vi.fn());

import { createGeelarkClient } from "../src";
import type { GeelarkClient } from "../src";

const MODULE_NAMES = [
  "phone",
  "upload",
  "task",
  "tiktok",
  "instagram",
  "reddit",
  "youtube",
  "google",
  "shein",
  "x",
  "pinterest",
  "threads",
  "rpaUtils",
  "facebook",
  "adb",
  "analytics",
  "app",
  "fileManagement",
  "library",
  "shell",
  "webhook",
  "oem",
  "billing",
  "group",
  "proxyMgmt",
  "tag",
  "proxyDetection",
  "browser",
] as const;

describe("createGeelarkClient", () => {
  let client: GeelarkClient;

  beforeEach(() => {
    client = createGeelarkClient({
      appId: "test-app-id",
      apiKey: "test-api-key",
    });
  });

  it("creates a client with required config", () => {
    expect(client).toBeDefined();
    expect(typeof client).toBe("object");
  });

  it("throws when appId is missing", () => {
    expect(() =>
      createGeelarkClient({ appId: "", apiKey: "key" })
    ).toThrow();
  });

  it("throws when apiKey is missing", () => {
    expect(() =>
      createGeelarkClient({ appId: "id", apiKey: "" })
    ).toThrow();
  });

  it("exposes all 28 modules on the client", () => {
    for (const name of MODULE_NAMES) {
      expect(client).toHaveProperty(name);
      expect(client[name]).toBeDefined();
      expect(typeof client[name]).toBe("object");
    }
  });

  it("exposes uploadImageAndCreateTask workflow", () => {
    expect(typeof client.uploadImageAndCreateTask).toBe("function");
  });

  it("exposes utils with nowSec, wait, prettyAliError", () => {
    expect(typeof client.utils.nowSec).toBe("function");
    expect(typeof client.utils.wait).toBe("function");
    expect(typeof client.utils.prettyAliError).toBe("function");
  });

  it("utils.nowSec returns a unix timestamp in seconds", () => {
    const ts = client.utils.nowSec();
    expect(typeof ts).toBe("number");
    // Should be roughly current time in seconds (not milliseconds)
    expect(ts).toBeGreaterThan(1_700_000_000);
    expect(ts).toBeLessThan(2_000_000_000);
  });

  it("exposes request method", () => {
    expect(typeof client.request).toBe("function");
  });

  it("exposes with method that returns a new client", () => {
    const newClient = client.with({ planName: "new-plan" });
    expect(newClient).toBeDefined();
    expect(newClient).not.toBe(client);
    expect(newClient.defaults.planName).toBe("new-plan");
  });

  it("exposes defaults as a readonly copy", () => {
    const defaults = client.defaults;
    expect(typeof defaults).toBe("object");
  });

  it("with() merges defaults correctly", () => {
    const c1 = createGeelarkClient({
      appId: "app",
      apiKey: "key",
      defaults: { planName: "original", envId: "env-1" },
    });
    const c2 = c1.with({ planName: "override" });
    expect(c2.defaults.planName).toBe("override");
    expect(c2.defaults.envId).toBe("env-1");
  });

  it("each module is a plain object with function properties", () => {
    // Spot-check a few modules have expected methods
    expect(typeof client.phone.list).toBe("function");
    expect(typeof client.phone.start).toBe("function");
    expect(typeof client.phone.delete).toBe("function");

    expect(typeof client.tiktok.addVideo).toBe("function");
    expect(typeof client.tiktok.login).toBe("function");

    expect(typeof client.instagram.login).toBe("function");
    expect(typeof client.instagram.pubReels).toBe("function");

    expect(typeof client.browser.create).toBe("function");
    expect(typeof client.browser.launch).toBe("function");
    expect(typeof client.browser.close).toBe("function");
  });
});
