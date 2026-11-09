const {
    joinVoiceChannel,
    getVoiceConnection,
    entersState,
    VoiceConnectionStatus,
} = require('@discordjs/voice');

// Same limit as ^play: a join Discord never completes (channel full, Connect
// denied) is abandoned instead of holding the guild's voice slot forever.
const READY_TIMEOUT_MS = 20_000;

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
        // getVoiceConnection also covers a join still in progress, when the
        // bot has no voice state yet; without it every repeat ^join stacked
        // another listener on the same stuck connection.
        if (message.guild.members.me.voice.channel || getVoiceConnection(message.guildId)) {
            return message.reply('I am already in a Voice Channel!');
        }
        let connection;
        try {
            connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guildId,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });
        } catch (err) {
            console.error('Join error:', err.message);
            return message.reply('Could not join the Voice Channel.');
        }
        connection.on('error', (err) => console.error('Voice connection error:', err.message));
        // The reply comes up to 20 s later, by when the channel may be gone
        // (Message#channel is then null and reply() throws).
        const reply = (text) => {
            try {
                message.reply(text).catch(() => {});
            } catch {
                // Nowhere left to report to.
            }
        };
        try {
            await entersState(connection, VoiceConnectionStatus.Ready, READY_TIMEOUT_MS);
        } catch {
            // Destroyed meanwhile (^dc, or the bot was removed): nothing to say.
            if (connection.state.status === VoiceConnectionStatus.Destroyed) return;
            console.error('Voice connection did not become ready; leaving.');
            connection.destroy();
            return reply('Could not join the Voice Channel.');
        }
        reply('Successfully Joined!');
    }
}

module.exports = Join;
