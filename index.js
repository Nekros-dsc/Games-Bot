const { REST, Routes, Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { Guilds, GuildMessages, GuildMembers, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, GuildMembers, MessageContent] });
const fs = require('node:fs');
const chalk = require('chalk')
const { bot, minigame } = require('./config.json')

client.on('interactionCreate', (interaction) => {
    const { TwoZeroFourEight, Connect4, FindEmoji, Hangman, Minesweeper, RockPaperScissors, Snake, TicTacToe, Trivia, Wordle, WouldYouRather } = require('discord-gamecord');
    if(interaction.commandName == '2048') {
        const Game = new TwoZeroFourEight({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: '2048',
              color: minigame.embedColor
            },
            emojis: {
              up: '⬆️',
              down: '⬇️',
              left: '⬅️',
              right: '➡️',
            },
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            playerOnlyMessage: 'Seul {player} peut utiliser ces boutons.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {

            const embed = new EmbedBuilder()
            .setColor(minigame.embedColor)
            .setTitle('Game Result')
            .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
            .setDescription(`**User**: <@${result.player.id}>`)
            .addFields(
                { name: 'Result', value: `${result.result}`, inline: true },
                { name: 'Score', value: `${result.score}`, inline: true },
            )

            interaction.channel.send({ embeds: [embed] })
          });
    }
    
    if(interaction.commandName == 'connect') {
        const Game = new Connect4({
            message: interaction,
            isSlashGame: true,
            opponent: interaction.options.getUser('user'),
            embed: {
              title: 'Connect 4 Game',
              statusTitle: 'Status',
              color: minigame.embedColor
            },
            emojis: {
              board: '⚪',
              player1: '🔴',
              player2: '🟡'
            },
            mentionUser: true,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            turnMessage: '{emoji} | C\'est au tour du joueur **{player}**.',
            winMessage: '{emoji} | **{player}** a remporté le jeu Connect4.',
            tieMessage: 'Le match était nul ! Personne n’a gagné !',
            timeoutMessage: 'Le jeu est resté inachevé! Personne n’a gagné le jeu!',
            playerOnlyMessage: 'Seuls {player} et {opponent} peuvent utiliser ces boutons.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {
            interaction.channel.send(`<@${result.winner}> gagné le match de <@${result.player.id}> v/s <@${result.opponent.id}>`)
          });
    }

    if(interaction.commandName == 'find') {
        const Game = new FindEmoji({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Find Emoji',
              color: minigame.embedColor,
              description: 'Rappelez-vous les émojis du tableau ci-dessous.',
              findDescription: 'Trouvez l’emoji {emoji} avant la fin du temps.'
            },
            timeoutTime: 60000,
            hideEmojiTime: 5000,
            buttonStyle: 'PRIMARY',
            emojis: ['🍉', '🍇', '🍊', '🍋', '🥭', '🍎', '🍏', '🥝'],
            winMessage: 'Vous avez gagné! Vous avez sélectionné le bon emoji. {emoji}',
            loseMessage: 'Vous avez perdu! Vous avez choisi le mauvais emoji. {emoji}',
            timeoutMessage: 'Vous avez perdu! Vous avez manqué de temps. L’emoji est {emoji}',
            playerOnlyMessage: 'Seuls {player} peuvent utiliser ces boutons.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {
            if(result.result == 'lose') {
                interaction.channel.send(`<@${result.player.id}> vous avez perdu! L’emoji était ${result.correctEmoji}, mais tu as choisi ${result.selectedEmoji}`)
            }
            if(result.result == 'win') {
                interaction.channel.send(`<@${result.player.id}> vous avez gagné! Vous avez choisi l’emoji correctement.`)
            }
          });
    }

    if(interaction.commandName == 'hangman') {
        const category = ['nature', 'sport', 'color', 'camp', 'fruit', 'discord', 'winter', 'pokemon'];
        const random = Math.floor(Math.random() * category.length);

        const Game = new Hangman({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Hangman',
              color: minigame.embedColor
            },
            hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
            // customWord: 'subscribe',
            timeoutTime: 60000,
            theme: category[random],
            winMessage: 'Vous avez gagné! Le mot était **{word}**.',
            loseMessage: 'Vous avez perdu! Le mot était **{word}**.',
            playerOnlyMessage: 'Seul {player} peut utiliser ces boutons.'
          });
          
          Game.startGame();
    }

    if(interaction.commandName == 'minesweeper') {
        const Game = new Minesweeper({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Minesweeper',
              color: minigame.embedColor,
              description: 'Cliquez sur les boutons pour afficher les blocs sauf les mines.'
            },
            emojis: { flag: '🚩', mine: '💣' },
            mines: 5,
            timeoutTime: 60000,
            winMessage: 'Vous avez gagné le jeu! Vous avez réussi à éviter toutes les mines.',
            loseMessage: 'Vous avez perdu le jeu! Beaware des mines la prochaine fois.',
            playerOnlyMessage: 'Seul {player} peut utiliser ces boutons.'
          });
          
          Game.startGame();
    }

    if(interaction.commandName == 'rock') {
        const Game = new RockPaperScissors({
            message: interaction,
            isSlashGame: true,
            opponent: interaction.options.getUser('user'),
            embed: {
              title: 'Rock Paper Scissors',
              color: minigame.embedColor,
              description: 'Appuyez sur un bouton ci-dessous pour faire un choix.'
            },
            buttons: {
              rock: 'Rock',
              paper: 'Paper',
              scissors: 'Scissors'
            },
            emojis: {
              rock: '🌑',
              paper: '📰',
              scissors: '✂️'
            },
            mentionUser: true,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            pickMessage: 'Vous choisissez {emoji}.',
            winMessage: '**{player}** a remporté le match! Félicitations!',
            tieMessage: 'Le match était nul! Personne n’a gagné le match!',
            timeoutMessage: 'Le jeu est resté inachevé! Personne n’a gagné le jeu!',
            playerOnlyMessage: 'Seuls {player} et {opponent} peuvent utiliser ces boutons.'
          });
          
          Game.startGame();
    }

    if(interaction.commandName == 'snake') {
        const Game = new Snake({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Snake Game',
              overTitle: 'Game Over',
              color: minigame.embedColor
            },
            emojis: {
              board: '⬛',
              food: '🍎',
              up: '⬆️', 
              down: '⬇️',
              left: '⬅️',
              right: '➡️',
            },
            snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
            foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
            stopButton: 'Stop',
            timeoutTime: 60000,
            playerOnlyMessage: 'Seuls {player} peuvent utiliser ces boutons.'
          });

          Game.startGame();
    }

	if(interaction.commandName == 'help') {
		const embed = new EmbedBuilder()
		.setColor(minigame.embedColor)
		.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({dynamic: true}) })
		.setTitle(`${client.user.username} Minigames`)
		.setDescription(`Amusez-vous avec quelques mini-jeux fournis par **${client.user.username}**. Ce bot contient plus de 10 mini-jeux et il est convivial pour les débutants. Vous pouvez aussi jouer à des mini-jeux avec vos amis discords!`)
		.addFields(
			{ name: 'Commands', value: '`2048`, `connect 4`, `find the emoji`, `hangman`, `minesweeper`,`rock paper scissors`, `snake`, `tic tac toe`, `trivia`, `wordle`, `would you rather`' }
		)
		.setTimestamp()

		interaction.reply({ embeds: [embed] })
	}

    if(interaction.commandName == 'tic') {
        const Game = new TicTacToe({
            message: interaction,
            isSlashGame: true,
            opponent: interaction.options.getUser('user'),
            embed: {
              title: 'Tic Tac Toe',
              color: minigame.embedColor,
              statusTitle: 'Status',
              overTitle: 'Game Over'
            },
            emojis: {
              xButton: '❌',
              oButton: '🔵',
              blankButton: '➖'
            },
            mentionUser: true,
            timeoutTime: 60000,
            xButtonStyle: 'DANGER',
            oButtonStyle: 'PRIMARY',
            turnMessage: '{emoji} | Son tour de joueur **{player}**.',
            winMessage: '{emoji} | **{player}** a gagné le jeu TicTacToe.',
            tieMessage: 'Le match était nul! Personne n’a gagné le match!',
            timeoutMessage: 'Le jeu est resté inachevé! Personne n’a gagné le jeu!',
            playerOnlyMessage: 'Seuls {player} et {opponent} peuvent utiliser ces boutons.'
          });
          
          Game.startGame();
    }

    if(interaction.commandName == 'trivia') {
      const Game = new Trivia({
		message: interaction,
		isSlashGame: true,
        embed: {
          title: 'Trivia',
          color: minigame.embedColor,
          description: 'Vous avez 60 secondes pour deviner la réponse.'
        },
        timeoutTime: 60000,
        buttonStyle: 'PRIMARY',
        trueButtonStyle: 'SUCCESS',
        falseButtonStyle: 'DANGER',
        mode: 'multiple',  // multiple || single
        difficulty: 'medium',  // easy || medium || hard
        winMessage: 'Vous avez gagné! La bonne réponse est {answer}.',
        loseMessage: 'Vous avez perdu! La bonne réponse est {answer}.',
        errMessage: 'Impossible de récupérer les données des questions ! Veuillez réessayer.',
        playerOnlyMessage: 'Seul {player} peut utiliser ces boutons.'
      });

      Game.startGame();
    }

    if(interaction.commandName == 'wordle') {
      const Game = new Wordle({
		message: interaction,
		isSlashGame: true,
        embed: {
          title: 'Wordle',
          color: minigame.embedColor,
        },
        customWord: null,
        timeoutTime: 60000,
        winMessage: 'Vous avez gagné! Le mot était **{word}**.',
        loseMessage: 'Vous avez perdu! Le mot était **{word}**.',
        playerOnlyMessage: 'Seul {player} peut utiliser ces boutons.'
      });
      
      Game.startGame();
    }

    if(interaction.commandName == 'would') {
		const Game = new WouldYouRather({
			message: interaction,
			isSlashGame: true,
			embed: {
			  title: 'Would You Rather',
			  color: minigame.embedColor,
			},
			buttons: {
			  option1: 'Option 1',
			  option2: 'Option 2',
			},
			timeoutTime: 60000,
			errMessage: 'Impossible de récupérer les données des questions ! Veuillez réessayer.',
			playerOnlyMessage: 'Seul {player} peut utiliser ces boutons.'
		  });
		  
		  Game.startGame();
    }
})

