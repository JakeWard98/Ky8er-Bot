const { joinVoiceChannel } = require('@discordjs/voice');

class Join {
    constructor() {
        this.name = 'join';
        this.description = 'Bot joins channel';
    }

    async execute(message, args, servers) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('You must be in a Voice Channel!');
        }
        if (message.guild.members.me.voice.channel) {
            return message.reply('I am already in a Voice Channel!');
        }
        try {
            joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });
            message.reply('Successfully Joined!');
        } catch (err) {
            console.error('Join error:', err.message);
            message.reply('Could not join the Voice Channel.');
        }
    }
}

module.exports = Join;
