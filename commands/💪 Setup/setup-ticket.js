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
  name: "setup-ticket",
  category: "💪 Setup",
  aliases: ["setupticket", "ticket-setup", "ticketsetup", "ticketsystem"],
  cooldown: 5,
  usage: "setup-ticket --> Follow Steps",
  description: "Manage 3 different Ticket Systems, Ticket-Roles, messages, create/disable",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    var es = client.settings.get(message.guild.id, "embed")
    try {
      var adminroles = client.settings.get(message.guild.id, "adminroles")
      var errored = false;

      var timeouterror = false;
      var filter = (reaction, user) => {
        return user.id === message.author.id;
      };
      var temptype = ""
      var tempmsg;

      tempmsg = await message.channel.send(new Discord.MessageEmbed()
        .setTitle("What do you want to do?")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setDescription(`1️⃣ **==** Manage the **first** Ticket System

2️⃣ **==** Manage the **second** Ticket System

3️⃣ **==** Manage the **third** Ticket System

4️⃣ **==** Manage the **fourth** Ticket System

5️⃣ **==** Manage the **fifth** Ticket System


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
          if (reaction.emoji.name === "1️⃣") temptype = ""
          else if (reaction.emoji.name === "2️⃣") temptype = "2"
          else if (reaction.emoji.name === "3️⃣") temptype = "3"
          else if (reaction.emoji.name === "4️⃣") temptype = "4"
          else if (reaction.emoji.name === "5️⃣") temptype = "5"
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


        var ticket = client.setups.get(message.guild.id, `ticketsystem${temptype}`);

        var rembed = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTitle("What do u want to do?")
          .setDescription(`
1️⃣ **==** Create Ticket-System - *Create ONE Ticket System for your Server*

2️⃣ **==** Edit Messages - *Edit the Message at the ticket open*

3️⃣ **==** **Add** Ticket-**Role** - *Adds a Role for Ticket Permissions*

4️⃣ **==** **Remove** Ticket-**Role** - *Removes a Role for Ticket Permissions*

5️⃣ **==** Define Open Ticket **Category**

6️⃣ Delete & Reset - *deletes current setup, which allows you to resetup*

`)
          .setFooter("Pick the INDEX NUMBER", es.footericon)
          

        tempmsg.edit({embed: rembed}).then(async msg => {
        msg.react("6️⃣")
          var originalauthor = message.author.id
          msg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          }).then(async collected => {
              switch (collected.first().emoji.name) {
                case "1️⃣":            

                var emoji;
                var emoji2react;
                var rermbed = new MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setTitle("What's the Emoji, which u want to be reacted at the Ticket?")
                .setDescription("React with the **wished Emoji** to **this** Message")
                var cancel = false;
                let msg = await message.channel.send(rermbed)
                await msg.awaitReactions((reaction, user) => user.id == originalauthor, {
                  max: 1,
                  time: 30000
                }).then(collected => {
                  if (collected.first().emoji.id && collected.first().emoji.id.length > 2) {
                    emoji2react = collected.first().emoji.id
                    if (collected.first().emoji.animated)
                      emoji = "<" + "a:" + collected.first().emoji.name + ":" + collected.first().emoji.id + ">";
                    else
                      emoji = "<" + ":" + collected.first().emoji.name + ":" + collected.first().emoji.id + ">";
                  } else if (collected.first().emoji.name) {
                    emoji = collected.first().emoji.name;
                    emoji2react = collected.first().emoji.name;
                  } else {
                    message.channel.send('Operation canceled. and finished!');
                    cancel = true;
                  }
                }).catch(() => {
                  if (!cancel) {
                    message.reply('No reaction after 30 seconds, operation canceled');
                    return
                  }
                });
                if(cancel) return;

                  var msg6 = new MessageEmbed()
                    .setTitle(`**Hey ${message.author.username}!**`)
                    .setDescription(`Please input the message of the ticket setup (React with ${emoji} to open a ticket | is always provided)`)
                    .setFooter(es.footertext, es.footericon)
                    
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    tempmsg = await msg.channel.send({embed: msg6}).then(msg => {
                    msg.channel.awaitMessages(m => m.author.id == originalauthor, {
                      max: 1,
                      time: 180000,
                      errors: ['time'],
                    }).then(collected => {
                      ticketmsg = collected.first().content;
                      message.guild.channels.create("Support - Tickets", {
                          type: 'category',
                          permissionOverwrites: [{
                            id: message.guild.id,
                            allow: ['READ_MESSAGE_HISTORY'],
                            deny: ['SEND_MESSAGES'],
                          }, ],
                        })
                        .then((channel) => {
                          //PARENT ID IN DB
                          client.setups.set(message.guild.id, channel.id, `ticketsystem${temptype}.parentid`);
                          //PARENT ID IN DB
                          var lol = message.guild.channels
                            .create("Create a ticket", {
                              type: 'text',
                              topic: `React with ${emoji} to open a Ticket`,
                              parent: channel.id,
                              permissionOverwrites: [{
                                id: message.guild.id,
                                allow: ['READ_MESSAGE_HISTORY'],
                                deny: ['SEND_MESSAGES'],
                              }, ],
                            })
                            .then((channel) => {
                              //channel id in db
                              client.setups.set(message.guild.id, channel.id, `ticketsystem${temptype}.channelid`);
                              //channel id in db
                              channel.send(new MessageEmbed()
                                .setTitle(`**Create a Ticket**`)
                                .setDescription(`${ticketmsg}\n\nReact with ${emoji} to open a ticket`)
                                .setFooter(es.footertext, es.footericon)
                                
                                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              ).then(msg => {
                                //message id in db
                                client.setups.set(message.guild.id, msg.id, `ticketsystem${temptype}.messageid`);
                                client.setups.set(message.guild.id, true, `ticketsystem${temptype}.enabled`);
                                msg.react(emoji2react)
                                var themebd = new MessageEmbed()
                                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                  .setTitle(`Your Ticket Setup is created, you can edit everything by running \`${prefix}setup\` again`)
                                  .setDescription(`<#${channel.id}>`)
                                  .setFooter(es.footertext, es.footericon)
                                  
                                message.reply(themebd)
                              })
                            })
                        })
                    }).catch(error => {
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                        .setColor(es.wrongcolor)
                        .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                        .setFooter(es.footertext, es.footericon)
                      );
                    })
                  });
                  break;
                case "6️⃣":
                  try {
                    var channel = message.guild.channels.cache.get(ticket.channelid)
                    channel.delete();
                  } catch {}
                  try {
                    var parent = message.guild.channels.cache.get(ticket.parentid)
                    parent.delete();
                  } catch {}
                  message.reply("Successfully resetted the current Ticket Setup!")
                  client.setups.set(message.guild.id, {
                    enabled: true,
                    guildid: message.guild.id,
                    messageid: "",
                    channelid: "",
                    parentid: "",
                    message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
                    adminroles: []
                  }, `ticketsystem${temptype}`);
                  break;
                case "2️⃣":
                  var rembed = new MessageEmbed()
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setFooter(es.footertext, es.footericon)
                    
                    .setTitle("Enter the message now!")
                    .setDescription(`{user} == the user who opens the ticket`)
                    tempmsg.edit({embed: rembed}).then(msg => {
                    msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      time: 30000,
                      errors: ['time']
                    }).then(collected => {
                      message.reply("Successfully changed the Message")
                      client.setups.set(message.guild.id, collected.first().content, `ticketsystem${temptype}.message`);
                      console.log(client.setups.get(message.guild.id, `ticketsystem${temptype}`));
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
                case "3️⃣":
                  var rrembed = new MessageEmbed()
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setFooter("Pick the INDEX NUMBER", es.footericon)
                    
                    .setTitle("Ping a Role now!")
                    .setDescription(`Just Ping the Role`)
                    tempmsg.edit({embed: rrembed}).then(msg => {
                    msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      time: 30000,
                      errors: ['time']
                    }).then(collected => {
                      var role = collected.first().mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
                      if (!role) message.reply("CANCELLED, u didn't Pingged a valid Role")
 
                      message.reply("Successfully **added**: `" + role.name + "` to the Admin-Roles");
                      client.setups.push(message.guild.id, role.id, `ticketsystem${temptype}.adminroles`);
                      
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
                case "4️⃣":
                  var rrrembed = new MessageEmbed()
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setFooter("Pick the INDEX NUMBER", es.footericon)
                    
                    .setTitle("Ping a Role now!")
                    .setDescription(`Just Ping the Role`)
                    tempmsg.edit({embed: rrrembed}).then(msg => {
                    msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      time: 30000,
                      errors: ['time']
                    }).then(collected => {
                      var role = collected.first().mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
                      if (!role) message.reply("CANCELLED, u didn't Pingged a valid Role")
                      try {
                        client.setups.remove(message.guild.id, role.id, `ticketsystem${temptype}.adminroles`);
                        message.reply("Successfully **removed**: `" + role.name + "` from the Admin-Roles");
                      } catch {
                        message.reply("ERROR -> Resetted all Admin roles")
                        client.setups.set(message.guild.id, [], `ticketsystem${temptype}.adminroles`);
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
                case "5️⃣":
                  var rembed = new MessageEmbed()
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setFooter(es.footertext, es.footericon)
                    
                    .setTitle("Enter the open Ticket Category now!")
                    .setDescription(`Just send the CATEGORY ID IN HERE, this is an example: \`833614604604276736\``)
                    tempmsg.edit({embed: rembed}).then(msg => {
                    msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      time: 30000,
                      errors: ['time']
                    }).then(collected => {
                      if(collected.first().content.length == 18){
                        try{
                          var cat = message.guild.channels.cache.get(collected.first().content)
                          message.reply("Successfully changed the Category")
                          client.setups.set(message.guild.id, cat.id, `ticketsystem${temptype}.parentid`);
                        }catch{
                          message.reply("INVALID ID")
                        }
                      }else{
                        message.reply("INVALID ID")
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
                default:
                  message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0, 1999))
                  break;
              }
            })
            .catch(e => {
              errored === true
            })
          if (errored)
            return message.channel.send(new Discord.MessageEmbed().setColor(es.wrongcolor).setFooter(es.footertext, es.footericon).setTitle("<:no:833101993668771842> ERROR | TIME RAN OUT / INVALID INPUT | cancelled").setDescription("```" + e.message + "```")).then(msg => msg.delete({
              timeout: 7500
            }))
        })

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
