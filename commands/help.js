module.exports = {
	name: 'help',
	description: 'HelpS',
	execute(message, args) {
		message.channel.send('For help use ^help\nThese are the current commands:```\n^help\n^ping\n^hello\n^server\n^numbers```');
	},
};