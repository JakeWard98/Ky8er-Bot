const Discord = require('discord.js-commando');

class Join extends Discord.Command{
	constructor(client){
		super(client,{
			name: 'join',
			group: 'voice',
			memberName: 'join',
			description: 'Bot joins channel'
		});
	}

	async run (message, args){
		if(message.member.voiceChannel){
			if(!message.guild.voiceConnection){
				message.member.voiceChannel.join()
				.then(connection =>{
					message.reply('Successfully Joined!')
				})
			}
		} else{
			message.reply('You must be in a Voice Channel!');
		}
	}
}

module.exports = Join;