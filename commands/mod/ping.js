//Weird Fix, May be completely wrong, fix need be

const Commando = require('discord.js-commando');
const Discord = require('discord.js');

const client = new Discord.Client();

const { token } = require('../../config.json');

class Ping extends Commando.Command{
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

module.exports = Ping;

client.login(token);
