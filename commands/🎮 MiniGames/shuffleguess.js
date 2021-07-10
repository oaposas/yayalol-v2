const TicTacToe = require("discord-tictactoe");
const game = new TicTacToe()
module.exports = {
    name: "shuffleguess",
    aliases: ["sg"],
    category: "🎮 MiniGames",
    description: "Allows you to play a Game1",
    usage: "shuffleguess --> Play the Game",
    run: async (client, message, args, cmduser, text, prefix) => {
        let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "MINIGAMES")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
        var randomWords = require('random-words');
        const word = randomWords();

        const { ShuffleGuess } = require('weky');
        const game = new ShuffleGuess({
                    message: message,
                    word: word, // or a simple word
                    winMessage: "GG you won!", // message sent when user's message matches with the word
                    colorReshuffleButton: 'green', // color of the reshuffle button (regen)
                    messageReshuffleButton: 'reshuffle', // text of the reshuffle button (regen)
                    colorCancelButton: 'red', // color of the cancel button (exit, quit, stop)
                    messageCancelButton: 'cancel', // text of the cancel button
                    client: client
        });
        game.start(); // start da game
    }
  }