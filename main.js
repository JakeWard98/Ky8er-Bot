//imports discord.js
const Discord = require('discord.js');
//imports file system from node.js
const fs = require('fs');

//initialize the discord bot
const client = new Discord.Client();
//gets the token of the bot
const auth = require('./auth.json');
/*//gets the prefix for the bot
const prefix = require('./prefix');*/
// makes auth it accessible through client
client.auth = auth;

client.on('ready', function(){
    //Shows that bot is ready for use and what has actually started
    console.log("\n> Started");
    console.log(`> ${client.user.username} is Online & Ready too Use\n`)
})

client.on('message', function(message){
    //test message
    if(message.content == 'Hello There')
    {
        message.channel.send("General Kenobi");
    }
    //test message
    if(message.content == "Ping")
    {
        message.channel.send("Pong")
    }
    //test message
    if(message.content == "General Kenobi")
    {
        message.channel.send("YOU ARE A BOLD ONE")
    }
})

//logging the bot in
client.login(auth.token);