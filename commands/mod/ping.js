const Commando = require('discord.js-commando');

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
		message.channel.send(`${this.client.user.username} is Online & Ready To Use @ ` + `${this.client.ping} ms`);
	}
}

module.exports = Ping;
