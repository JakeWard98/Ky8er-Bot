# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Security
- **2026-08-31 dependency re-audit — clean, no new advisories; lockfile
  already current in-range.**
  Scheduled routine audit. `npm audit` against `package-lock.json` reports
  **0 vulnerabilities** across all resolved packages, and an in-range
  `npm install --package-lock-only` refresh produced no changes — the tree
  is already at the newest in-range versions (`discord.js 14.27.0`,
  `undici 7.29.0` for `@distube/ytdl-core`, `undici 6.28.0` for
  `discord.js` / `@discordjs/rest` — still the latest published releases on
  the `seven` / `six` npm dist-tags). A GitHub Advisory Database / web
  sweep found no advisory affecting any package in the tree published since
  the 2026-08-24 re-audit — the newest relevant `undici` advisories remain
  the June/July 2026 batches (notably GHSA-4cwx-7wf7-3272, High, CVSS 7.4),
  all closed by the resolved `7.29.0` / out-of-range `6.28.0` copies; the
  `undici 8.x` line is a major out of range with no security need to adopt.
  All five direct dependencies remain in active use — nothing to prune;
  `.gitignore` and project Markdown docs reviewed, no updates needed; the
  `dotenv 17.x` major deliberately not taken (out of range, no security
  need). No open pull requests on the repository. Nothing to patch; no
  unpatched advisory ≥ 7.5 CVSS (or any severity) in the resolved tree.
  (Note: the Dependabot alerts API was not reachable from this run's
  environment; coverage came from `npm audit` — which mirrors the GitHub
  Advisory Database — plus the web sweep.)

- **2026-08-24 dependency re-audit — clean, no new advisories; lockfile
  already current in-range.**
  Scheduled routine audit. `npm audit` against `package-lock.json` reports
  **0 vulnerabilities** across all resolved packages, and an in-range
  `npm install --package-lock-only` refresh produced no changes — the tree
  is already at the newest in-range versions (`discord.js 14.27.0`,
  `undici 7.29.0` for `@distube/ytdl-core`, `undici 6.28.0` for
  `discord.js` / `@discordjs/rest`). A GitHub Advisory Database / web sweep
  found no advisory affecting any package in the tree published since the
  2026-08-17 re-audit — the newest relevant `undici` advisories remain the
  June/July 2026 batches (notably GHSA-4cwx-7wf7-3272, High, CVSS 7.4),
  all closed by the resolved `7.29.0` / out-of-range `6.28.0` copies. All
  five direct dependencies remain in active use — nothing to prune;
  `.gitignore` reviewed, already comprehensive; the `dotenv 17.x` major
  deliberately not taken (out of range, no security need). No open pull
  requests or issues on the repository. Nothing to patch; no unpatched
  advisory ≥ 7.5 CVSS (or any severity) in the resolved tree. (Note: the
  Dependabot alerts API was not reachable from this run's environment;
  coverage came from `npm audit` — which mirrors the GitHub Advisory
  Database — plus the web sweep.)

- **2026-08-17 dependency re-audit — clean, no new advisories; lockfile
  already current in-range.**
  Scheduled routine audit. `npm audit` against `package-lock.json` reports
  **0 vulnerabilities** across all 65 resolved packages, and an in-range
  `npm install --package-lock-only` refresh produced no changes — the tree
  is already at the newest in-range versions (`discord.js 14.27.0`,
  `undici 7.29.0` for `@distube/ytdl-core`, `undici 6.28.0` for
  `discord.js` / `@discordjs/rest`). A GitHub Advisory Database / web sweep
  found no advisory affecting any package in the tree published since the
  2026-08-10 re-audit; the August `undici` batch — notably
  GHSA-4cwx-7wf7-3272 (High, CVSS 7.4, cache-interceptor disclosure/crash,
  affecting `>=7.0.0 <7.29.0` and `>=8.0.0 <8.9.0`) — remains closed by the
  resolved `7.29.0` / out-of-range `6.28.0` copies. All five direct
  dependencies remain in active use — nothing to prune; the `dotenv 17.x`
  major deliberately not taken (out of range, no security need). No open
  pull requests or issues on the repository. Nothing to patch; no unpatched
  advisory ≥ 7.5 CVSS (or any severity) in the resolved tree. (Note: the
  Dependabot alerts API was not reachable from this run's environment;
  coverage came from `npm audit` — which mirrors the GitHub Advisory
  Database — plus the web sweep.)

