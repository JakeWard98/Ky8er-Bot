class HelloThere {
    constructor() {
        this.name = 'hello';
        this.description = 'Prequel Meme';
    }

    async execute(message, args, servers) {
        message.channel.send(`General ${message.author.username}\nYou are a Bold One\n:joy:`);
    }
}

module.exports = HelloThere;
