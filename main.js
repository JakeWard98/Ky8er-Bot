const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
// @distube/ytdl-core: never dump YouTube pages it cannot parse into the
// working directory (one file per attempt, 4 attempts per track, no limit)
// and skip its background GitHub update check, so it only contacts YouTube.
process.env.YTDL_NO_DEBUG_FILE ??= '1';
process.env.YTDL_NO_UPDATE ??= '1';
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
    // Never let echoed text (e.g. a guild name) ping @everyone, roles or users.
    allowedMentions: { parse: [], repliedUser: true },
});

client.commands = new Collection();
const prefix = '^';
const servers = {};

// Load commands from subdirectories
const commandsDir = path.join(__dirname, 'commands');
for (const dir of fs.readdirSync(commandsDir)) {
    const dirPath = path.join(commandsDir, dir);
    if (!fs.statSync(dirPath).isDirectory()) continue;
    for (const file of fs.readdirSync(dirPath).filter(f => f.endsWith('.js'))) {
        const Cmd = require(path.join(dirPath, file));
        const cmd = new Cmd();
        if (cmd.name) client.commands.set(cmd.name, cmd);
    }
}

client.once(Events.ClientReady, () => {
    console.log('Bot ready.');
    client.user.setActivity('^help');
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const name = args.shift().toLowerCase();
    const command = client.commands.get(name);
    if (!command) return;
    try {
        await command.execute(message, args, servers);
    } catch (err) {
        console.error(`Command error [${name}]:`, err.message);
        message.reply('There was an error executing that command.').catch(() => {});
    }
});

client.on('guildDelete', (guild) => {
    const state = servers[guild.id];
    delete servers[guild.id];
    // Stop playback too, or its download keeps running.
    state?.player?.stop(true);
});

// Without a listener, an 'error' event from the client would throw and exit.
// `err?.message ?? err`: a rejection with an undefined reason must not
// throw inside the handler (that exits the process).
client.on('error', (err) => {
    console.error('Client error:', err?.message ?? err);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err?.message ?? err);
});

client.login(process.env.TOKEN);
