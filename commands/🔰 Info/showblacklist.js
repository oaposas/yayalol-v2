const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { swap_pages } = require("../../handlers/functions")
module.exports = {
  name: "showblacklist",
  category: "🔰 Info",
  aliases: ["blacklist", "blacklistedwords", "bwords"],
  cooldown: 2,
  usage: "showblacklist",
  description: "Shows all blacklisted Words!",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      return swap_pages(client, message, `${client.blacklist.get(message.guild.id, "words").map(word => `\`${word}\``).join(", ").split("`").join("\`")}`, `${message.guild.name} | Blacklisted Words`)
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
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
