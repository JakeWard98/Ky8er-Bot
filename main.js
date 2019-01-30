//imports discord.js
const Discord = require('discord.js');
//imports file system from node.js
const fs = require('fs');

//initialize the discord bot
const bot = new Discord.Client();
const token = 'NTQwMTAwMjg5NTIxMjU0NDEy.DzM60w.r6U6RCNxW2nNccWGNY7lrJCEqag'

bot.login(token)

bot.on('ready', function(){
    console.log("\n> Started");
    console.log("> Erebus Bot is Ready too Use")
})

bot.on('message', function(message){
    if(message.content == 'Hello There')
    {
        message.reply("General Kenobi");
    }
    if(message.content == "Ping")
    {
        message.reply("Pong")
    }
});