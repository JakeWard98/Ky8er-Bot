module.exports = {
	name: 'server',
	description: 'Server Name',
	execute(message, args) {
		message.channel.send(`The server is: ${message.guild.name}`);
	},
};