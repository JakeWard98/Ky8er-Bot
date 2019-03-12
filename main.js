//imports discord.js
const Discord = require('discord.js');
//imports file system from node.js
const fs = require('fs');

//initialize the discord bot
const client = new Discord.Client();
//gets the token of the bot
const { prefix, token } = require('./config.json');
// makes config it accessible through client
//client.config = config;

client.once('ready', () => {
    //Shows that bot is ready for use and what has actually started
    console.log("\n> Started");
    console.log(`> ${client.user.username} is Online & Ready too Use`);
    client.user.setActivity('Prefix: ^');
    console.log("> Activity Has Been Set\n");
});

client.on('message', message => {
    //test message
    if(message.content === `${prefix}Hello There`){
        message.channel.send("General Kenobi");
    }
    //test message
    else if(message.content == "^Ping"){
        message.channel.send("Pong");
    }
    //test message
    else if(message.content == "^General Kenobi"){
        message.channel.send("YOU ARE A BOLD ONE");
    }
    //"Advanced" Message
    else if (message.content === `${prefix}server`){
        message.channel.send(`The server is: ${message.guild.name}`);
    }
    //"Advanced" Message
    else if (message.content === `${prefix}Numbers`){
        message.channel.send(`This Server has **${message.guild.memberCount}** Total Members` );
    }
});

//logging the bot in
client.login(token);