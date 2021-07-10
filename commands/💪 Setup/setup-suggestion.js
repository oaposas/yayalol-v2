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
  name: "setup-suggestion",
  category: "💪 Setup",
  aliases: ["setupsuggestion", "suggestionsetup", "suggestsetup", "suggestion-setup", "suggest-setup", "setup-suggest", "setupsuggest"],
  cooldown: 5,
  usage: "setup-suggestion  -->  Follow the Steps",
  description: "Manage the Suggestions System, messages, emojis and Enable/Disable",
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
        .setDescription(`1️⃣ **== \`✔️ Enable\` / Set** a Channel

2️⃣ **== Define Approve** Text

3️⃣ **== Define Deny** Text

4️⃣ **== Define Maybe** Text

5️⃣  **== Define Status** Text

6️⃣ **== Define Footer** Text

7️⃣ **== Define Approve** Emoji

8️⃣ **== Define Decline** Emoji



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
          if (reaction.emoji.name === "1️⃣") temptype = "channel"
          else if (reaction.emoji.name === "2️⃣") temptype = "approvemsg"
          else if (reaction.emoji.name === "3️⃣") temptype = "denymsg"
          else if (reaction.emoji.name === "4️⃣") temptype = "maybemsg"
          else if (reaction.emoji.name === "5️⃣") temptype = "status"
          else if (reaction.emoji.name === "6️⃣") temptype = "footer"
          else if (reaction.emoji.name === "7️⃣") temptype = "approve"
          else if (reaction.emoji.name === "8️⃣") temptype = "decline"
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

      /**
            suggest: {
              channel: "",
              approvemsg: `<a:yes:833101995723194437> Accepted Idea! Expect this soon.`,
              denymsg: `<:no:833101993668771842> Thank you for the feedback, but we are not interested in this idea at this time.`,
              maybemsg: `💡 We are thinking about this idea!`,
              statustext: `<a:Loading:833101350623117342> Waiting for Community Feedback, please vote!`,
              footertext: `Want to suggest / Feedback something? Simply type in this channel!`,
              approveemoji: `833101995723194437`,
              denyemoji: `833101993668771842`,
            }
       */
      if (temptype == "channel") {

        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Channel do you wanna use as the Suggestion Channel?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please Ping the Channel now! #channel`)
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
                client.settings.set(message.guild.id, channel.id, `suggest.channel`);
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> The Channel: \`${channel.name}\` is now registered as the Suggestion Channel`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`Start writing in there, to write a Suggestion, to accept/deny them use the: \`${prefix}suggest <approve/deny/maybe> <MESSAGEID> [REASON]\` command`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                console.log(e)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't ping a valid Role"
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

      } else if (temptype == "approvemsg") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("What should be the new Approve Message?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please write the Message now! Example: \`Accepted Idea! Expect this soon.\``)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            if (message) {
              try {
                client.settings.remove(message.guild.id, message.content, "suggest.approvemsg");
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> I changed the Approve Message to...`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`${message.content}`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                console.log(e)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't ping a valid Role"
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
      } else if (temptype == "denymsg") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("What should be the new Deny Message?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please write the Message now! Example: \`Thank you for the feedback, but we are not interested in this idea at this time.\``)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            if (message) {
              try {
                client.settings.remove(message.guild.id, message.content, "suggest.denymsg");
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> I changed the Deny Message to...`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`${message.content}`.substr(0, 2048))
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
              throw "you didn't ping a valid Role"
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
      } else if (temptype == "maybemsg") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("What should be the new Maybe Message?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please write the Message now! Example: \`💡 We are thinking about this idea!\``)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            if (message) {
              try {
                client.settings.remove(message.guild.id, message.content, "suggest.maybemsg");
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> I changed the Maybe Message to...`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`${message.content}`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                console.log(e)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't ping a valid Role"
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
      } else if (temptype == "status") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("What should be the new Status Text?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please write the Message now! Example: \`Waiting for Community Feedback, please vote!\``)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            if (message) {
              try {
                client.settings.remove(message.guild.id, message.content, "suggest.statustext");
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> I changed the Status Text to...`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`${message.content}`.substr(0, 2048))
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
              throw "you didn't ping a valid Role"
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
      } else if (temptype == "footer") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("What should be the new Footer Text?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please write the Message now! Example: \`Want to suggest / Feedback something? Simply type in this channel!\``)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
            if (message) {
              try {
                client.settings.remove(message.guild.id, message.content, "suggest.footertext");
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> I changed the Footer Text to...`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`${message.content}`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                console.log(e)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't ping a valid Role"
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
      } else if (temptype == "approve") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("What should be the reacted Approve Emoji?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Just react to **this** Message!`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.awaitReactions((reaction, user) => user.id == message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first()
            if (reaction) {
              try {
                if (collected.first().emoji.id && collected.first().emoji.id.length > 2) {
                  client.settings.remove(message.guild.id, collected.first().emoji.id, "suggest.approveemoji");
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(`<a:yes:833101995723194437> Successfully changed the Approve emoji`)
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                    .setFooter(es.footertext, es.footericon)
                  );
                } else if (collected.first().emoji.name) {
                  client.settings.remove(message.guild.id, collected.first().emoji.name, "suggest.approveemoji");
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(`<a:yes:833101995723194437> Successfully changed the Approve emoji`)
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                    .setFooter(es.footertext, es.footericon)
                  );
                } else {
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                    .setColor(es.wrongcolor)
                    .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                    .setFooter(es.footertext, es.footericon)
                  );
                }
              } catch (e) {
                console.log(e)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't reacted with a valid Emoji"
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
      } else if (temptype == "decline") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("What should be the reacted Decline Emoji?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Just react to **this** Message!`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.awaitReactions((reaction, user) => user.id == message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first()
            if (reaction) {
              try {
                if (collected.first().emoji.id && collected.first().emoji.id.length > 2) {
                  client.settings.remove(message.guild.id, collected.first().emoji.id, "suggest.denyemoji");
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(`<a:yes:833101995723194437> Successfully changed the Deny emoji`)
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                    .setFooter(es.footertext, es.footericon)
                  );
                } else if (collected.first().emoji.name) {
                  client.settings.remove(message.guild.id, collected.first().emoji.name, "suggest.denyemoji");
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(`<a:yes:833101995723194437> Successfully changed the Deny emoji`)
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                    .setFooter(es.footertext, es.footericon)
                  );
                } else {
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                    .setColor(es.wrongcolor)
                    .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                    .setFooter(es.footertext, es.footericon)
                  );
                }
              } catch (e) {
                console.log(e)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            } else {
              throw "you didn't reacted with a valid Emoji"
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
      } else {
        console.log("e")
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
