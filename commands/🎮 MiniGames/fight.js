const TicTacToe = require("discord-tictactoe");
const game = new TicTacToe()
module.exports = {
    name: "fight",
    aliases: ["battle"],
    category: "🎮 MiniGames",
    description: "Plays a Fight with some1",
    usage: "fight --> Play the Game",
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
        if (!opponent) return message.channel.send(`<:no:833101993668771842> **Please mention who you want to fight**`);
        const { fight } = require('weky');
        const battle = new fight({
            client: client,
            message: message,
            acceptMessage: 'Click to fight with <@' + message.author + '>', //message sent to see if opponent accepts
            challenger: message.author, // NOT CHANGEABLE
            opponent: opponent,  // NOT CHANGEABLE
            hitButtonText: 'HIT', // Hit button text (Custom)
            hitButtonColor: 'red', // Hit button color (Custom)
            healButtonText: 'HEAL', // Heal button text (Custom)
            healButtonColor:  'green', // Heal button color (Custom)
            cancelButtonText: 'CANCEL', // Cancel button text (Custom)
            cancelButtonColor: 'blurple', // Cancel button color (Custom)
        });
        battle.start(); // start da battle
    }
  }