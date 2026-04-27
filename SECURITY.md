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

- **Token leakage to source control.** `.env` is in `.gitignore`. Only
  `.env.example` (with placeholder values) is tracked.
- **Unhandled command errors crashing the process.** A `try/catch` around
  `command.execute()` and a top-level `unhandledRejection` handler keep
  the bot alive and log the error message (not the full stack with
  potentially sensitive data) to the console.
- **Bot replying to its own messages.** The `messageCreate` handler bails
  out on `message.author.bot`.

### What Ky8er-Bot does **not** defend against

- **A leaked bot token.** Anyone holding the token can fully impersonate
  the bot. Rotate immediately in the Discord Developer Portal if it
  leaks.
- **A malicious server admin.** Mod commands are gated by Discord
  permissions on the calling user; if you grant mod rights to a hostile
  user, they get mod-level commands.
- **Arbitrary YouTube content from `^play`.** `@distube/ytdl-core`
  fetches and decodes whatever URL is passed. Audio is sent into the
  voice channel as-is. Don't run the bot on a host where loud audio is
  itself a problem.
- **DoS via spammed commands.** No per-user rate limiting is
  implemented; rely on Discord's own rate limits.

## Operational recommendations

- Keep your Node.js runtime on an LTS release (`>=18`, currently `>=20`
  recommended for `@distube/ytdl-core`).
- Re-run `./setup.sh` periodically — it runs `npm install` and
  `npm audit` so you'll see new advisories as they're published.
- Don't commit `.env`, `config.json`, or `settings.sqlite3` (already in
  `.gitignore`).
- If you fork the bot, regenerate the token on the Developer Portal
  before running anywhere shared.
