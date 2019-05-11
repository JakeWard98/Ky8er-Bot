const Discord = require('discord.js-commando');

class User extends Discord.Command{
	constructor(client){
		super(client,{
			name: 'name',
			group: 'user',
			memberName: 'name',
			description: 'Shows Users Name'
		});
	}

	async run (message, args){
		message.channel.send(`Your Username & Tag is: ${message.member.user.tag}`);
	}
}

module.exports = User;