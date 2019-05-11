const Discord = require('discord.js-commando');

class UserID extends Discord.Command{
	constructor(client){
		super(client,{
			name: 'id',
			group: 'user',
			memberName: 'id',
			description: 'Shows Users ID'
		});
	}

	async run (message, args){
		message.channel.send(`Your Discord ID is: ${message.id}`);
	}
}

module.exports = UserID;