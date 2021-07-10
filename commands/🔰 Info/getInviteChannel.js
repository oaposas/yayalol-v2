const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton } = require('discord-buttons')
module.exports = {
  name: "getinvitechannel",
  category: "🔰 Info",
  usage: "getinvitechannel",
  description: "Gives you an Invite link for an Channel",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let Channel = message.mentions.channels.first()
      if(!Channel) Channel = await client.channels.fetch(args[0])
      if(!Channel) return message.reply("You didn't provided a Channel")
      let msg = await client.getInvite(Channel.id)
      message.channel.send(msg);
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}
