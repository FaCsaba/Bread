const Discord = require('discord.js');
const fs = require('fs');
require('@exan/envreader').load()

let breadBot = new Discord.Client();

const scoreboard = new Discord.RichEmbed().setTitle('The breadest of them all!');

breadBot.on('error', (e) => { });

breadBot.on('message', (message) => {
	const filter = (reaction, user) => {
		return reaction.emoji.name === '🍞' && user.id === message.author.id;
	};

	if (fs.existsSync('./data/' + message.channel.id + '.json') == false) {
		fs.writeFile('./data/' + message.channel.id + '.json', '', function (err) {
			if (err) throw err;
		})
	}

	if (
		(message.channel.name && message.channel.name.toLowerCase().includes('bread')) ||
		message.channel.name.toLowerCase().includes('🍞')
	) {
		if (process.env.messagecollectionbydefault == 'true') {
			collector = message.createReactionCollector(filter, { time: 1500 });

			collector.on('end', collected => {
				for (var [key, value] of collected) {
					for (var [key2, value2] of value.users)
						if (value2.bot == false) {
							UserId = value2.id
							var json = JSON.parse(fs.readFileSync('./data/' + message.channel.id + '.json'));


							if (json[UserId] === undefined) {
								json[UserId] = 1;
								console.log('oofs')
								userData = JSON.stringify(json)
								fs.writeFileSync('./data/' + message.channel.id + '.json', userData)
							}
							else {
								json[UserId] = json[UserId] + 1
								console.log(json)
								userData = JSON.stringify(json)
								fs.writeFileSync('./data/' + message.channel.id + '.json', userData)
							}
						}

				}
			})
		}
		if (message.author.id !== breadBot.user.id)
			if (message.content.startsWith('🍞board')) {
				if (message.content.includes('-start')) {
					messagecollection = true
					message.channel.send("started collection")
				}
				else {
					var json = JSON.parse(fs.readFileSync('./data/' + message.channel.id + '.json'))
					for (i = 1; i < process.env.amountonleaderboard; i++) {

					}
					message.channel.send()
				}
			}
			else if (
				message.author.username.includes('🇫🇷') ||
				(message.member.nickname && message.member.nickname.includes('🇫🇷')) && (message.author.id !== breadBot.user.id)
			) {
				message.react('🥖');
			} else if (message.author.id !== breadBot.user.id) {
				message.react('🍞');
			}
	}
});


breadBot.login(process.env.discord_token);
