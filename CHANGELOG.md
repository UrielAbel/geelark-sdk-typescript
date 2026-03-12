# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-01

### Added

- **Core SDK**
  - `createGeelarkClient` factory function with full TypeScript support
  - Automatic SHA-256 request signing for all API calls
  - Built-in retry logic with configurable retries and jittered back-off
  - Lifecycle hooks (`beforeRequest`, `afterResponse`) for middleware patterns
  - Debug mode for development-time request/response logging
  - `.with()` method for creating client instances with merged defaults
  - `.request()` escape hatch for unlisted API endpoints

- **Cloud Phone Module** (`phone`)
  - List, create, start, stop, and delete cloud phones
  - GPS get/set, screenshot capture, device serial number retrieval
  - Root status management, network type configuration
  - SMS sending, brand listing, phone transfer between accounts
  - Batch contact import with result polling
  - One-click new machine (V2 endpoint)
  - Group moves, file uploads, accessibility hiding

- **TikTok Module** (`tiktok`)
  - Publish videos and image sets with full metadata control
  - Warmup actions (browse video, search profile, search video)
  - Account login and profile editing
  - Random star, random comment (with AI options), and DM messaging
  - Asia-region variants for star, comment, and message operations

- **Instagram Module** (`instagram`)
  - Account login, publish reels (video and image)
  - Warmup with configurable browse counts
  - Direct message sending to multiple users

- **Reddit Module** (`reddit`)
  - Warmup with keyword browsing
  - Post videos and images to communities

- **YouTube Module** (`youtube`)
  - Publish Shorts and long-form videos
  - Account maintenance with keyword-based browsing

- **Google Module** (`google`)
  - Auto login, app download from Play Store, app browsing

- **Facebook Module** (`facebook`)
  - Login, auto-comment on posts, maintenance browsing
  - Publish videos, Reels, and direct messages

- **X (Twitter) Module** (`x`)
  - Publish content with video attachments

- **Pinterest Module** (`pinterest`)
  - Publish videos and images with link support

- **Threads Module** (`threads`)
  - Publish videos and images with topic tagging

- **SHEIN Module** (`shein`)
  - Account auto-login

- **RPA Utilities Module** (`rpaUtils`)
  - Multi-platform video distribution
  - Batch file upload, contact import, keybox upload
  - Task flow listing and custom RPA task creation

- **ADB Module** (`adb`)
  - Retrieve ADB connection data (IP, port, password)
  - Enable/disable ADB access

- **Analytics Module** (`analytics`)
  - List and add analytics accounts
  - Query analytics data with filters
  - Update and delete accounts

- **Application Management Module** (`app`)
  - Install, uninstall, start, stop apps
  - Team app listing, installable/installed app queries
  - App upload with status polling
  - Permission, auto-start, keep-alive, root configuration
  - Batch operations across groups

- **File Management Module** (`fileManagement`)
  - Upload file result polling
  - Keybox upload and result checking

- **Material Library Module** (`library`)
  - Create, search, and delete materials
  - Tag management for materials

- **Shell Module** (`shell`)
  - Execute shell commands on cloud phones

- **Webhook Module** (`webhook`)
  - Set and retrieve webhook callback URLs

- **OEM Module** (`oem`)
  - Customize branding (title, logo, toolbar settings)

- **Billing Module** (`billing`)
  - Balance inquiry, plan listing, plan info
  - Plan changes and renewals with promo code support

- **Group Management Module** (`group`)
  - Create, delete, modify, and query groups

- **Proxy Management Module** (`proxyMgmt`)
  - Add, delete, list, and update proxy configurations

- **Tag Management Module** (`tag`)
  - Create, delete, modify, and query tags

- **Proxy Detection Module** (`proxyDetection`)
  - Check proxy connectivity and geo information

- **Browser API Module** (`browser`)
  - Create, edit, list, launch, close, and delete browser profiles
  - Transfer profiles between accounts
  - Task flow queries, custom task creation
  - Task querying, cancellation, and retry

- **Upload Module** (`upload`)
  - Get pre-signed upload URLs
  - Upload files to GeeLark cloud storage (OSS)

- **Task Module** (`task`)
  - Create, restart, cancel tasks
  - Query task details

- **Workflow: uploadImageAndCreateTask**
  - End-to-end convenience for uploading an image and creating a task in one call

- **Utilities** (`utils`)
  - `nowSec()` -- current Unix timestamp in seconds
  - `wait(ms)` -- promise-based delay
  - `prettyAliError(xml)` -- parse Alibaba Cloud OSS XML errors

- **Distribution**
  - Dual ESM + CommonJS output via tsup
  - Full `.d.ts` type declarations
  - Source maps included
  - Tree-shakeable builds

- **Error Handling**
  - `GeelarkError` class with `code`, `endpoint`, `httpStatus`, and `details` properties
  - Automatic transient error detection and retry
