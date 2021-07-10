const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
module.exports = {
  name: "enlarge",
  aliases: ["enlargeemoji"],
  category: "🔰 Info",
  description: "Make the Emoji, just larger",
  usage: "enlarge <EMOJI>",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let hasEmoteRegex = /<a?:.+:\d+>/gm
      let emoteRegex = /<:.+:(\d+)>/gm
      let animatedEmoteRegex = /<a:.+:(\d+)>/gm

      if(!message.content.match(hasEmoteRegex))
      return message.reply("<:no:833101993668771842> Your message does not include a VALID Emoji, please retry by adding a guild specific emoji!")
      if (emoji = emoteRegex.exec(message)) {
        let url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1"
        let attachment = new Discord.MessageAttachment(url, "emoji.png")
        message.channel.send(attachment)
      }
      else if (emoji = animatedEmoteRegex.exec(message)) {
        let url2 = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1"
        let attachment2 = new Discord.MessageAttachment(url2, "emoji.gif")
        message.channel.send(attachment2);
      }
      else {
        message.channel.send("Couldn't find an emoji to paste! if it's uniced(standard) and not a guild Emoji, it's not possible!")
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> ERROR | An error occurred`)
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
