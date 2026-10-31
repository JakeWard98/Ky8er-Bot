const { getVoiceConnection } = require('@discordjs/voice');
const { PermissionFlagsBits } = require('discord.js');

class Leave {
    constructor() {
        this.name = 'dc';
        this.description = 'Bot leaves channel';
    }

    async execute(message, args, servers) {
        const connection = getVoiceConnection(message.guild.id);
        if (!connection) {
            return message.reply('I need to be in a Voice Channel to be Disconnected!');
        }
        const botChannelId = message.guild.members.me?.voice.channelId;
        if (message.member.voice.channelId !== botChannelId
            && !message.member.permissions.has(PermissionFlagsBits.MoveMembers)) {
            return message.reply('You must be in my Voice Channel to disconnect me.');
        }
        const server = servers[message.guild.id];
        delete servers[message.guild.id];
        connection.destroy();
        // Stop the player too, or it lingers with its ffmpeg process.
        server?.player?.stop(true);
        message.reply('Disconnected!');
    }
}

module.exports = Leave;
