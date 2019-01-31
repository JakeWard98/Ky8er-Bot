//imports discord.js
const Discord = require('discord.js');
//imports file system from node.js
const fs = require('fs');

//initialize the discord bot
const bot = new Discord.Client();
const token = 'NTQwMTAwMjg5NTIxMjU0NDEy.DzM60w.r6U6RCNxW2nNccWGNY7lrJCEqag'


bot.on('ready', function(){
    //Shows that bot is ready for use and what has actually started
    console.log("\n> Started");
    console.log("> Erebus Bot is Ready too Use\n")
})

bot.on('message', function(message){
    //test message
    if(message.content == 'Hello There')
    {
        message.channel.sendMessage("General Kenobi");
    }
    //test message
    if(message.content == "Ping")
    {
        message.channel.sendMessage("Pong")
    }
})

bot.login(token)

;