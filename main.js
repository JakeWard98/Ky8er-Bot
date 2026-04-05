require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.commands = new Collection();
const prefix = '^';
const servers = {};

// Load commands from subdirectories
for (const dir of fs.readdirSync('./commands')) {
    const dirPath = `./commands/${dir}`;
    if (!fs.statSync(dirPath).isDirectory()) continue;
    for (const file of fs.readdirSync(dirPath).filter(f => f.endsWith('.js'))) {
        const Cmd = require(`${dirPath}/${file}`);
        const cmd = new Cmd();
        if (cmd.name) client.commands.set(cmd.name, cmd);
    }
}

client.once('ready', () => {
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
    delete servers[guild.id];
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err.message);
});

client.login(process.env.TOKEN);
