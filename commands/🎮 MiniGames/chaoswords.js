const TicTacToe = require("discord-tictactoe");
const game = new TicTacToe()
module.exports = {
    name: "chaoswords",
    category: "🎮 MiniGames",
    description: "Plays a Game",
    usage: "chaoswords --> Play the Game",
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
        const { ChaosWords } = require("weky")
        var randomWords = require('random-words');
        const words = randomWords(2) // generating 2 words
        await new ChaosWords({
            message: message,
            maxTries: 5, //max number  of user's tries (ends when reach limit)
            charGenerated: 20, //length of sentence (small length might throw error)
            words: words, //words (array) => ['word']
            embedTitle: 'Chaos words!', //understable
            embedFooter: 'Find the words in the sentence!',
            embedColor: 'RANDOM'
            }).start()
    }
  }