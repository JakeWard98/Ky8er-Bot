const Discord = require('discord.js-commando');
const client = new Discord.Client()

const { token } = require('../../config.json');

class ServerName extends Discord.Command{
	constructor(client){
		super(client,{
			name: 'ping',
			group: 'mod',
			memberName: 'ping',
			description: 'Shows Server ping'
		});
	}

	async run (message, args){
		message.channel.send(`${client.user.username} is Online & Ready To Use @ ` + `${client.ping} ms`);
	}
}

module.exports = ServerName;

client.login(token);