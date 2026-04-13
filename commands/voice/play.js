const {
    joinVoiceChannel,
    getVoiceConnection,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    VoiceConnectionStatus,
} = require('@discordjs/voice');
const ytdl = require('@distube/ytdl-core');

const ytUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;

class Play {
    constructor() {
        this.name = 'play';
        this.description = 'Bot plays given YouTube URL';
    }

    async execute(message, args, servers) {
        const url = args[0];

        if (!url || !ytUrlPattern.test(url)) {
            return message.reply('Please provide a valid YouTube URL.');
        }

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('You must be in a Voice Channel!');
        }

        if (!servers[message.guild.id]) {
            servers[message.guild.id] = { queue: [], player: null };
        }
        const server = servers[message.guild.id];
        server.queue.push(url);

        const existing = getVoiceConnection(message.guild.id);
        if (existing) {
            message.reply('Added to queue!');
            return;
        }

        let connection;
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

        connection.on(VoiceConnectionStatus.Disconnected, () => {
            delete servers[message.guild.id];
        });

        playNext(connection, message, servers);
    }
}

function playNext(connection, message, servers) {
    const server = servers[message.guild.id];
    if (!server || !server.queue.length) {
        connection.destroy();
        delete servers[message.guild.id];
        return;
    }

    const url = server.queue.shift();
    let stream;
    try {
        stream = ytdl(url, { filter: 'audioonly', quality: 'lowestaudio' });
    } catch (err) {
        console.error('ytdl error:', err.message);
        message.channel.send('Could not stream that URL. Skipping.').catch(() => {});
        return playNext(connection, message, servers);
    }

    stream.on('error', (err) => {
        console.error('Stream error:', err.message);
        message.channel.send('Stream error. Skipping.').catch(() => {});
        playNext(connection, message, servers);
    });

    const resource = createAudioResource(stream);
    const player = createAudioPlayer();
    server.player = player;

    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
        playNext(connection, message, servers);
    });

    player.on('error', (err) => {
        console.error('Player error:', err.message);
        message.channel.send('Player error. Skipping.').catch(() => {});
        playNext(connection, message, servers);
    });
}

module.exports = Play;
