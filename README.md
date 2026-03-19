<div align="center">

<img src="./assets/logo.png" alt="GeeLark" width="380" />

<br />
<br />

**TypeScript SDK for the [GeeLark](https://www.geelark.com/) Cloud Phone Platform**

[![npm version](https://img.shields.io/npm/v/geelark-sdk.svg?style=flat-square&color=2C8EF8)](https://www.npmjs.com/package/geelark-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-2C8EF8.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-2C8EF8.svg?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.17+-2C8EF8.svg?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)

Build, automate, and manage cloud phone profiles and browser environments with a fully typed, ergonomic developer experience.

[Getting Started](#-getting-started) · [API Reference](#-module-reference) · [Examples](#-usage-examples) · [Configuration](#%EF%B8%8F-configuration)

</div>

---

## ✨ Features

| | Feature | Details |
|---|---|---|
| 📦 | **28 API Modules** | Every GeeLark endpoint covered |
| 🔧 | **145+ Methods** | Cloud phones, social platforms, browser automation, and more |
| 🔷 | **TypeScript-First** | Complete type definitions for all requests and responses |
| 📤 | **ESM + CJS** | Dual-format distribution — works with `import` and `require` |
| 🔐 | **Auto Signing** | SHA-256 signature generation handled transparently |
| 🔄 | **Retry Logic** | Configurable retries with exponential back-off |
| 🪝 | **Lifecycle Hooks** | `beforeRequest` / `afterResponse` for logging & middleware |
| 🐛 | **Debug Mode** | Request/response logging for development |
| 🪶 | **Zero Dependencies** | Uses only Node.js built-in `crypto` and `fetch` |

---

## 🚀 Getting Started

### Installation

```bash
npm install geelark-sdk
```

### Quick Start

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

## 🔐 Authentication

GeeLark uses **SHA-256 request signing**. The SDK handles this automatically — just provide your `appId` and `apiKey`.

Every request includes:

| Field | Description |
|:------|:------------|
| `appId` | Your application ID |
| `traceId` | Unique request trace identifier |
| `ts` | Unix timestamp in milliseconds |
| `nonce` | Short random nonce |
| `sign` | `SHA256(appId + traceId + ts + nonce + apiKey).toUpperCase()` |

> 💡 You never need to compute signatures yourself.

---

## 📚 Module Reference

<table>
<thead>
<tr>
<th align="left">Category</th>
<th align="left">Module</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>

<tr><td colspan="3"><strong>☁️ Cloud Phone</strong></td></tr>
<tr><td></td><td><code>phone</code></td><td>Lifecycle — list, create, start, stop, delete, GPS, screenshots, contacts</td></tr>
<tr><td></td><td><code>adb</code></td><td>ADB access — get connection data, enable/disable</td></tr>
<tr><td></td><td><code>shell</code></td><td>Shell command execution on cloud phones</td></tr>

<tr><td colspan="3"><strong>🤖 Social Media RPA</strong></td></tr>
<tr><td></td><td><code>tiktok</code></td><td>Video/image publishing, warmup, login, comments, DMs</td></tr>
<tr><td></td><td><code>instagram</code></td><td>Login, publish Reels (video/image), warmup, DMs</td></tr>
<tr><td></td><td><code>facebook</code></td><td>Login, comments, publish, Reels, DMs</td></tr>
<tr><td></td><td><code>youtube</code></td><td>Publish Shorts/videos, channel maintenance</td></tr>
<tr><td></td><td><code>x</code></td><td>Publish content to X (Twitter)</td></tr>
<tr><td></td><td><code>reddit</code></td><td>Warmup, post videos/images</td></tr>
<tr><td></td><td><code>pinterest</code></td><td>Publish videos and images</td></tr>
<tr><td></td><td><code>threads</code></td><td>Publish videos and images</td></tr>
<tr><td></td><td><code>google</code></td><td>Login, app download, app browsing</td></tr>
<tr><td></td><td><code>shein</code></td><td>Auto-login</td></tr>

<tr><td colspan="3"><strong>🌐 Browser</strong></td></tr>
<tr><td></td><td><code>browser</code></td><td>Antidetect browser — create, launch, close, tasks (local API)</td></tr>

<tr><td colspan="3"><strong>⚙️ Automation & Tasks</strong></td></tr>
<tr><td></td><td><code>task</code></td><td>Task management — create, restart, cancel, query</td></tr>
<tr><td></td><td><code>rpaUtils</code></td><td>Multi-platform distribution, file upload, contacts, custom flows</td></tr>

<tr><td colspan="3"><strong>🗂️ Management</strong></td></tr>
<tr><td></td><td><code>upload</code></td><td>Upload files to GeeLark cloud storage (OSS)</td></tr>
<tr><td></td><td><code>analytics</code></td><td>Account analytics — list, add, query data</td></tr>
<tr><td></td><td><code>app</code></td><td>Application management — install, uninstall, upload, permissions</td></tr>
<tr><td></td><td><code>fileManagement</code></td><td>File operations — upload results, keybox management</td></tr>
<tr><td></td><td><code>library</code></td><td>Material library — create/search/tag materials</td></tr>
<tr><td></td><td><code>webhook</code></td><td>Webhook configuration — set/get callback URLs</td></tr>
<tr><td></td><td><code>oem</code></td><td>OEM customization — branding, toolbar settings</td></tr>
<tr><td></td><td><code>billing</code></td><td>Balance inquiry, plan management</td></tr>
<tr><td></td><td><code>group</code></td><td>Group management — create, delete, modify, query</td></tr>
<tr><td></td><td><code>proxyMgmt</code></td><td>Proxy management — add, delete, list, update</td></tr>
<tr><td></td><td><code>tag</code></td><td>Tag management — create, delete, modify, query</td></tr>
<tr><td></td><td><code>proxyDetection</code></td><td>Proxy detection — check connectivity</td></tr>

</tbody>
</table>

---

## 💻 Usage Examples

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
  browserBaseUrl: "http://localhost:40185/api/v1",
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

## ❌ Error Handling

All API errors are thrown as `GeelarkError` instances:

```typescript
import { createGeelarkClient, GeelarkError } from "geelark-sdk";

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

| Property | Type | Description |
|:---------|:-----|:------------|
| `message` | `string` | Human-readable error message |
| `code` | `string \| number` | GeeLark API error code |
| `endpoint` | `string` | API endpoint that failed |
| `httpStatus` | `number` | HTTP status code |
| `details` | `any` | Full response body from the API |

---

## ⚙️ Configuration

```typescript
const client = createGeelarkClient({
  // Required
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",

  // Optional — API base URL (default: https://openapi.geelark.com/open/v1)
  baseUrl: "https://openapi.geelark.com/open/v1",

  // Optional — Browser API base URL (default: http://localhost:40185/api/v1)
  browserBaseUrl: "http://localhost:40185/api/v1",

  // Optional — Enable request/response logging
  debug: false,

  // Optional — Default values merged into task/tiktok module calls
  defaults: {
    planName: "my-default-plan",
  },

  // Optional — Lifecycle hooks
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

<div align="center">

**[GeeLark Website](https://www.geelark.com/)** · **[API Documentation](https://open.geelark.com/api)** · **[Report an Issue](https://github.com/UrielAbel/geelark-sdk-nodejs/issues)**

<sub>MIT License — © 2024-2025 GeeLark SDK Contributors</sub>

</div>
