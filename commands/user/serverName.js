class ServerName {
    constructor() {
        this.name = 'server';
        this.description = 'Shows Server Name';
    }

    async execute(message, args, servers) {
        message.channel.send(`This server is: ${message.guild.name}`);
    }
}

module.exports = ServerName;
