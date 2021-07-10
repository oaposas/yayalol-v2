
module.exports = {
    name: "rockpaperscissors",
    aliases: ["rpc"],
    category: "🎮 MiniGames",
    description: "Allows you to play a Game of Rock Paper Scissors",
    usage: "rockpaperscissors --> Play the Game",
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
        const opponent = message.mentions.users.first();
        if (!opponent) return message.channel.send(`<:no:833101993668771842> **Please mention who you want to challenge at tictactoe.**`);
        const { RPS } = require('weky')
        const game = new RPS({
            message: message,
            opponent: opponent, // NOT CHANGEABLE
            challenger: message.author, // NOT CHANGEABLE
            acceptMessage: "Click to fight with <@" + message.author + '> at RPS!', // message sent to see if opponent accepts
        })
        game.start() // start the game
    }
  }