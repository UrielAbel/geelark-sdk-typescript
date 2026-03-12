import { describe, it, expect, vi, beforeEach } from "vitest";
import { createTiktokModule } from "../../src/modules/tiktok";
import { GeelarkError } from "../../src/core/errors";
import type { HttpClient } from "../../src/types";

function createMockHttp(): HttpClient & { post: ReturnType<typeof vi.fn> } {
  return {
    post: vi.fn().mockResolvedValue({ taskIds: ["task-1"] }),
  };
}

describe("tiktok module", () => {
  let http: ReturnType<typeof createMockHttp>;
  let tiktok: ReturnType<typeof createTiktokModule>;

  beforeEach(() => {
    http = createMockHttp();
    tiktok = createTiktokModule(http, { planName: "default-plan" });
  });

  describe("addVideo()", () => {
    it("calls /task/add with taskType 1 and correct body", async () => {
      await tiktok.addVideo({
        envId: "env-1",
        video: "https://example.com/video.mp4",
        videoDesc: "Test video",
      });

      expect(http.post).toHaveBeenCalledOnce();
      const [path, body] = http.post.mock.calls[0]!;
      expect(path).toBe("/task/add");
      expect(body.taskType).toBe(1);
      expect(body.planName).toBe("default-plan");
      expect(body.list).toHaveLength(1);
      expect(body.list[0].envId).toBe("env-1");
      expect(body.list[0].video).toBe("https://example.com/video.mp4");
      expect(body.list[0].videoDesc).toBe("Test video");
    });

    it("uses explicit planName over defaults", async () => {
      await tiktok.addVideo({
        envId: "env-1",
        video: "https://example.com/video.mp4",
        planName: "custom-plan",
      });

      const body = http.post.mock.calls[0]![1];
      expect(body.planName).toBe("custom-plan");
    });

    it("includes scheduleAt in list item", async () => {
      const scheduledTime = 1700000000;
      await tiktok.addVideo({
        envId: "env-1",
        video: "https://example.com/video.mp4",
        scheduleAt: scheduledTime,
      });

      const body = http.post.mock.calls[0]![1];
      expect(body.list[0].scheduleAt).toBe(scheduledTime);
    });

    it("throws when envId is missing", async () => {
      await expect(
        tiktok.addVideo({
          envId: "",
          video: "https://example.com/video.mp4",
        })
      ).rejects.toThrow(GeelarkError);
    });

    it("throws when video is missing", async () => {
      await expect(
        tiktok.addVideo({
          envId: "env-1",
          video: "",
        })
      ).rejects.toThrow(GeelarkError);
    });

    it("throws when planName is not provided and no default", async () => {
      const tiktokNoDefaults = createTiktokModule(http, {});
      await expect(
        tiktokNoDefaults.addVideo({
          envId: "env-1",
          video: "https://example.com/video.mp4",
        })
      ).rejects.toThrow(GeelarkError);
    });

    it("passes optional fields to the list item", async () => {
      await tiktok.addVideo({
        envId: "env-1",
        video: "https://example.com/video.mp4",
        productId: "prod-123",
        productTitle: "My Product",
        maxTryTimes: 3,
        timeoutMin: 30,
        markAI: true,
        cover: "https://example.com/cover.jpg",
        needShareLink: true,
      });

      const item = http.post.mock.calls[0]![1].list[0];
      expect(item.productId).toBe("prod-123");
      expect(item.productTitle).toBe("My Product");
      expect(item.maxTryTimes).toBe(3);
      expect(item.timeoutMin).toBe(30);
      expect(item.markAI).toBe(true);
      expect(item.cover).toBe("https://example.com/cover.jpg");
      expect(item.needShareLink).toBe(true);
    });
  });

  describe("addImageSet()", () => {
    it("calls /task/add with taskType 3", async () => {
      await tiktok.addImageSet({
        envId: "env-1",
        images: ["https://example.com/img1.jpg", "https://example.com/img2.jpg"],
      });

      const [path, body] = http.post.mock.calls[0]!;
      expect(path).toBe("/task/add");
      expect(body.taskType).toBe(3);
      expect(body.list[0].images).toEqual([
        "https://example.com/img1.jpg",
        "https://example.com/img2.jpg",
      ]);
    });

    it("throws when images is empty", async () => {
      await expect(
        tiktok.addImageSet({
          envId: "env-1",
          images: [],
        })
      ).rejects.toThrow(GeelarkError);
    });
  });

  describe("addWarmup()", () => {
    it("calls /task/add with taskType 2", async () => {
      await tiktok.addWarmup({
        envId: "env-1",
        action: "browse video",
        duration: 300,
      });

      const [path, body] = http.post.mock.calls[0]!;
      expect(path).toBe("/task/add");
      expect(body.taskType).toBe(2);
      expect(body.list[0].action).toBe("browse video");
      expect(body.list[0].duration).toBe(300);
    });

    it("throws when keywords are missing for search actions", async () => {
      await expect(
        tiktok.addWarmup({
          envId: "env-1",
          action: "search video",
        })
      ).rejects.toThrow(GeelarkError);
    });

    it("does not throw for browse video without keywords", async () => {
      await expect(
        tiktok.addWarmup({
          envId: "env-1",
          action: "browse video",
        })
      ).resolves.not.toThrow();
    });
  });

  describe("login()", () => {
    it("calls /rpa/task/tiktokLogin with correct params", async () => {
      await tiktok.login({
        id: "phone-1",
        account: "myuser",
        password: "mypass",
        name: "Login Task",
      });

      expect(http.post).toHaveBeenCalledOnce();
      const [path, body] = http.post.mock.calls[0]!;
      expect(path).toBe("/rpa/task/tiktokLogin");
      expect(body.id).toBe("phone-1");
      expect(body.account).toBe("myuser");
      expect(body.password).toBe("mypass");
      expect(body.name).toBe("Login Task");
      expect(typeof body.scheduleAt).toBe("number");
    });

    it("throws when id is missing", async () => {
      await expect(
        tiktok.login({ id: "", account: "user", password: "pass" })
      ).rejects.toThrow(GeelarkError);
    });

    it("throws when account is missing", async () => {
      await expect(
        tiktok.login({ id: "id", account: "", password: "pass" })
      ).rejects.toThrow(GeelarkError);
    });

    it("throws when password is missing", async () => {
      await expect(
        tiktok.login({ id: "id", account: "user", password: "" })
      ).rejects.toThrow(GeelarkError);
    });

    it("uses provided scheduleAt", async () => {
      await tiktok.login({
        id: "phone-1",
        account: "user",
        password: "pass",
        scheduleAt: 1700000000,
      });

      const body = http.post.mock.calls[0]![1];
      expect(body.scheduleAt).toBe(1700000000);
    });
  });

  describe("editProfile()", () => {
    it("calls /rpa/task/tiktokEdit", async () => {
      await tiktok.editProfile({
        id: "phone-1",
        nickName: "NewNick",
        bio: "Hello world",
      });

      const [path, body] = http.post.mock.calls[0]!;
      expect(path).toBe("/rpa/task/tiktokEdit");
      expect(body.id).toBe("phone-1");
      expect(body.nickName).toBe("NewNick");
      expect(body.bio).toBe("Hello world");
    });
  });

  describe("randomStar()", () => {
    it("calls /rpa/task/tiktokRandomStar", async () => {
      await tiktok.randomStar({ id: "phone-1" });

      expect(http.post.mock.calls[0]![0]).toBe("/rpa/task/tiktokRandomStar");
    });
  });

  describe("randomStarAsia()", () => {
    it("calls /rpa/task/tiktokRandomStarAsia", async () => {
      await tiktok.randomStarAsia({ id: "phone-1" });

      expect(http.post.mock.calls[0]![0]).toBe("/rpa/task/tiktokRandomStarAsia");
    });
  });

  describe("randomComment()", () => {
    it("calls /rpa/task/tiktokRandomComment with useAi=1", async () => {
      await tiktok.randomComment({ id: "phone-1", useAi: 1 });

      const [path, body] = http.post.mock.calls[0]!;
      expect(path).toBe("/rpa/task/tiktokRandomComment");
      expect(body.useAi).toBe(1);
    });

    it("throws when useAi is invalid", async () => {
      await expect(
        tiktok.randomComment({ id: "phone-1", useAi: 3 as any })
      ).rejects.toThrow(GeelarkError);
    });

    it("throws when useAi=2 but comment is missing", async () => {
      await expect(
        tiktok.randomComment({ id: "phone-1", useAi: 2 })
      ).rejects.toThrow(GeelarkError);
    });

    it("succeeds when useAi=2 and comment is provided", async () => {
      await expect(
        tiktok.randomComment({ id: "phone-1", useAi: 2, comment: "Nice!" })
      ).resolves.not.toThrow();
    });
  });

  describe("message()", () => {
    it("calls /rpa/task/tiktokMessage with correct params", async () => {
      await tiktok.message({
        id: "phone-1",
        usernames: ["user1", "user2"],
        content: "Hello!",
      });

      const [path, body] = http.post.mock.calls[0]!;
      expect(path).toBe("/rpa/task/tiktokMessage");
      expect(body.usernames).toEqual(["user1", "user2"]);
      expect(body.content).toBe("Hello!");
    });

    it("throws when usernames is empty", async () => {
      await expect(
        tiktok.message({ id: "phone-1", usernames: [], content: "Hi" })
      ).rejects.toThrow(GeelarkError);
    });

    it("throws when content is missing", async () => {
      await expect(
        tiktok.message({ id: "phone-1", usernames: ["u1"], content: "" })
      ).rejects.toThrow(GeelarkError);
    });
  });

  describe("messageAsia()", () => {
    it("calls /rpa/task/tiktokMessageAsia", async () => {
      await tiktok.messageAsia({
        id: "phone-1",
        usernames: ["user1"],
        content: "Hey!",
      });

      expect(http.post.mock.calls[0]![0]).toBe("/rpa/task/tiktokMessageAsia");
    });
  });
});
