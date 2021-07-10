var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing,
  edit_msg,
  send_roster
} = require(`../../handlers/functions`);
module.exports = {
  name: "setup-rank",
  category: "💪 Setup",
  aliases: ["setuprank", "rank-setup"],
  cooldown: 5,
  usage: "setup-rank --> Follow Steps",
  description: "Manage the Ranking System with stuff like channel, background, etc",
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
        .setDescription(`1️⃣ **== Set Channel** to send Level Up Messages\n\n2️⃣ **== Reply** with Level Up Messages\n\n3️⃣ **== Disable** Level Up Messages\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
      } catch (e) {
        return message.channel.send(new Discord.MessageEmbed()
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
          else if (reaction.emoji.name === "2️⃣") temptype = "reply"
          else if (reaction.emoji.name === "3️⃣") temptype = "disable"
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
                client.points.set(message.guild.id, channel.id, "channel")
                client.points.set(message.guild.id, false, "disabled")
                return message.channel.send(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> I will now send the Levelup Messages in \`${channel.name}\``)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.channel.send(new Discord.MessageEmbed()
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

      } else if (temptype == "reply") {
        try {
          client.points.set(message.guild.id, false, "channel")
          client.points.set(message.guild.id, false, "disabled")
          return message.channel.send(new Discord.MessageEmbed()
            .setTitle(`<a:yes:833101995723194437> I will now reply with the Levelup Messages`)
            .setDescription(`To disable them, type: \`${prefix}setup-rank disable\`To send them into a channel, type: \`${prefix}setup-rank channel #channel\``)
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setFooter(es.footertext, es.footericon)
          );
        } catch (e) {
          return message.channel.send(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
            .setFooter(es.footertext, es.footericon)
          );
        }
      } else if (temptype == "disable") {
        try {
          if (client.points.get(message.guild.id, "disabled")) return message.channel.send(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Level Up Messages are Already Disabled")
            .setColor(es.wrongcolor)
            .setDescription(`To enable them again type: \`${prefix}setup-rank reply\``)
            .setFooter(es.footertext, es.footericon)
          );
          client.points.set(message.guild.id, true, "disabled")
          return message.channel.send(new Discord.MessageEmbed()
            .setTitle(`<a:yes:833101995723194437> Disabled Levelup Messages`)
            .setDescription(`To enable them again type: \`${prefix}setup-rank reply\``)
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setFooter(es.footertext, es.footericon)
          );
        } catch (e) {
          return message.channel.send(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
            .setFooter(es.footertext, es.footericon)
          );
        }
      } else if (temptype == "setbg") {
        try {
          var url;
          tempmsg = await tempmsg.edit({embed: new MessageEmbed()
            .setColor(ee.color)
            .setTitle("Which Image should i Use?")
            .setDescription(`*Just Send the Url*`)
            .setFooter("Pick the INDEX NUMBER / send the IMAGE URl", ee.footericon)
            .setThumbnail(ee.footericon)}).then(msg => {
            msg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 30000,
              errors: ['time']
            }).then(collected => {
              if (collected.first().attachments.size > 0) {
                if (collected.first().attachments.every(attachIsImage)) {
                  client.setups.set(message.guild.id, url, "ranking.backgroundimage")
                  return message.channel.send(new Discord.MessageEmbed()
                    .setTitle(`<a:yes:833101995723194437> Successfully, set your Background Image!`)
                    .setDescription(`Please make sure to **not** delete your Image from the Channel!`)
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setFooter(es.footertext, es.footericon)
                  );
                } else {
                  return message.channel.send(new Discord.MessageEmbed()
                    .setTitle(`<:no:833101993668771842> ERROR | Could not your message as a backgroundimage`)
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                  );
                }
              } else if (collected.first().content.includes("https") || collected.first().content.includes("http")) {
                client.setups.set(message.guild.id, collected.first().content, "ranking.backgroundimage")
                return message.channel.send(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> Successfully, set your Background Image!`)
                  .setDescription(`Please make sure to **not** delete your Image from the Channel!`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                );
              } else {
                return message.channel.send(new Discord.MessageEmbed()
                  .setTitle(`<:no:833101993668771842> ERROR | Could not your message as a backgroundimage`)
                  .setColor(es.wrongcolor)
                  .setFooter(es.footertext, es.footericon)
                );
              }

              function attachIsImage(msgAttach) {
                url = msgAttach.url;

                //True if this url is a png image.
                return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                  url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                  url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
              }
            });
          })
        } catch (e) {
          return message.channel.send(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
            .setFooter(es.footertext, es.footericon)
          );
        }
      } else if (temptype == "resetbg") {
        try {
          client.setups.set(message.guild.id, "null", "ranking.backgroundimage")
          return message.channel.send(new Discord.MessageEmbed()
            .setTitle(`<a:yes:833101995723194437> Resetted Levelup Message Image Background`)
            .setDescription(`I will now use the Default Levelup Image`)
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setFooter(es.footertext, es.footericon)
          );
        } catch (e) {
          return message.channel.send(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
            .setFooter(es.footertext, es.footericon)
          );
        }
      } else {
        return message.channel.send(new Discord.MessageEmbed()
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
