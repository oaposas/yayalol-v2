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
  name: "setup-validcode",
  category: "💪 Setup",
  aliases: ["setupvalidcode", "validcode-setup", "validcodesetup"],
  cooldown: 5,
  usage: "setup-validcode  -->  Follow the Steps",
  description: "This Setup allows you to send logs into a specific Channel, when someone enters a the Command: report",
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
        .setTitle("What do you want to do? | REPORT LOG")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setDescription(`> 1️⃣ **== ${client.settings.get(message.guild.id, `validcode`) ? "`❌ Disable`" : "`✔️ Enable`"}** Valid Code System\n\n> 📑 **== \`Show Settings\`**\n\n**Note:**\n> *If someone sends a message with a valid code snippet in it, i will react with:* <a:Valid_Code_Developer:858405056238714930>\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )

      const d2p = (bool) => bool ? "`✔️ Enabled`" : "`❌ Disabled`"; 

      try {
        tempmsg.react("1️⃣")
        tempmsg.react("📑")
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle("<:no:833101993668771842> Missing Permission to add Reactions")
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``.substr(0, 2000))
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
          if (reaction.emoji.name === "1️⃣") temptype = "toggle"
          else if (reaction.emoji.name === "📑") temptype = "thesettings"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle("<:no:833101993668771842> Your Time ran out")
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );

        if(temptype == "toggle"){
          client.settings.set(message.guild.id, !client.settings.get(message.guild.id, `validcode`), `validcode`)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(`<a:yes:833101995723194437> The Valid Code Setup is now ${d2p(client.settings.get(message.guild.id, `validcode`))}!`)
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setFooter(es.footertext, es.footericon)
          );
        } else if (temptype == "thesettings") {
        let thesettings = client.settings.get(message.guild.id, `aichat`)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(`📑 Settings of the Valid Code Setup`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`${d2p(client.settings.get(message.guild.id, `validcode`))}`.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
        );
      } else {
        return message.reply(new Discord.MessageEmbed()
          .setTitle("<:no:833101993668771842> PLEASE CONTACT `Tomato#6966`")
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
        );
      }

    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> Something went Wrong`)
        .setDescription(`\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
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