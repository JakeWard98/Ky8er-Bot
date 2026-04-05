class User {
    constructor() {
        this.name = 'name';
        this.description = 'Shows Users Name & Tag';
    }

    async execute(message, args, servers) {
        message.channel.send(`Your Username & Tag is: ${message.author.tag}`);
    }
}

module.exports = User;
