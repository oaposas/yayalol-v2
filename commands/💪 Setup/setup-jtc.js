var { MessageEmbed } = require("discord.js");
var Discord = require("discord.js");
var config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
var {
  databasing
} = require(`../../handlers/functions`);
module.exports = {
    name: "setup-jtc",
    category: "💪 Setup",
    aliases: ["setup-jointocreate", "setupjtc", "setupjointocreate", "jtc-setup", "jtcsetup"],
    cooldown: 5,
    usage: "setup-jtc  -->  Follow Steps",
    description: "Manage 3 different Join to Create Systems",
    run: async (client, message, args, cmduser, text, prefix) => {
      var es = client.settings.get(message.guild.id, "embed")
    try{
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
          .setDescription(`1️⃣ **==** Manage the **first** Join to Create Setup\n\n2️⃣ **==** Manage the **second** Join to Create Setup\n\n3️⃣ **==** Manage the **third** Join to Create Setup\n\n\n\n*React with the Right Emoji according to the Right action*`)
          .setFooter(es.footertext, es.footericon)
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
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            if (reaction.emoji.name === "1️⃣") temptype = "1"
            else if (reaction.emoji.name === "2️⃣") temptype = "2"
            else if (reaction.emoji.name === "3️⃣") temptype = "3"
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
        //Channel Setup 1
        if (temptype == "1") {



        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////


        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("What do you want to do? | JOIN TO CREATE")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`
        1️⃣ **==** **Create** a Channel Setup 

        2️⃣ **==** **Use** the Channel you are currently **connected** to as a \`JOIN TO CREATE\` Channel

        3️⃣ **==** Manage the **Name** of the Created Channels

        *React with the Right Emoji according to the Right action*`)
          .setFooter(es.footertext, es.footericon)
        })
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(async collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            //Create CHANNEL
            if (reaction.emoji.name === "1️⃣") {
                var maxbitrate = 96000;
                var boosts = message.guild.premiumSubscriptionCount;
                if (boosts >= 2) maxbitrate = 128000;
                if (boosts >= 15) maxbitrate = 256000;
                if (boosts >= 30) maxbitrate = 384000;
                message.guild.channels.create("Join to Create", {
                  type: 'voice',
                  bitrate: maxbitrate,
                  userLimit: 4,
                  permissionOverwrites: [ //update the permissions
                    { //the role "EVERYONE" is just able to VIEW_CHANNEL and CONNECT
                      id: message.guild.id,
                      allow: ['VIEW_CHANNEL', "CONNECT"],
                      deny: ["SPEAK"]
                    },
                  ],
                }).then(vc => {
                  if (message.channel.parent) vc.setParent(message.channel.parent.id)
                  message.reply(new Discord.MessageEmbed()
                    .setTitle("✅ Setup Complete for Join to Create")
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`Bound to Channel: \`${vc.name}\`\nPlease rejoin!\n\nNote that I will sync the **SETTINGS** from \`${vc.name}\`!\nLike, **Bitrate** and **Userlimit**\n\nNote that I will sync the **PERMISSIONS** from \`${vc.parent ? vc.parent.name : "A PARENT, IF THE CHANNEL GETS MOVED TO THERE"}\`!\nLike, which Role / User is allowed to do smt, or to not do smt`)
                  .setFooter(es.footertext, es.footericon)
                  );
                  client.jtcsettings.set(message.guild.id, vc.id, `channel`);
                })
              
            }
            //Use the Current CHANNEL
            else if (reaction.emoji.name === "2️⃣") {
              var {
                channel
              } = message.member.voice;
              if (!channel) return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> You are not connected to a Channel")
                  .setColor(es.wrongcolor)
                  .setDescription(`Please redo the Setup, and join a Channel`)
                  .setFooter(es.footertext, es.footericon)
                );
                message.reply(new Discord.MessageEmbed()
                  .setTitle("✅ Setup Complete for Join to Create")
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`Bound to Channel: \`${channel.name}\`\nPlease rejoin!\n\nNote that I will sync the **SETTINGS** from \`${channel.name}\`!\nLike, **Bitrate** and **Userlimit**\n\nNote that I will sync the **PERMISSIONS** from \`${channel.parent ? channel.parent.name : "A PARENT, IF THE CHANNEL GETS MOVED TO THERE"}\`!\nLike, which Role / User is allowed to do smt, or to not do smt`)
                  .setFooter(es.footertext, es.footericon)
                );
                client.jtcsettings.set(message.guild.id, channel.id, `channel`);
            }
            //Change the NAME
            else if (reaction.emoji.name === "3️⃣") {

              tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                .setTitle("What should be the new Hosted Channel Names?")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`Note that, if you add \`{user}\` it will be replaced with the **USERNAME**`)
                .setFooter(es.footertext, es.footericon)
              })
              await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                  max: 1,
                  time: 90000,
                  errors: ["time"]
                })
                .then(collected => {
                  client.jtcsettings.set(message.guild.id, collected.first().content, "channelname");
                  message.channel.send(new Discord.MessageEmbed()
                    .setTitle("✅ Successfully changed the Channelname for the temp. Channels")
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`New Channelname: \`${client.jtcsettings.get(message.guild.id, "channelname")}\`\n\nWhat it could look like: \`${client.jtcsettings.get(message.guild.id, "channelname").replace("{user}", message.author.username)}\``)
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

        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////

        }
        //channel Setup 2
        else if (temptype == "2") {



          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
  
  
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle("What do you want to do? | JOIN TO CREATE")
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`
          1️⃣ **==** **Create** a Channel Setup 
  
          2️⃣ **==** **Use** the Channel you are currently **connected** to as a \`JOIN TO CREATE\` Channel
  
          3️⃣ **==** Manage the **Name** of the Created Channels
  
          *React with the Right Emoji according to the Right action*`)
            .setFooter(es.footertext, es.footericon)
          })
          await tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(async collected => {
              var reaction = collected.first()
              reaction.users.remove(message.author.id)
              //Create CHANNEL
              if (reaction.emoji.name === "1️⃣") {
                  var maxbitrate = 96000;
                  var boosts = message.guild.premiumSubscriptionCount;
                  if (boosts >= 2) maxbitrate = 128000;
                  if (boosts >= 15) maxbitrate = 256000;
                  if (boosts >= 30) maxbitrate = 384000;
                  message.guild.channels.create("Join to Create", {
                    type: 'voice',
                    bitrate: maxbitrate,
                    userLimit: 4,
                    permissionOverwrites: [ //update the permissions
                      { //the role "EVERYONE" is just able to VIEW_CHANNEL and CONNECT
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL', "CONNECT"],
                        deny: ["SPEAK"]
                      },
                    ],
                  }).then(vc => {
                    if (message.channel.parent) vc.setParent(message.channel.parent.id)
                    message.reply(new Discord.MessageEmbed()
                      .setTitle("✅ Setup Complete for Join to Create")
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setDescription(`Bound to Channel: \`${vc.name}\`\nPlease rejoin!\n\nNote that I will sync the **SETTINGS** from \`${vc.name}\`!\nLike, **Bitrate** and **Userlimit**\n\nNote that I will sync the **PERMISSIONS** from \`${vc.parent ? vc.parent.name : "A PARENT, IF THE CHANNEL GETS MOVED TO THERE"}\`!\nLike, which Role / User is allowed to do smt, or to not do smt`)
                    .setFooter(es.footertext, es.footericon)
                    );
                    client.jtcsettings2.set(message.guild.id, vc.id, `channel`);
                  })
                
              }
              //Use the Current CHANNEL
              else if (reaction.emoji.name === "2️⃣") {
                var {
                  channel
                } = message.member.voice;
                if (!channel) return message.reply(new Discord.MessageEmbed()
                    .setTitle("<:no:833101993668771842> You are not connected to a Channel")
                    .setColor(es.wrongcolor)
                    .setDescription(`Please redo the Setup, and join a Channel`)
                    .setFooter(es.footertext, es.footericon)
                  );
                  message.reply(new Discord.MessageEmbed()
                    .setTitle("✅ Setup Complete for Join to Create")
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`Bound to Channel: \`${channel.name}\`\nPlease rejoin!\n\nNote that I will sync the **SETTINGS** from \`${channel.name}\`!\nLike, **Bitrate** and **Userlimit**\n\nNote that I will sync the **PERMISSIONS** from \`${channel.parent ? channel.parent.name : "A PARENT, IF THE CHANNEL GETS MOVED TO THERE"}\`!\nLike, which Role / User is allowed to do smt, or to not do smt`)
                    .setFooter(es.footertext, es.footericon)
                  );
                  client.jtcsettings2.set(message.guild.id, channel.id, `channel`);
              }
              //Change the NAME
              else if (reaction.emoji.name === "3️⃣") {
  
                tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                  .setTitle("What should be the new Hosted Channel Names?")
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`Note that, if you add \`{user}\` it will be replaced with the **USERNAME**`)
                  .setFooter(es.footertext, es.footericon)
                })
                await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 90000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    client.jtcsettings2.set(message.guild.id, collected.first().content, "channelname");
                    message.channel.send(new Discord.MessageEmbed()
                      .setTitle("✅ Successfully changed the Channelname for the temp. Channels")
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setDescription(`New Channelname: \`${client.jtcsettings2.get(message.guild.id, "channelname")}\`\n\nWhat it could look like: \`${client.jtcsettings2.get(message.guild.id, "channelname").replace("{user}", message.author.username)}\``)
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
  
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
  
        }
        //Channel Setup 3, Tomato's Dick is huge
        else if (temptype == "3") {



          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
  
  
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle("What do you want to do? | JOIN TO CREATE")
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`
          1️⃣ **==** **Create** a Channel Setup 
  
          2️⃣ **==** **Use** the Channel you are currently **connected** to as a \`JOIN TO CREATE\` Channel
  
          3️⃣ **==** Manage the **Name** of the Created Channels
  
          *React with the Right Emoji according to the Right action*`)
            .setFooter(es.footertext, es.footericon)
          })
          await tempmsg.awaitReactions(filter, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(async collected => {
              var reaction = collected.first()
              reaction.users.remove(message.author.id)
              //Create CHANNEL
              if (reaction.emoji.name === "1️⃣") {
                  var maxbitrate = 96000;
                  var boosts = message.guild.premiumSubscriptionCount;
                  if (boosts >= 2) maxbitrate = 128000;
                  if (boosts >= 15) maxbitrate = 256000;
                  if (boosts >= 30) maxbitrate = 384000;
                  message.guild.channels.create("Join to Create", {
                    type: 'voice',
                    bitrate: maxbitrate,
                    userLimit: 4,
                    permissionOverwrites: [ //update the permissions
                      { //the role "EVERYONE" is just able to VIEW_CHANNEL and CONNECT
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL', "CONNECT"],
                        deny: ["SPEAK"]
                      },
                    ],
                  }).then(vc => {
                    if (message.channel.parent) vc.setParent(message.channel.parent.id)
                    message.reply(new Discord.MessageEmbed()
                      .setTitle("✅ Setup Complete for Join to Create")
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setDescription(`Bound to Channel: \`${vc.name}\`\nPlease rejoin!\n\nNote that I will sync the **SETTINGS** from \`${vc.name}\`!\nLike, **Bitrate** and **Userlimit**\n\nNote that I will sync the **PERMISSIONS** from \`${vc.parent ? vc.parent.name : "A PARENT, IF THE CHANNEL GETS MOVED TO THERE"}\`!\nLike, which Role / User is allowed to do smt, or to not do smt`)
                    .setFooter(es.footertext, es.footericon)
                    );
                    client.jtcsettings3.set(message.guild.id, vc.id, `channel`);
                  })
                
              }
              //Use the Current CHANNEL
              else if (reaction.emoji.name === "2️⃣") {
                var {
                  channel
                } = message.member.voice;
                if (!channel) return message.reply(new Discord.MessageEmbed()
                    .setTitle("<:no:833101993668771842> You are not connected to a Channel")
                    .setColor(es.wrongcolor)
                    .setDescription(`Please redo the Setup, and join a Channel`)
                    .setFooter(es.footertext, es.footericon)
                  );
                  message.reply(new Discord.MessageEmbed()
                    .setTitle("✅ Setup Complete for Join to Create")
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setDescription(`Bound to Channel: \`${channel.name}\`\nPlease rejoin!\n\nNote that I will sync the **SETTINGS** from \`${channel.name}\`!\nLike, **Bitrate** and **Userlimit**\n\nNote that I will sync the **PERMISSIONS** from \`${channel.parent ? channel.parent.name : "A PARENT, IF THE CHANNEL GETS MOVED TO THERE"}\`!\nLike, which Role / User is allowed to do smt, or to not do smt`)
                    .setFooter(es.footertext, es.footericon)
                  );
                  client.jtcsettings3.set(message.guild.id, channel.id, `channel`);
              }
              //Change the NAME
              else if (reaction.emoji.name === "3️⃣") {
  
                tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
                  .setTitle("What should be the new Hosted Channel Names?")
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`Note that, if you add \`{user}\` it will be replaced with the **USERNAME**`)
                  .setFooter(es.footertext, es.footericon)
                })
                await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 90000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    client.jtcsettings3.set(message.guild.id, collected.first().content, "channelname");
                    message.channel.send(new Discord.MessageEmbed()
                      .setTitle("✅ Successfully changed the Channelname for the temp. Channels")
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setDescription(`New Channelname: \`${client.jtcsettings3.get(message.guild.id, "channelname")}\`\n\nWhat it could look like: \`${client.jtcsettings3.get(message.guild.id, "channelname").replace("{user}", message.author.username)}\``)
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
  
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
          ///////////////////////////////////
  
        } 
        //Else do THAT
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
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
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
