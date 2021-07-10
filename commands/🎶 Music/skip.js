const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const { autoplay } = require("../../handlers/functions");
module.exports = {
    name: "forceskip",
    category: "🎶 Music",
    aliases: ["fs"],
    description: "Forces to skip the current song",
    usage: "forceskip",
    run: async (client, message, args, cmduser, text, prefix) => {
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
      //get the channel instance from the Member
      const { channel } = message.member.voice;
      //if the member is not in a channel, return
      if (!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle("<:no:833101993668771842> You need to join a voice channel.")
        );
      //get the player instance
      const player = client.manager.players.get(message.guild.id);
      //if no player available return error | aka not playing anything
      if (!player)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle("<:no:833101993668771842> There is nothing playing")
        );
      //if not in the same channel as the player, return Error
      if (channel.id !== player.voiceChannel)
        return message.channel.send(new MessageEmbed()
          .setFooter(es.footertext, es.footericon)
          .setColor(es.wrongcolor)
          .setTitle("<:no:833101993668771842> You need to be in my voice channel to use this command!")
          .setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
        );
      //if ther is nothing more to skip then stop music and leave the Channel
      if (player.queue.size == 0) {
        //if its on autoplay mode, then do autoplay before leaving...
        if(player.get("autoplay")) return autoplay(client, player, "skip");
        //stop playing
        player.destroy();
        //send success message
        return message.channel.send(new MessageEmbed()
          .setTitle("<a:yes:833101995723194437> ⏹ Stopped and left your Channel")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
        );
      }
      //skip the track
      player.stop();
      //send success message
      return message.channel.send(new MessageEmbed()
        .setTitle("<a:yes:833101995723194437> ⏭ Skipped to the next Song")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
      );
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
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