- **2026-08-10 dependency re-audit — clean; August undici advisory set
  confirmed closed; lockfile refreshed in-range.**
  Scheduled routine audit. `npm audit` against `package-lock.json` reports
  **0 vulnerabilities** — both before and after the in-range lockfile refresh
  (`@types/node → 26.2.0`, `discord-api-types → 0.38.53`, `ws → 8.21.3`).
  A GitHub Advisory Database sweep found a new `undici` advisory batch
  published 2026-08-03 — notably GHSA-4cwx-7wf7-3272 / CVE-2026-13697
  (High, CVSS 7.4: cache-interceptor shared-cache info disclosure +
  parse-time crash on malformed `Cache-Control: private` directives,
  affecting `>=7.0.0 <7.29.0` and `>=8.0.0 <8.9.0`) plus four Moderate
  advisories. **Already closed in this tree**: the lockfile resolves
  `undici 7.29.0` (the patched version) for `@distube/ytdl-core`, and the
  `discord.js` / `@discordjs/rest` copies resolve `6.28.0`, which is outside
  every affected range (confirmed by the clean `npm audit`). No other new
  advisory affects any package in the tree. All five direct dependencies
  remain in active use — nothing to prune; `dotenv 17.x` and `undici 8.x`
  majors deliberately not taken (out of range, no security need). No open
  pull requests or issues on the repository. Nothing left to patch; no
  unpatched advisory ≥ 7.5 CVSS (or any severity) in the resolved tree.

- **2026-08-05 dependency re-audit — clean, no new advisories; lockfile
  refreshed in-range.**
  Scheduled routine audit. `npm audit` against `package-lock.json` reports
  **0 vulnerabilities**, and a manual cross-check via the npm bulk-advisory
  endpoint over all 59 resolved packages returned 0 advisories — both before
  and after the in-range lockfile refresh (`@types/node → 26.1.2`,
  `discord-api-types → 0.38.52`, `ws → 8.21.2`,
  `@napi-rs/wasm-runtime → 1.2.2`). A web sweep found no advisory published
  since the 2026-07-27 re-audit affecting any package in the tree; the
  June-2026 `undici` advisory set remains closed by the pinned
  `6.27.0` / `7.28.0+` overrides. All five direct dependencies
  (`discord.js`, `@discordjs/voice`, `@distube/ytdl-core`, `dotenv`,
  `opusscript`) remain in active use — nothing to prune. No open Dependabot
  alerts, security PRs, or issues on the repository. Nothing to patch.

- **2026-07-27 dependency re-audit — clean, no new advisories; lockfile
  refreshed in-range.**
  Scheduled routine audit. `npm audit` against `package-lock.json` reports
  **0 vulnerabilities**, and a manual cross-check via the npm bulk-advisory
  endpoint over all 59 resolved packages returned 0 advisories — both before
  and after the lockfile refresh below. A web sweep confirmed the four
  March-2026 undici advisories not covered by earlier entries
  (GHSA-vrm6-8vpv-qv8q, GHSA-phc3-fgpg-7m6h, GHSA-4992-7rv2-5pvq,
  GHSA-2mjp-6q6p-2qxm — all fixed in undici 6.24.0 / 7.24.0) are already
  closed by the pinned `6.27.0` / `7.28.0+` overrides. No open Dependabot
  alerts or security PRs. Nothing to patch.

- **2026-07-24 dependency re-audit — clean after merging #37.**
  Scheduled routine audit. The 2026-06-22 fix PR (#37, seven `undici`
  advisories, see entry below) had been left open for review; verified its
  lockfile still audits clean against today's advisory database and merged it
  as part of this audit. Post-merge `npm audit` against `package-lock.json`
  reports **0 vulnerabilities** across all resolved packages. No advisories
  published since 2026-06-22 affect any direct or transitive dependency.
  Reviewed all five direct dependencies (`discord.js`, `@discordjs/voice`,
  `@distube/ytdl-core`, `dotenv`, `opusscript`) for unused entries — all are
  in active use, nothing to prune. No version changes.

