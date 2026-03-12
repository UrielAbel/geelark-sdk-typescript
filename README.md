# GeeLark SDK for Node.js

[![npm version](https://img.shields.io/npm/v/geelark-sdk.svg)](https://www.npmjs.com/package/geelark-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-blue.svg)](https://www.typescriptlang.org/)

Official TypeScript/JavaScript SDK for the [GeeLark](https://www.geelark.com/) cloud phone platform API. Build, automate, and manage cloud phone profiles and browser environments with a fully typed, ergonomic developer experience.

---

## Features

- **28 API modules** covering every GeeLark endpoint
- **145+ methods** for cloud phones, social platforms, browser automation, and more
- **TypeScript-first** with complete type definitions for all requests and responses
- **Dual-format distribution** -- works with both ESM (`import`) and CommonJS (`require`)
- **Automatic request signing** -- SHA-256 signature generation handled transparently
- **Built-in retry logic** with configurable retries and exponential back-off
- **Lifecycle hooks** (`beforeRequest` / `afterResponse`) for logging, metrics, and middleware
- **Debug mode** for development-time request/response logging
- **Zero runtime dependencies** -- uses only the Node.js built-in `crypto` and `fetch`
- **Tree-shakeable** -- import only the modules you need
- **Node.js 18.17+** required (uses native `fetch`)

---

## Installation

```bash
npm install geelark-sdk
```

---

## Quick Start

```typescript
import { createGeelarkClient } from "geelark-sdk";

const client = createGeelarkClient({
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",
});

// List cloud phones
const { items, total } = await client.phone.list({ page: 1, pageSize: 20 });
console.log(`Found ${total} phones`);

// Start a cloud phone
await client.phone.start("phone-id-123");

// Take a screenshot
const { taskId } = await client.phone.screenShot("phone-id-123");
const result = await client.phone.screenShotResult(taskId);
console.log("Screenshot URL:", result.downloadLink);
```

---

## Authentication

GeeLark uses **HMAC-style request signing** based on SHA-256. Every API request includes the following headers:

| Header    | Description                         |
| --------- | ----------------------------------- |
| `appId`   | Your application ID                 |
| `traceId` | Unique request trace identifier     |
| `ts`      | Unix timestamp in milliseconds      |
| `nonce`   | Short random nonce                  |
| `sign`    | `SHA256(appId + traceId + ts + nonce + apiKey).toUpperCase()` |

**You do not need to compute signatures yourself.** The SDK handles signing automatically on every request. Simply provide your `appId` and `apiKey` when creating the client.

---

## Module Reference

| Module            | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `phone`           | Cloud phone lifecycle -- list, create, start, stop, delete, GPS, screenshots, contacts |
| `upload`          | Upload files to GeeLark cloud storage (OSS)          |
| `task`            | Task management -- create, restart, cancel, query     |
| `tiktok`          | TikTok automation -- publish videos/images, warmup, login, comments, DMs |
| `instagram`       | Instagram automation -- login, publish reels/images, warmup, DMs |
| `reddit`          | Reddit automation -- warmup, post videos/images      |
| `youtube`         | YouTube automation -- publish Shorts/videos, maintenance |
| `google`          | Google services -- login, app download, app browsing  |
| `shein`           | SHEIN platform automation -- login                    |
| `x`               | X (Twitter) automation -- publish content             |
| `pinterest`       | Pinterest automation -- publish videos/images         |
| `threads`         | Threads automation -- publish videos/images           |
| `facebook`        | Facebook automation -- login, comments, publish, Reels, DMs |
| `rpaUtils`        | RPA utilities -- multi-platform distribution, file upload, contacts, custom flows |
| `adb`             | ADB access -- get connection data, enable/disable     |
| `analytics`       | Account analytics -- list, add, query data            |
| `app`             | Application management -- install, uninstall, upload, permissions |
| `fileManagement`  | File operations -- upload results, keybox management  |
| `library`         | Material library -- create/search/tag materials       |
| `shell`           | Shell command execution on cloud phones               |
| `webhook`         | Webhook configuration -- set/get callback URLs        |
| `oem`             | OEM customization -- branding, toolbar settings       |
| `billing`         | Billing -- balance inquiry, plan management           |
| `group`           | Group management -- create, delete, modify, query     |
| `proxyMgmt`       | Proxy management -- add, delete, list, update         |
| `tag`             | Tag management -- create, delete, modify, query       |
| `proxyDetection`  | Proxy detection -- check proxy connectivity           |
| `browser`         | Browser API -- create, launch, close, tasks (local API) |

---

## Usage Examples

### Cloud Phone Management

```typescript
import { createGeelarkClient } from "geelark-sdk";

const client = createGeelarkClient({
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",
});

// Create new cloud phones
const result = await client.phone.addNew({
  mobileType: "android",
  data: [
    { profileName: "Phone-01", mobileRegion: "US" },
    { profileName: "Phone-02", mobileRegion: "UK" },
  ],
});
console.log(`Created ${result.successAmount} phones`);

// Start and stop
await client.phone.start(["id-1", "id-2"]);
await client.phone.stop("id-1");

// Set GPS coordinates
await client.phone.setGps([
  { id: "id-1", latitude: 37.7749, longitude: -122.4194 },
]);

// Delete phones
await client.phone.delete(["id-1", "id-2"]);
```

### TikTok Automation

```typescript
// Publish a video
await client.tiktok.addVideo({
  envId: "phone-id",
  video: "https://storage.example.com/video.mp4",
  planName: "daily-posts",
  videoDesc: "Check out this awesome content! #trending",
});

// Login to TikTok
await client.tiktok.login({
  id: "phone-id",
  account: "myaccount",
  password: "mypassword",
});

// Warmup engagement
await client.tiktok.addWarmup({
  envId: "phone-id",
  planName: "warmup-plan",
  action: "browse video",
  duration: 300,
});
```

### Instagram Automation

```typescript
// Publish a reel
await client.instagram.pubReels({
  id: "phone-id",
  description: "Amazing content #reels",
  video: ["https://storage.example.com/reel.mp4"],
});

// Send direct messages
await client.instagram.message({
  id: "phone-id",
  usernames: ["user1", "user2"],
  content: "Hey, check this out!",
});
```

### Browser API

```typescript
const client = createGeelarkClient({
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",
  browserBaseUrl: "http://localhost:40185/api/v1", // default
});

// Create a browser profile
const { id } = await client.browser.create({
  serialName: "Browser-01",
  browserOs: 1,
});

// Launch and get debug port
const { debugPort } = await client.browser.launch(id);
console.log(`Connect debugger on port ${debugPort}`);

// Close the browser
await client.browser.close(id);
```

---

## Error Handling

All API errors are thrown as `GeelarkError` instances:

```typescript
import { createGeelarkClient, GeelarkError } from "geelark-sdk";

const client = createGeelarkClient({
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",
});

try {
  await client.phone.start("invalid-id");
} catch (err) {
  if (err instanceof GeelarkError) {
    console.error("API Error:", err.message);
    console.error("Error Code:", err.code);
    console.error("Endpoint:", err.endpoint);
    console.error("HTTP Status:", err.httpStatus);
    console.error("Details:", err.details);
  }
}
```

The `GeelarkError` class exposes the following properties:

| Property     | Type                | Description                          |
| ------------ | ------------------- | ------------------------------------ |
| `message`    | `string`            | Human-readable error message         |
| `code`       | `string \| number`  | GeeLark API error code               |
| `endpoint`   | `string`            | API endpoint that failed             |
| `httpStatus` | `number`            | HTTP status code                     |
| `details`    | `any`               | Full response body from the API      |

---

## Configuration Options

```typescript
const client = createGeelarkClient({
  // Required
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",

  // Optional -- API base URL (default: https://openapi.geelark.com/open/v1)
  baseUrl: "https://openapi.geelark.com/open/v1",

  // Optional -- Browser API base URL (default: http://localhost:40185/api/v1)
  browserBaseUrl: "http://localhost:40185/api/v1",

  // Optional -- Enable request/response logging to console
  debug: false,

  // Optional -- Default values merged into task/tiktok module calls
  defaults: {
    planName: "my-default-plan",
  },

  // Optional -- Lifecycle hooks
  hooks: {
    beforeRequest: async ({ url, headers, body, pathname }) => {
      console.log(`[REQ] ${pathname}`);
    },
    afterResponse: async ({ url, status, json, pathname }) => {
      console.log(`[RES] ${pathname} -> ${status}`);
    },
  },
});
```

### Overriding Defaults

Use `.with()` to create a new client instance with merged defaults:

```typescript
const clientForPlan = client.with({ planName: "special-plan" });
await clientForPlan.tiktok.addVideo({ envId: "id", video: "url" });
```

### Low-Level Requests

For endpoints not yet wrapped by a module, use `.request()`:

```typescript
const data = await client.request("/some/new/endpoint", { key: "value" });
```

---

## License

[MIT](./LICENSE)
