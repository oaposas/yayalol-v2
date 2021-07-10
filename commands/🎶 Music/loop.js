const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `loop`,
  category: `🎶 Music`,
  aliases: [`repeat`, `l`],
  description: `Repeats the current song`,
  usage: `loopsong`,
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
      //if no args send error
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> Please add your method!`)
          .setDescription(`\`loop song\` / \`loop queue\``)
        );
      //if arg is somehow song / track
      if (args[0].toLowerCase() === `song` || args[0].toLowerCase() === `track` || args[0].toLowerCase() === `s` || args[0].toLowerCase() === `t`) {
        //Create the Embed
        let embed = new MessageEmbed()
          .setTitle(`<a:yes:833101995723194437> ${emoji.msg.repeat_mode} Changed Track loop to: ${player.trackRepeat ? `${emoji.msg.disabled} disabled` : `${emoji.msg.enabled} active`}`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
        //If Queue loop is enabled add embed info + disable it
        if (player.queueRepeat) {
          embed.setDescription(`And **Queue** Repeat got **${emoji.msg.disabled} disabled**`);
          player.setQueueRepeat(false);
        }
        //toggle track repeat to the reverse old mode
        player.setTrackRepeat(!player.trackRepeat);
        //Send Success Message
        return message.channel.send(embed)
      }
      //if input is queue
      else if (args[0].toLowerCase() === `queue` || args[0].toLowerCase() === `qu` || args[0].toLowerCase() === `q`) {
        //Create the Embed
        let embed = new MessageEmbed()
          .setTitle(`<a:yes:833101995723194437> ${emoji.msg.repeat_mode} Changed Queue loop to: ${player.queueRepeat ? `${emoji.msg.disabled} disabled` : `${emoji.msg.enabled} active`}`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
        //If Track loop is enabled add embed info + disable it
        if (player.trackRepeat) {
          embed.setDescription(`And **Song** Repeat got **${emoji.msg.disabled} disabled**`);
          player.setTrackRepeat(false);
        }
        //toggle queue repeat to the reverse old mode
        player.setQueueRepeat(!player.queueRepeat);
        //Send Success Message
        return message.channel.send(embed);
      }
      //if no valid inputs, send error
      else {
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> Please add your method!`)
          .setDescription(`\`loop song\` / \`loop queue\``)
        );
      }
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
