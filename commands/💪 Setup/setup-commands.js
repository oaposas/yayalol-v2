var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing
} = require(`../../handlers/functions`);
module.exports = {
  name: "setup-commands",
  category: "💪 Setup",
  aliases: ["setupcommands", "setup-command", "setupcommand"],
  cooldown: 5,
  usage: "setup-commands  -->  Follow the Steps",
  description: "Enable/Disable specific Commands",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    var es = client.settings.get(message.guild.id, "embed")
    try {
      var adminroles = client.settings.get(message.guild.id, "adminroles")

      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;

      tempmsg = await message.channel.send(new Discord.MessageEmbed()
        .setTitle("What do you want to do?")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setDescription(`1️⃣ **==** ${client.settings.get(message.guild.id, "MUSIC") ? "Disable Music Commands" : "Enable Music Commands"}
        
        2️⃣ **==** ${client.settings.get(message.guild.id, "FUN") ? "Disable Fun Commands" : "Enable Fun Commands"}

        3️⃣ **==** ${client.settings.get(message.guild.id, "ECONOMY") ? "Disable Economy Commands" : "Enable Economy Commands"}

        4️⃣ **==** ${client.settings.get(message.guild.id, "NSFW") ? "Disable NSFW Commands" : "Enable NSFW Commands"}

        5️⃣ **==** ${client.settings.get(message.guild.id, "SCHOOL") ? "Disable SCHOOL Commands" : "Enable SCHOOL Commands"}

        6️⃣ **==** ${client.settings.get(message.guild.id, "MINIGAMES") ? "Disable MINIGAMES Commands" : "Enable MINIGAMES Commands"}

        7️⃣ **==** ${client.settings.get(message.guild.id, "VOICE") ? "Disable Voice Commands" : "Enable Voice Commands"} (Join to Create)
        
        8️⃣ **==** ${client.settings.get(message.guild.id, "SOUNDBOARD") ? "Disable SOUNDBOARD Commands" : "Enable SOUNDBOARD Commands"}

        *React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )

      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("4️⃣")
        tempmsg.react("5️⃣")
        tempmsg.react("6️⃣")
        tempmsg.react("7️⃣")
        tempmsg.react("8️⃣")
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );
      }
      await tempmsg.awaitReactions(filter, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(collected => {
          var reaction = collected.first()
          reaction.users.remove(message.author.id)
          if (reaction.emoji.name === "1️⃣") temptype = "MUSIC"
          else if (reaction.emoji.name === "2️⃣") temptype = "FUN"
          else if (reaction.emoji.name === "3️⃣") temptype = "ECONOMY"
          else if (reaction.emoji.name === "4️⃣") temptype = "NSFW"
          else if (reaction.emoji.name === "5️⃣") temptype = "SCHOOL"
          else if (reaction.emoji.name === "6️⃣") temptype = "MINIGAMES"
          else if (reaction.emoji.name === "7️⃣") temptype = "VOICE"
          else if (reaction.emoji.name === "8️⃣") temptype = "SOUNDBOARD"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );

      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, temptype), temptype)
      return message.reply(new Discord.MessageEmbed()
        .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.guild.id, temptype) ? "Enabled" : "Disabled"} ${temptype} Commands`)
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
      );

    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> Something went Wrong`)
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