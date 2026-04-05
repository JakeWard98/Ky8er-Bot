const Discord = require('discord.js-commando');
const YTDL = require('ytdl-core');

class Play extends Discord.Command{
	constructor(client){
		super(client,{
			name: 'play',
			group: 'voice',
			memberName: 'play',
			description: 'Bot plays given url'
		});
	}

	async run (message, args){
		if(message.member.voiceChannel){
			if(!message.guild.voiceConnection){
				if(!servers[message.guild.id]){
					servers[message.guild.id] = { queue: [] }
				}
				message.member.voiceChannel.join()
				.then(connection => {
					var server = servers[message.guild.id];
					// message.reply('Playing: ' + ytdl.getInfo(URL));
					server.queue.push(args);
					playStream(connection, message);
				})
			}
		} else{
			message.reply('You must be in a Voice Channel!');
		}
	}
}

module.exports = Play;

function playStream(connection, message){
	var server = servers[message.guild.id]
	server.dispatcher = connection.playStream(YTDL(server.queue[0], {
		filter: 'audioonly'
	}));
	server.queue.shift();
	server.dispatcher.on('end', function(){
		if(server.queue[0]){
			playStream(connection, message);
		} else{
			connection.disconnect();
		}
	});
}
