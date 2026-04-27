# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Security
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
- `README.md`: link to `SECURITY.md` and `CHANGELOG.md`; clarify that
  `./setup.sh` runs `npm audit` on every invocation.
- `.gitignore`: fix typo `obsolote_code.js` → `obsolete_code.js`. The
  old line is kept so any local file already named with the typo stays
  ignored. Also added `*.tsbuildinfo`, `.cache/`, `.parcel-cache/` for
  common JS tooling caches.
