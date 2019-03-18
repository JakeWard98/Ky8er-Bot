const Discord = require('discord.js-commando');
const embed = require('discord.js');

class Help extends Discord.Command{
	constructor(client){
		super(client,{
			name: 'modhelp',
			group: 'mod',
			memberName: 'help',
			description: 'Help command to show commands'
		});
	}

	async run (message, args){
		// message.channel.send('For help use ^help\nThese are the current commands:```\n^help\n^ping\n^hello\n^server\n^numbers```');
		var helpEmbed = new embed.RichEmbed()
			.setColor('#9013FE')
            .setTitle('Mod Help')
            .addField('Prefix', 'The Prefix is ^')
            .addField('help', 'Calls the user Help Dialogue box')
            .addField('modHelp', 'Calls this Help Dialogue Box')
			.addField('hello', 'Greets the User')
			.addField('server', 'Shows the Server Name')
			.addField('join','The Bot joins your Voice Channel')
			.addField('dc','The Bot leaves the Voice Channel')
            .addField('numbers', 'Shows Total Members')
            .addField('ping', 'Pings the bot and show the average "Heartbeat" (Can be very temperamental)')
            .setTimestamp()
            .setFooter('Bot Still in Development')
		message.channel.send(helpEmbed);
	}
}

module.exports = Help;