# Ky8er-Bot

A small Discord bot used as a sandbox for learning. Be gentle — this is
practice code.

## Requirements

- Node.js **>= 18**
- A Discord bot token (see
  [Discord Developer Portal](https://discord.com/developers/applications))
- **Message Content Intent** enabled under *Bot > Privileged Gateway Intents*

## Install

```bash
./setup.sh
```

`setup.sh` checks your Node.js version, runs `npm install`, copies
`.env.example` → `.env` on first run, and runs `npm audit`.

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
| `^numbers`           | Show the number of users in the server               |
| `^id`                | Show the caller's Discord ID                         |
| `^name`              | Show the caller's global Discord name and tag        |

### Mod

| Command              | Description                                          |
|----------------------|------------------------------------------------------|
| `^modhelp`           | List mod commands                                    |
| `^ping`              | Show the bot's websocket heartbeat ping              |
| `^serverno` / alias  | Show the server's internal number                    |

### Voice

| Command              | Description                                          |
|----------------------|------------------------------------------------------|
| `^join`              | Bot joins the caller's voice channel                 |
| `^dc` / `^leave`     | Bot leaves the voice channel                         |
| `^play <url>`        | Queue or play a YouTube URL                          |
| `^queue`             | Show the queue                                       |
| `^skip`              | Skip the current track                               |
| `^pause`             | Pause playback                                       |
| `^np`                | Show the now-playing track                           |

## Dependencies

Direct runtime deps (kept minimal):

- [`discord.js`](https://www.npmjs.com/package/discord.js)
- [`@discordjs/voice`](https://www.npmjs.com/package/@discordjs/voice)
- [`@distube/ytdl-core`](https://www.npmjs.com/package/@distube/ytdl-core)
- [`opusscript`](https://www.npmjs.com/package/opusscript) (audio encoder)
- [`dotenv`](https://www.npmjs.com/package/dotenv)

`package.json` also declares an `overrides` block pinning the transitive
`lodash` dependency to **4.17.21** (the official latest stable on the
public npm registry). See the *Security* section below for context.

## Security

- Never commit your `.env` — it contains your bot token. `.env` is already in
  `.gitignore`.
- Rotate the token in the Discord Developer Portal if it ever leaks.
- Dependency audit status is checked on every `setup.sh` run and by
  [CodeQL](./.github/workflows/codeql.yml) on push/PR to `master`.

### Audit log

| Date       | Tooling                            | Result |
|------------|------------------------------------|--------|
| 2026-04-27 | Manual GHSA review + `npm audit`   | 0 CVEs after pinning `lodash@4.17.21` via `overrides`. The previous lockfile pinned `lodash@4.18.1`, which is not present on the public npm registry — replaced with the canonical 4.17.21 release. |

After pulling this branch, run `npm install` once to materialise the
override into your local `node_modules/`.

Report a vulnerability privately via
[GitHub's private vulnerability reporting](https://github.com/JakeWard98/Ky8er-Bot/security/advisories/new).

## Planned

- Fix `^dc` so it only runs when the caller is in a voice channel
  (see [#6](https://github.com/JakeWard98/Ky8er-Bot/issues/6))
- Queue works correctly across multiple plays
  (see [#9](https://github.com/JakeWard98/Ky8er-Bot/issues/9))
- Single `^help` that adapts to caller permissions

## Contributors

- Jake Ward
