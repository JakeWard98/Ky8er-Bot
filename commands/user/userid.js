class UserID {
    constructor() {
        this.name = 'id';
        this.description = 'Shows Users ID';
    }

    async execute(message, args, servers) {
        message.channel.send(`Your Discord ID is: ${message.author.id}`);
    }
}

module.exports = UserID;
