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
  name: `rewind`,
  category: `🎶 Music`,
  aliases: [`seekbackwards`, `rew`],
  description: `Seeks a specific amount of Seconds backwards`,
  usage: `rewind <Duration in Seconds>`,
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

      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(`<:no:833101993668771842> You may rewind for \`1\` - \`${player.queue.current.duration}\``)
        );
      let seektime = player.position - Number(args[0]) * 1000;
      if (seektime >= player.queue.current.duration - player.position || seektime < 0) {
        seektime = 0;
      }
      //seek to the right time
      player.seek(Number(seektime));
      //send success message
      return message.channel.send(new MessageEmbed()
        .setTitle(`<a:yes:833101995723194437> ${emoji.msg.rewind} Rewinded the song for \`${args[0]} Seconds\` to: ${format(Number(player.position))}`)
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
