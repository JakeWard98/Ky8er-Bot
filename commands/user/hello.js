const Discord = require('discord.js-commando');

class HelloThere extends Discord.Command{
	constructor(client){
		super(client,{
			name: 'hello',
			group: 'user',
			memberName: 'hello',
			description: 'Prequel Meme'
		});
	}

	async run (message, args){
		message.channel.send(`General ${message.author.username}\nYou are a Bold One\n:joy:`);
	}
}

module.exports = HelloThere;