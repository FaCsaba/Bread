const Discord = require('discord.js');

let breadBot = new Discord.Client();

breadBot.on('error', (e) => {

});

breadBot.on('message', (message) => {
    if (message.channel.name && message.channel.name.toLowerCase().includes('bread')) {
        if (message.author.username.includes('🇫🇷') || (message.member.nickname && message.member.nickname.includes('🇫🇷'))) {
            message.react('🥖');
        } else {
            message.react('🍞');
        }
    }
});

breadBot.login('NjM0ODEyNTIzNjg1NjA5NTMy.XbLIcA.AsXqMTU3ZpXXs0fC05TfpFCeoxQ');
