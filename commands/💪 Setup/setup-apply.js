var {
  MessageEmbed
} = require("discord.js");
var Discord = require("discord.js");
var config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
var emojis = require("../../botconfig/emojis.json");
var {
  databasing
} = require(`../../handlers/functions`);
module.exports = {
  name: "setup-apply",
  category: "💪 Setup",
  aliases: ["setupapply", "apply-setup", "applysetup", "setup-application", "setupapplication"],
  cooldown: 5,
  usage: "setup-apply --> follow Steps",
  description: "Manage 5 different Application Systems",
  run: async (client, message, args, cmduser, text, prefix) => {
    var es = client.settings.get(message.guild.id, "embed")
    try{
      let guildid = message.guild.id;
      
      client.apply.ensure(guildid, {
        "channel_id": "",
        "message_id": "",
        "f_channel_id": "", //changequestions --> which one (lists everyone with index) --> 4. --> Question

        "QUESTIONS": [{
          "1": "DEFAULT"
        }],

        "TEMP_ROLE": "0",

        "accept": "You've got accepted!",
        "accept_role": "0",

        "deny": "You've got denied!",

        "ticket": "Hey {user}! We have some Questions!",

        "one": {
          "role": "0",
          "message": "Hey you've got accepted for Team 1",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "two": {
          "role": "0",
          "message": "Hey you've got accepted for Team 2",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "three": {
          "role": "0",
          "message": "Hey you've got accepted for Team 3",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "four": {
          "role": "0",
          "message": "Hey you've got accepted for Team 4",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "five": {
          "role": "0",
          "message": "Hey you've got accepted for Team 5",
          "image": {
            "enabled": false,
            "url": ""
          }
        }
      });
      client.apply2.ensure(guildid, {
        "channel_id": "",
        "message_id": "",
        "f_channel_id": "", //changequestions --> which one (lists everyone with index) --> 4. --> Question

        "QUESTIONS": [{
          "1": "DEFAULT"
        }],

        "TEMP_ROLE": "0",

        "accept": "You've got accepted!",
        "accept_role": "0",

        "deny": "You've got denied!",

        "ticket": "Hey {user}! We have some Questions!",

        "one": {
          "role": "0",
          "message": "Hey you've got accepted for Team 1",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "two": {
          "role": "0",
          "message": "Hey you've got accepted for Team 2",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "three": {
          "role": "0",
          "message": "Hey you've got accepted for Team 3",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "four": {
          "role": "0",
          "message": "Hey you've got accepted for Team 4",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "five": {
          "role": "0",
          "message": "Hey you've got accepted for Team 5",
          "image": {
            "enabled": false,
            "url": ""
          }
        }
      });
      client.apply3.ensure(guildid, {
        "channel_id": "",
        "message_id": "",
        "f_channel_id": "", //changequestions --> which one (lists everyone with index) --> 4. --> Question

        "QUESTIONS": [{
          "1": "DEFAULT"
        }],

        "TEMP_ROLE": "0",

        "accept": "You've got accepted!",
        "accept_role": "0",

        "deny": "You've got denied!",

        "ticket": "Hey {user}! We have some Questions!",

        "one": {
          "role": "0",
          "message": "Hey you've got accepted for Team 1",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "two": {
          "role": "0",
          "message": "Hey you've got accepted for Team 2",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "three": {
          "role": "0",
          "message": "Hey you've got accepted for Team 3",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "four": {
          "role": "0",
          "message": "Hey you've got accepted for Team 4",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "five": {
          "role": "0",
          "message": "Hey you've got accepted for Team 5",
          "image": {
            "enabled": false,
            "url": ""
          }
        }
      });
      client.apply4.ensure(guildid, {
        "channel_id": "",
        "message_id": "",
        "f_channel_id": "", //changequestions --> which one (lists everyone with index) --> 4. --> Question

        "QUESTIONS": [{
          "1": "DEFAULT"
        }],

        "TEMP_ROLE": "0",

        "accept": "You've got accepted!",
        "accept_role": "0",

        "deny": "You've got denied!",

        "ticket": "Hey {user}! We have some Questions!",

        "one": {
          "role": "0",
          "message": "Hey you've got accepted for Team 1",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "two": {
          "role": "0",
          "message": "Hey you've got accepted for Team 2",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "three": {
          "role": "0",
          "message": "Hey you've got accepted for Team 3",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "four": {
          "role": "0",
          "message": "Hey you've got accepted for Team 4",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "five": {
          "role": "0",
          "message": "Hey you've got accepted for Team 5",
          "image": {
            "enabled": false,
            "url": ""
          }
        }
      });
      client.apply5.ensure(guildid, {
        "channel_id": "",
        "message_id": "",
        "f_channel_id": "", //changequestions --> which one (lists everyone with index) --> 4. --> Question

        "QUESTIONS": [{
          "1": "DEFAULT"
        }],

        "TEMP_ROLE": "0",

        "accept": "You've got accepted!",
        "accept_role": "0",

        "deny": "You've got denied!",

        "ticket": "Hey {user}! We have some Questions!",

        "one": {
          "role": "0",
          "message": "Hey you've got accepted for Team 1",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "two": {
          "role": "0",
          "message": "Hey you've got accepted for Team 2",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "three": {
          "role": "0",
          "message": "Hey you've got accepted for Team 3",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "four": {
          "role": "0",
          "message": "Hey you've got accepted for Team 4",
          "image": {
            "enabled": false,
            "url": ""
          }
        },
        "five": {
          "role": "0",
          "message": "Hey you've got accepted for Team 5",
          "image": {
            "enabled": false,
            "url": ""
          }
        }
      });
    }catch{}
    try {
      var adminroles = client.settings.get(message.guild.id, "adminroles")

      var errored = false;
      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;
      var apply_for_here = client.apply;
      tempmsg = await message.channel.send(new Discord.MessageEmbed()
        .setTitle("What do you want to do?")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setDescription(`1️⃣ **==** Manage the **first** Application System

2️⃣ **==** Manage the **second** Application System

3️⃣ **==** Manage the **third** Application System

4️⃣ **==** Manage the **fourth** Application System

5️⃣ **==** Manage the **fifth** Application System



*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
        tempmsg.react("3️⃣")
        tempmsg.react("4️⃣")
        tempmsg.react("5️⃣")
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
          .setColor("RED")
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );
      }
      await tempmsg.awaitReactions(filter, {
          max: 1,
          time: 180000,
          errors: ["time"]
        })
        .then(collected => {
          var reaction = collected.first()
          reaction.users.remove(message.author.id)
          if (reaction.emoji.name === "1️⃣") {
            apply_for_here = client.apply;
            temptype = "1";
          } else if (reaction.emoji.name === "2️⃣") {
            apply_for_here = client.apply2;
            temptype = "2";
          } else if (reaction.emoji.name === "3️⃣") {
            apply_for_here = client.apply3;
            temptype = "3";
          } else if (reaction.emoji.name === "4️⃣") {
            apply_for_here = client.apply4;
            temptype = "4";
          } else if (reaction.emoji.name === "5️⃣") {
            apply_for_here = client.apply5;
            temptype = "5";
          } else throw "You reacted with a wrong emoji"

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

        //bearbeite die informations nachricht
      tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
        .setTitle("What do you want to do?")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setDescription(`1️⃣ **== Setup / Create** a new Application (Overwrite)\n\n2️⃣ **== Edit** the Application Process Parameters\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      })
      await tempmsg.awaitReactions(filter, {
          max: 1,
          time: 180000,
          errors: ["time"]
        })
        .then(async collected => {
          var reaction = collected.first()
          reaction.users.remove(message.author.id)


          if (reaction.emoji.name === "1️⃣") {

            var color = "GREEN";
            var desc;
            var userid = message.author.id;
            var pickmsg = await tempmsg.edit({embed: new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What do you want me to do?").setDescription("1️⃣ === I will create a Channel for you\n2️⃣ === You can pick your own Channels!").setFooter(es.footertext, es.footericon)})
            await pickmsg.awaitReactions((reaction, user) => user.id === message.author.id, {
                max: 1,
                time: 180000,
                erros: ["time"]
              }).then(collected => {
                if (collected.first().emoji.name == "1️⃣") setup_with_channel_creation()
                if (collected.first().emoji.name == "2️⃣") setup_without_channel_creation()
              })
              .catch(e => {
                errored === true
              })
            if (errored)
              return message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("<:no:833101993668771842> ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(msg => msg.delete({
                timeout: 7500
              }))

            async function setup_with_channel_creation() {
              var applychannel;
              var f_applychannel;
              message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("Setting up...", "https://miro.medium.com/max/1600/1*e_Loq49BI4WmN7o9ItTADg.gif").setFooter(es.footertext, es.footericon))
              message.guild.channels.create("📋 | Applications", {
                type: "category",
              }).then(ch => {
                ch.guild.channels.create("✔️|finished-applies", {
                  type: "text",
                  topic: "React to the Embed, to start the application process",
                  parent: ch.id,
                  permissionOverwrites: [{
                    id: ch.guild.id,
                    deny: ["VIEW_CHANNEL"]
                  }]
                }).then(ch => {
                  f_applychannel = ch.id
                  apply_for_here.set(ch.guild.id, ch.id, "f_channel_id")
                })
                ch.guild.channels.create("✅|apply-here", {
                  type: "text",
                  topic: "React to the Embed, to start the application process",
                  parent: ch.id,
                  permissionOverwrites: [{
                      id: ch.guild.id,
                      allow: ["VIEW_CHANNEL"],
                      deny: ["SEND_MESSAGES"]
                    },
                    {
                      id: client.user.id,
                      allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                    }
                  ]
                }).then(ch => {
                  var embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
                    .setColor("ORANGE")
                    .setFooter(es.footertext, es.footericon)
                  message.channel.send(embed.setTitle("What should be the embed color?").setDescription("It MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)")).then(msg => {
                    msg.channel.awaitMessages(m => m.author.id === userid, {
                        max: 1,
                        time: 180000,
                        errors: ["TIME"]
                      }).then(collected => {
                        var content = collected.first().content;
                        if (!content.startsWith("#") && content.length !== 7) {
                          message.channel.send("WRONG COLOR! USING `GREEN`")
                        } else {
                          if (isValidColor(content)) {
                            console.log(content)
                            color = content;
                          } else {
                            message.channel.send("WRONG COLOR! USING `GREEN`")
                          }
                        }

                        function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                        }
                      }).catch(error => {

                        return message.reply(new Discord.MessageEmbed()
                          .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                          .setColor(es.wrongcolor)
                          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                          .setFooter(es.footertext, es.footericon)
                        );
                      })
                      .then(something => {
                        message.channel.send(embed.setTitle("What should be the embed TEXT?").setDescription("Like what do u want to have listed in the Embed?")).then(msg => {
                          msg.channel.awaitMessages(m => m.author.id === userid, {
                            max: 1,
                            time: 180000,
                            errors: ["TIME"]
                          }).then(collected => {
                            desc = collected.first().content;
                            var setupembed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
                              .setColor(color)
                              .setDescription(desc)
                              .setTitle("Apply for: `" + message.guild.name + "`")
                              .setFooter(es.footertext, es.footericon)
                            ch.send(setupembed).then(msg => {
                              msg.react("✅")
                              apply_for_here.set(msg.guild.id, msg.id, "message_id")
                              apply_for_here.set(msg.guild.id, msg.channel.id, "channel_id")
                              applychannel = msg.channel.id;
                            });
                            var counter = 0;
                            apply_for_here.set(msg.guild.id, [{
                              "1": "DEFAULT"
                            }], "QUESTIONS")
                            ask_which_qu();

                            function ask_which_qu() {
                              counter++;
                              if (counter === 25) {
                                message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setAuthor("You reached the maximum amount of Questions!", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/65/cross-mark_274c.png"))
                                return ask_addrole();
                              }
                              message.channel.send(embed.setTitle(`What should be the **${counter}** Question?`).setDescription("Enter `finish`, if you are finished with your Questions!")).then(msg => {
                                msg.channel.awaitMessages(m => m.author.id === userid, {
                                  max: 1,
                                  time: 180000,
                                  errors: ["TIME"]
                                }).then(collected => {
                                  if (collected.first().content.toLowerCase() === "finish") {
                                    return ask_addrole();
                                  }
                                  switch (counter) {
                                    case 1: {
                                      apply_for_here.set(msg.guild.id, [], "QUESTIONS");
                                      apply_for_here.push(msg.guild.id, {
                                        "1": collected.first().content
                                      }, "QUESTIONS");
                                    }
                                    break;
                                  case 2:
                                    apply_for_here.push(msg.guild.id, {
                                      "2": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 3:
                                    apply_for_here.push(msg.guild.id, {
                                      "3": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 4:
                                    apply_for_here.push(msg.guild.id, {
                                      "4": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 5:
                                    apply_for_here.push(msg.guild.id, {
                                      "5": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 6:
                                    apply_for_here.push(msg.guild.id, {
                                      "6": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 7:
                                    apply_for_here.push(msg.guild.id, {
                                      "7": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 8:
                                    apply_for_here.push(msg.guild.id, {
                                      "8": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 9:
                                    apply_for_here.push(msg.guild.id, {
                                      "9": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 10:
                                    apply_for_here.push(msg.guild.id, {
                                      "10": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 11:
                                    apply_for_here.push(msg.guild.id, {
                                      "11": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 12:
                                    apply_for_here.push(msg.guild.id, {
                                      "12": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 13:
                                    apply_for_here.push(msg.guild.id, {
                                      "13": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 14:
                                    apply_for_here.push(msg.guild.id, {
                                      "14": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 15:
                                    apply_for_here.push(msg.guild.id, {
                                      "15": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 16:
                                    apply_for_here.push(msg.guild.id, {
                                      "16": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 17:
                                    apply_for_here.push(msg.guild.id, {
                                      "17": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 18:
                                    apply_for_here.push(msg.guild.id, {
                                      "18": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 19:
                                    apply_for_here.push(msg.guild.id, {
                                      "19": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 20:
                                    apply_for_here.push(msg.guild.id, {
                                      "20": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 21:
                                    apply_for_here.push(msg.guild.id, {
                                      "21": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 22:
                                    apply_for_here.push(msg.guild.id, {
                                      "22": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 23:
                                    apply_for_here.push(msg.guild.id, {
                                      "23": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  case 24:
                                    apply_for_here.push(msg.guild.id, {
                                      "24": collected.first().content
                                    }, "QUESTIONS");
                                    break;
                                  }
                                  ask_which_qu();
                                }).catch(error => {
                                  
                                  return message.reply(new Discord.MessageEmbed()
                                    .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                                    .setColor(es.wrongcolor)
                                    .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                                    .setFooter(es.footertext, es.footericon)
                                  );
                                })
                              })
                            }

                            function ask_addrole() {
                              message.channel.send(embed.setTitle(`Do you want to add a Role, when some1 applies?`).setDescription("Enter `no`, if not\n\nJust ping the Role")).then(msg => {
                                msg.channel.awaitMessages(m => m.author.id === userid, {
                                  max: 1,
                                  time: 180000,
                                  errors: ["TIME"]
                                }).then(async collected => {
                                  if (collected.first().content.toLowerCase() === "no") {
                                    return message.channel.send(new Discord.MessageEmbed()
                                      .setFooter(es.footertext, es.footericon)
                                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                      .setTitle(`Setup for ${temptype}. Application System Completed!`)
                                      .setDescription(`You can apply start the Application Process in in <#in <#${applychannel}>>\n\nIf you wanna edit the Paramters of the Application ran \`${prefix}setup\` again and pick the ${temptype} Emoji!`)

                                    );
                                  } else {
                                    var role = collected.first().mentions.roles.map(role => role.id).join(" ");
                                    if (!role) return message.channel.send(new Discord.MessageEmbed()
                                      .setFooter(es.footertext, es.footericon)
                                      .setColor("ORANGE")
                                      .setTitle(`Setup for ${temptype}. Application System Completed! | BUT COULD NOT FIND ROLE, SO I DONT USE A ROLE`)
                                      .setDescription(`You can apply start the Application Process in in <#${applychannel}>\n\nIf you wanna edit the Paramters of the Application ran \`${prefix}setup\` again and pick the ${temptype} Emoji!`)

                                    );
                                    var guildrole = message.guild.roles.cache.get(role)

                                    if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                                      dynamic: true
                                    })))

                                    var botrole = message.guild.me.roles.highest
                                    console.log(guildrole.rawPosition)
                                    console.log(botrole.rawPosition)
                                    if (guildrole.rawPosition >= botrole.rawPosition) {
                                      message.channel.send(`I can't access that role, place \"me\" / \"my highest Role\" above other roles that you want me to manage.\n\n SO I AM USING **NO** ROLE, you can change it with: \`${prefix}setup\` -> ${temptype} Emoji -> :two:`)
                                      return message.channel.send(new Discord.MessageEmbed()
                                        .setFooter(es.footertext, es.footericon)
                                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                        .setTitle(`Setup for ${temptype}. Application System Completed!`)
                                        .setDescription(`You can apply start the Application Process in in <#${applychannel}>\n\nIf you wanna edit the Paramters of the Application ran \`${prefix}setup\` again and pick the ${temptype} Emoji!`)

                                      );
                                    }
                                    apply_for_here.set(message.guild.id, role, "TEMP_ROLE")
                                    return message.channel.send(new Discord.MessageEmbed()
                                      .setFooter(es.footertext, es.footericon)
                                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                      .setTitle(`Setup for ${temptype}. Application System Completed!`)
                                      .setDescription(`You can apply start the Application Process in in <#${applychannel}>\n\nIf you wanna edit the Paramters of the Application ran \`${prefix}setup\` again and pick the ${temptype} Emoji!`)
                                    );
                                  }
                                }).catch(error => {
                                  
                                  return message.reply(new Discord.MessageEmbed()
                                    .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                                    .setColor(es.wrongcolor)
                                    .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                                    .setFooter(es.footertext, es.footericon)
                                  );
                                })
                              })
                            }
                          }).catch(error => {
                            
                            return message.reply(new Discord.MessageEmbed()
                              .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                              .setColor(es.wrongcolor)
                              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                              .setFooter(es.footertext, es.footericon)
                            );
                          })
                        })
                      })
                  })
                })
              })

            }

            async function setup_without_channel_creation() {

              var applychannel;
              var f_applychannel;




              pickmsg = await message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What should be the Channel, where someone should __start__ the Application?").setDescription("Please ping the Channel #channel").setFooter(es.footertext, es.footericon))
              await pickmsg.channel.awaitMessages((m) => m.author.id === message.author.id, {
                  max: 1,
                  time: 180000,
                  erros: ["time"]
                }).then(collected => {
                  var channel = collected.first().mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
                  if (channel) {
                    applychannel = channel.id;
                  } else {
                    message.channel.send(new Discord.MessageEmbed()
                      .setColor("RED")
                      .setFooter(es.footertext, es.footericon)
                      .setTitle("<:no:833101993668771842> ERROR | INVALID INPUT | cancelled")
                      .setDescription("Please PING A TEXT CHANNEL, thanks\nRetry...")
                    ).then(msg => msg.delete({
                      timeout: 7500
                    }))
                    throw "<:no:833101993668771842> ERROR";
                  }
                })
                .catch(e => {
                  errored === true
                })
              if (errored)
                return message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("<:no:833101993668771842> ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(msg => msg.delete({
                  timeout: 7500
                }))




              pickmsg = await message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What should be the Channel, where the __finished__ Application should be sent?").setDescription("Please ping the Channel #channel").setFooter(es.footertext, es.footericon))
              await pickmsg.channel.awaitMessages((m) => m.author.id === message.author.id, {
                  max: 1,
                  time: 180000,
                  erros: ["time"]
                }).then(collected => {
                  var channel = collected.first().mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
                  if (channel) {
                    f_applychannel = channel.id;
                  } else {
                    message.channel.send(new Discord.MessageEmbed()
                      .setColor("RED")
                      .setFooter(es.footertext, es.footericon)
                      .setTitle("<:no:833101993668771842> ERROR | INVALID INPUT | cancelled")
                      .setDescription("Please PING A TEXT CHANNEL, thanks\nRetry...")
                    ).then(msg => msg.delete({
                      timeout: 7500
                    }))
                    throw "<:no:833101993668771842> ERROR";
                  }
                })
                .catch(e => {
                  errored === true
                })
              if (errored)
                return message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("<:no:833101993668771842> ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(msg => msg.delete({
                  timeout: 7500
                }))




              message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("Setting up...", "https://miro.medium.com/max/1600/1*e_Loq49BI4WmN7o9ItTADg.gif").setFooter(es.footertext, es.footericon))




              var embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
                .setColor("ORANGE")
                .setFooter(es.footertext, es.footericon)


              var msg = await message.channel.send(embed.setTitle("What should be the embed color?").setDescription("It MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)"))

              await msg.channel.awaitMessages(m => m.author.id === userid, {
                max: 1,
                time: 180000,
                errors: ["TIME"]
              }).then(collected => {
                var content = collected.first().content;
                if (!content.startsWith("#") && content.length !== 7) {
                  message.channel.send("WRONG COLOR! USING `GREEN`")
                } else {
                  if (isValidColor(content)) {
                    color = content;
                  } else {
                    message.channel.send("WRONG COLOR! USING `GREEN`")
                  }
                }

                function isValidColor(str) {
                  return str.match(/^#[a-f0-9]{6}$/i) !== null;
                }
              }).catch(e => {
                errored === true
              })
              if (errored)
                return message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("<:no:833101993668771842> ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(msg => msg.delete({
                  timeout: 7500
                }))

              await message.channel.send(embed.setTitle("What should be the embed TEXT?").setDescription("Like what do u want to have listed in the Embed?")).then(msg => {
                msg.channel.awaitMessages(m => m.author.id === userid, {
                  max: 1,
                  time: 180000,
                  errors: ["TIME"]
                }).then(collected => {
                  desc = collected.first().content;
                  var setupembed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
                    .setColor(color)
                    .setDescription(desc)
                    .setTitle("Apply for: `" + message.guild.name + "`")
                    .setFooter(es.footertext, es.footericon)
                  message.guild.channels.cache.get(applychannel).send(setupembed).then(msg => {
                    msg.react("✅")
                    apply_for_here.set(msg.guild.id, msg.id, "message_id")
                    apply_for_here.set(message.guild.id, f_applychannel, "f_channel_id")
                    apply_for_here.set(msg.guild.id, applychannel, "channel_id")
                  });
                  var counter = 0;
                  apply_for_here.set(msg.guild.id, [{
                    "1": "DEFAULT"
                  }], "QUESTIONS")
                  ask_which_qu();

                  function ask_which_qu() {
                    counter++;
                    if (counter === 25) {
                      message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setAuthor("You reached the maximum amount of Questions!", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/65/cross-mark_274c.png"))
                      return ask_addrole();
                    }
                    message.channel.send(embed.setTitle(`What should be the **${counter}** Question?`).setDescription("Enter `finish`, if you are finished with your Questions!")).then(msg => {
                      msg.channel.awaitMessages(m => m.author.id === userid, {
                        max: 1,
                        time: 180000,
                        errors: ["TIME"]
                      }).then(collected => {
                        if (collected.first().content.toLowerCase() === "finish") {
                          return ask_addrole();
                        }
                        switch (counter) {
                          case 1: {
                            apply_for_here.set(msg.guild.id, [], "QUESTIONS");
                            apply_for_here.push(msg.guild.id, {
                              "1": collected.first().content
                            }, "QUESTIONS");
                          }
                          break;
                        case 2:
                          apply_for_here.push(msg.guild.id, {
                            "2": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 3:
                          apply_for_here.push(msg.guild.id, {
                            "3": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 4:
                          apply_for_here.push(msg.guild.id, {
                            "4": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 5:
                          apply_for_here.push(msg.guild.id, {
                            "5": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 6:
                          apply_for_here.push(msg.guild.id, {
                            "6": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 7:
                          apply_for_here.push(msg.guild.id, {
                            "7": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 8:
                          apply_for_here.push(msg.guild.id, {
                            "8": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 9:
                          apply_for_here.push(msg.guild.id, {
                            "9": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 10:
                          apply_for_here.push(msg.guild.id, {
                            "10": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 11:
                          apply_for_here.push(msg.guild.id, {
                            "11": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 12:
                          apply_for_here.push(msg.guild.id, {
                            "12": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 13:
                          apply_for_here.push(msg.guild.id, {
                            "13": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 14:
                          apply_for_here.push(msg.guild.id, {
                            "14": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 15:
                          apply_for_here.push(msg.guild.id, {
                            "15": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 16:
                          apply_for_here.push(msg.guild.id, {
                            "16": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 17:
                          apply_for_here.push(msg.guild.id, {
                            "17": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 18:
                          apply_for_here.push(msg.guild.id, {
                            "18": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 19:
                          apply_for_here.push(msg.guild.id, {
                            "19": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 20:
                          apply_for_here.push(msg.guild.id, {
                            "20": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 21:
                          apply_for_here.push(msg.guild.id, {
                            "21": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 22:
                          apply_for_here.push(msg.guild.id, {
                            "22": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 23:
                          apply_for_here.push(msg.guild.id, {
                            "23": collected.first().content
                          }, "QUESTIONS");
                          break;
                        case 24:
                          apply_for_here.push(msg.guild.id, {
                            "24": collected.first().content
                          }, "QUESTIONS");
                          break;
                        }
                        ask_which_qu();
                      }).catch(e => {
                        errored === true
                      })
                      if (errored)
                        return message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("<:no:833101993668771842> ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(msg => msg.delete({
                          timeout: 7500
                        }))

                    })
                  }

                  function ask_addrole() {
                    message.channel.send(embed.setTitle(`Do you want to add a Role, when some1 applies?`).setDescription("Enter `no`, if not\n\nJust ping the Role")).then(msg => {
                      msg.channel.awaitMessages(m => m.author.id === userid, {
                        max: 1,
                        time: 180000,
                        errors: ["TIME"]
                      }).then(async collected => {
                        if (collected.first().content.toLowerCase() === "no") {
                          return message.channel.send(new Discord.MessageEmbed()
                            .setFooter(es.footertext, es.footericon)
                            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                            .setTitle(`Setup for ${temptype}. Application System Completed!`)
                            .setDescription(`You can apply start the Application Process in in <#${applychannel}>\n\nIf you wanna edit the Paramters of the Application ran \`${prefix}setup\` again and pick the ${temptype} Emoji!`)

                          );
                        } else {
                          var role = collected.first().mentions.roles.map(role => role.id).join(" ");
                          if (!role) return message.channel.send(new Discord.MessageEmbed()
                            .setFooter(es.footertext, es.footericon)
                            .setColor("ORANGE")
                            .setTitle(`Setup for ${temptype}. Application System Completed! | BUT COULD NOT FIND ROLE, SO I DONT USE A ROLE`)
                            .setDescription(`You can apply start the Application Process in in <#${applychannel}>\n\nIf you wanna edit the Paramters of the Application ran \`${prefix}setup\` again and pick the ${temptype} Emoji!`)

                          );
                          var guildrole = message.guild.roles.cache.get(role)

                          if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                            dynamic: true
                          })))

                          var botrole = message.guild.me.roles.highest
                          if (guildrole.rawPosition >= botrole.rawPosition) {
                            message.channel.send(`I can't access that role, place \"me\" / \"my highest Role\" above other roles that you want me to manage.\n\n SO I AM USING **NO** ROLE, you can change it with: \`${prefix}setup\` -> ${temptype} Emoji -> :two:`)
                            return message.channel.send(new Discord.MessageEmbed()
                              .setFooter(es.footertext, es.footericon)
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setTitle(`Setup for ${temptype}. Application System Completed!`)
                              .setDescription(`You can apply start the Application Process in in <#${applychannel}>\n\nIf you wanna edit the Paramters of the Application ran \`${prefix}setup\` again and pick the ${temptype} Emoji!`)

                            );
                          }
                          apply_for_here.set(message.guild.id, role, "TEMP_ROLE")
                          return message.channel.send(new Discord.MessageEmbed()
                            .setFooter(es.footertext, es.footericon)
                            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                            .setTitle(`Setup for ${temptype}. Application System Completed!`)
                            .setDescription(`You can apply start the Application Process in in <#${applychannel}>\n\nIf you wanna edit the Paramters of the Application ran \`${prefix}setup\` again and pick the ${temptype} Emoji!`)

                          );
                        }
                      }).catch(e => {
                        errored === true
                      })
                      if (errored)
                        return message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("<:no:833101993668771842> ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(msg => msg.delete({
                          timeout: 7500
                        }))
                    })
                  }
                }).catch(e => {
                  errored === true
                })
                if (errored)
                  return message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("<:no:833101993668771842> ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(msg => msg.delete({
                    timeout: 7500
                  }))

              })
            }
          } else if (reaction.emoji.name === "2️⃣") {
            var pickmsg = await tempmsg.edit({embed: new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setTitle("What do you want me to do?")
              .setDescription(
                `
    1️⃣ **==** Edit the **ACCEPT Message**
    2️⃣ **==** Edit the **DENY Message**
    3️⃣ **==** Edit the **TICKET Message**
    
    4️⃣ **==** Define the **ACCEPT Role**
    5️⃣ **==** Define the **TEMP Role**
    
    
    6️⃣ **==** Manage the **:one: EMOJI** (Role/Message) 
    7️⃣ **==** Manage the **:two: EMOJI** (Role/Message) 
    8️⃣ **==** Manage the **:three: EMOJI** (Role/Message) 
    9️⃣ **==** Manage the **:four: EMOJI** (Role/Message) 
    🔟 **==** Manage the **:five: EMOJI** (Role/Message) 
    
    🔴 **==** **Edit** a **Question**
    🟣 **==** **Add** a **Question**
    🟡 **==** **Remove** a **Question**
    
    
    🟢 **==** **Set** a new **Application Channel**
    🔵 **==** **Set** a new __finished__ **Applications Channel**

    ✋ **== ${apply_for_here.get(message.guild.id, "last_verify") ? "Enabled Last Verification": "Disabled Last Verification"}**
    `
              )
              .setFooter(es.footertext, es.footericon)})
            try {
              tempmsg.react("6️⃣")
              tempmsg.react("7️⃣")
              tempmsg.react("8️⃣")
              tempmsg.react("9️⃣")
              tempmsg.react("🔟")
              tempmsg.react("🔴")
              tempmsg.react("🟣")
              tempmsg.react("🟡")
              tempmsg.react("🟢")
              tempmsg.react("🔵")
              tempmsg.react("✋")
            } catch (e) {
              return message.reply(new Discord.MessageEmbed()
                .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
                .setColor("RED")
                .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            }
            await pickmsg.awaitReactions((reaction, user) => user.id === message.author.id, {
                max: 1,
                time: 180000,
                erros: ["time"]
              }).then(async collected => {
                var args;
                if (collected.first().emoji.name == "1️⃣") args = "acceptmsg"
                if (collected.first().emoji.name == "2️⃣") args = "denymsg"
                if (collected.first().emoji.name == "3️⃣") args = "ticketmsg"
                if (collected.first().emoji.name == "4️⃣") args = "acceptrole"
                if (collected.first().emoji.name == "5️⃣") args = "temprole"
                if (collected.first().emoji.name == "6️⃣") args = "emojione"
                if (collected.first().emoji.name == "7️⃣") args = "emojitwo"
                if (collected.first().emoji.name == "8️⃣") args = "emojithree"
                if (collected.first().emoji.name == "9️⃣") args = "emojifour"
                if (collected.first().emoji.name == "🔟") args = "emojifive"
                if (collected.first().emoji.name == "🔴") args = "editquestion"
                if (collected.first().emoji.name == "🟣") args = "addquestion"
                if (collected.first().emoji.name == "🟡") args = "removequestion"
                if (collected.first().emoji.name == "🟢") args = "applychannel"
                if (collected.first().emoji.name == "🔵") args = "finishedapplychannel"
                if (collected.first().emoji.name == "✋") args = "last_verify"
                switch (args) {
                  case "acceptmsg": {
                    message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept message?", message.author.displayAvatarURL({
                      dynamic: true
                    }))).then(msg => {
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 180000,
                        errors: ["TIME"]
                      }).then(collected => {
                        apply_for_here.set(message.guild.id, collected.first().content, "accept")
                        return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT MESSAGE!", message.author.displayAvatarURL({
                          dynamic: true
                        })))
                      }).catch(error => {
                        
                        return message.reply(new Discord.MessageEmbed()
                          .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                          .setColor(es.wrongcolor)
                          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                          .setFooter(es.footertext, es.footericon)
                        );
                      })
                    })
                  }
                  break;
                case "acceptrole": {
                  message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept Role, which will be granted when the User got accepted?", message.author.displayAvatarURL({
                    dynamic: true
                  }))).then(msg => {
                    msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      time: 180000,
                      errors: ["TIME"]
                    }).then(collected => {
                      var role = collected.first().mentions.roles.map(role => role.id).join(" ");
                      if (!role) return message.channel.send(`COULD NOT FIND THE ROLE!`)
                      var guildrole = message.guild.roles.cache.get(role)

                      if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                        dynamic: true
                      })))

                      var botrole = message.guild.me.roles.highest

                      if (guildrole.rawPosition <= botrole.rawPosition) {
                        apply_for_here.set(message.guild.id, role, "accept_role")
                        return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT ROLE!", message.author.displayAvatarURL({
                          dynamic: true
                        })))
                      } else {
                        return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                          dynamic: true
                        })))
                      }
                    }).catch(error => {
                      
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                    })
                  })
                }
                break;
                case "denymsg": {
                  message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new deny message?", message.author.displayAvatarURL({
                    dynamic: true
                  }))).then(msg => {
                    msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      time: 180000,
                      errors: ["TIME"]
                    }).then(collected => {
                      apply_for_here.set(message.guild.id, collected.first().content, "deny")
                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the DENY MESSAGE!", message.author.displayAvatarURL({
                        dynamic: true
                      })))
                    }).catch(error => {
                      
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                    })
                  })
                }
                break;
                case "ticketmsg": {
                  message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new Ticket message? | {user} pings the User", message.author.displayAvatarURL({
                    dynamic: true
                  }))).then(msg => {
                    msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      time: 180000,
                      errors: ["TIME"]
                    }).then(collected => {
                      apply_for_here.set(message.guild.id, collected.first().content, "ticket")
                      return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the TICKET MESSAGE!", message.author.displayAvatarURL({
                        dynamic: true
                      })))
                    }).catch(error => {
                      
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                    })
                  })
                }
                break;
                case "emojione": {
                  var type = ""
                  var tempmsg2;
                  tempmsg2 = await message.channel.send(new Discord.MessageEmbed()
                    .setTitle("What do you want to do?")
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`1️⃣ **==** Set the **message** which should be sent to the Applicant\n\n2️⃣ **==** **Set** the **Role** which I should give to the Applicant\n\n3️⃣ **==** **Delete** the **Role** which I should give to the Applicant\n\n4️⃣ **==** **Delete** the **Image** which should be sent to the Applicant\n\n5️⃣ **==** **Set** the **Image** which should be sent to the Applicant\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
                  )
                  try {
                    tempmsg2.react("1️⃣")
                    tempmsg2.react("2️⃣")
                    tempmsg2.react("3️⃣")
                    tempmsg2.react("4️⃣")
                    tempmsg2.react("5️⃣")
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
                      .setColor("RED")
                      .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
                      .setFooter(es.footertext, es.footericon)
                    );
                  }
                  await tempmsg2.awaitReactions(filter, {
                      max: 1,
                      time: 180000,
                      errors: ["time"]
                    })
                    .then(collected => {
                      var reaction = collected.first()
                      reaction.users.remove(message.author.id)
                      if (reaction.emoji.name === "1️⃣") type = "message";
                      else if (reaction.emoji.name === "2️⃣") type = "setrole";
                      else if (reaction.emoji.name === "3️⃣") type = "delrole";
                      else if (reaction.emoji.name === "4️⃣") type = "delimage";
                      else if (reaction.emoji.name === "5️⃣") type = "setimage";
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
                  switch (type) {
                    case "message": {
                      message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept message for emoji one?", message.author.displayAvatarURL({
                        dynamic: true
                      }))).then(msg => {
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                          max: 1,
                          time: 180000,
                          errors: ["TIME"]
                        }).then(collected => {
                          apply_for_here.set(message.guild.id, collected.first().content, "one.message")
                          return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT MESSAGE for emoji one!", message.author.displayAvatarURL({
                            dynamic: true
                          })))
                        }).catch(error => {
                          
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                            .setColor(es.wrongcolor)
                            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                            .setFooter(es.footertext, es.footericon)
                          );
                        })
                      })
                    }
                    break;
                  case "setrole": {
                    message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept Role, which will be granted when the User got accepted for emoji one?", message.author.displayAvatarURL({
                      dynamic: true
                    }))).then(msg => {
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 180000,
                        errors: ["TIME"]
                      }).then(collected => {
                        var role = collected.first().mentions.roles.map(role => role.id).join(" ");
                        if (!role) return message.channel.send(`COULD NOT FIND THE ROLE!`)
                        var guildrole = message.guild.roles.cache.get(role)

                        if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                          dynamic: true
                        })))

                        var botrole = message.guild.me.roles.highest

                        if (guildrole.rawPosition <= botrole.rawPosition) {
                          apply_for_here.set(message.guild.id, role, "one.role")
                          return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT ROLE for emoji one!", message.author.displayAvatarURL({
                            dynamic: true
                          })))
                        } else {
                          return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                            dynamic: true
                          })))
                        }
                      }).catch(error => {
                        
                        return message.reply(new Discord.MessageEmbed()
                          .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                          .setColor(es.wrongcolor)
                          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                          .setFooter(es.footertext, es.footericon)
                        );
                      })
                    })
                  }
                  break;
                  case "delrole": {
                    apply_for_here.set(message.guild.id, "", "one.role")
                    return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully deleted the ACCEPT ROLE for emoji one!", message.author.displayAvatarURL({
                      dynamic: true
                    })))
                  }
                  break;
                  case "delimage": {
                    apply_for_here.set(message.guild.id, false, "one.image.enabled")
                    apply_for_here.set(message.guild.id, "", "one.image.url")
                    return message.channel.send(new Discord.MessageEmbed()
                      .setFooter(es.footertext, es.footericon)

                      .setColor("GREEN")
                      .setTitle("Successfully __deleted__ the ACCEPT IMAGE for emoji **one**!")
                    )
                  }
                  case "setimage": {
                    try {
                      var url;
                      tempmsg2 = await tempmsg2.edit({embed: new Discord.MessageEmbed()
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setTitle("Which Image should i Use?")
                        .setDescription(`*Just Send the Url*`)
                        .setFooter("Pick the INDEX NUMBER / send the IMAGE URl", client.user.displayAvatarURL())
                        .setThumbnail(client.user.displayAvatarURL())}).then(msg => {
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                          max: 1,
                          time: 180000,
                          errors: ['time']
                        }).then(collected => {
                          if (collected.first().attachments.size > 0) {
                            if (collected.first().attachments.every(attachIsImage)) {
                              apply_for_here.set(message.guild.id, true, "one.image.enabled")
                              apply_for_here.set(message.guild.id, url, "one.image.url")
                              return message.channel.send(new Discord.MessageEmbed()
                                .setFooter(es.footertext, es.footericon)

                                .setColor("GREEN")
                                .setTitle("Successfully set the ACCEPT IMAGE for emoji **one**!")
                              )
                            } else {
                              return message.channel.send(new Discord.MessageEmbed()
                                .setTitle(`<:no:833101993668771842> ERROR | Could not your message as a backgroundimage`)
                                .setColor("RED")
                                .setFooter(es.footertext, es.footericon)
                              );
                            }
                          } else if (collected.first().content.includes("https") || collected.first().content.includes("http")) {
                            apply_for_here.set(message.guild.id, true, "one.image.enabled")
                            apply_for_here.set(message.guild.id, collected.first().content, "one.image.url")
                            return message.channel.send(new Discord.MessageEmbed()
                              .setFooter(es.footertext, es.footericon)

                              .setColor("GREEN")
                              .setTitle("Successfully set the ACCEPT IMAGE for emoji **one**!")
                            )
                          } else {
                            return message.channel.send(new Discord.MessageEmbed()
                              .setTitle(`<:no:833101993668771842> ERROR | Could not your message as a backgroundimage`)
                              .setColor("RED")
                              .setFooter(es.footertext, es.footericon)
                            );
                          }

                          function attachIsImage(msgAttach) {
                            url = msgAttach.url;

                            //True if this url is a png image.
                            return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                              url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                              url.indexOf("gif", url.length - "gif".length /*or 3*/ ) !== -1 ||
                              url.indexOf("webp", url.length - "webp".length /*or 3*/ ) !== -1 ||
                              url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
                          }
                        });
                      })
                    } catch (e) {
                      return message.channel.send(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor("RED")
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }


                  }

                  }
                }
                break;
                case "emojitwo": {
                  var type = ""
                  var tempmsg2;
                  tempmsg2 = await message.channel.send(new Discord.MessageEmbed()
                    .setTitle("What do you want to do?")
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`1️⃣ **==** Set the **message** which should be sent to the Applicant\n\n2️⃣ **==** **Set** the **Role** which I should give to the Applicant\n\n3️⃣ **==** **Delete** the **Role** which I should give to the Applicant\n\n4️⃣ **==** **Delete** the **Image** which should be sent to the Applicant\n\n5️⃣ **==** **Set** the **Image** which should be sent to the Applicant\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
                  )
                  try {
                    tempmsg2.react("1️⃣")
                    tempmsg2.react("2️⃣")
                    tempmsg2.react("3️⃣")
                    tempmsg2.react("4️⃣")
                    tempmsg2.react("5️⃣")
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
                      .setColor("RED")
                      .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
                      .setFooter(es.footertext, es.footericon)
                    );
                  }
                  await tempmsg2.awaitReactions(filter, {
                      max: 1,
                      time: 180000,
                      errors: ["time"]
                    })
                    .then(collected => {
                      var reaction = collected.first()
                      reaction.users.remove(message.author.id)
                      if (reaction.emoji.name === "1️⃣") type = "message";
                      else if (reaction.emoji.name === "2️⃣") type = "setrole";
                      else if (reaction.emoji.name === "3️⃣") type = "delrole";
                      else if (reaction.emoji.name === "4️⃣") type = "delimage";
                      else if (reaction.emoji.name === "5️⃣") type = "setimage";
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
                  switch (type) {
                    case "message": {
                      message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept message for emoji two?", message.author.displayAvatarURL({
                        dynamic: true
                      }))).then(msg => {
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                          max: 1,
                          time: 180000,
                          errors: ["TIME"]
                        }).then(collected => {
                          apply_for_here.set(message.guild.id, collected.first().content, "two.message")
                          return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT MESSAGE for emoji two!", message.author.displayAvatarURL({
                            dynamic: true
                          })))
                        }).catch(error => {
                          
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                            .setColor(es.wrongcolor)
                            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                            .setFooter(es.footertext, es.footericon)
                          );
                        })
                      })
                    }
                    break;
                  case "setrole": {
                    message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept Role, which will be granted when the User got accepted for emoji two?", message.author.displayAvatarURL({
                      dynamic: true
                    }))).then(msg => {
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 180000,
                        errors: ["TIME"]
                      }).then(collected => {
                        var role = collected.first().mentions.roles.map(role => role.id).join(" ");
                        if (!role) return message.channel.send(new Discord.MessageEmbed()
                          .setFooter(es.footertext, es.footericon)
                          .setColor("ORANGE")
                          .setTitle(`Setup for ${temptype}. Application System Completed! | BUT COULD NOT FIND ROLE, SO I DONT USE A ROLE`)
                          .setDescription(`You can apply start the Application Process in in <#${applychannel}>\n\nIf you wanna edit the Paramters of the Application ran \`${prefix}setup\` again and pick the ${temptype} Emoji!`)

                        );
                        var guildrole = message.guild.roles.cache.get(role)

                        if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                          dynamic: true
                        })))

                        var botrole = message.guild.me.roles.highest

                        if (guildrole.rawPosition <= botrole.rawPosition) {
                          apply_for_here.set(message.guild.id, role, "two.role")
                          return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT ROLE for emoji two!", message.author.displayAvatarURL({
                            dynamic: true
                          })))
                        } else {
                          return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                            dynamic: true
                          })))
                        }
                      }).catch(error => {
                        
                        return message.reply(new Discord.MessageEmbed()
                          .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                          .setColor(es.wrongcolor)
                          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                          .setFooter(es.footertext, es.footericon)
                        );
                      })
                    })
                  }
                  break;
                  case "delrole": {
                    apply_for_here.set(message.guild.id, "", "two.role")
                    return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully deleted the ACCEPT ROLE for emoji two!", message.author.displayAvatarURL({
                      dynamic: true
                    })))
                  }
                  break;
                  case "delimage": {
                    apply_for_here.set(message.guild.id, false, "two.image.enabled")
                    apply_for_here.set(message.guild.id, "", "two.image.url")
                    return message.channel.send(new Discord.MessageEmbed()
                      .setFooter(es.footertext, es.footericon)

                      .setColor("GREEN")
                      .setTitle("Successfully __deleted__ the ACCEPT IMAGE for emoji **two**!")
                    )
                  }
                  break;
                  case "setimage": {

                    try {
                      var url;
                      tempmsg2 = await tempmsg2.edit({embed: new Discord.MessageEmbed()
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setTitle("Which Image should i Use?")
                        .setDescription(`*Just Send the Url*`)
                        .setFooter("Pick the INDEX NUMBER / send the IMAGE URl", client.user.displayAvatarURL())
                        .setThumbnail(client.user.displayAvatarURL())}).then(msg => {
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                          max: 1,
                          time: 180000,
                          errors: ['time']
                        }).then(collected => {
                          if (collected.first().attachments.size > 0) {
                            if (collected.first().attachments.every(attachIsImage)) {
                              apply_for_here.set(message.guild.id, true, "two.image.enabled")
                              apply_for_here.set(message.guild.id, url, "two.image.url")
                              return message.channel.send(new Discord.MessageEmbed()
                                .setFooter(es.footertext, es.footericon)

                                .setColor("GREEN")
                                .setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **two**!")
                              )
                            } else {
                              return message.channel.send(new Discord.MessageEmbed()
                                .setTitle(`<:no:833101993668771842> ERROR | Could not your message as a backgroundimage`)
                                .setColor("RED")
                                .setFooter(es.footertext, es.footericon)
                              );
                            }
                          } else if (collected.first().content.includes("https") || collected.first().content.includes("http")) {
                            apply_for_here.set(message.guild.id, true, "two.image.enabled")
                            apply_for_here.set(message.guild.id, collected.first().content, "two.image.url")
                            return message.channel.send(new Discord.MessageEmbed()
                              .setFooter(es.footertext, es.footericon)

                              .setColor("GREEN")
                              .setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **two**!")
                            )
                          } else {
                            return message.channel.send(new Discord.MessageEmbed()
                              .setTitle(`<:no:833101993668771842> ERROR | Could not your message as a backgroundimage`)
                              .setColor("RED")
                              .setFooter(es.footertext, es.footericon)
                            );
                          }

                          function attachIsImage(msgAttach) {
                            url = msgAttach.url;

                            //True if this url is a png image.
                            return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                              url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                              url.indexOf("gif", url.length - "gif".length /*or 3*/ ) !== -1 ||
                              url.indexOf("webp", url.length - "webp".length /*or 3*/ ) !== -1 ||
                              url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
                          }
                        });
                      })
                    } catch (e) {
                      return message.channel.send(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor("RED")
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }

                  }
                  break;
                  }
                }
                break;
                case "emojithree": {
                  var type = ""
                  var tempmsg2;
                  tempmsg2 = await message.channel.send(new Discord.MessageEmbed()
                    .setTitle("What do you want to do?")
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`1️⃣ **==** Set the **message** which should be sent to the Applicant\n\n2️⃣ **==** **Set** the **Role** which I should give to the Applicant\n\n3️⃣ **==** **Delete** the **Role** which I should give to the Applicant\n\n4️⃣ **==** **Delete** the **Image** which should be sent to the Applicant\n\n5️⃣ **==** **Set** the **Image** which should be sent to the Applicant\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
                  )
                  try {
                    tempmsg2.react("1️⃣")
                    tempmsg2.react("2️⃣")
                    tempmsg2.react("3️⃣")
                    tempmsg2.react("4️⃣")
                    tempmsg2.react("5️⃣")
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
                      .setColor("RED")
                      .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
                      .setFooter(es.footertext, es.footericon)
                    );
                  }
                  await tempmsg2.awaitReactions(filter, {
                      max: 1,
                      time: 180000,
                      errors: ["time"]
                    })
                    .then(collected => {
                      var reaction = collected.first()
                      reaction.users.remove(message.author.id)
                      if (reaction.emoji.name === "1️⃣") type = "message";
                      else if (reaction.emoji.name === "2️⃣") type = "setrole";
                      else if (reaction.emoji.name === "3️⃣") type = "delrole";
                      else if (reaction.emoji.name === "4️⃣") type = "delimage";
                      else if (reaction.emoji.name === "5️⃣") type = "setimage";
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
                  switch (type) {
                    case "message": {
                      message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept message for emoji three?", message.author.displayAvatarURL({
                        dynamic: true
                      }))).then(msg => {
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                          max: 1,
                          time: 180000,
                          errors: ["TIME"]
                        }).then(collected => {
                          apply_for_here.set(message.guild.id, collected.first().content, "three.message")
                          return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT MESSAGE for emoji three!", message.author.displayAvatarURL({
                            dynamic: true
                          })))
                        }).catch(error => {
                          
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                            .setColor(es.wrongcolor)
                            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                            .setFooter(es.footertext, es.footericon)
                          );
                        })
                      })
                    }
                    break;
                  case "setrole": {
                    message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept Role, which will be granted when the User got accepted for emoji three?", message.author.displayAvatarURL({
                      dynamic: true
                    }))).then(msg => {
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 180000,
                        errors: ["TIME"]
                      }).then(collected => {
                        var role = collected.first().mentions.roles.map(role => role.id).join(" ");
                        if (!role) return message.channel.send(new Discord.MessageEmbed()
                          .setFooter(es.footertext, es.footericon)
                          .setColor("ORANGE")
                          .setTitle(`Setup for ${temptype}. Application System Completed! | BUT COULD NOT FIND ROLE, SO I DONT USE A ROLE`)
                          .setDescription(`You can apply start the Application Process in in <#${applychannel}>\n\nIf you wanna edit the Paramters of the Application ran \`${prefix}setup\` again and pick the ${temptype} Emoji!`)

                        );
                        var guildrole = message.guild.roles.cache.get(role)

                        if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                          dynamic: true
                        })))

                        var botrole = message.guild.me.roles.highest

                        if (guildrole.rawPosition <= botrole.rawPosition) {
                          apply_for_here.set(message.guild.id, role, "three.role")
                          return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT ROLE for emoji three!", message.author.displayAvatarURL({
                            dynamic: true
                          })))
                        } else {
                          return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                            dynamic: true
                          })))
                        }
                      }).catch(error => {
                        
                        return message.reply(new Discord.MessageEmbed()
                          .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                          .setColor(es.wrongcolor)
                          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                          .setFooter(es.footertext, es.footericon)
                        );
                      })
                    })
                  }
                  break;
                  case "delrole": {
                    apply_for_here.set(message.guild.id, "", "three.role")
                    return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully deleted the ACCEPT ROLE for emoji three!", message.author.displayAvatarURL({
                      dynamic: true
                    })))
                  }
                  break;
                  case "delimage": {
                    apply_for_here.set(message.guild.id, false, "three.image.enabled")
                    apply_for_here.set(message.guild.id, "", "three.image.url")
                    return message.channel.send(new Discord.MessageEmbed()
                      .setFooter(es.footertext, es.footericon)

                      .setColor("GREEN")
                      .setTitle("Successfully __deleted__ the ACCEPT IMAGE for emoji **three**!")
                    )
                  }
                  case "setimage": {
                    try {
                      var url;
                      tempmsg2 = await tempmsg2.edit({embed: new Discord.MessageEmbed()
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setTitle("Which Image should i Use?")
                        .setDescription(`*Just Send the Url*`)
                        .setFooter("Pick the INDEX NUMBER / send the IMAGE URl", client.user.displayAvatarURL())
                        .setThumbnail(client.user.displayAvatarURL())}).then(msg => {
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                          max: 1,
                          time: 180000,
                          errors: ['time']
                        }).then(collected => {
                          if (collected.first().attachments.size > 0) {
                            if (collected.first().attachments.every(attachIsImage)) {
                              apply_for_here.set(message.guild.id, true, "three.image.enabled")
                              apply_for_here.set(message.guild.id, url, "three.image.url")
                              return message.channel.send(new Discord.MessageEmbed()
                                .setFooter(es.footertext, es.footericon)

                                .setColor("GREEN")
                                .setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **three**!")
                              )
                            } else {
                              return message.channel.send(new Discord.MessageEmbed()
                                .setTitle(`<:no:833101993668771842> ERROR | Could not your message as a backgroundimage`)
                                .setColor("RED")
                                .setFooter(es.footertext, es.footericon)
                              );
                            }
                          } else if (collected.first().content.includes("https") || collected.first().content.includes("http")) {
                            apply_for_here.set(message.guild.id, true, "three.image.enabled")
                            apply_for_here.set(message.guild.id, collected.first().content, "three.image.url")
                            return message.channel.send(new Discord.MessageEmbed()
                              .setFooter(es.footertext, es.footericon)

                              .setColor("GREEN")
                              .setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **three**!")
                            )
                          } else {
                            return message.channel.send(new Discord.MessageEmbed()
                              .setTitle(`<:no:833101993668771842> ERROR | Could not your message as a backgroundimage`)
                              .setColor("RED")
                              .setFooter(es.footertext, es.footericon)
                            );
                          }

                          function attachIsImage(msgAttach) {
                            url = msgAttach.url;

                            //True if this url is a png image.
                            return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                              url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                              url.indexOf("gif", url.length - "gif".length /*or 3*/ ) !== -1 ||
                              url.indexOf("webp", url.length - "webp".length /*or 3*/ ) !== -1 ||
                              url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
                          }
                        });
                      })
                    } catch (e) {
                      return message.channel.send(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor("RED")
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }

                  }

                  default:
                    return message.channel.send(new Discord.MessageEmbed().setColor("RED").setTitle("<:no:833101993668771842> ERROR please enter a valid Option").setDescription(`Valid Options are: \`message\`, \`setimage\`, \`delimage\`, \`setrole\`, \`delrole\`\n\n\nExample usage: \`${prefix}editsetup emojithree message\` --> follow steps / \`${prefix}editsetup emojithree setrole\` --> follow steps`))
                    break;
                  }
                }
                break;
                case "emojifour": {
                  var type = ""
                  var tempmsg2;
                  tempmsg2 = await message.channel.send(new Discord.MessageEmbed()
                    .setTitle("What do you want to do?")
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`1️⃣ **==** Set the **message** which should be sent to the Applicant\n\n2️⃣ **==** **Set** the **Role** which I should give to the Applicant\n\n3️⃣ **==** **Delete** the **Role** which I should give to the Applicant\n\n4️⃣ **==** **Delete** the **Image** which should be sent to the Applicant\n\n5️⃣ **==** **Set** the **Image** which should be sent to the Applicant\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
                  )
                  try {
                    tempmsg2.react("1️⃣")
                    tempmsg2.react("2️⃣")
                    tempmsg2.react("3️⃣")
                    tempmsg2.react("4️⃣")
                    tempmsg2.react("5️⃣")
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
                      .setColor("RED")
                      .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
                      .setFooter(es.footertext, es.footericon)
                    );
                  }
                  await tempmsg2.awaitReactions(filter, {
                      max: 1,
                      time: 180000,
                      errors: ["time"]
                    })
                    .then(collected => {
                      var reaction = collected.first()
                      reaction.users.remove(message.author.id)
                      if (reaction.emoji.name === "1️⃣") type = "message";
                      else if (reaction.emoji.name === "2️⃣") type = "setrole";
                      else if (reaction.emoji.name === "3️⃣") type = "delrole";
                      else if (reaction.emoji.name === "4️⃣") type = "delimage";
                      else if (reaction.emoji.name === "5️⃣") type = "setimage";
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
                  switch (type) {
                    case "message": {
                      message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept message for emoji four?", message.author.displayAvatarURL({
                        dynamic: true
                      }))).then(msg => {
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                          max: 1,
                          time: 180000,
                          errors: ["TIME"]
                        }).then(collected => {
                          apply_for_here.set(message.guild.id, collected.first().content, "four.message")
                          return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT MESSAGE for emoji four!", message.author.displayAvatarURL({
                            dynamic: true
                          })))
                        }).catch(error => {
                          
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                            .setColor(es.wrongcolor)
                            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                            .setFooter(es.footertext, es.footericon)
                          );
                        })
                      })
                    }
                    break;
                  case "setrole": {
                    message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept Role, which will be granted when the User got accepted for emoji four?", message.author.displayAvatarURL({
                      dynamic: true
                    }))).then(msg => {
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 180000,
                        errors: ["TIME"]
                      }).then(collected => {
                        var role = collected.first().mentions.roles.map(role => role.id).join(" ");
                        if (!role) return message.channel.send(new Discord.MessageEmbed()
                          .setFooter(es.footertext, es.footericon)
                          .setColor("ORANGE")
                          .setTitle(`Setup for ${temptype}. Application System Completed! | BUT COULD NOT FIND ROLE, SO I DONT USE A ROLE`)
                          .setDescription(`You can apply start the Application Process in in <#${applychannel}>\n\nIf you wanna edit the Paramters of the Application ran \`${prefix}setup\` again and pick the ${temptype} Emoji!`)

                        );
                        var guildrole = message.guild.roles.cache.get(role)

                        if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                          dynamic: true
                        })))

                        var botrole = message.guild.me.roles.highest

                        if (guildrole.rawPosition <= botrole.rawPosition) {
                          apply_for_here.set(message.guild.id, role, "four.role")
                          return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT ROLE for emoji four!", message.author.displayAvatarURL({
                            dynamic: true
                          })))
                        } else {
                          return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                            dynamic: true
                          })))
                        }
                      }).catch(error => {
                        
                        return message.reply(new Discord.MessageEmbed()
                          .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                          .setColor(es.wrongcolor)
                          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                          .setFooter(es.footertext, es.footericon)
                        );
                      })
                    })
                  }
                  break;
                  case "delrole": {
                    apply_for_here.set(message.guild.id, "", "four.role")
                    return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully deleted the ACCEPT ROLE for emoji four!", message.author.displayAvatarURL({
                      dynamic: true
                    })))
                  }
                  break;
                  case "delimage": {
                    apply_for_here.set(message.guild.id, false, "four.image.enabled")
                    apply_for_here.set(message.guild.id, "", "four.image.url")
                    return message.channel.send(new Discord.MessageEmbed()
                      .setFooter(es.footertext, es.footericon)

                      .setColor("GREEN")
                      .setTitle("Successfully __deleted__ the ACCEPT IMAGE for emoji **four**!")
                    )
                  }
                  case "setimage": {
                    try {
                      var url;
                      tempmsg2 = await tempmsg2.edit({embed: new Discord.MessageEmbed()
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setTitle("Which Image should i Use?")
                        .setDescription(`*Just Send the Url*`)
                        .setFooter("Pick the INDEX NUMBER / send the IMAGE URl", client.user.displayAvatarURL())
                        .setThumbnail(client.user.displayAvatarURL())}).then(msg => {
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                          max: 1,
                          time: 180000,
                          errors: ['time']
                        }).then(collected => {
                          if (collected.first().attachments.size > 0) {
                            if (collected.first().attachments.every(attachIsImage)) {
                              apply_for_here.set(message.guild.id, true, "four.image.enabled")
                              apply_for_here.set(message.guild.id, url, "four.image.url")
                              return message.channel.send(new Discord.MessageEmbed()
                                .setFooter(es.footertext, es.footericon)

                                .setColor("GREEN")
                                .setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **four**!")
                              )
                            } else {
                              return message.channel.send(new Discord.MessageEmbed()
                                .setTitle(`<:no:833101993668771842> ERROR | Could not your message as a backgroundimage`)
                                .setColor("RED")
                                .setFooter(es.footertext, es.footericon)
                              );
                            }
                          } else if (collected.first().content.includes("https") || collected.first().content.includes("http")) {
                            apply_for_here.set(message.guild.id, true, "four.image.enabled")
                            apply_for_here.set(message.guild.id, collected.first().content, "four.image.url")
                            return message.channel.send(new Discord.MessageEmbed()
                              .setFooter(es.footertext, es.footericon)

                              .setColor("GREEN")
                              .setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **four**!")
                            )
                          } else {
                            return message.channel.send(new Discord.MessageEmbed()
                              .setTitle(`<:no:833101993668771842> ERROR | Could not your message as a backgroundimage`)
                              .setColor("RED")
                              .setFooter(es.footertext, es.footericon)
                            );
                          }

                          function attachIsImage(msgAttach) {
                            url = msgAttach.url;

                            //True if this url is a png image.
                            return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                              url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                              url.indexOf("gif", url.length - "gif".length /*or 3*/ ) !== -1 ||
                              url.indexOf("webp", url.length - "webp".length /*or 3*/ ) !== -1 ||
                              url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
                          }
                        });
                      })
                    } catch (e) {
                      return message.channel.send(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor("RED")
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }
                  }

                  default:
                    return message.channel.send(new Discord.MessageEmbed().setColor("RED").setTitle("<:no:833101993668771842> ERROR please enter a valid Option").setDescription(`Valid Options are: \`message\`, \`setimage\`, \`delimage\`, \`setrole\`, \`delrole\`\n\n\nExample usage: \`${prefix}editsetup emojifour message\` --> follow steps / \`${prefix}editsetup emojifour setrole\` --> follow steps`))
                    break;
                  }
                }

                break;
                case "emojifive": {
                  var type = ""
                  var tempmsg2;
                  tempmsg2 = await message.channel.send(new Discord.MessageEmbed()
                    .setTitle("What do you want to do?")
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`1️⃣ **==** Set the **message** which should be sent to the Applicant\n\n2️⃣ **==** **Set** the **Role** which I should give to the Applicant\n\n3️⃣ **==** **Delete** the **Role** which I should give to the Applicant\n\n4️⃣ **==** **Delete** the **Image** which should be sent to the Applicant\n\n5️⃣ **==** **Set** the **Image** which should be sent to the Applicant\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
                  )
                  try {
                    tempmsg2.react("1️⃣")
                    tempmsg2.react("2️⃣")
                    tempmsg2.react("3️⃣")
                    tempmsg2.react("4️⃣")
                    tempmsg2.react("5️⃣")
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
                      .setColor("RED")
                      .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
                      .setFooter(es.footertext, es.footericon)
                    );
                  }
                  await tempmsg2.awaitReactions(filter, {
                      max: 1,
                      time: 180000,
                      errors: ["time"]
                    })
                    .then(collected => {
                      var reaction = collected.first()
                      reaction.users.remove(message.author.id)
                      if (reaction.emoji.name === "1️⃣") type = "message";
                      else if (reaction.emoji.name === "2️⃣") type = "setrole";
                      else if (reaction.emoji.name === "3️⃣") type = "delrole";
                      else if (reaction.emoji.name === "4️⃣") type = "delimage";
                      else if (reaction.emoji.name === "5️⃣") type = "setimage";
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
                  switch (type) {
                    case "message": {
                      message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept message for emoji five?", message.author.displayAvatarURL({
                        dynamic: true
                      }))).then(msg => {
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                          max: 1,
                          time: 180000,
                          errors: ["TIME"]
                        }).then(collected => {
                          apply_for_here.set(message.guild.id, collected.first().content, "five.message")
                          return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT MESSAGE for emoji five!", message.author.displayAvatarURL({
                            dynamic: true
                          })))
                        }).catch(error => {
                          
                          return message.reply(new Discord.MessageEmbed()
                            .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                            .setColor(es.wrongcolor)
                            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                            .setFooter(es.footertext, es.footericon)
                          );
                        })
                      })
                    }
                    break;
                  case "setrole": {
                    message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new accept Role, which will be granted when the User got accepted for emoji five?", message.author.displayAvatarURL({
                      dynamic: true
                    }))).then(msg => {
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 180000,
                        errors: ["TIME"]
                      }).then(collected => {
                        var role = collected.first().mentions.roles.map(role => role.id).join(" ");
                        if (!role) return message.channel.send(new Discord.MessageEmbed()
                          .setFooter(es.footertext, es.footericon)
                          .setColor("ORANGE")
                          .setTitle(`Setup for ${temptype}. Application System Completed! | BUT COULD NOT FIND ROLE, SO I DONT USE A ROLE`)
                          .setDescription(`You can apply start the Application Process in in <#${applychannel}>\n\nIf you wanna edit the Paramters of the Application ran \`${prefix}setup\` again and pick the ${temptype} Emoji!`)

                        );
                        var guildrole = message.guild.roles.cache.get(role)

                        if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                          dynamic: true
                        })))

                        var botrole = message.guild.me.roles.highest

                        if (guildrole.rawPosition <= botrole.rawPosition) {
                          apply_for_here.set(message.guild.id, role, "five.role")
                          return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the ACCEPT ROLE for emoji five!", message.author.displayAvatarURL({
                            dynamic: true
                          })))
                        } else {
                          return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                            dynamic: true
                          })))
                        }
                      }).catch(error => {
                        
                        return message.reply(new Discord.MessageEmbed()
                          .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                          .setColor(es.wrongcolor)
                          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                          .setFooter(es.footertext, es.footericon)
                        );
                      })
                    })
                  }
                  break;
                  case "delrole": {
                    apply_for_here.set(message.guild.id, "", "five.role")
                    return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully deleted the ACCEPT ROLE for emoji five!", message.author.displayAvatarURL({
                      dynamic: true
                    })))
                  }
                  break;
                  case "delimage": {
                    apply_for_here.set(message.guild.id, false, "five.image.enabled")
                    apply_for_here.set(message.guild.id, "", "five.image.url")
                    return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully deleted the ACCEPT IMAGE for emoji five!", message.author.displayAvatarURL({
                      dynamic: true
                    })))
                  }
                  case "setimage": {
                    try {
                      var url;
                      tempmsg2 = await tempmsg2.edit({embed: new Discord.MessageEmbed()
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setTitle("Which Image should i Use?")
                        .setDescription(`*Just Send the Url*`)
                        .setFooter("Pick the INDEX NUMBER / send the IMAGE URl", client.user.displayAvatarURL())
                        .setThumbnail(client.user.displayAvatarURL())}).then(msg => {
                        msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                          max: 1,
                          time: 180000,
                          errors: ['time']
                        }).then(collected => {
                          if (collected.first().attachments.size > 0) {
                            if (collected.first().attachments.every(attachIsImage)) {
                              apply_for_here.set(message.guild.id, true, "five.image.enabled")
                              apply_for_here.set(message.guild.id, url, "five.image.url")
                              return message.channel.send(new Discord.MessageEmbed()
                                .setFooter(es.footertext, es.footericon)

                                .setColor("GREEN")
                                .setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **five**!")
                              )
                            } else {
                              return message.channel.send(new Discord.MessageEmbed()
                                .setTitle(`<:no:833101993668771842> ERROR | Could not your message as a backgroundimage`)
                                .setColor("RED")
                                .setFooter(es.footertext, es.footericon)
                              );
                            }
                          } else if (collected.first().content.includes("https") || collected.first().content.includes("http")) {
                            apply_for_here.set(message.guild.id, true, "five.image.enabled")
                            apply_for_here.set(message.guild.id, collected.first().content, "five.image.url")
                            return message.channel.send(new Discord.MessageEmbed()
                              .setFooter(es.footertext, es.footericon)

                              .setColor("GREEN")
                              .setTitle("Successfully __set__ the ACCEPT IMAGE for emoji **five**!")
                            )
                          } else {
                            return message.channel.send(new Discord.MessageEmbed()
                              .setTitle(`<:no:833101993668771842> ERROR | Could not your message as a backgroundimage`)
                              .setColor("RED")
                              .setFooter(es.footertext, es.footericon)
                            );
                          }

                          function attachIsImage(msgAttach) {
                            url = msgAttach.url;

                            //True if this url is a png image.
                            return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                              url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                              url.indexOf("gif", url.length - "gif".length /*or 3*/ ) !== -1 ||
                              url.indexOf("webp", url.length - "webp".length /*or 3*/ ) !== -1 ||
                              url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
                          }
                        });
                      })
                    } catch (e) {
                      return message.channel.send(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor("RED")
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                      );
                    }

                  }

                  default:
                    return message.channel.send(new Discord.MessageEmbed().setColor("RED").setTitle("<:no:833101993668771842> ERROR please enter a valid Option").setDescription(`Valid Options are: \`message\`, \`setimage\`, \`delimage\`, \`setrole\`, \`delrole\`\n\n\nExample usage: \`${prefix}editsetup emojifive message\` --> follow steps / \`${prefix}editsetup emojifive setrole\` --> follow steps`))
                    break;
                  }
                }
                break;
                case "editquestion": {
                  var Questions = apply_for_here.get(message.guild.id, "QUESTIONS");
                  var embed = new Discord.MessageEmbed()
                    .setFooter(es.footertext, es.footericon)

                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setTitle("Current Questions") //Tomato#6966
                    .setFooter("ADD THE INDEX TO EDIT THE MSG", message.guild.iconURL({
                      dynamic: true
                    }))
                    .setTimestamp()

                  for (var i = 0; i < Questions.length; i++) {
                    try {
                      embed.addField("**" + Object.keys(Questions[i]) + ".** ", Object.values(Questions[i]))
                    } catch (e) {
                      console.log(e)
                    }
                  }

                  message.channel.send(embed);
                  message.channel.send(new Discord.MessageEmbed()
                    .setFooter(es.footertext, es.footericon)

                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setTitle("What Question do you wanna __Edit__?")
                    .setDescription(`Just send the **INDEX** Number of the **Question** | \`1\` - \`${Questions.length}\``)
                  ).then(msg => {
                    msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      time: 180000,
                      errors: ["TIME"]
                    }).then(collected => {
                      var arr = apply_for_here.get(message.guild.id, "QUESTIONS");
                      var quindex = collected.first().content
                      if (arr.length >= Number(quindex)) {
                        message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("What should be the new Question?", message.author.displayAvatarURL({
                          dynamic: true
                        }))).then(msg => {
                          msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                            max: 1,
                            time: 180000,
                            errors: ["TIME"]
                          }).then(collected => {
                            var index = Number(quindex);
                            var obj;
                            switch (Number(index)) {
                              case 1:
                                obj = {
                                  "1": collected.first().content
                                };
                                break;
                              case 2:
                                obj = {
                                  "2": collected.first().content
                                };
                                break;
                              case 3:
                                obj = {
                                  "3": collected.first().content
                                };
                                break;
                              case 4:
                                obj = {
                                  "4": collected.first().content
                                };
                                break;
                              case 5:
                                obj = {
                                  "5": collected.first().content
                                };
                                break;
                              case 6:
                                obj = {
                                  "6": collected.first().content
                                };
                                break;
                              case 7:
                                obj = {
                                  "7": collected.first().content
                                };
                                break;
                              case 8:
                                obj = {
                                  "8": collected.first().content
                                };
                                break;
                              case 9:
                                obj = {
                                  "9": collected.first().content
                                };
                                break;
                              case 10:
                                obj = {
                                  "10": collected.first().content
                                };
                                break;
                              case 11:
                                obj = {
                                  "11": collected.first().content
                                };
                                break;
                              case 12:
                                obj = {
                                  "12": collected.first().content
                                };
                                break;
                              case 13:
                                obj = {
                                  "13": collected.first().content
                                };
                                break;
                              case 14:
                                obj = {
                                  "14": collected.first().content
                                };
                                break;
                              case 15:
                                obj = {
                                  "15": collected.first().content
                                };
                                break;
                              case 16:
                                obj = {
                                  "16": collected.first().content
                                };
                                break;
                              case 17:
                                obj = {
                                  "17": collected.first().content
                                };
                                break;
                              case 18:
                                obj = {
                                  "18": collected.first().content
                                };
                                break;
                              case 19:
                                obj = {
                                  "19": collected.first().content
                                };
                                break;
                              case 20:
                                obj = {
                                  "20": collected.first().content
                                };
                                break;
                              case 21:
                                obj = {
                                  "21": collected.first().content
                                };
                                break;
                              case 22:
                                obj = {
                                  "22": collected.first().content
                                };
                                break;
                              case 23:
                                obj = {
                                  "23": collected.first().content
                                };
                                break;
                              case 24:
                                obj = {
                                  "24": collected.first().content
                                };
                                break;
                            }
                            arr[index - 1] = obj;
                            apply_for_here.set(message.guild.id, arr, "QUESTIONS")
                            Questions = apply_for_here.get(message.guild.id, "QUESTIONS");
                            var new_embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
                              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setTitle("NEW Questions") //Tomato#6966
                              .setFooter(message.guild.name, message.guild.iconURL({
                                dynamic: true
                              }))
                              .setTimestamp()
                            for (var i = 0; i < Questions.length; i++) {
                              try {
                                new_embed.addField("**" + Object.keys(Questions[i]) + ".** ", Object.values(Questions[i]))
                              } catch {}
                            }
                            message.channel.send(new_embed);
                          }).catch(error => {
                            
                            return message.reply(new Discord.MessageEmbed()
                              .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                              .setColor(es.wrongcolor)
                              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                              .setFooter(es.footertext, es.footericon)
                            );
                          })
                        })
                      } else {
                        message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setAuthor("It seems, that this Question does not exist! Please retry! Here are all Questions:", message.author.displayAvatarURL({
                          dynamic: true
                        })))
                        return message.channel.send(embed);
                      }
                    }).catch(error => {
                      
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                    })
                  })



                }
                break;
                case "temprole":
                  message.channel.send(new Discord.MessageEmbed()
                    .setFooter(es.footertext, es.footericon)

                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setTitle("What should be the new temp Role, which will be granted once the user applied?")
                    .setDescription(`Just send the **ROLE** into the Channel. Simply **Ping** it!`)
                  ).then(msg => {
                    msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      time: 180000,
                      errors: ["TIME"]
                    }).then(collected => {
                      var role = collected.first().mentions.roles.map(role => role.id).join(" ");
                      if (!role) return message.channel.send(`COULD NOT FIND THE ROLE!`)
                      var guildrole = message.guild.roles.cache.get(role)

                      if (!message.guild.me.roles) return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                        dynamic: true
                      })))

                      var botrole = message.guild.me.roles.highest

                      if (guildrole.rawPosition <= botrole.rawPosition) {
                        apply_for_here.set(message.guild.id, role, "TEMP_ROLE")
                        return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully changed the TEMP ROLE!", message.author.displayAvatarURL({
                          dynamic: true
                        })))
                      } else {
                        return message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setDescription("Make sure that the Role is under me!").setAuthor("<:no:833101993668771842> ERROR | Could not Access the Role", message.author.displayAvatarURL({
                          dynamic: true
                        })))
                      }
                    }).catch(error => {
                      
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                    })
                  })
                  break;
                case "addquestion": {
                  message.channel.send(new Discord.MessageEmbed()
                    .setFooter(es.footertext, es.footericon)

                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setTitle("What should be the Question you wanna add?")
                    .setDescription(`Simply send the Question into the Text`)
                  ).then(msg => {
                    msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      time: 180000,
                      errors: ["TIME"]
                    }).then(collected => {
                      var Questions = apply_for_here.get(message.guild.id, "QUESTIONS")
                      var obj;
                      switch (Questions.length + 1) {
                        case 1:
                          obj = {
                            "1": collected.first().content
                          };
                          break;
                        case 2:
                          obj = {
                            "2": collected.first().content
                          };
                          break;
                        case 3:
                          obj = {
                            "3": collected.first().content
                          };
                          break;
                        case 4:
                          obj = {
                            "4": collected.first().content
                          };
                          break;
                        case 5:
                          obj = {
                            "5": collected.first().content
                          };
                          break;
                        case 6:
                          obj = {
                            "6": collected.first().content
                          };
                          break;
                        case 7:
                          obj = {
                            "7": collected.first().content
                          };
                          break;
                        case 8:
                          obj = {
                            "8": collected.first().content
                          };
                          break;
                        case 9:
                          obj = {
                            "9": collected.first().content
                          };
                          break;
                        case 10:
                          obj = {
                            "10": collected.first().content
                          };
                          break;
                        case 11:
                          obj = {
                            "11": collected.first().content
                          };
                          break;
                        case 12:
                          obj = {
                            "12": collected.first().content
                          };
                          break;
                        case 13:
                          obj = {
                            "13": collected.first().content
                          };
                          break;
                        case 14:
                          obj = {
                            "14": collected.first().content
                          };
                          break;
                        case 15:
                          obj = {
                            "15": collected.first().content
                          };
                          break;
                        case 16:
                          obj = {
                            "16": collected.first().content
                          };
                          break;
                        case 17:
                          obj = {
                            "17": collected.first().content
                          };
                          break;
                        case 18:
                          obj = {
                            "18": collected.first().content
                          };
                          break;
                        case 19:
                          obj = {
                            "19": collected.first().content
                          };
                          break;
                        case 20:
                          obj = {
                            "20": collected.first().content
                          };
                          break;
                        case 21:
                          obj = {
                            "21": collected.first().content
                          };
                          break;
                        case 22:
                          obj = {
                            "22": collected.first().content
                          };
                          break;
                        case 23:
                          obj = {
                            "23": collected.first().content
                          };
                          break;
                        case 24:
                          obj = {
                            "24": collected.first().content
                          };
                          break;
                      }
                      apply_for_here.push(message.guild.id, obj, "QUESTIONS")
                      message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("GREEN").setAuthor("Successfully added your Question!", message.author.displayAvatarURL({
                        dynamic: true
                      })))
                      Questions = apply_for_here.get(message.guild.id, "QUESTIONS");
                      var embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .setTitle("NEW Questions") //Tomato#6966
                        .setFooter(message.guild.name, message.guild.iconURL({
                          dynamic: true
                        }))
                        .setTimestamp()

                      for (var i = 0; i < Questions.length; i++) {
                        try {
                          embed.addField("**" + Object.keys(Questions[i]) + ".** ", Object.values(Questions[i]))
                        } catch (e) {
                          console.log(e)
                        }
                      }
                      message.channel.send(embed);
                    }).catch(error => {
                      
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                    })
                  })
                }
                break;
                case "removequestion": {
                  var Questions = apply_for_here.get(message.guild.id, "QUESTIONS");
                  var embed = new Discord.MessageEmbed()
                    .setFooter(es.footertext, es.footericon)

                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setTitle("Current Questions") //Tomato#6966
                    .setFooter("ADD THE INDEX TO EDIT THE MSG", message.guild.iconURL({
                      dynamic: true
                    }))
                    .setTimestamp()

                  for (var i = 0; i < Questions.length; i++) {
                    try {
                      embed.addField("**" + Object.keys(Questions[i]) + ".** ", Object.values(Questions[i]))
                    } catch (e) {
                      console.log(e)
                    }
                  }

                  message.channel.send(embed);
                  message.channel.send(new Discord.MessageEmbed()
                    .setFooter(es.footertext, es.footericon)

                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setTitle("What Question do you wanna Remove?")
                    .setDescription(`Just send the **INDEX** Number of the **Question** | \`1\` - \`${Questions.length}\``)
                  ).then(msg => {
                    msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      time: 180000,
                      errors: ["TIME"]
                    }).then(collected => {
                      var arr = apply_for_here.get(message.guild.id, "QUESTIONS");
                      var quindex = collected.first().content
                      if (arr.length >= Number(quindex)) {

                        var index = Number(quindex);
                        var counter = 0;
                        for (var item of arr) {
                          // console.log(Object.keys(item))
                          if (Object.keys(item) == index) {
                            arr.splice(counter, 1);
                          }
                          counter++;
                        }
                        counter = 0;
                        for (var item of arr) {
                          if (Object.keys(item) != counter + 1) {
                            var key = String(Object.keys(item));
                            item[key - 1] = item[key] //replace the item
                            delete item[key] //delete the old one
                            arr[counter] === item; //update it
                          }
                          counter++;
                        }
                        apply_for_here.set(message.guild.id, arr, "QUESTIONS")
                        Questions = apply_for_here.get(message.guild.id, "QUESTIONS");
                        var new_embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
                          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                          .setTitle("NEW Questions") //Tomato#6966
                          .setFooter(message.guild.name, message.guild.iconURL({
                            dynamic: true
                          }))
                          .setTimestamp()
                        for (var i = 0; i < Questions.length; i++) {
                          try {
                            new_embed.addField("**" + Object.keys(Questions[i]) + ".** ", Object.values(Questions[i]))
                          } catch {}
                        }
                        message.channel.send(new_embed);

                      } else {
                        message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor("RED").setAuthor("It seems, that this Question does not exist! Please retry! Here are all Questions:", message.author.displayAvatarURL({
                          dynamic: true
                        })))
                        return message.channel.send(embed);
                      }
                    }).catch(error => {
                      
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                    })
                  })


                }
                break;
                case "applychannel":
                  try {
                    var applychannel;
                    var f_applychannel;

                    var userid = message.author.id;
                    pickmsg = await message.channel.send(new Discord.MessageEmbed()
                      .setFooter(es.footertext, es.footericon)

                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setTitle("What should be the Channel, where someone should __start__ the Application?")
                      .setDescription("Please ping the Channel #channel")
                    )

                    await pickmsg.channel.awaitMessages((m) => m.author.id === message.author.id, {
                        max: 1,
                        time: 180000,
                        erros: ["time"]
                      }).then(collected => {
                        var channel = collected.first().mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
                        if (channel) {
                          applychannel = channel.id;
                        } else {
                          message.channel.send(new Discord.MessageEmbed()
                            .setColor("RED")
                            .setFooter(es.footertext, es.footericon)
                            .setTitle("<:no:833101993668771842> ERROR | INVALID INPUT | cancelled")
                            .setDescription("Please PING A TEXT CHANNEL, thanks\nRetry...")
                          ).then(msg => msg.delete({
                            timeout: 7500
                          }))
                          throw "<:no:833101993668771842> ERROR";
                        }
                      })
                      .catch(e => {
                        errored === true
                      })
                    if (errored)
                      return message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("<:no:833101993668771842> ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(msg => msg.delete({
                        timeout: 7500
                      }))

                    message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setAuthor("Setting up...", "https://miro.medium.com/max/1600/1*e_Loq49BI4WmN7o9ItTADg.gif").setFooter(es.footertext, es.footericon))
                    var embed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
                      .setColor("ORANGE")
                      .setFooter(es.footertext, es.footericon)
                    var msg = await message.channel.send(embed.setTitle("What should be the embed color?").setDescription("It MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)"))
                    await msg.channel.awaitMessages(m => m.author.id === userid, {
                      max: 1,
                      time: 180000,
                      errors: ["TIME"]
                    }).then(collected => {
                      var content = collected.first().content;
                      if (!content.startsWith("#") && content.length !== 7) {
                        message.channel.send("WRONG COLOR! USING `GREEN`")
                      } else {
                        if (isValidColor(content)) {
                          color = content;
                          if(color.toLowerCase() === "#ffffff")
                          color = "#fffff9"
                        } else {
                          message.channel.send("WRONG COLOR! USING `GREEN`")
                        }
                      }

                      function isValidColor(str) {
                        return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                    }).catch(e => {
                      errored === true
                    })
                    if (errored)
                      return message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("<:no:833101993668771842> ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(msg => msg.delete({
                        timeout: 7500
                      }))

                    await message.channel.send(embed.setTitle("What should be the embed TEXT?").setDescription("Like what do u want to have listed in the Embed?"))
                    await msg.channel.awaitMessages(m => m.author.id === userid, {
                      max: 1,
                      time: 180000,
                      errors: ["TIME"]
                    }).then(collected => {
                      desc = collected.first().content;
                      var setupembed = new Discord.MessageEmbed().setFooter(es.footertext, es.footericon)
                        .setColor(color)
                        .setDescription(desc)
                        .setTitle("Apply for: `" + message.guild.name + "`")
                        .setFooter(es.footertext, es.footericon)
                      console.log("F")
                      message.guild.channels.cache.get(applychannel).send(setupembed).then(msg => {
                        msg.react("✅")
                        apply_for_here.set(msg.guild.id, msg.id, "message_id")
                        apply_for_here.set(msg.guild.id, msg.channel.id, "channel_id")
                      }).catch(e=>console.log(e))
                      console.log("F")
                      return message.channel.send(new Discord.MessageEmbed()
                        .setFooter(es.footertext, es.footericon)
                        .setColor("ORANGE")
                        .setTitle(`Setup for ${temptype}. Application System Completed!`)
                        .setDescription(`You can apply start the Application Process in in <#${applychannel}>\n\nIf you wanna edit the Paramters of the Application ran \`${prefix}setup\` again and pick the ${temptype} Emoji!`)

                      );
                      console.log("F")
                    }).catch(e => {
                      errored === true
                    })
                    if (errored)
                      return message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("<:no:833101993668771842> ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(msg => msg.delete({
                        timeout: 7500
                      }))
                  } catch (e) {
                    console.log(e)
                    message.channel.send(new Discord.MessageEmbed()
                      .setColor("RED")
                      .setFooter(es.footertext, es.footericon)
                      .setTitle("<:no:833101993668771842> ERROR | ERROR")
                      .setDescription("```" + e.message + "```")
                    ).then(msg => msg.delete({
                      timeout: 7500
                    }))
                  }
                  break;
                case "finishedapplychannel":
                  try {
                    var applychannel;
                    var f_applychannel;

                    var userid = message.author.id;
                    pickmsg = await message.channel.send(new Discord.MessageEmbed().setFooter(es.footertext, es.footericon).setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("What should be the Channel, where the __finished__ Applications will be sent?").setDescription("Please ping the Channel #channel").setFooter(es.footertext, es.footericon))

                    await pickmsg.channel.awaitMessages((m) => m.author.id === message.author.id, {
                        max: 1,
                        time: 180000,
                        erros: ["time"]
                      }).then(collected => {
                        var channel = collected.first().mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
                        if (channel) {
                          f_applychannel = channel.id;
                        } else {
                          message.channel.send(new Discord.MessageEmbed()
                            .setColor("RED")
                            .setFooter(es.footertext, es.footericon)
                            .setTitle("<:no:833101993668771842> ERROR | INVALID INPUT | cancelled")
                            .setDescription("Please PING A TEXT CHANNEL, thanks\nRetry...")
                          ).then(msg => msg.delete({
                            timeout: 7500
                          }))
                          throw "<:no:833101993668771842> ERROR";
                        }
                      })
                      .catch(e => {
                        errored === true
                      })
                    if (errored)
                      return message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("<:no:833101993668771842> ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(msg => msg.delete({
                        timeout: 7500
                      }))
                    apply_for_here.set(message.guild.id, f_applychannel, "f_channel_id")
                    return message.channel.send(`I will now send the finished applications to: ${f_applychannel}`);

                  } catch (e) {
                    console.log(e)
                    message.channel.send(new Discord.MessageEmbed()
                      .setColor("RED")
                      .setFooter(es.footertext, es.footericon)
                      .setTitle("<:no:833101993668771842> ERROR | ERROR")
                      .setDescription("```" + e.message + "```")
                    ).then(msg => msg.delete({
                      timeout: 7500
                    }))
                  }
                  break;
                case "last_verify": {
                  apply_for_here.set(message.guild.id, !apply_for_here.get(message.guild.id, "last_verify"), "last_verify")
                  var embed = new Discord.MessageEmbed()
                    .setFooter(es.footertext, es.footericon)
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setTitle(`${apply_for_here.get(message.guild.id, "last_verify") ? "Enabled Last Verification": "Disabled Last Verification"}`) //Tomato#6966
                    .setDescription(`${apply_for_here.get(message.guild.id, "last_verify") ? "I will now ask the User a last Time if he really wanna apply for the Server": "I will not ask the User"}`) //Tomato#6966
                    .setTimestamp()
                  message.channel.send(embed);
                }
                break;
                }
              })
              .catch(e => {
                errored === true
              })
            if (errored)
              return message.channel.send(new Discord.MessageEmbed().setColor("RED").setFooter(es.footertext, es.footericon).setTitle("<:no:833101993668771842> ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(msg => msg.delete({
                timeout: 7500
              }))

          } else throw "You reacted with a wrong emoji"

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
