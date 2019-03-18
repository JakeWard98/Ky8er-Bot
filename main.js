//imports discord.js-commando
const Commando = require('discord.js-commando');

const path = require('path');

//imports file system from node.js
const fs = require('fs');

//imports sqlite settings manager
// const sqlite = require('sqlite');

//initialize the discord bot and set the prefix for commando
const client = new Commando.Client({
    commandPrefix : '^',
    owner: '134335701448654849',
    disableEveryone: true
});

// client.setProvider(sqlite.open(path.join(__dirname, 'settings.sqlite3'))
//                     .then(db => Commando.SQLiteProvider(db))
//                     ).catch(console.error);

client.registry
        .registerGroups([
            ['user', 'basic commands'],
            ['mod', 'commands for mods'],
            ['voice', 'used to voice channels']
        ])
        // .registerDefaults()
        // ANYWAY TO DISABLE DEFAULT COMMANDS? DOING ": false" doesn't work
        .registerCommandsIn(path.join(__dirname + "/commands"));

//Returns and array of file names and checks to see if they are .js files.
//If they are not a .js file then it will be rejected from the array
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//gets the token of the bot
const { token } = require('./config.json');
// Prefix no longer needs to be called from the config

client.once('ready', () => {
    //Shows that bot is ready for use and what has actually started
    console.log("\n> Started");
    console.log(`> ${client.user.username} is Online & Ready too Use`);
    client.user.setActivity('^help');
    console.log("> Activity Has Been Set\n");
});

//logging the bot in
client.login(token);