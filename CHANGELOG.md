# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Security
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
