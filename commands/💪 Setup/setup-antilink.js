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
  name: "setup-antilink",
  category: "💪 Setup",
  aliases: ["setupantilink", "antilinks-setup", "antilink-setup", "antilinksetup", "setup-antilinks"],
  cooldown: 5,
  usage: "setup-antilink  -->  Follow the Steps",
  description: "Enable/Disable anti Link system",
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
        .setDescription(`1️⃣ **== ** ${client.settings.get(message.guild.id, "antilink").enabled ? "**\`❌ Disable\`** AntiLinks": "**\`✔️ Enable\`** AntiLinks"}\n\n2️⃣ **== Add** White listed **Channels**\n\n3️⃣ **== Remove** White listed **Channels**\n\n📑 **== Show Settings**\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("📑")
      } catch (e) {
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        });
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
          else if (reaction.emoji.name === "2️⃣") temptype = "add"
          else if (reaction.emoji.name === "3️⃣") temptype = "remove"
          else if (reaction.emoji.name === "📑") temptype = "thesettings"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply({embed: new Discord.MessageEmbed()
          .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        });


      if (temptype == "toggle") {
        try {
          client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "antilink.enabled"), "antilink.enabled");
          return message.reply({embed: new Discord.MessageEmbed()
            .setTitle(`<a:yes:833101995723194437> ${client.settings.get(message.guild.id, "antilink").enabled ? "**Enabled** AntiLinks": "**Disabled** AntiLinks"}`)
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`${client.settings.get(message.guild.id, "antilink").enabled ? "**I will now prevent Users to send** Links": "Everyone can send Links!"}`.substr(0, 2048))
            .setFooter(es.footertext, es.footericon)
          });
        } catch (e) {
          return message.reply({embed: new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
            .setFooter(es.footertext, es.footericon)
          });
        }
      } else if (temptype == "add") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Channel do you wanna add to the Whitelist?")
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
              let antisettings = client.settings.get(message.guild.id, "antilink.whitelistedchannels")
              if (antisettings.includes(channel.id)) return message.reply({embed: new Discord.MessageEmbed()
                .setTitle(`<:no:833101993668771842> ERROR | The Channel: \`${channel.name}\` is already added to the Anti Links Whitelist`)
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon)
              });
              try {
                client.settings.push(message.guild.id, channel.id, "antilink.whitelistedchannels");
                return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> The Channel: \`${channel.name}\` is now registered as an Whitelisted Anti Links Channel`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`Every single Channel:\n<#${client.settings.get(message.guild.id, "antilink.whitelistedchannels").join(">\n<#")}>\nis not a checked by the Anti Links System`.substr(0, 2048))
                  .setFooter(es.footertext, es.footericon)
                });
              } catch (e) {
                return message.reply({embed: new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                });
              }
            } else {
              throw "you didn't ping a valid Channel"
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply({embed: new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          });
      } else if (temptype == "remove") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Channel do you wanna remove to the Whitelist?")
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
              let antisettings = client.settings.get(message.guild.id, "antilink.whitelistedchannels")
              if (!antisettings.includes(channel.id)) return message.reply({embed: new Discord.MessageEmbed()
                .setTitle(`<:no:833101993668771842> ERROR | The Channel: \`${channel.name}\` is not added to the Anti Links Whitelist yet`)
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon)
              });
              try {
                client.settings.remove(message.guild.id, channel.id, "antilink.whitelistedchannels");
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> The Channel: \`${channel.name}\` is now **NOT** registered as an Whitelisted Anti Links Channel anymore`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`Every single Channel:\n<#${client.settings.get(message.guild.id, "antilink.whitelistedchannels").join(">\n<#")}>\nis not a checked by the Anti Links System`.substr(0, 2048))
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
      } else if (temptype == "thesettings") {
        let thesettings = client.settings.get(message.guild.id, `antilink`)
        return message.reply(new Discord.MessageEmbed()
          .setTitle(`📑 Settings of the Anti Ad-Link System`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`**Enabled:** ${thesettings.enabled ? "<a:yes:833101995723194437>" : "<:no:833101993668771842>"}
          
**Witelisted Channels:** ${thesettings.whitelistedchannels.length > 0 ? `<#${thesettings.whitelistedchannels.join("> | <#")}>` : "No Channels Whitelisted!"}

**Information:** *Anti Links are not enabled in Tickets from THIS BOT*`.substr(0, 2048))
.setFooter(es.footertext, es.footericon)
        );
      }
      else {
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
