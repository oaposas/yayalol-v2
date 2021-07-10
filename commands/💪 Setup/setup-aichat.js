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
  name: "setup-aichat",
  category: "💪 Setup",
  aliases: ["setupaichat", "aichat-setup", "aichatsetup"],
  cooldown: 5,
  usage: "setup-aichat  -->  Follow the Steps",
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
        .setDescription(`> 1️⃣ **== \`✔️ Enable\` / Set** Poster-Channel\n\n> 2️⃣ **== \`✔️ Enable\`** aichat\n\n> 📑 **== \`Show Settings\`**\n\n**Note:**\n> *It will post only 1 Message every Minute*\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )

      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
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
          if (reaction.emoji.name === "1️⃣") temptype = "set"
          else if (reaction.emoji.name === "2️⃣") temptype = "disable"
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

      if(temptype == "set"){
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
        .setTitle("Which Channel do you wanna use?")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setDescription(`*Just ping the channel with #channel in the Chat*`).setFooter(es.footertext, es.footericon)
      })
      var thecmd;
      await tempmsg.channel.awaitMessages(m=>m.author.id == message.author.id, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(async collected => {
          var message = collected.first();
          if(!message) throw "NO MESSAGE SENT";
          let channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
          if(channel){
            client.settings.set(message.guild.id, channel.id, `aichat`)
            return message.reply(new Discord.MessageEmbed()
              .setTitle(`<a:yes:833101995723194437> The Channel: \`${channel.name}\` is now registered as the Ai-Chat`)
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setDescription(`Posting now, every Minute`.substr(0, 2048))
              .setFooter(es.footertext, es.footericon)
            );
          }
          else{
            throw "NO CHANNEL PINGED";
          }
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
      } else if (temptype == "disable") {
          client.settings.set(message.guild.id, "no", `aichat`)
          return message.reply(new Discord.MessageEmbed()
            .setTitle(`<a:yes:833101995723194437> Disabled the Ai-Chat`)
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`I will not send automatic NSFW Images to a Channel anymore`.substr(0, 2048))
            .setFooter(es.footertext, es.footericon)
          );
      } else if (temptype == "thesettings") {
        let thesettings = client.settings.get(message.guild.id, `aichat`)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(`📑 Settings of the Ai-Chat`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`**Channel:** ${thesettings == "no" ? "Not Setupped" : `<#${thesettings}> | \`${thesettings}\``}`.substr(0, 2048))
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