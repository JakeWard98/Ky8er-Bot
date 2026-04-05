const { PermissionFlagsBits } = require('discord.js');

class Ping {
    constructor() {
        this.name = 'ping';
        this.description = 'Shows Server ping';
    }

    async execute(message, args, servers) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return message.reply('You do not have permission to use this command.');
        }
        message.channel.send(`${message.client.user.username} is Online & Ready To Use @ ${message.client.ws.ping} ms`);
    }
}

module.exports = Ping;
