const { MessageEmbed } = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "bank",
  category: "💸 Economy",
  description: "Lets you check how much money you have",
  usage: "bank [@USER]",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if (!client.settings.get(message.guild.id, "ECONOMY")) {
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
        .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
      );
    }
    try {
      //command
      var user;
      if (args[0]) {
        try {
          user = await GetUser(message, args)
        } catch (e) {
          if (!e) return message.reply("UNABLE TO FIND THE USER")
          return message.reply(e)
        }
      } else {
        user = message.author;
      }
      if (!user || user == null || user.id == null || !user.id) user = message.author
      if (user.bot) return message.reply("<:no:833101993668771842> **A Discord Bot can not have Economy!**")
      //ensure the economy data
      ensure_economy_user(client, message.guild.id, user.id)
      //get the economy data 
      const data = client.economy.get(`${message.guild.id}-${user.id}`)
      var items = 0;
      var itemsvalue = 0;
      for (const itemarray in data.items) {
        items += data.items[`${itemarray}`];
        var prize = 0;
        switch (itemarray.toLowerCase()) {
          case "yacht": prize = 75000; break;
          case "lamborghini": prize = 50000; break;
          case "car": prize = 6400; break;
          case "motorbike": prize = 1500; break;
          case "bicycle": prize = 500; break;

          case "nike": prize = 300; break;
          case "tshirt": prize = 60; break;

          case "mansion": prize = 45000; break;
          case "house": prize = 8000; break;
          case "dirthut": prize = 150; break;

          case "pensil": prize = 20; break;
          case "pen": prize = 10; break;
          case "condom": prize = 30; break;
          case "bottle": prize = 50; break;

          case "fish": prize = 1000; break;
          case "hamster": prize = 1500; break;
          case "dog": prize = 2000; break;
          case "cat": prize = 2000; break;
        }
        itemsvalue += prize * data.items[`${itemarray}`];
      }
      //return some message!
      return message.reply(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setTitle(`👛 **${user == message.author ? "You" : user.username}** ${user == message.author ? "have" : "has"} \`${nFormatter(Math.floor(data.balance))} 💸\` in ${user == message.author ? "your " : "his/her"} Pocket`)
        .setDescription(`**🏦 ${user == message.author ? "You" : user.username} ${user == message.author ? "have" : "has"} \`${nFormatter(data.bank)} 💸\` in ${user == message.author ? "your " : "his/her"} Bank Account**\n\n🧸 **${user == message.author ? "You" : user.username} ${user == message.author ? "have" : "has"} \`${nFormatter(items)} Items\` with a value of: \`${nFormatter(itemsvalue)} 💸\`**${items > 0 ? `\n\n**To see ${user == message.author ? "your " : "his/her"} Items, type:**\n\`${prefix}items${user == message.author ? "" : " " + user}\`` : ""}`)
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
