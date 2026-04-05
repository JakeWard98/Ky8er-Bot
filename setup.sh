#!/bin/bash
# setup.sh — First-time setup for Ky8er-Bot

set -e

echo "=== Ky8er-Bot Setup ==="
echo

# Check Node.js version
NODE_VERSION=$(node -v 2>/dev/null | sed 's/v//' | cut -d. -f1)
if [ -z "$NODE_VERSION" ]; then
    echo "ERROR: Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "ERROR: Node.js v18+ is required. You have $(node -v)."
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
    cp .env.example .env
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
