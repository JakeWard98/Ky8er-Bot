const { getVoiceConnection } = require('@discordjs/voice');

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
        connection.destroy();
        delete servers[message.guild.id];
        message.reply('Disconnected!');
    }
}

module.exports = Leave;
