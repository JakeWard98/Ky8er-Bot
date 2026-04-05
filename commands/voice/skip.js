class Skip {
    constructor() {
        this.name = 'skip';
        this.description = 'Skips the current track (not yet implemented)';
    }

    async execute(message, args, servers) {
        message.reply('Skip is not yet implemented.');
    }
}

module.exports = Skip;
