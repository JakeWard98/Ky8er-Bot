const { PermissionFlagsBits } = require('discord.js');

class ServerNo {
    constructor() {
        this.name = 'numbers';
        this.description = 'Shows Server Numbers';
    }

    async execute(message, args, servers) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return message.reply('You do not have permission to use this command.');
        }
        message.channel.send(`This Server has **${message.guild.memberCount}** Total Members`);
    }
}

module.exports = ServerNo;
