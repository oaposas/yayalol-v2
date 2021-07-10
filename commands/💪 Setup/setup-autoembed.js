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
  name: "setup-autoembed",
  category: "💪 Setup",
  aliases: ["setupautoembed", "autoembed-setup"],
  cooldown: 5,
  usage: "setup-autoembed  --> Follow the Steps",
  description: "Define a Channel where every message is replaced with an EMBED or disable this feature",
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
        .setDescription(`1️⃣ **== Add** a Channel for Auto Embeds\n\n2️⃣ **== Remove** a Channel for Auto Embeds\n\n3️⃣ **== Show** the Channels for Auto Embeds\n\n📑 **== Show Settings**\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("📑")
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
          if (reaction.emoji.name === "1️⃣") temptype = "add"
          else if (reaction.emoji.name === "2️⃣") temptype = "remove"
          else if (reaction.emoji.name === "3️⃣") temptype = "show"
          else if (reaction.emoji.name === "📑") temptype = "thesettings"
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


      if (temptype == "add") {

        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Channel do you wanna add?")
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
                var a = client.settings.get(message.guild.id, "autoembed")
                if(!Array.isArray(a)){
                  client.settings.set(message.guild.id, Array(a), "autoembed");
                  a = client.settings.get(message.guild.id, "autoembed")
                }
                if(a.includes(channel.id))
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<:no:833101993668771842> The Channel is already defined as an Auto Embed Channel`)
                  .setDescription(`You can retry the Command: \`${prefix}setup-autoembed\` to remove the Channel from the LIST!`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                );
                client.settings.push(message.guild.id, channel.id, "autoembed")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> I will now replace every message in \`${channel.name}\` too!`)
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

      } else if (temptype == "remove") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Channel do you wanna add?")
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
                var a = client.settings.get(message.guild.id, "autoembed")
                if(!Array.isArray(a)){
                  client.settings.set(message.guild.id, Array(a), "autoembed");
                  a = client.settings.get(message.guild.id, "autoembed")
                }
                if(!a.includes(channel.id))
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<:no:833101993668771842> The Channel is not defined as an Auto Embed Channel yet`)
                  .setDescription(`You can retry the Command: \`${prefix}setup-autoembed\` to add the Channel to the LIST!`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                );
                client.settings.remove(message.guild.id, channel.id, "autoembed")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> I will now no longer replace the messages in \`${channel.name}\`!`)
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
      } else if (temptype == "show") {
        var a = client.settings.get(message.guild.id, "autoembed")
        if(!Array.isArray(a)){
          client.settings.set(message.guild.id, Array(a), "autoembed");
          a = client.settings.get(message.guild.id, "autoembed")
        }
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("I am replacing the messages in those Channels:")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`${a.map(ch=>`<#${ch}>`).join(" | ")}`.substr(0, 2048))
          .setFooter(es.footertext, es.footericon)
        })
        
        
       } else if ( temptype == "thesettings") {
          var a = client.settings.get(message.guild.id, "autoembed")
          if(!Array.isArray(a)){
            client.settings.set(message.guild.id, Array(a), "autoembed");
            a = client.settings.get(message.guild.id, "autoembed")
          }
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle("📑 Settings of the Auto Embed-Message Replacement System")
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`**Channels where Messages will be replaced:**\n${a.map(ch=>`<#${ch}>`).join(" | ")}`.substr(0, 2048))
            .setFooter(es.footertext, es.footericon)
          })
          
          
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
