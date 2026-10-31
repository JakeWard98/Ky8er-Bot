const {
    joinVoiceChannel,
    getVoiceConnection,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    VoiceConnectionStatus,
} = require('@discordjs/voice');
const ytdl = require('@distube/ytdl-core');

const MAX_QUEUE = 50;

class Play {
    constructor() {
        this.name = 'play';
        this.description = 'Bot plays given YouTube URL';
    }

    async execute(message, args, servers) {
        const url = args[0];

        if (!url || !ytdl.validateURL(url)) {
            return message.reply('Please provide a valid YouTube video URL.');
        }

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('You must be in a Voice Channel!');
        }

        if (!servers[message.guild.id]) {
            servers[message.guild.id] = { queue: [], player: null };
        }
        const server = servers[message.guild.id];
        if (server.queue.length >= MAX_QUEUE) {
            return message.reply(`The queue is full (max ${MAX_QUEUE}).`);
        }
        server.queue.push(`https://www.youtube.com/watch?v=${ytdl.getURLVideoID(url)}`);

        let connection = getVoiceConnection(message.guild.id);
        if (connection && server.player) {
            message.reply('Added to queue!');
            return;
        }

        if (!connection) {
            try {
                connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: message.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });
            } catch (err) {
                console.error('Voice join error:', err.message);
                delete servers[message.guild.id];
                return message.reply('Could not join the Voice Channel.');
            }
            connection.on('error', (err) => console.error('Voice connection error:', err.message));
        }

        connection.once(VoiceConnectionStatus.Disconnected, () => {
            const state = servers[message.guild.id];
            delete servers[message.guild.id];
            if (connection.state.status !== VoiceConnectionStatus.Destroyed) connection.destroy();
            state?.player?.stop(true);
        });

        playNext(connection, message, servers);
    }
}

function playNext(connection, message, servers) {
    if (connection.state.status === VoiceConnectionStatus.Destroyed) return;
    const server = servers[message.guild.id];
    if (!server || !server.queue.length) {
        connection.destroy();
        delete servers[message.guild.id];
        return;
    }

    const url = server.queue.shift();
    let stream;
    let player;
    let advanced = false;
    // A failing track can fire the stream 'error', the player 'error' and the
    // player Idle event; only the first may move on to the next track.
    const next = () => {
        if (advanced) return;
        advanced = true;
        stream?.destroy();
        player?.stop(true);
        playNext(connection, message, servers);
    };

    try {
        stream = ytdl(url, { filter: 'audioonly', quality: 'lowestaudio' });
        stream.on('error', (err) => {
            console.error('Stream error:', err.message);
            message.channel.send('Stream error. Skipping.').catch(() => {});
            next();
        });
        player = createAudioPlayer();
        server.player = player;
        player.on(AudioPlayerStatus.Idle, next);
        player.on('error', (err) => {
            console.error('Player error:', err.message);
            next();
        });
        player.play(createAudioResource(stream));
        connection.subscribe(player);
    } catch (err) {
        console.error('Playback error:', err.message);
        message.channel.send('Could not stream that URL. Skipping.').catch(() => {});
        next();
    }
}

module.exports = Play;
