class Queue {
    constructor() {
        this.name = 'queue';
        this.description = 'Shows the current queue (not yet implemented)';
    }

    async execute(message, args, servers) {
        message.reply('Queue display is not yet implemented.');
    }
}

module.exports = Queue;