- **2026-06-22 dependency re-audit — seven new `undici` advisories fixed.**
  `npm audit` against the current `package-lock.json` flagged seven new
  advisories published 2026-06-16 → 2026-06-21 affecting both the `6.x`
  (via `discord.js` / `@discordjs/rest`) and `7.x` (via
  `@distube/ytdl-core`) branches resolved in the lockfile. The previous
  re-audit on 2026-06-15 was clean, so all seven post-date that audit.
  - **GHSA-vxpw-j846-p89q** — `undici` WebSocket client DoS via fragment
    count bypass (**High, CVSS 7.5**). Affects `<6.27.0` and
    `>=7.0.0 <7.28.0`. **Not reachable here:** the bot acts only as a
    WebSocket *client* to Discord's gateway via `ws` (not `undici`'s
    WebSocket client) and does not accept inbound WebSocket connections.
  - **GHSA-hm92-r4w5-c3mj** — `undici` cross-origin request routing via
    SOCKS5 proxy pool reuse (**High, CVSS 7.5**). Affects
    `>=7.23.0 <7.28.0`. **Not reachable here:** the bot does not
    configure `undici.SocksProxyAgent` and `@distube/ytdl-core` uses
    `https-proxy-agent` (a separate package), not `undici`'s SOCKS5
    proxy.
  - **GHSA-vmh5-mc38-953g** — `undici` TLS certificate validation bypass
    via dropped `requestTls` in SOCKS5 `ProxyAgent` (High, CVSS 7.4).
    Affects `>=7.23.0 <7.28.0`. **Not reachable here:** same reason as
    above — no SOCKS5 proxy configuration anywhere in the dependency
    tree.
  - **GHSA-pr7r-676h-xcf6** — `undici` cross-user information disclosure
    via shared cache whitespace bypass (Moderate, CVSS 5.9). Affects
    `>=7.0.0 <7.28.0`. **Not reachable here:** no shared `undici.Cache`
    is configured by the bot or by `@distube/ytdl-core`.
  - **GHSA-p88m-4jfj-68fv** — `undici` HTTP header injection via
    `Set-Cookie` percent-decoding (Moderate, CVSS 5.9). Affects `<6.27.0`
    and `>=7.0.0 <7.28.0`. Reachable in principle from `@distube/ytdl-core`
    (which talks to YouTube via `undici`), but the bot never reflects
    upstream response headers anywhere.
  - **GHSA-35p6-xmwp-9g52** — `undici` HTTP response queue poisoning via
    keep-alive socket reuse (Low, CVSS 3.7). Affects `<6.27.0` and
    `>=7.0.0 <7.28.0`.
  - **GHSA-g8m3-5g58-fq7m** — `undici` `Set-Cookie` `SameSite` attribute
    downgrade via permissive substring matching (Low, CVSS 3.7). Affects
    `<6.27.0` and `>=7.0.0 <7.28.0`.

  All seven are fixed by `undici >= 6.27.0` (6.x branch) and
  `undici >= 7.28.0` (7.x branch). Patched by adding scoped
  `overrides` to `package.json`:
  - `discord.js > undici` → `^6.27.0`
  - `@discordjs/rest > undici` → `^6.27.0`
  - `@distube/ytdl-core > undici` → `^7.28.0`

  After regenerating the lockfile, `npm audit` reports **0
  vulnerabilities** across all 48 resolved packages. The overrides are
  scoped to specific parent packages so the 6.x branch (paired with the
  Discord HTTP/gateway client) and 7.x branch (paired with ytdl-core)
  stay isolated, matching the pre-bump topology. Smoke test: `discord.js`,
  `@discordjs/voice`, and `@distube/ytdl-core` all `require()` cleanly,
  `main.js` parses, and the resolved undici versions are 6.27.0 (both
  6.x consumers) and 7.28.0 (ytdl-core).

  Highest CVSS in this batch is 7.5, which does not exceed the >7.5
  auto-merge threshold set for the dependency-audit routine, so this PR
  is left for human review.
- **2026-06-15 dependency re-audit — clean.** `npm audit` against the current
  `package-lock.json` reported **0 vulnerabilities** across all 65 resolved
  packages (Critical/High/Moderate/Low/Info). Manual GHSA / NVD cross-check
  of every direct and notable transitive dep returned no new advisories in
  the two weeks since the 2026-06-01 entry:
  - `ws 8.21.0` — still clears GHSA-58qx-3vcg-4xpx (uninitialised memory
    disclosure, Moderate; fixed 8.20.1).
  - `undici 6.24.1` and `7.24.8` — still above the 6.24.0 / 7.24.0 fixes for
    GHSA-4992-7rv2-5pvq (CRLF injection via `client.request()` `upgrade`
    option), CVE-2026-22036 (unbounded decompression DoS), and CVE-2026-2581
    (`DeduplicationHandler` unbounded memory consumption).
  - `lodash 4.18.1` — still above the 4.18.0 fix for GHSA-r5fr-rjxr-66jc /
    CVE-2026-4800 (`_.template` code injection via `options.imports` key
    names, High).
  - `tough-cookie 5.1.2` — no open advisories.
  - Direct deps `discord.js 14.26.3`, `@discordjs/voice 0.19.2`,
    `@distube/ytdl-core 4.16.12`, `dotenv 16.6.1`, `opusscript 0.1.1` — no
    open advisories.
  No GitHub Security advisories or Dependabot alerts open against the repo.
  No code or dependency-version changes required — pure documentation
  refresh of the audit date in `README.md` and this entry.
