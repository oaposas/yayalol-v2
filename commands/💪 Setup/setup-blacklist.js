var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing, swap_pages, swap_pages2
} = require(`../../handlers/functions`);
module.exports = {
  name: "setup-blacklist",
  category: "💪 Setup",
  aliases: ["setupblacklist", "blacklist-setup", "blacklistsetup"],
  cooldown: 5,
  usage: "setup-blacklist  -->  Follow the Steps",
  description: "Blacklist specific Words in your Server",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    var es = client.settings.get(message.guild.id, "embed")
    try {
      var timeouterror = false;
      var filter = (reaction, user) => { return user.id === message.author.id; };
      var temptype = "";
      var tempmsg;

      tempmsg = await message.channel.send(new Discord.MessageEmbed()
        .setTitle("What do you want to do?")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setDescription(`1️⃣ **== Add** Word to the Blacklist\n\n2️⃣ **== Remove** Word from the Blacklist\n\n3️⃣ **== Show** all Blacklisted Words\n\n4️⃣ **== Reset** the Blacklisted Words\n\n*Note that ADMINISTRATORS, (general) are not checked if their messages are a part of the Blacklist*\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )

      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("4️⃣")
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
          else if (reaction.emoji.name === "4️⃣") temptype = "reset"
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
          .setTitle("Which Word do you wanna add?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please send the Word(s) in here now! Note if you wanna add multiple words do it like this:\n\`word1,word2,word 3,word4\``)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
           
            if (message.content) {
              try {
                var blacklistedwords = message.content.split(",").filter(Boolean).map(item => item.trim().toLowerCase());
                var notadded = []
                for(const blacklistword of blacklistedwords){
                  if(client.blacklist.get(message.guild.id, "words").includes(blacklistword)){
                    notadded.push(blacklistword);
                  }else {
                    client.blacklist.push(message.guild.id, blacklistword, "words")
                  }
                }
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> Added \`${blacklistedwords.length - notadded.length}\` / \`${blacklistedwords.length}\``)
                  .setDescription(`Not added Words:\n${notadded.length > 0 ? notadded.map(i => `\`${i}\``).join(", ") + "\n Because it is already in the Blacklist" : "Added every given word"}`.substr(0, 2048))
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
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

      } else if (temptype == "remove") {
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Word do you wanna remove?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please send the Word(s) in here now! Note if you wanna remove multiple words do it like this:\n\`word1,word2,word 3,word4\``)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var message = collected.first();
           
            if (message.content) {
              try {
                var blacklistedwords = message.content.split(",").filter(Boolean).map(item => item.trim().toLowerCase());
                var notremoved = []
                for(const blacklistword of blacklistedwords){
                  if(!client.blacklist.get(message.guild.id, "words").includes(blacklistword)){
                    notremoved.push(blacklistword);
                  }else {
                    client.blacklist.remove(message.guild.id, blacklistword, "words")
                  }
                }
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> Removed \`${blacklistedwords.length - notremoved.length}\` / \`${blacklistedwords.length}\``)
                  .setDescription(`Not removed Words:\n${notremoved.length > 0 ? notremoved.map(i => `\`${i}\``).join(", ") + " \nBecause it is not in the blacklist yet": "Removed every given word"}`.substr(0, 2048))
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
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
      } else if (temptype == "show") {
        return swap_pages(client, message, `${client.blacklist.get(message.guild.id, "words").map(word => `\`${word}\``).join(", ").split("`").join("\`")}`, `${message.guild.name} | Blacklisted Words`);
      } else if (temptype == "reset") {
        client.blacklist.set(message.guild.id, [], "words")
        return message.reply(new Discord.MessageEmbed()
          .setTitle(`<a:yes:833101995723194437> Resetted the Blacklist`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
        );
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