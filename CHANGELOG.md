# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Security
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
- `README.md`: audit-date line bumped to **2026-05-27** to match the
  latest re-audit entry above. Earlier change in this Unreleased block
  also added the `SECURITY.md` / `CHANGELOG.md` links and clarified
  that `./setup.sh` runs `npm audit` on every invocation.
- `.gitignore`: fix typo `obsolote_code.js` → `obsolete_code.js`. The
  old line is kept so any local file already named with the typo stays
  ignored. Also added `*.tsbuildinfo`, `.cache/`, `.parcel-cache/` for
  common JS tooling caches.
