const Discord = require('discord.js-commando');

class ServerName extends Discord.Command{
	constructor(client){
		super(client,{
			name: 'server',
			group: 'user',
			memberName: 'server',
			description: 'Shows Server Name'
		});
	}

	async run (message, args){
		message.channel.send(`This server is: ${message.guild.name}`);
	}
}

module.exports = ServerName;