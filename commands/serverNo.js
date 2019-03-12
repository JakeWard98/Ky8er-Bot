module.exports = {
	name: 'numbers',
	description: 'Server Numbers',
	execute(message, args) {
		message.channel.send(`This Server has **${message.guild.memberCount}** Total Members` );
	},
};