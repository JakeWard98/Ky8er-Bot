const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NTQwMTAwMjg5NTIxMjU0NDEy.DzMHNw.cp1YyHdKKYyHBfgSFJBLVRpWqHQ'

bot.login(token)

bot.on('ready', function(){
    console.log("Ready");
})

bot.on('message', function(message){
    if(message.content == '!Hello There')
    {
        message.reply("General Kenobi");
    }
});