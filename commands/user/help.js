const Discord = require('discord.js-commando');
const embed = require('discord.js');

class Help extends Discord.Command{
	constructor(client){
		super(client,{
			name: 'help',
			group: 'user',
			memberName: 'help',
			description: 'Help command to show commands'
		});
	}

	async run (message, args){
		// message.channel.send('For help use ^help\nThese are the current commands:```\n^help\n^ping\n^hello\n^server\n^numbers```');
		var helpEmbed = new embed.RichEmbed()
			.setColor('#F810EB')
			.setTitle('__***Help***__')
			.addField('Prefix', 'The Prefix is ^')
			.addField('help', 'Calls this Dialogue box')
			.addField('hello', 'Greets the User')
			.addField('server', 'Shows the Server Name')
			.addField('join','The Bot joins your Voice Channel')
			.addField('dc','The Bot leaves the Voice Channel')
			.addField('play + YT URL', 'The Bot Plays the Song and Disconnects [No Queue System atm]')
			.setTimestamp()
			.setFooter('Bot Still in Development')	
		message.channel.send(helpEmbed);
	}
}

module.exports = Help;