- **2026-06-01 dependency re-audit — clean.** `npm audit` against the current
  `package-lock.json` reported **0 vulnerabilities** across all 66 resolved
  packages (Critical/High/Moderate/Low/Info). Manual GHSA / NVD cross-check
  of every direct and notable transitive dep returned no new advisories in
  the five days since the 2026-05-27 entry:
  - `ws 8.21.0` — still clears GHSA-58qx-3vcg-4xpx (uninitialised memory
    disclosure, Moderate; fixed 8.20.1).
  - `undici 6.24.1` and `7.24.8` — still above the 6.24.0 / 7.24.0 fixes for
    GHSA-4992-7rv2-5pvq (CRLF injection via `client.request()` `upgrade`
    option), CVE-2026-22036 (unbounded decompression DoS), and CVE-2026-2581
    (`DeduplicationHandler` unbounded memory consumption).
  - `lodash 4.18.1` — still above the 4.18.0 fix for GHSA-r5fr-rjxr-66jc /
    CVE-2026-4800 (`_.template` code injection via `options.imports` key
    names, High).
  - `tough-cookie 5.1.2` — no open advisories; historic CVE-2023-26136
    prototype pollution did not affect `>=4.1.3`.
  - Direct deps `discord.js 14.26.3`, `@discordjs/voice 0.19.2`,
    `@distube/ytdl-core 4.16.12`, `dotenv 16.6.1`, `opusscript 0.1.1` — no
    open advisories.
  No GitHub Security advisories or Dependabot alerts open against the repo.
  No code or dependency-version changes required.
- **2026-05-27 dependency re-audit — clean.** `npm audit` against the current
  `package-lock.json` reported **0 vulnerabilities** across all 65 resolved
  packages (Critical/High/Moderate/Low/Info). A manual GHSA / NVD cross-check
  of every direct and notable transitive dep corroborated the automated run:
  - `ws 8.21.0` — current latest; still clears GHSA-58qx-3vcg-4xpx (the
    Moderate uninitialised-memory disclosure fixed in the 2026-05-25 bump).
  - `undici 6.24.1` and `7.24.8` — both above the 6.24.0 / 7.24.0 fixes for
    GHSA-4992-7rv2-5pvq (CRLF injection via the `client.request()` `upgrade`
    option, published 2026-03-12), in addition to the earlier 2026 undici
    DoS / decompression advisories already confirmed patched.
  - `tough-cookie 5.1.2`, `lodash 4.18.1` — no open advisories.
  - Direct deps `discord.js 14.26.3`, `@discordjs/voice 0.19.2`,
    `@distube/ytdl-core 4.16.12`, `dotenv 16.6.1`, `opusscript 0.1.1` — no
    open advisories.
  No GitHub Security advisories or Dependabot alerts open against the repo.
  No code or dependency-version changes required.
- **2026-05-25 dependency re-audit — one new advisory fixed.** `npm audit`
  against the current `package-lock.json` flagged a single new **Moderate**
  advisory that post-dates the previous (clean) re-audits:
  - **GHSA-58qx-3vcg-4xpx** — `ws`: uninitialised memory disclosure
    (CWE-908, CVSS 4.4 Moderate). Affects `ws >=8.0.0 <8.20.1`. The
    lockfile previously pinned `ws 8.20.0` (hoisted, shared by
    `@discordjs/voice` → `ws ^8.19.0` and `discord.js` →
    `@discordjs/ws` → `ws ^8.17.0`). Bumped the locked `ws` to
    **8.21.0** via `npm audit fix`; both parent ranges already
    permitted it, so no `package.json` change was needed.
  After the bump, `npm audit` reports **0 vulnerabilities** across all
  66 resolved packages. All other direct deps
  (`discord.js 14.26.3`, `@discordjs/voice 0.19.2`,
  `@distube/ytdl-core 4.16.12`, `dotenv 16.6.1`, `opusscript 0.1.1`)
  and notable transitives (`undici 6.24.1` / `7.24.8`,
  `tough-cookie 5.1.2`, `lodash 4.18.1`) remain clean.
