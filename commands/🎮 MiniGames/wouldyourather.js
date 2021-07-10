const TicTacToe = require("discord-tictactoe");
const game = new TicTacToe()
module.exports = {
    name: "wouldyourather",
    aliases: ["wyr"],
    category: "🎮 MiniGames",
    description: "Would you Rather?",
    usage: "wouldyourather --> Play the Game",
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
        const { WouldYouRather } = require('weky')
        await WouldYouRather(message)
    }
  }