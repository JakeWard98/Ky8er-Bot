class NowPlaying {
    constructor() {
        this.name = 'np';
        this.description = 'Shows the now playing track (not yet implemented)';
    }

    async execute(message, args, servers) {
        message.reply('Now playing display is not yet implemented.');
    }
}

module.exports = NowPlaying;
