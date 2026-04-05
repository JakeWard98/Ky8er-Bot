const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

class ModHelp {
    constructor() {
        this.name = 'modhelp';
        this.description = 'Help command to show mod commands';
    }

    async execute(message, args, servers) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return message.reply('You do not have permission to use this command.');
        }
        const helpEmbed = new EmbedBuilder()
            .setColor('#9013FE')
            .setTitle('Mod Help')
            .addFields(
                { name: 'Prefix', value: 'The Prefix is ^' },
                { name: 'help', value: 'Calls the user Help Dialogue box' },
                { name: 'modHelp', value: 'Calls this Help Dialogue Box' },
                { name: 'hello', value: 'Greets the User' },
                { name: 'server', value: 'Shows the Server Name' },
                { name: 'id', value: 'The bot displays the users Discord ID' },
                { name: 'name', value: 'The bot displays the users global Discord Name & Tag' },
                { name: 'join', value: 'The Bot joins your Voice Channel' },
                { name: 'dc', value: 'The Bot leaves the Voice Channel' },
                { name: 'play + YT URL', value: 'The Bot Plays the Song [No Queue System atm]' },
                { name: 'numbers', value: 'Shows Total Members' },
                { name: 'ping', value: 'Pings the bot and shows the average "Heartbeat"' }
            )
            .setTimestamp()
            .setFooter({ text: 'Bot Still in Development' });
        message.channel.send({ embeds: [helpEmbed] });
    }
}

module.exports = ModHelp;
