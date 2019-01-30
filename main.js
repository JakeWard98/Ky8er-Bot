const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NTQwMTAwMjg5NTIxMjU0NDEy.DzM60w.r6U6RCNxW2nNccWGNY7lrJCEqag'

bot.login(token)

bot.on('ready', function(){
    console.log("Ready");
})

bot.on('message', function(message){
    if(message.content == 'Hello There')
    {
        message.reply("General Kenobi");
    }

bot.on('message', function(message){
    if(message.content == "Ping")
    {
        message.reply("Pong")
    }
})
});