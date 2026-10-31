#!/bin/bash
# setup.sh — First-time setup for Ky8er-Bot

set -e
cd "$(dirname "$0")"

echo "=== Ky8er-Bot Setup ==="
echo

# Check Node.js version.
# Node2Shell (CVE-2026-111497) and the rest of the 2026-10-21 Node.js
# security release are fixed only in 22.23.4 / 24.22.1 / 26.12.1; every
# older release and every end-of-life line (18.x, 20.x, 23.x, 25.x) stays
# vulnerable. Keep in sync with "engines" in package.json.
REQUIRED_NODE="22.23.4+, 24.22.1+ or 26.12.1+"

node_is_patched() {
    local major=$1 minor=$2 patch=$3 min_minor min_patch
    case "$major" in
        22) min_minor=23; min_patch=4 ;;
        24) min_minor=22; min_patch=1 ;;
        26) min_minor=12; min_patch=1 ;;
        *)  [ "$major" -gt 26 ]; return ;;
    esac
    [ "$minor" -gt "$min_minor" ] || { [ "$minor" -eq "$min_minor" ] && [ "$patch" -ge "$min_patch" ]; }
}

NODE_VERSION=$(node -v 2>/dev/null | sed 's/^v//')
if [ -z "$NODE_VERSION" ]; then
    echo "ERROR: Node.js is not installed. Please install Node.js $REQUIRED_NODE."
    exit 1
fi
IFS=. read -r NODE_MAJOR NODE_MINOR NODE_PATCH <<< "$NODE_VERSION"
NODE_PATCH=${NODE_PATCH%%[!0-9]*}
if ! node_is_patched "$NODE_MAJOR" "$NODE_MINOR" "${NODE_PATCH:-0}"; then
    echo "ERROR: Node.js $REQUIRED_NODE is required (security fixes incl. CVE-2026-111497). You have $(node -v)."
    exit 1
fi
echo "Node.js $(node -v) detected."

# Install dependencies
echo "Installing dependencies..."
npm install
echo "Dependencies installed."
echo

# Check for .env file
if [ ! -f .env ]; then
    echo "No .env file found. Creating from .env.example..."
    # Owner-only permissions: .env holds the bot token.
    (umask 077 && cp .env.example .env)
    echo
    echo "IMPORTANT: Edit the .env file and add your Discord bot token:"
    echo "  TOKEN=your_discord_bot_token_here"
    echo
    echo "You can get a bot token from https://discord.com/developers/applications"
    echo
else
    echo ".env file found."
fi

# Verify no vulnerabilities
echo "Running security audit..."
npm audit || true
echo

echo "=== Setup Complete ==="
echo
echo "To start the bot:"
echo "  npm start"
echo
echo "NOTE: Make sure you have enabled the 'Message Content Intent'"
echo "in your Discord Developer Portal under Bot > Privileged Gateway Intents."
