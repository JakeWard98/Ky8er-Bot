module.exports = {
	name: 'hello',
	description: 'Prequel Meme',
	execute(message, args) {
		message.channel.send(`General ${message.author.username}\nYou are a Bold One\n:joy:`);
	},
};