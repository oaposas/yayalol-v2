module.exports = {
    name: "tictactoe",
    aliases: ["ttt"],
    category: "🎮 MiniGames",
    description: "Allows you to play a Game of Tic Tac Toe",
    usage: "tictactoe --> Play the Game",
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
        const { TicTacToe } = require('weky')
        const game = new TicTacToe({
            message: message,
            opponent: opponent, // opponent
            xColor: 'red', // x's color
            oColor: 'blurple', //zero's color
            xEmoji: '❌',  //t he x emoji
            oEmoji: '⭕️' ,// the zero emoji
        })
        game.start()// start da game
        return;
    }
  }