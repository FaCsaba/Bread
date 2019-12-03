const Discord = require('discord.js');
const fs = require('fs');
require('@exan/envreader').load()

let breadBot = new Discord.Client();


const reactiontimeinminutes = process.env.timebeforereactioncount * 1000 * 60;
amountOfPeopleOnTheLeaderboard = process.env.amountonleaderboard

function createLeaderBoard(json, message) {
	leaderboard = new Discord.RichEmbed().setTitle('The breadest of them all!');
	var sortedArray = [];
	for (var i in json) {
		sortedArray.push([i, json[i]]);
	}
	sortedArray = sortedArray.sort(function (a, b) { return b[1] - a[1] });

	if (amountOfPeopleOnTheLeaderboard > Object.keys(json).length) {
		amountOfPeopleOnTheLeaderboard = Object.keys(json).length
	}
	for (i = 0; i < amountOfPeopleOnTheLeaderboard; i++) {
		userId = sortedArray[i][0]
		breadPoints = sortedArray[i][1]

		message.guild.fetchMember(userId.toString()).then(guildMember => {
			if (i = 1) {
				emoji = '🥇'
			} else if (i = 2) {
				emoji = '🥈'
			} else if (i = 3) {
				emoji = '🥉'
			} else {
				emoji = ''
			}
			name = guildMember.displayName

			leaderboard.addField(emoji, name, true)
			leaderboard.addField('With:', breadPoints + ' amount of bread', true)
			message.channel.send(leaderboard)
		})

	}

};



breadBot.on('error', (e) => { });

breadBot.on('message', (message) => {
	filter = (reaction, user) => {
		if (user.id != message.author.id) {
			return
		}
		return (reaction.emoji.name === '🍞' || reaction.emoji.name === '🥖' && (user.id != message.author.id)) //needs test with multiple people
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

			message.awaitReactions(filter, { Max: 999999, time: reactiontimeinminutes }).then(reactions => {
				for (var [key, value] of reactions) {
					for (var [key2, value2] of value.users) {
						if (value2.bot == false) {
							UserId = value2.id
							var json = JSON.parse(fs.readFileSync('./data/' + message.channel.id + '.json'));


							if (json[UserId] === undefined) {
								json[UserId] = 1;
								userData = JSON.stringify(json)
								fs.writeFileSync('./data/' + message.channel.id + '.json', userData)
							}
							else {
								json[UserId] = json[UserId] + 1
								userData = JSON.stringify(json)
								fs.writeFileSync('./data/' + message.channel.id + '.json', userData)
							}
						}
					}
				}
			})





		}
		if (message.author.id !== breadBot.user.id)
			if (message.content.startsWith('🍞board') || message.content.startsWith('breadboard')) {
				if (message.content.includes('-start')) {
					messagecollection = true
					message.channel.send("started collection")
				}
				if (message.content.includes('-stop')) {
					messagecollection = true
					message.channel.send("collection stopped")
				}
				if (message.content.includes('-h')) {
					messagecollection = true
					message.channel.send("**b r e a d** \nPrints the amount of bread you have collected")
				}
				else {
					var json = JSON.parse(fs.readFileSync('./data/' + message.channel.id + '.json'))

					createLeaderBoard(json, message)

				}
			}
			else if (
				message.author.username.includes('🇫🇷') ||
				(message.member.nickname && message.member.nickname.includes('🇫🇷')) && (message.author.id !== breadBot.user.id)
			) {
				message.react('🥖');
			} else if (message.author.id !== breadBot.user.id) {
				message.react('🥖');
			}
	}
});


breadBot.login(process.env.discord_token);
