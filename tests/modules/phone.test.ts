import { describe, it, expect, vi, beforeEach } from "vitest";
import { createPhoneModule } from "../../src/modules/phone";
import type { HttpClient } from "../../src/types";

function createMockHttp(): HttpClient & { post: ReturnType<typeof vi.fn> } {
  return {
    post: vi.fn().mockResolvedValue(undefined),
  };
}

describe("phone module", () => {
  let http: ReturnType<typeof createMockHttp>;
  let phone: ReturnType<typeof createPhoneModule>;

  beforeEach(() => {
    http = createMockHttp();
    phone = createPhoneModule(http);
  });

  describe("list()", () => {
    it("calls /phone/list with default page and pageSize", async () => {
      http.post.mockResolvedValue({ total: 0, page: 1, pageSize: 10, items: [] });

      await phone.list();

      expect(http.post).toHaveBeenCalledOnce();
      expect(http.post).toHaveBeenCalledWith("/phone/list", {
        page: 1,
        pageSize: 10,
      });
    });

    it("passes custom params to /phone/list", async () => {
      http.post.mockResolvedValue({ total: 5, page: 2, pageSize: 5, items: [] });

      await phone.list({ page: 2, pageSize: 5, serialName: "Phone-01" });

      expect(http.post).toHaveBeenCalledWith("/phone/list", {
        page: 2,
        pageSize: 5,
        serialName: "Phone-01",
      });
    });

    it("merges filter params correctly", async () => {
      http.post.mockResolvedValue({ total: 0, page: 1, pageSize: 10, items: [] });

      await phone.list({ tags: ["vip"], chargeMode: 1 });

      expect(http.post).toHaveBeenCalledWith("/phone/list", {
        page: 1,
        pageSize: 10,
        tags: ["vip"],
        chargeMode: 1,
      });
    });
  });

  describe("start()", () => {
    it("wraps a single string id in an array", async () => {
      await phone.start("phone-123");

      expect(http.post).toHaveBeenCalledWith("/phone/start", {
        ids: ["phone-123"],
      });
    });

    it("passes an array of ids as-is", async () => {
      await phone.start(["phone-1", "phone-2"]);

      expect(http.post).toHaveBeenCalledWith("/phone/start", {
        ids: ["phone-1", "phone-2"],
      });
    });
  });

  describe("stop()", () => {
    it("wraps a single string id in an array", async () => {
      await phone.stop("phone-456");

      expect(http.post).toHaveBeenCalledWith("/phone/stop", {
        ids: ["phone-456"],
      });
    });

    it("passes an array of ids as-is", async () => {
      await phone.stop(["a", "b", "c"]);

      expect(http.post).toHaveBeenCalledWith("/phone/stop", {
        ids: ["a", "b", "c"],
      });
    });
  });

  describe("delete()", () => {
    it("sends ids array to /phone/delete", async () => {
      await phone.delete(["id-1", "id-2"]);

      expect(http.post).toHaveBeenCalledWith("/phone/delete", {
        ids: ["id-1", "id-2"],
      });
    });
  });

  describe("status()", () => {
    it("sends ids to /phone/status", async () => {
      await phone.status(["id-a", "id-b"]);

      expect(http.post).toHaveBeenCalledWith("/phone/status", {
        ids: ["id-a", "id-b"],
      });
    });
  });

  describe("addNew()", () => {
    it("sends params to /phone/addNew", async () => {
      const params = {
        mobileType: "android",
        data: [{ profileName: "Test-01" }],
      };
      await phone.addNew(params);

      expect(http.post).toHaveBeenCalledWith("/phone/addNew", params);
    });
  });

  describe("screenShot()", () => {
    it("sends id to /phone/screenShot", async () => {
      http.post.mockResolvedValue({ taskId: "task-1" });

      const result = await phone.screenShot("phone-1");

      expect(http.post).toHaveBeenCalledWith("/phone/screenShot", {
        id: "phone-1",
      });
      expect(result).toEqual({ taskId: "task-1" });
    });
  });

  describe("screenShotResult()", () => {
    it("sends taskId to /phone/screenShot/result", async () => {
      http.post.mockResolvedValue({ status: 1, downloadLink: "https://example.com/ss.png" });

      const result = await phone.screenShotResult("task-1");

      expect(http.post).toHaveBeenCalledWith("/phone/screenShot/result", {
        taskId: "task-1",
      });
      expect(result).toEqual({ status: 1, downloadLink: "https://example.com/ss.png" });
    });
  });

  describe("getGps()", () => {
    it("sends ids to /phone/gps/get", async () => {
      await phone.getGps(["id-1"]);

      expect(http.post).toHaveBeenCalledWith("/phone/gps/get", {
        ids: ["id-1"],
      });
    });
  });

  describe("setGps()", () => {
    it("sends list to /phone/gps/set", async () => {
      const gpsItems = [{ id: "id-1", latitude: 37.77, longitude: -122.42 }];
      await phone.setGps(gpsItems);

      expect(http.post).toHaveBeenCalledWith("/phone/gps/set", {
        list: gpsItems,
      });
    });
  });

  describe("update()", () => {
    it("sends params to /phone/detail/update", async () => {
      const params = { id: "phone-1", name: "NewName" };
      await phone.update(params);

      expect(http.post).toHaveBeenCalledWith("/phone/detail/update", params);
    });
  });

  describe("transfer()", () => {
    it("sends params to /phone/transfer", async () => {
      const params = { account: "user@example.com", ids: ["id-1", "id-2"] };
      await phone.transfer(params);

      expect(http.post).toHaveBeenCalledWith("/phone/transfer", params);
    });
  });

  describe("brandList()", () => {
    it("sends androidVer to /phone/brand/list", async () => {
      await phone.brandList(12);

      expect(http.post).toHaveBeenCalledWith("/phone/brand/list", {
        androidVer: 12,
      });
    });
  });

  describe("setRoot()", () => {
    it("sends ids and open to /root/setStatus", async () => {
      await phone.setRoot(["id-1"], true);

      expect(http.post).toHaveBeenCalledWith("/root/setStatus", {
        ids: ["id-1"],
        open: true,
      });
    });
  });

  describe("sendSms()", () => {
    it("sends params to /phone/sendSms", async () => {
      const params = { id: "phone-1", phoneNumber: "+1234567890", text: "Hello" };
      await phone.sendSms(params);

      expect(http.post).toHaveBeenCalledWith("/phone/sendSms", params);
    });
  });

  describe("moveGroup()", () => {
    it("sends envIds and groupId to /phone/moveGroup", async () => {
      await phone.moveGroup(["env-1"], "group-1");

      expect(http.post).toHaveBeenCalledWith("/phone/moveGroup", {
        envIds: ["env-1"],
        groupId: "group-1",
      });
    });
  });

  describe("importContacts()", () => {
    it("sends id and contacts to /phone/importContacts", async () => {
      const contacts = [{ firstName: "John", mobile: "+1234567890" }];
      await phone.importContacts("phone-1", contacts);

      expect(http.post).toHaveBeenCalledWith("/phone/importContacts", {
        id: "phone-1",
        contacts,
      });
    });
  });
});
