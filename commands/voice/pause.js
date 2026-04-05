class Pause {
    constructor() {
        this.name = 'pause';
        this.description = 'Pauses the current track (not yet implemented)';
    }

    async execute(message, args, servers) {
        message.reply('Pause is not yet implemented.');
    }
}

module.exports = Pause;
