const { EmbedBuilder } = require('discord.js');

class HelpCommand {
    constructor() {
        this.name = 'help';
        this.description = 'Calls this Help dialogue box';
    }

    async execute(message, args, servers) {
        const helpEmbed = new EmbedBuilder()
            .setColor('#F810EB')
            .setTitle('__***Help***__')
            .addFields(
                { name: 'Prefix', value: 'The Prefix is ^' },
                { name: 'help', value: 'Calls this dialogue box' },
                { name: 'hello', value: 'Greets the User' },
                { name: 'server', value: 'Shows the Server Name' },
                { name: 'id', value: 'The bot displays the users Discord ID' },
                { name: 'name', value: 'The bot displays the users global Discord Name & Tag' },
                { name: 'join', value: 'The Bot joins your Voice Channel' },
                { name: 'dc', value: 'The Bot leaves the Voice Channel' },
                { name: 'play + YT URL', value: 'The Bot Plays the Song [No Queue System atm]' }
            )
            .setTimestamp()
            .setFooter({ text: 'Bot Still in Development' });
        message.channel.send({ embeds: [helpEmbed] });
    }
}

module.exports = HelpCommand;
