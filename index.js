const Discord = require('discord.js');

let breadBot = new Discord.Client();

breadBot.on('error', (e) => {

});

breadBot.on('message', (message) => {
    if (message.channel.name && message.channel.name.toLowerCase().includes('bread')) {
        message.react('🍞');
    }
});

breadBot.login('NjM0ODEyNTIzNjg1NjA5NTMy.Xan9pg.6hz_1Ia-g7Ztsonz1wvBBWHGfKc');