client.on('ready', (client) => {
    const commands = [];
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON());
    }
    
    const rest = new REST({ version: '10' }).setToken(client.login);
    
    (async () => {
        try {
            const data = await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        } catch (error) {
            
        }
    })();
});

client.on('ready', (client) => {
    console.log(
        `🔆  [` +
        chalk.yellow.bold(`Login`) +
        `]` + `      | ` + `Logged in as ` +
        chalk.green.bold(`${client.user.tag}`)
        );

    console.log(
        `🔆  [` +
        chalk.yellow.bold(`Invite`) +
        `]` + `     | ` + `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`
        );

    console.log(
        `🔆  [` +
        chalk.yellow.bold(`Info`) +
        `]` + `       | ` + `Go join Nova World ^^ ` +
        chalk.red.bold('SUBSCRIBE') + ` to ` +
        chalk.white.bold('Made By') + chalk.red.bold('Nekros-dsc on github')
        );
});

process.on("unhandledRejection", (reason, p) => {

    console.log(chalk.gray("—————————————————————————————————"));
    console.log(
       chalk.white("["),
       chalk.red.bold("AntiCrash 1"),
       chalk.white("]"),
       chalk.gray(" : "),
       chalk.white.bold("Unhandled Rejection/Catch")
    );
    console.log(chalk.gray("—————————————————————————————————"));
    console.log(reason, p);
  
});
process.on("uncaughtException", (err, origin) => {

    console.log(chalk.gray("—————————————————————————————————"));
    console.log(
       chalk.white("["),
       chalk.red.bold("AntiCrash2"),
       chalk.white("]"),
       chalk.gray(" : "),
       chalk.white.bold("Uncaught Exception/Catch")
    );
    console.log(chalk.gray("—————————————————————————————————"));
    console.log(err, origin);
  
});

client.login("Put-Token-Here");