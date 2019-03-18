const Discord = require('discord.js-commando');

class Leave extends Discord.Command{
	constructor(client){
		super(client,{
			name: 'dc',
			group: 'voice',
			memberName: 'leave',
			description: 'Bot leaves channel'
		});
	}

	async run (message, args){
		if(message.guild.voiceConnection){
			message.guild.voiceConnection.disconnect();
		} else{
			message.reply('I need to be Chatting to be Disconnected!');
		}
	}
}

module.exports = Leave;