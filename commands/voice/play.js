const {
    joinVoiceChannel,
    getVoiceConnection,
    createAudioPlayer,
    createAudioResource,
    entersState,
    AudioPlayerStatus,
    StreamType,
    VoiceConnectionStatus,
} = require('@discordjs/voice');
const { PermissionFlagsBits } = require('discord.js');
const ytdl = require('@distube/ytdl-core');

const MAX_QUEUE = 50;
// Give up on a voice connection that never becomes Ready, or the player
// would sit AutoPaused holding its download stream forever.
const READY_TIMEOUT_MS = 20_000;
// Ask YouTube for its WebM/Opus audio-only format and hand the Opus frames
// straight to Discord (demuxed in-process; nothing is transcoded). The
// previous path piped every track through an ffmpeg child process, which
// leaked two file descriptors on each skip/^dc/kick and, once spawn failed
// (EMFILE, or ffmpeg removed), crashed the bot on an unhandled 'error'.
const YTDL_OPTIONS = {
    filter: (format) => format.hasAudio && !format.hasVideo
        && format.container === 'webm' && format.codecs === 'opus',
    quality: 'lowestaudio',
};

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

        const guildId = message.guildId;
        let connection = getVoiceConnection(guildId);
        // Only members in the bot's channel (or mods with Move Members) may
        // queue audio into it, matching the ^dc check.
        if (connection && connection.joinConfig.channelId !== voiceChannel.id
            && !message.member.permissions.has(PermissionFlagsBits.MoveMembers)) {
            return message.reply('You must be in my Voice Channel to queue music.');
        }
        // The bot must not speak for a member who may not speak themselves.
        // `suppress` covers a stage-channel audience member.
        if (message.member.voice.serverMute || message.member.voice.suppress
            || !voiceChannel.permissionsFor(message.member)?.has(PermissionFlagsBits.Speak)) {
            return message.reply('You need permission to speak in your Voice Channel.');
        }

        if (!servers[guildId]) {
            servers[guildId] = { queue: [], player: null };
        }
        const server = servers[guildId];
        if (server.queue.length >= MAX_QUEUE) {
            return message.reply(`The queue is full (max ${MAX_QUEUE}).`);
        }
        server.queue.push(`https://www.youtube.com/watch?v=${ytdl.getURLVideoID(url)}`);

        if (connection && server.player) {
            message.reply('Added to queue!');
            return;
        }

        if (!connection) {
            try {
                connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });
            } catch (err) {
                console.error('Voice join error:', err.message);
                delete servers[guildId];
                return message.reply('Could not join the Voice Channel.');
            }
            connection.on('error', (err) => console.error('Voice connection error:', err.message));
        }

        // Tear down on Disconnected and also on Destroyed: removing the bot
        // from the guild destroys the connection without a Disconnected step,
        // which used to leave the player and its ffmpeg process running.
        // Uses the captured guildId: message.guild is null once the guild is gone.
        let cleanedUp = false;
        const cleanup = () => {
            if (cleanedUp) return;
            cleanedUp = true;
            const state = servers[guildId];
            delete servers[guildId];
            if (connection.state.status !== VoiceConnectionStatus.Destroyed) connection.destroy();
            state?.player?.stop(true);
        };
        connection.once(VoiceConnectionStatus.Disconnected, cleanup);
        connection.once(VoiceConnectionStatus.Destroyed, cleanup);
        entersState(connection, VoiceConnectionStatus.Ready, READY_TIMEOUT_MS).catch(() => {
            console.error('Voice connection did not become ready; leaving.');
            cleanup();
        });

        playNext(connection, message, servers);
    }
}

// Tell the channel the command came from, if it still exists. Message#channel
// is a cache lookup that returns null once the channel (or thread, or guild)
// is gone, and a throw here would escape from a stream event listener and
// exit the process.
function notify(message, text) {
    try {
        message.channel?.send(text).catch(() => {});
    } catch {
        // Nowhere left to report to.
    }
}

function playNext(connection, message, servers) {
    if (connection.state.status === VoiceConnectionStatus.Destroyed) return;
    const guildId = message.guildId;
    const server = servers[guildId];
    if (!server || !server.queue.length) {
        connection.destroy();
        delete servers[guildId];
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
        stream = ytdl(url, YTDL_OPTIONS);
        stream.on('error', (err) => {
            // Already moved on (track ended, failed elsewhere, or ^dc): a late
            // download error is not news to the channel.
            if (advanced) return;
            console.error('Stream error:', err.message);
            // Advance first, so the queue moves on even if reporting fails.
            next();
            notify(message, 'Stream error. Skipping.');
        });
        player = createAudioPlayer();
        server.player = player;
        player.on(AudioPlayerStatus.Idle, next);
        player.on('error', (err) => {
            console.error('Player error:', err.message);
            next();
        });
        player.play(createAudioResource(stream, { inputType: StreamType.WebmOpus }));
        connection.subscribe(player);
    } catch (err) {
        console.error('Playback error:', err.message);
        next();
        notify(message, 'Could not stream that URL. Skipping.');
    }
}

module.exports = Play;
