//imports discord.js
const Discord = require('discord.js-commando');
//imports file system from node.js
const fs = require('fs');

//initialize the discord bot
const client = new Discord.Client();
client.registry.registerGroup('user', 'mod');
client.registry.registerDefault();
client.registry.registerCommandIn(__dirname + "/commands");

//Returns and array of file names and checks to see if they are .js files.
//If they are not a .js file then it will be rejected from the array
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//gets the token of the bot
const { prefix, token } = require('./config.json');

//HAD AT THE START BUT NOW BREAKS CODE WHEN UNCOMMENTED
// makes config it accessible through client
//client.config = config;

for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    //Shows that bot is ready for use and what has actually started
    console.log("\n> Started");
    console.log(`> ${client.user.username} is Online & Ready too Use`);
    client.user.setActivity('Prefix: ^ | ^help');
    console.log("> Activity Has Been Set\n");
});

//Ping Command to see if the bot is on, while looking at server
//Tried in a command file, but it couldn't find "client"/"username" so its just an if atm in the main code
//feel free to look and tell me what's from and fix, if you want
client.on('message', message => {
    if (message.content === `${prefix}ping`){
        //States that the bot is online with an "Average heartbeat ping of the websocket"
        message.channel.send(`${client.user.username} is Online & Ready To Use @ ` + `${client.ping} ms`);
    }
})

client.on('message', message => {
   
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("There was and **Error** trying to execute the command");
    }
   
    //Starting commands that are now obsolete and are in command files
    /* //test message
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
    }*/
});

//logging the bot in
client.login(token);