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
  name: "setup-tiktok",
  category: "💪 Setup",
  aliases: ["setuptiktok", "tiktok-setup", "tiktoksetup"],
  cooldown: 5,
  usage: "setup-tiktok  -->  Follow Steps",
  description: "Manage the tiktok logger, addstreamer, editstreamer, removestreamer, etc.",
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
        .setDescription(`1️⃣ **== Set** Discord **Channel** for Posting new Vids
        
2️⃣ **== Add** tiktok Channel
        
3️⃣ **== Remove** tiktok Channel

4️⃣ **== Edit** tiktok Channel



*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
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
          if (reaction.emoji.name === "1️⃣") temptype = "set"
          else if (reaction.emoji.name === "2️⃣") temptype = "add"
          else if (reaction.emoji.name === "3️⃣") temptype = "remove"
          else if (reaction.emoji.name === "4️⃣") temptype = "edit"
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
      if (temptype == "set") {

        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("In which Channel should I post all tiktok Videos?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please just ping the Channel with #channel!`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var msg = collected.first();
            if(msg && msg.mentions.channels.filter(ch=>ch.guild.id==msg.guild.id).first()){
              client.social_log.set(message.guild.id, msg.mentions.channels.filter(ch=>ch.guild.id==msg.guild.id).first().id, "tiktok.dc_channel")
              return message.reply(new Discord.MessageEmbed()
                .setTitle(`<a:yes:833101995723194437> I will now send all tiktok Notifications in \`${msg.mentions.channels.filter(ch=>ch.guild.id==msg.guild.id).first().name}\``)
                .setDescription("DONT FORGET TO ADD A **tiktok_CHANNELS**!!!")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
              );
            }
            else{
              throw {
                message: "YOU DID NOT PING A VALID CHANNEL"
              }
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

      } else if (temptype == "add") {
        if(client.social_log.get(message.guild.id, "tiktok.channels").length >= 3) 
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | You've reached the maximum amount of tiktok Channels")
            .setColor(es.wrongcolor)
            .setDescription(`Remove some others first...`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("Which Channel do you wanna add? | Just send the LINK!")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Example:
          
https://www.tiktok.com/@milratodev`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var msg = collected.first();
            if(msg && msg.content ){
              if((msg.content.length > 0 && msg.content.length < 50) &&!msg.content.toLowerCase().includes("tiktok") && !msg.content.toLowerCase().includes("@"))
              throw {
                message: "YOU DID NOT SEND A VALID CHANNEL LINK"
              }
              var Channel = msg.content.split("@")[1]
              if(Channel.includes("video")) Channel = Channel.split("/")[0]
              if(client.social_log.get(message.guild.id, "tiktok.channels").includes(Channel))
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | The tiktok Channel is already setup!")
                  .setColor(es.wrongcolor)
                  .setFooter(es.footertext, es.footericon)
                );
              client.social_log.push(message.guild.id, Channel, "tiktok.channels")

              return message.reply(new Discord.MessageEmbed()
                .setTitle(`<a:yes:833101995723194437> added the Channel ${Channel}`)
                .setDescription("You can change the default message via the **\"edit\"**")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
              );
            }
            else{
              throw {
                message: "YOU DID NOT SEND A VALID CHANNEL"
              }
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
        if(client.social_log.get(message.guild.id, "tiktok.channels").length <= 0) 
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | You havent setup any tiktok Channels yet!")
            .setColor(es.wrongcolor)
            .setDescription(`Add some others first...`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
          var buffer = "";
          var emojis = ["0️⃣", "5️⃣"]
          for(let i = 0; i< client.social_log.get(message.guild.id, "tiktok.channels").length; i++){
            buffer += `${emojis[i]} ${client.social_log.get(message.guild.id, "tiktok.channels")[i]}`
          }
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle("Which Channel do you wanna remove? | Just react with the right one!")
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(buffer+ "\n\n\n*React with the emoji regarding to the Channel you wanna remove*")
            .setFooter(es.footertext, es.footericon)
          })
          for(const emoji of emojis){
            tempmsg.react(emoji).catch(e=>console.log(e))
          }
        await tempmsg.awaitReactions((reaction, user) => user.id == message.author.id && emojis.includes(reaction.emoji.name), {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var channel = client.social_log.get(message.guild.id, "tiktok.channels")[emojis.findIndex(emoji => emoji == collected.first().emoji.name)]
            
            client.social_log.remove(message.guild.id, channel, "tiktok.channels")

            return message.reply(new Discord.MessageEmbed()
              .setTitle(`<a:yes:833101995723194437> removed the Channel ${channel}`)
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setFooter(es.footertext, es.footericon)
            );
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
      } else if (temptype == "edit") {
        if(client.social_log.get(message.guild.id, "tiktok.channels").length <= 0) 
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | You havent setup any tiktok Channels yet!")
            .setColor(es.wrongcolor)
            .setDescription(`Add some others first...`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
          var buffer = "";
          var emojis = ["0️⃣", "5️⃣"]
          for(let i = 0; i< client.social_log.get(message.guild.id, "tiktok.channels").length; i++){
            buffer += `${emojis[i]} ${client.social_log.get(message.guild.id, "tiktok.channels")[i]}`
          }
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle("Which Channel's Message do you wanna edit? | Just react with the right one!")
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(buffer+ "\n\n\n*React with the emoji regarding to the Channel you wanna edit*")
            .setFooter(es.footertext, es.footericon)
          })
          for(const emoji of emojis){
            tempmsg.react(emoji).catch(e=>console.log(e))
          }
        await tempmsg.awaitReactions((reaction, user) => user.id == message.author.id && emojis.includes(reaction.emoji.name), {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var channel = client.social_log.get(message.guild.id, "tiktok.channels")[emojis.findIndex(emoji => emoji == collected.first().emoji.name)]
                        
            client.tiktok.ensure(channel, {
              oldvid: "",
              message: "**{videoAuthorName}** uploaded \`{videoTitle}\`!\n**Watch it:** {videoURL}"
            })
            tempmsg = await message.channel.send(new Discord.MessageEmbed()
              .setTitle("What should be the new Message?")
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setDescription(`
**CURRENT MESSAGE:**
> ${client.tiktok.get(channel, "message")}`.substr(0, 2048))
.addField("**VARIABLES**",`
> \`{url}\` ... will be replaced with the video **LINK**
> \`{author}\` ... will be replaced with the video's **Author**
> \`{title}\` ... will be replaced with the video's **title**`)
              .setFooter(es.footertext, es.footericon)
            )
            await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(async collected => {
              var msg = collected.first();
              if(msg && msg.content ){
                client.tiktok.set(channel, msg.content, "message")  
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> Changed the message for the Channel ${channel}`)
                  .setDescription("New Message:\n" + msg.content)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                );
              }
              else{
                throw {
                  message: "YOU DID NOT SEND A VALID CHANNEL"
                }
              }
            })
            .catch(e => {
              console.log(e)
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply(new Discord.MessageEmbed()
              .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
              .setColor(es.wrongcolor)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            );
          })
          .catch(e => {
            console.log(e)
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
      }  else {
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