- **2026-05-04 dependency re-audit.** Manual GHSA / NVD cross-check
  of every package pinned in `package-lock.json` returned **0 known
  vulnerabilities** at Critical/High/Moderate/Low. Two new `undici`
  advisories were published in the week since the 2026-04-27 audit;
  the pinned transitive versions are already on patched releases:
  - **CVE-2026-22036** — `undici` unbounded decompression chain on
    the Node.js Fetch API via `Content-Encoding` (DoS, High). Fixed
    in `undici` 6.23.0 / 7.18.2. Lockfile pins **6.24.1** (via
    `discord.js` / `@discordjs/rest`) and **7.24.8** (via
    `@distube/ytdl-core`) — both above the patched releases.
  - **CVE-2026-2581** — `undici` `DeduplicationHandler` unbounded
    memory consumption via response buffering (DoS, Moderate). Fixed
    in `undici` 7.24.0; only the 7.x branch is affected. Lockfile
    pins `undici` **7.24.8** — above the patched release.
  Direct deps (`discord.js 14.26.3`, `@discordjs/voice 0.19.2`,
  `@distube/ytdl-core 4.16.12`, `dotenv 16.6.1`, `opusscript 0.1.1`)
  also returned no new advisories. Other transitive deps confirmed
  still clean: `ws 8.20.0`, `tough-cookie 5.1.2`, `lodash 4.18.1`.
  No code or dependency-version changes required.
- **2026-04-27 dependency re-audit.** Manual cross-check of every package
  pinned in `package-lock.json` against the GitHub Advisory Database
  returned **0 known vulnerabilities** at Critical/High/Moderate/Low.
  Notable transitive deps confirmed already on patched versions:
  - `undici` 6.24.1 / 7.24.8 — patched against CVE-2026-1526 (WebSocket
    permessage-deflate memory exhaustion, High), CVE-2026-1527 (CRLF
    injection via `client.request()` upgrade option, Medium), and
    CVE-2026-1528 (WebSocket 64-bit length parser overflow, High). All
    three were fixed in `undici` 6.24.0 / 7.24.0.
  - `ws` 8.20.0 — patched against CVE-2024-37890 (DoS via excessive
    request headers, Moderate). Fix landed in 8.17.1.
  - `tough-cookie` 5.1.2 — not affected by the historic prototype
    pollution issue CVE-2023-26136 (which only impacted `<4.1.3`).
  - `lodash` 4.18.1 — current latest, no open advisories.
  - `discord.js` 14.26.3, `@discordjs/voice` 0.19.2,
    `@distube/ytdl-core` 4.16.12, `dotenv` 16.6.1 — no open advisories.

  No code or dependency-version changes were required by this audit.

### Dependencies
- **2026-07-27: lockfile refreshed within existing semver ranges** (no
  `package.json` changes): `discord.js 14.26.3 → 14.27.0`,
  `undici 7.28.0 → 7.29.0`, `ws 8.21.0 → 8.21.1`, `@discordjs/rest
  2.6.1 → 2.6.3`, plus assorted transitive patch bumps. `npm audit` clean on
  the refreshed set; `node --check` passes on `main.js` and all command files.
  `dotenv` stays on `16.6.1` — `17.x` is a major bump outside the declared
  `^16` range and carries no security content, so it is deliberately not
  taken.

### Added
- `SECURITY.md` — supported versions, private disclosure process, threat
  model, operational recommendations. The README already pointed at
  GitHub's private vulnerability reporting, but the policy document
  itself was missing.
- `CHANGELOG.md` — this file.

### Changed
- `README.md`: audit-date line bumped to **2026-06-01** to match the
  latest re-audit entry above. Earlier change in this Unreleased block
  also added the `SECURITY.md` / `CHANGELOG.md` links and clarified
  that `./setup.sh` runs `npm audit` on every invocation.
- `.gitignore`: fix typo `obsolote_code.js` → `obsolete_code.js`. The
  old line is kept so any local file already named with the typo stays
  ignored. Also added `*.tsbuildinfo`, `.cache/`, `.parcel-cache/` for
  common JS tooling caches.
