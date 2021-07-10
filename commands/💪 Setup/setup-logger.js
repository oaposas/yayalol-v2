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
  name: "setup-logger",
  category: "💪 Setup",
  aliases: ["setuplogger", "logger-setup", "loggersetup", "setup-auditlog"],
  cooldown: 5,
  usage: "setup-logger  -->  Follow Steps",
  description: "Enable/Disable the Logger / Audit log System",
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
          .setDescription(`1️⃣ **== \`✔️ Enable\` / Setup** the Logger System\n\n2️⃣ **== \`❌ Disable\`** the Logger System\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
        )
        try {
          tempmsg.react("1️⃣")
          tempmsg.react("2️⃣")
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
            if (reaction.emoji.name === "1️⃣") temptype = "channel"
            else if (reaction.emoji.name === "2️⃣") temptype = "disable"
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

        if (temptype == "channel") {
  
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle("Which Channel do you wanna use?")
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`Please Ping the Channel now!`)
            .setFooter(es.footertext, es.footericon)
          })
          await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(collected => {
              var message = collected.first();
              var channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
              if (channel) {
                try {
                  client.settings.set(message.guild.id, channel.id, "logger.channel");
                  client.settings.set(message.guild.id, "", "logger.webhook_id");
                  client.settings.set(message.guild.id, "", "logger.webhook_token");
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(`<a:yes:833101995723194437> I will now send all logs into: \`${channel.name}\``)
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setFooter(es.footertext, es.footericon)
                  );
                } catch (e) {
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                    .setColor(es.wrongcolor)
                    .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                    .setFooter(es.footertext, es.footericon)
                  );
                }
              } else {
                throw "you didn't ping a valid Channel"
              }
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
  
        } else if (temptype == "disable") {
          try {
            client.settings.set(message.guild.id, "no", "logger.channel");
            return message.reply(new Discord.MessageEmbed()
              .setTitle(`<a:yes:833101995723194437> Disabled Logger, I wont log anything anymore`)
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setFooter(es.footertext, es.footericon)
            );
          } catch (e) {
            return message.reply(new Discord.MessageEmbed()
              .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
              .setColor(es.wrongcolor)
              .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
              .setFooter(es.footertext, es.footericon)
            );
          }
        } else {
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | PLEASE CONTACT `Tomato#6966`")
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
          );
        }
  
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
