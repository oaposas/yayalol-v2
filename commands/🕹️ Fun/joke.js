const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const got = require("got");
const path = require("path");
module.exports = {
  name: path.parse(__filename).name,
  category: "🕹️ Fun",
  useage: `${path.parse(__filename).name}[@User]`,
  description: "*Image cmd in the style:* " + path.parse(__filename).name,
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "FUN")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
    try {
      got("https://www.reddit.com/r/jokes/random/.json")
        .then((response) => {
          let content = JSON.parse(response.body);
          var title = content[0].data.children[0].data.title;
          var joke = content[0].data.children[0].data.selftext;
          let jokeembed = new MessageEmbed()
          .setDescription(joke)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setTitle(title)
          .setAuthor(`${client.user.username}|Joke`)
          .setTimestamp();
          return message.channel.send(jokeembed);
        })
        .catch((e) => console.log(String(e.stack).red));
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  },
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
