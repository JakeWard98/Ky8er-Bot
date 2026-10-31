# Security Policy

## Supported Versions

Ky8er-Bot is a small learning project on a rolling-release basis. Security
fixes land on `master` and are picked up by anyone who pulls and re-runs
`./setup.sh` (which re-runs `npm install` and `npm audit`).

| Version          | Supported          |
|------------------|--------------------|
| `master` (HEAD)  | :white_check_mark: |
| Older commits    | :x:                |

## Reporting a Vulnerability

Please **do not** report security issues in public GitHub issues.

Use GitHub's private vulnerability reporting:

1. Go to the [Security tab](https://github.com/JakeWard98/Ky8er-Bot/security)
   on the repository.
2. Click **Report a vulnerability**.
3. Provide reproduction steps, affected commit SHA, and impact.

As a hobby project, response times are best-effort but I will aim to
acknowledge within 7 days.

## Threat Model

Ky8er-Bot is a Discord bot intended to run on a single trusted host with a
single bot token. It is **not** designed to be multi-tenant or to handle
untrusted operators.

### What Ky8er-Bot defends against

- **Token leakage to source control.** `.env` and every `.env.*` variant
  are in `.gitignore`, as are Node diagnostic reports and heap snapshots
  (which include environment variables such as `TOKEN`). Only `.env.example`
  (with placeholder values) is tracked. `setup.sh` creates `.env` readable by
  its owner only.
- **Unhandled command errors crashing the process.** A `try/catch` around
  `command.execute()` and a top-level `unhandledRejection` handler log the
  error message (not the full stack with potentially sensitive data).
  These do **not** catch exceptions thrown inside event listeners, so the
  voice code guards its own listeners: a failing track advances the queue
  exactly once, a destroyed connection is never destroyed again, and voice
  connections have an `'error'` listener.
- **Mass pings through the bot.** The client sets
  `allowedMentions: { parse: [] }`, so echoed text (such as a guild name
  containing `@everyone`) never pings anyone.
- **Queue abuse.** `^play` accepts only YouTube video URLs (validated by
  `ytdl-core`), stores just the video ID, and caps each guild's queue at 50.
  `^dc` requires the caller to be in the bot's voice channel or to have
  Move Members.
- **Bot replying to its own messages.** The `messageCreate` handler bails
  out on `message.author.bot`.
- **Installing on an unpatched Node.js runtime.** `engines` in
  `package.json` (enforced by `engine-strict=true` in `.npmrc`) and the
  version gate in `setup.sh` refuse any runtime older than the
  2026-10-21 security releases (`22.23.4` / `24.22.1` / `26.12.1`).
  `npm start` itself does not re-check the version.

### What Ky8er-Bot does **not** defend against

- **A leaked bot token.** Anyone holding the token can fully impersonate
  the bot. Rotate immediately in the Discord Developer Portal if it
  leaks.
- **A malicious server admin.** Mod commands are gated by Discord
  permissions on the calling user; if you grant mod rights to a hostile
  user, they get mod-level commands.
- **Arbitrary YouTube content from `^play`.** Any YouTube video a member
  links is played as-is (`ytdl-core` only contacts YouTube, by video ID, and
  the media URLs YouTube returns). Don't run the bot on a host where loud
  audio is itself a problem.
- **DoS via spammed commands.** No per-user rate limiting is
  implemented; rely on Discord's own rate limits.

## Operational recommendations

- Keep your Node.js runtime on a patched release: `22.23.4+`, `24.22.1+`
  (LTS, recommended) or `26.12.1+`. These carry the 2026-10-21 Node.js
  security release, including the fix for CVE-2026-111497 ("Node2Shell",
  an out-of-bounds write in the Brotli decoder bundled into the runtime).
  Node.js 18.x / 20.x and the odd-numbered lines are end-of-life and will
  never receive that fix. `package.json` `engines` plus `engine-strict` in
  `.npmrc` make `npm install` refuse older runtimes, and `setup.sh`
  enforces the same floor.
- Re-run `./setup.sh` periodically — it runs `npm install` and
  `npm audit` so you'll see new advisories as they're published.
- Don't commit `.env`, `config.json`, or `settings.sqlite3` (already in
  `.gitignore`).
- If you fork the bot, regenerate the token on the Developer Portal
  before running anywhere shared.
