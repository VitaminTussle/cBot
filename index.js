// Discord.js dependencies
const discord = require('discord.js');
const MessageHandler = require('discord-message-handler').MessageHandler;
const handler = new MessageHandler();
const client = new discord.Client();

// File system
const fs = require('fs');

// Check if config exists and generate template if false
if (!fs.existsSync('config.json')) {
    fs.writeFileSync('config.json', '{\n  \"token\": \"\",\n  "prefix": "!"\n}', 'utf8');
    console.log('Config not found, new config file made.');
    console.log('Please set your token in config.json!');
    process.exit(0);
}

// Parse config
const config = JSON.parse(fs.readFileSync('config.json'));

// Store config values
const token = config.token;
const prefix = config.prefix;

if(token == "") {
    console.log("You didn't enter your token or prefix, please enter it in config.json");
    process.exit(0);
}

// !help
handler.onCommand(prefix + 'help').do((args, rawArgs, message) => {
    message.channel.send('***cBot Help***');
    message.channel.send(prefix + 'help: Lists commands\n' + prefix + 'test: Runs a test message\n' + prefix + 'correct [statement]: Corrects certain grammar mistakes in [statement]\n' + prefix + 'fix [statement]: Alias for !correct');
});

// !test
handler.onCommand(prefix + 'test').do((args, rawArgs, message) => {
    message.channel.send('my job succs');
});

// !correct
handler.onCommand(prefix + 'correct').alias(prefix + 'fix').deleteInvocation(0).do((args, rawArgs, message) => {
    if(containsCk(message.toString().toLowerCase())){
        message.channel.send(`${message.author} says:`);
        message.channel.send(fix(message.toString().toLowerCase()));
    }
});

client.on('message', message => {
    // Check if message was not written by bot and starts with prefix
    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;

    // ensure message handling
    handler.handleMessage(message);
});

function containsCk(msg){
    for(var i = 0; i < msg.length - 1; i++){
        if(msg.substring(i, i + 2) === 'ck'){
            return true;
        }
    }
    return false;
}

function fix(msg){
    if(!containsCk(msg)){
        return msg;
    }
    
    var place = 0;
    for(var i = 0; i < msg.length - 1; i++){
        if(msg.substring(i, i + 2) === 'ck'){
            place = i + 1;
            break;
        }
    }
    if(msg.substring(0,8) === '!correct'){
        return (msg.substring(9, place) + 'c' + fix(msg.substring(place + 1, msg.length)));
    }
    else if(msg.substring(0,4) === '!fix'){
        return (msg.substring(5, place) + 'c' + fix(msg.substring(place + 1, msg.length)));
    }
    return (msg.substring(0, place) + 'c' + fix(msg.substring(place + 1, msg.length)));
}

client.login(token);