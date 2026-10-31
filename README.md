# Ky8er-Bot

A small Discord bot used as a sandbox for learning. Be gentle — this is
practice code.

## Requirements

- Node.js **22.23.4+**, **24.22.1+** (LTS, recommended) or **26.12.1+** —
  the 2026-10-21 Node.js security releases, which fix CVE-2026-111497
  ("Node2Shell", Brotli decoder RCE). Older releases and end-of-life lines
  (18.x, 20.x, 23.x, 25.x) are refused by `setup.sh` and by `npm install`
  (`engine-strict` in `.npmrc`).
- **FFmpeg** on the `PATH` (needed to transcode YouTube audio for `^play`;
  e.g. `apt install ffmpeg`)
- A Discord bot token (see
  [Discord Developer Portal](https://discord.com/developers/applications))
- **Message Content Intent** enabled under *Bot > Privileged Gateway Intents*

## Install

```bash
./setup.sh
```

`setup.sh` checks your Node.js version (refusing unpatched runtimes),
runs `npm install`, copies `.env.example` → `.env` on first run, and runs
`npm audit` so any new advisories surface immediately.

Then edit `.env` and set your bot token:

```env
TOKEN=your_discord_bot_token_here
```

## Run

```bash
npm start
```

## Prefix: `^`

## Commands

### User

| Command              | Description                                          |
|----------------------|------------------------------------------------------|
| `^help`              | List user commands                                   |
| `^hello`             | Bot replies with a greeting                          |
| `^server`            | Show the server name                                 |
| `^id`                | Show the caller's Discord ID                         |
| `^name`              | Show the caller's Discord username                   |

### Mod

| Command              | Description                                          |
|----------------------|------------------------------------------------------|
| `^modhelp`           | List mod commands                                    |
| `^ping`              | Show the bot's websocket heartbeat ping              |
| `^numbers`           | Show the number of members in the server             |

Mod commands require the **Manage Messages** permission.

### Voice

| Command              | Description                                          |
|----------------------|------------------------------------------------------|
| `^join`              | Bot joins the caller's voice channel                 |
| `^dc`                | Bot leaves (caller must be in the bot's channel, or have Move Members) |
| `^play <url>`        | Play a YouTube video URL, or add it to the queue (max 50) |
| `^queue`, `^skip`, `^pause`, `^np` | Not implemented yet (reply with a placeholder) |

## Dependencies

Direct runtime deps (kept minimal):

- [`discord.js`](https://www.npmjs.com/package/discord.js)
- [`@discordjs/voice`](https://www.npmjs.com/package/@discordjs/voice)
- [`@distube/ytdl-core`](https://www.npmjs.com/package/@distube/ytdl-core)
- [`opusscript`](https://www.npmjs.com/package/opusscript) (audio encoder)
- [`dotenv`](https://www.npmjs.com/package/dotenv)

Last manual CVE re-audit: **2026-10-28** — see [`CHANGELOG.md`](./CHANGELOG.md)
for the audit notes. `npm audit` is also run automatically by `setup.sh`.

## Security

- Never commit your `.env` — it contains your bot token. `.env` is already
  in `.gitignore`.
- Rotate the token in the Discord Developer Portal if it ever leaks.
- `setup.sh` runs `npm audit` on every run, and
  [CodeQL](./.github/workflows/codeql.yml) statically analyses the code on
  push/PR to `master`.

Full security policy, threat model and disclosure process: see
[`SECURITY.md`](./SECURITY.md). Report a vulnerability privately via
[GitHub's private vulnerability reporting](https://github.com/JakeWard98/Ky8er-Bot/security/advisories/new).

## Planned

- Implement `^queue`, `^skip`, `^pause` and `^np`
- Single `^help` that adapts to caller permissions

## Contributors

- Jake Ward
