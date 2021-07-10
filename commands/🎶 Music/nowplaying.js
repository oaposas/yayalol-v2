const {
  MessageEmbed, MessageAttachment
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `nowplaying`,
  category: `🎶 Music`,
  aliases: [`np`, `current`],
  description: `Shows information about the current Song`,
  usage: `nowplaying`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    let es = client.settings.get(message.guild.id, "embed")
    try{
      //if no current song return error
      if (!player.queue.current)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> There is nothing playing`)
        );
        const data = {
          author: player.queue.current.author,
          title: player.playing ? `${emoji.msg.resume} ${player.queue.current.title}` : `${emoji.msg.pause} ${player.queue.current.title}`,
          start: Date.now() - player.position, 
          end: Date.now() + player.queue.current.duration - player.position,
          image: `https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`
      }
      const Nowplaying = require("../../handlers/canvas-nowplaying");
      const card = new Nowplaying()
      .setStartTimestamp(data.start)
      .setEndTimestamp(data.end)
      .setAuthor(data.author)
      .setImage(data.image)
      .setTitle(data.title)
      .setFormat(true)
      .setProgressBar("BAR", "#2E90FF")
      const image = await card.build()
      var attachment = new MessageAttachment(image, "nowplaying.png");
        
      //Send Now playing Message
      return message.channel.send(new MessageEmbed()
        .setAuthor(`Current song playing:`, "https://cdn.discordapp.com/emojis/859459305152708630.gif?v=1")
        .setImage("attachment://nowplaying.png").attachFiles(attachment)
        .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
        .setURL(player.queue.current.uri)
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`${player.playing ? `${emoji.msg.resume}` : `${emoji.msg.pause}`} **${player.queue.current.title}**`)
        .addField(`${emoji.msg.time} Duration: `, `\`${format(player.queue.current.duration).split(" | ")[0]}\` | \`${format(player.queue.current.duration).split(" | ")[1]}\``, true)
        .addField(`${emoji.msg.song_by} Song By: `, `\`${player.queue.current.author}\``, true)
        .addField(`${emoji.msg.repeat_mode} Queue length: `, `\`${player.queue.length} Songs\``, true)
        
        .setFooter(`Requested by: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
          dynamic: true
        }))
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
