# Ky8er-Bot

A Discord bot built with discord.js v14.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications)

### Installation

```bash
# Clone the repository
git clone https://github.com/JakeWard98/Ky8er-Bot.git
cd Ky8er-Bot

# Run the setup script
chmod +x setup.sh
./setup.sh
```

Or manually:

```bash
npm install
cp .env.example .env
# Edit .env and add your bot token
```

### Configuration

1. Copy `.env.example` to `.env` and add your bot token:
   ```
   TOKEN=your_discord_bot_token_here
   ```
2. In the [Discord Developer Portal](https://discord.com/developers/applications), go to your application > Bot > Privileged Gateway Intents and enable **Message Content Intent**.

### Running

```bash
npm start
```

## Prefix: ^

## Commands

### User Commands

| Command | Description |
|---------|-------------|
| `^help` | Displays a list of user commands |
| `^hello` | Greets the user |
| `^server` | Shows the server name |
| `^id` | Displays the user's Discord ID |
| `^name` | Displays the user's Discord Name & Tag |

### Mod Commands (requires Manage Messages permission)

| Command | Description |
|---------|-------------|
| `^modhelp` | Displays a list of all commands (mod view) |
| `^ping` | Shows the bot's websocket heartbeat ping |
| `^numbers` | Shows the total number of members in the server |

### Voice Commands

| Command | Description |
|---------|-------------|
| `^join` | Bot joins your voice channel |
| `^dc` | Bot disconnects from voice |
| `^play <YouTube URL>` | Plays audio from a YouTube URL |

## Plans

- Queue system for music playback
- Pause, skip, and now-playing commands
- Single help command that adapts based on user permissions

---

Contributors: Jake Ward
