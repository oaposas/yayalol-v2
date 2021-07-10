const {
  MessageEmbed, DiscordAPIError, Message
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const {
  databasing
} = require("../../handlers/functions");
module.exports = {
  name: "poll",
  category: "🚫 Administration",
  aliases: ["abstimmung", "umfrage", "poll"],
  cooldown: 2,
  usage: "poll --> Follow Steps / poll <TEXT> ... to create it instantly",
  description: "Creates a Poll",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.poll")
      var cmdrole = []
        if(cmdroles.length > 0){
          for(const r of cmdroles){
            if(message.guild.roles.cache.get(r)){
              cmdrole.push(` | <@&${r}>`)
            }
            else if(message.guild.members.cache.get(r)){
              cmdrole.push(` | <@${r}>`)
            }
            else {
              console.log("F")
              console.log(r)
              client.settings.remove(message.guild.id, r, `cmdadminroles.poll`)
            }
          }
        }
      if ((message.member.roles.cache.array() && !message.member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(message.author.id) && (message.member.roles.cache.array() && !message.member.roles.cache.some(r => adminroles.includes(r.id))) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> You are not allowed to run this Command`)
          .setDescription(`${adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(role => `<@&${role}>`).join(" | ") + cmdrole.join("")  : `No Admin Roles Setupped yet! Do it with: \`${prefix}setup-admin\``}`)
        );
      if (!args[0])
      {
        message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle("Where should the Poll start?")
        .setDescription("Ping the Channel now! #channel")
        ).then(msg=>{
          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 30000, errors: ["time"]}).then(collected => {
            let channel = collected.first().mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
              if(!channel) return message.reply(new MessageEmbed().setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
              .setTitle(`<:no:833101993668771842> You did not ping a valid Channel | CANCELLED`))

              message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
                .setTitle("What Style do you want?")
                .setDescription(":one: **==** Yes/No Poll\n\n:two: **==** Upvote / Downvote\n\n:three: **==** Selections Poll")
                ).then(msg=>{
                  msg.react("1️⃣")
                  msg.react("2️⃣")
                  msg.react("3️⃣")
                  msg.awaitReactions((reaction, user) => user.id === message.author.id, {max: 1, time: 30000, errors: ["time"]}).then(collected => {
                    let reaction = collected.first();
                    if(reaction.emoji.name == "1️⃣"){
                      message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setFooter(es.footertext, es.footericon)
                      .setTitle("What should the Poll contain?")
                      .setDescription("Send the Poll now!")
                      ).then(msg=>{
                        msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 30000, errors: ["time"]}).then(collected => {
                          channel.send(new MessageEmbed()
                            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                            .setAuthor(`${message.guild.name} | POLL`, "https://images-ext-2.discordapp.net/external/QlX0Eh3_sIiPWIz9Xg_dgN4cwpvne8_ipgDGS43jDGc/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/281/clipboard_1f4cb.png", "https://discord.gg/fA8VGa4V")
                            .setFooter(`by: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
                            .setDescription(collected.first().content)
                          ).then(msg=>{
                            msg.react("✅")
                            msg.react("❌")
                          })
                        })
                      })
                    }
                    else if(reaction.emoji.name == "2️⃣"){
                      message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setFooter(es.footertext, es.footericon)
                      .setTitle("What should the Poll contain?")
                      .setDescription("Send the Poll now!")
                      ).then(msg=>{
                        msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 30000, errors: ["time"]}).then(collected => {
                          channel.send(new MessageEmbed()
                            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                            .setAuthor(`${message.guild.name} | POLL`, "https://images-ext-2.discordapp.net/external/QlX0Eh3_sIiPWIz9Xg_dgN4cwpvne8_ipgDGS43jDGc/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/281/clipboard_1f4cb.png", "https://discord.gg/fA8VGa4V")
                            .setFooter(`by: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
                            .setDescription(collected.first().content)
                          ).then(msg=>{
                            msg.react("👍")
                            msg.react("👎")
                          })
                        })
                      })
                    }
                    else if(reaction.emoji.name == "3️⃣"){
                      var emojicounter = 0;
                      var emojicontent = [];
                      const emojis = [
                        "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟",
                      ]
                      ask_emoji();
                      function ask_emoji(){
                        if(emojicounter == 11) send_poll();
                        message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle(`What should ${emojis[emojicounter]} mean?`)
                        .setDescription("Send the Poll-Question-Text for that Emoji now!\n\nType `finish` if you wanna send the POLL")
                        ).then(msg=>{ 
                          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 30000, errors: ["time"]}).then(collected => {
                            if(String(collected.first().content).toLowerCase() == "finish") send_poll();
                            else{
                              emojicounter++;
                              emojicontent.push(String(collected.first().content).substr(0, 1024))
                              ask_emoji();
                            }
                          })
                        }).catch(e=>{
                          send_poll();
                        })
                      }
                      function send_poll(){
                        message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setFooter(es.footertext, es.footericon)
                      .setTitle("What should the Poll Description?")
                      .setDescription("Send the Poll-Description now!\nEnter `no` for no Description")).then(msg=>{
                        msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 30000, errors: ["time"]}).then(collected => {
                          const embed = new MessageEmbed()
                          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                          .setAuthor(`${message.guild.name} | POLL`, "https://images-ext-2.discordapp.net/external/QlX0Eh3_sIiPWIz9Xg_dgN4cwpvne8_ipgDGS43jDGc/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/281/clipboard_1f4cb.png", "https://discord.gg/fA8VGa4V")
                          .setFooter(`by: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
                          if(collected.first().content.toLowerCase() != "no") embed.setDescription(collected.first().content)
                          
                          for(let i = 0; i< emojicontent.length; i++){
                            embed.addField(emojis[i] +" :", emojicontent[i])
                          }
                          channel.send(embed).then(msg=>{
                            for(let i = 0; i < emojicounter; i++){
                              msg.react(emojis[i])
                            }
                          })
                        })
                      }).catch(e=>{
                        const embed = new MessageEmbed()
                          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                          .setAuthor(`${message.guild.name} | POLL`, "https://images-ext-2.discordapp.net/external/QlX0Eh3_sIiPWIz9Xg_dgN4cwpvne8_ipgDGS43jDGc/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/281/clipboard_1f4cb.png", "https://discord.gg/fA8VGa4V")
                          .setFooter(`by: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
                          for(let i = 0; i< emojicontent.length; i++){
                            embed.addField(emojis[i] +" :", emojicontent[i])
                          }
                          channel.send(embed).then(msg=>{
                            for(let i = 0; i < emojicounter; i++){
                              msg.react(emojis[i])
                            }
                          })
                      })
                      }
                    }
                    else {
                      return message.reply(new MessageEmbed().setColor(es.wrongcolor)
                      .setFooter(es.footertext, es.footericon)
                      .setTitle(`<:no:833101993668771842> You did not react with an valid Emoji | CANCELLED`))
                    }
                      
                    })
                })
            })
        })
      }
      else{
        message.delete().catch(e => console.log("Couldn't delete msg, this is a catch to prevent crash"))
        message.channel.send(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setAuthor(`${message.guild.name} | POLL`, "https://images-ext-2.discordapp.net/external/QlX0Eh3_sIiPWIz9Xg_dgN4cwpvne8_ipgDGS43jDGc/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/281/clipboard_1f4cb.png", "https://discord.gg/fA8VGa4V")
          .setFooter(`by: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
          .setDescription(args.join(" "))
        ).then(msg=>{
          msg.react("👍")
          msg.react("👎")
        })
      }
      
      
      if(client.settings.get(message.guild.id, `adminlog`) != "no"){
        try{
          var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
          if(!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
          channel.send(new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
            .setAuthor(`${require("path").parse(__filename).name} | ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
            .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
            .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
            .setTimestamp().setFooter("ID: " + message.author.id)
          )
        }catch (e){
          console.log(e)
        }
      } 
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> An error occurred`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
      );
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
