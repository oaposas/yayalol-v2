const {
  MessageEmbed
} = require(`discord.js`)
const config = require(`../../botconfig/config.json`)
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `jump`,
  category: `🎶 Music`,
  aliases: [`skipto`],
  description: `Skips to a specific Track`,
  usage: `skipto <Trackindex>`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "MUSIC")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
    try {
      //if no args send error plus example
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setFooter(es.footertext, es.footericon)
          .setColor(es.wrongcolor)
          .setTitle(`<:no:833101993668771842> Please include to which track you want to jump`)
          .setDescription(`Example: \`jump ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
        );
      //if userinput is not a Number
      if (isNaN(args[0]))
        return message.channel.send(new MessageEmbed()
          .setFooter(es.footertext, es.footericon)
          .setColor(es.wrongcolor)
          .setTitle(`<:no:833101993668771842> It has to be a queue **Number**`)
        );
      //if the wished track is bigger then the Queue Size
      if (Number(args[0]) > player.queue.size)
        return message.channel.send(new MessageEmbed()
          .setFooter(es.footertext, es.footericon)
          .setColor(es.wrongcolor)
          .setTitle(`<:no:833101993668771842> That song is not in the queue, sorry!`)
        );
      //remove all tracks to the jumped song
      player.queue.remove(0, Number(args[0]) - 1);
      //stop the player
      player.stop()
      //Send Success Message
      return message.channel.send(new MessageEmbed()
        .setTitle(`<a:yes:833101995723194437> Jumped to the: \`${args[0]}\` Song`)
        .setDescription(`${emoji.msg.skip_track} Skipped \`${Number(args[0])}\` Songs`)
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> An error occurred`)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
