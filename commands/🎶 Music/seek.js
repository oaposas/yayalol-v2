const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `seek`,
  category: `🎶 Music`,
  aliases: [`vol`],
  description: `Changes the position(seek) of the Song`,
  usage: `seek <Duration in Seconds>`,
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
    try{
      //if number is out of range return error
      if (Number(args[0]) < 0 || Number(args[0]) >= player.queue.current.duration / 1000)
        return message.channel.send(new MessageEmbed()
          .setFooter(es.footertext, es.footericon)
          .setColor(es.wrongcolor)
          .setTitle(`<:no:833101993668771842> You may seek from \`0\` - \`${player.queue.current.duration}\``)
        );
      //seek to the position
      player.seek(Number(args[0]) * 1000);
      //send success message
      return message.channel.send(new MessageEmbed()
        .setTitle(`<a:yes:833101995723194437> Seeked song to: ${format(Number(args[0]) * 1000)}`)
        .addField(`${emoji.msg.time} Progress: `, createBar(player))
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
