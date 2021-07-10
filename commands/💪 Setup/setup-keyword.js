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
  name: "setup-keyword",
  category: "💪 Setup",
  aliases: ["setupkeyword", "keyword-setup", "setup-keyword"],
  cooldown: 5,
  usage: "setup-keyword  --> Follow the Steps",
  description: "Define Key Word messages, so that if someone sends a Message containing that Keyword, the Bot will responde with your defined MESSAGE",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    var es = client.settings.get(message.guild.id, "embed")
    try {
      var originalowner = message.author.id;
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
        .setDescription(`1️⃣ **== Add** a Key Word Message\n\n2️⃣ **== Remove** a Key Word Message\n\n3️⃣ **== Show** the Key Word Messages\n\n\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
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
          time: 120000,
          errors: ["time"]
        })
        .then(async collected => {
          var reaction = collected.first()
          reaction.users.remove(message.author.id)
          if (reaction.emoji.name === "1️⃣") temptype = "add"
          else if (reaction.emoji.name === "2️⃣") temptype = "remove"
          else if (reaction.emoji.name === "3️⃣") temptype = "show"
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
        if (client.keyword.get(message.guild.id, "commands").length > 19)
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | You've reached the maximum Key Words Amount!")
            .setColor(es.wrongcolor)
            .setDescription(`You cannot have more then **20** Key Words`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("What Key Words do you wanna add?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`Please type the Keyword **without** the Prefix:\nExample if you wanna get a \`Hello\` Key Word send \`hello\``)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 120000,
            errors: ["time"]
          })
          .then(async collected => {
            var msg = collected.first().content.split(" ")[0];
            if (msg) {
              var thekeyword = {
                name: msg,
                output: "ye",
                embed: false,
                channels: [],
                aliases: []
              }
              tempmsg = await message.channel.send(new Discord.MessageEmbed()
                .setTitle("What Should the Key Word send?")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`Please just type the content in the Chat\nExample: \`Hello {member} Welcome to this Server 👋\``)
                .setFooter(es.footertext, es.footericon)
              )
              await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                  max: 1,
                  time: 120000,
                  errors: ["time"]
                })
                .then(async collected => {
                  var msg = collected.first().content;
                  if (msg) {
                    thekeyword.output = msg;
                    tempmsg = await message.channel.send(new Discord.MessageEmbed()
                      .setTitle("In which Channels should the Keyword work?")
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setDescription(`Please make sure to ping **__all__** Channels, like that: \`#channel1 #channel2 #channel3\``)
                      .setFooter(es.footertext, es.footericon)
                    )
                    await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 120000,
                        errors: ["time"]
                      })
                      .then(async collected => {
                        var channel = collected.first().mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
                        if (channel) {
                          for (const ch of collected.first().mentions.channels.array()) {
                            console.log(ch.id)
                            thekeyword.channels.push(ch.id)
                          }
                          tempmsg = await message.channel.send(new Discord.MessageEmbed()
                            .setTitle("Do you want aliases?")
                            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                            .setDescription(`For example, if you picked the keyword: \`hello\`, then you could want aliases like them: \`hi hey hallo welcome\`\nSimple send Each Alias in the Channel with a \` \` SPACE inbetween\nIf you don't want any aliases type: \`noalias\``)
                            .setFooter(es.footertext, es.footericon)
                          )
                          await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                              max: 1,
                              time: 120000,
                              errors: ["time"]
                            })
                            .then(async collected => {
                              if (collected.first().content.toLowerCase() == "noalias") {

                              } else {
                                var args = collected.first().content.split(" ")
                                if (args) {
                                  for (const m of args) {
                                    console.log(m)
                                    thekeyword.aliases.push(m.toLowerCase())
                                  }
                                } else {
                                  timeouterror = {
                                    message: "YOU DID NOT SEND ANY ALIAS"
                                  }
                                }
                              }
                              var ttempmsg = await message.channel.send(new Discord.MessageEmbed()
                                .setTitle("Should I send it as an EMBED or as an MESSAGE")
                                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                .setDescription(`React with ✅ to send it as an Embed\n\nReact with ❌ to just send it as a normal Message`)
                                .setFooter(es.footertext, es.footericon)
                              )
                              try {
                                ttempmsg.react("✅")
                                ttempmsg.react("❌")
                              } catch {

                              }
                              await ttempmsg.awaitReactions((reaction, user) => user == originalowner, {
                                  max: 1,
                                  time: 90000,
                                  errors: ["time"]
                                })
                                .then(collected => {
                                  var reaction = collected.first();
                                  if (reaction) {
                                    if (reaction.emoji.name == "✅") {
                                      thekeyword.embed = true;
                                    } else {
                                      thekeyword.embed = false;
                                    }

                                    client.keyword.push(message.guild.id, thekeyword, "commands")

                                    message.channel.send(new Discord.MessageEmbed()
                                      .setTitle(`Success ${thekeyword.name} has successfully been created!`)
                                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                      .setDescription(`This is how it will look like:`)
                                      .setFooter(es.footertext, es.footericon)
                                    )

                                    if (reaction.emoji.name == "✅") {
                                      message.channel.send(new Discord.MessageEmbed()
                                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                        .setDescription(thekeyword.output.replace("{member}", `<@${message.author.id}>`))
                                        .setFooter(es.footertext, es.footericon)
                                      )
                                    } else {
                                      message.channel.send(thekeyword.output.replace("{member}", `<@${message.author.id}>`))
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
                          timeouterror = {
                            message: "YOU DID NOT PING ANY CHANNELS"
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
        let cuc = client.keyword.get(message.guild.id, "commands");
        var embed = new Discord.MessageEmbed()
          .setTitle("Which Key Word do you wanna remove?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter("REACT with the EMOJI for the RIGHT Command, you wanna REMOVE", es.footericon)
        const emojis = {
          "0": "1️⃣",
          "1": "2️⃣",
          "2": "3️⃣",
          "3": "4️⃣",
          "4": "5️⃣",
          "5": "6️⃣",
          "6": "7️⃣",
          "7": "8️⃣",
          "8": "9️⃣",
          "9": "🔟",
        }
        const emojisinverted = {
          "1️⃣": "0",
          "2️⃣": "1",
          "3️⃣": "2",
          "4️⃣": "3",
          "5️⃣": "4",
          "6️⃣": "5",
          "7️⃣": "6",
          "8️⃣": "7",
          "9️⃣": "8",
          "🔟": "9",
        }
        const emojiarray = [
          "1️⃣",
          "2️⃣",
          "3️⃣",
          "4️⃣",
          "5️⃣",
          "6️⃣",
          "7️⃣",
          "8️⃣",
          "9️⃣",
          "🔟",
        ]
        for (let i = 0; i < cuc.length; i++) {
          try {
            var string = `${cuc[i].output}`;
            if (string.length > 250) string = string.substr(0, 250) + " ..."
            embed.addField(`**${emojis[String(i)]}.** \`${cuc[i].name}\` | ${cuc[i].embed ? "✅ Embed" : "❌ Embed"}`, ">>> " + string)
          } catch (e) {
            console.log(e)
          }
        }

        tempmsg = await tempmsg.edit({embed: embed})

        for (let i = 0; i < cuc.length; i++) {
          if (i < 3) continue;
          await tempmsg.react(emojiarray[i])
        }

        await tempmsg.awaitReactions((reaction, user) => user.id == originalowner, {
            max: 1,
            time: 120000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first();
            if (reaction) {
              var thecmd = cuc[emojisinverted[reaction.emoji.name]]
              try {
                client.keyword.remove(message.guild.id, thecmd, "commands")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> I successfully deleted \`${thecmd.name}\`!`)
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
        let cuc = client.keyword.get(message.guild.id, "commands");
        var embed = new Discord.MessageEmbed()
          .setTitle("Key Word Messages (5 Seconds SERVER Delay)")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(ee.footertext, es.footericon)

        for (let i = 0; i < cuc.length; i++) {
          try {
            var string = `${cuc[i].output}`;
            
            var aliases = `${cuc[i].aliases.map(a => `\`${a}\``).join(", ")}`
            if (aliases.length > 100) aliases = aliases.substr(0, 100) + " ..."
            var channels = cuc[i].channels.map(ch => `<#${ch}>`)
            if(channels.length > 10) channels = channels.join(" ") + " ...";
            else channels = channels.join(" ")

            if (string.length > 100) string = string.substr(0, 100) + " ..."
            embed.addField(`<:arrow:832598861813776394> \`${cuc[i].name}\` | ${cuc[i].embed ? "✅ Embed" : "❌ Embed"}`, ">>> <:arrow:832598861813776394> **__OUTPUT__**\n" + string + "\n<:arrow:832598861813776394> **__ALIASES__**\n" + aliases + "\n<:arrow:832598861813776394> **__CHANNELS__**\n" + channels)
          } catch (e) {
            console.log(e)
          }
        }
        tempmsg = await tempmsg.edit({embed: embed})
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
