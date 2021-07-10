const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
module.exports = {
  name: "toggledm",
  aliases: ["toggledmmessage", "toggledmmsg"],
  category: "⚙️ Settings",
  description: "Toggles if the Bot should send you dm messages",
  usage: "toggledm",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {

      client.settings.set(message.author.id, !client.settings.get(message.author.id, "dm"), `dm`);
      return message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.author.id, "dm") ? "Enabled": "Disabled"} Dm messages`)
        .setDescription(`${client.settings.get(message.author.id, "dm") ? "I will now send you DMS after the COMMANDS, if needed" : "I will not send you DMS after the COMMANDS"}`.substr(0, 2048))
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
