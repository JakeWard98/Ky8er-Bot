const Discord = require('discord.js-commando');

class ServerNo extends Discord.Command{
	constructor(client){
		super(client,{
			name: 'numbers',
			group: 'mod',
			memberName: 'numbers',
			description: 'Shows Server Numbers'
		});
	}

	async run (message, args){
		message.channel.send(`This Server has **${message.guild.memberCount}** Total Members`);
	}
}

module.exports = ServerNo;