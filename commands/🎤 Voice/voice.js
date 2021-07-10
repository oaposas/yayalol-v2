const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
module.exports = {
    name: "voice",
    category: "🎤 Voice",
    aliases: [""],
    cooldown: 5,
    usage: "`voice <CMD_TYPE> [Options]`\n\nValid CMD_TYPES: `lock`, `invite`, `add`, `kick`, `unlock`, `ban`, `unban`, `trust`, `untrust`, `limit`, `bitrate`, `promote`",
    description: "The Voice Commands are there for the JOIN TO CREATE COMMANDS, use them to adjust your hosted channel!",
    run: async (client, message, args, cmduser, text, prefix) => {
      let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "VOICE")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
    try{
      
      let newargs = message.content.slice(prefix.length).split(/ +/).slice(1);
      let args = newargs;
      let cmd = args.shift().toLowerCase();
      if (cmd === "lock") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply(new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle("<:no:833101993668771842> You have to be in a VoiceChannel, for this Command")
          .setFooter(es.footertext, es.footericon)
        )
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
    
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> You have to be the Owner of the **temp.** VoiceChannel!")
              .setFooter(es.footertext, es.footericon)
            )
          vc.overwritePermissions([{
              id: message.guild.id,
              allow: ['VIEW_CHANNEL'],
              deny: ['CONNECT'],
            }])
            .then(lol => {
              vc.updateOverwrite(message.author.id, {
                MANAGE_CHANNELS: true,
                VIEW_CHANNEL: true,
                MANAGE_ROLES: true,
                CONNECT: true
              })
              return message.reply(new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setTitle("✅ LOCKED your Channel!")
                .setDescription(`Noone can join anymore!`)
                .setFooter(es.footertext, es.footericon)
              )
            })
    
        } else {
          return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> You have to be in a **temp.** VoiceChannel, for this Command!")
            .setFooter(es.footertext, es.footericon)
          )
        }
      } else if (cmd === "unlock") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply(new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle("<:no:833101993668771842> You have to be in a VoiceChannel, for this Command")
          .setFooter(es.footertext, es.footericon)
        )
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> You have to be the Owner of the **temp.** VoiceChannel!")
              .setFooter(es.footertext, es.footericon)
            )
          vc.updateOverwrite(message.guild.id, {
            VIEW_CHANNEL: true,
            CONNECT: true
          }).then(lol => {
            vc.updateOverwrite(message.author.id, {
              MANAGE_CHANNELS: true,
              VIEW_CHANNEL: true,
              MANAGE_ROLES: true,
              CONNECT: true
            })
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle("✅ UNLOCKED your Channel!")
              .setDescription(`Everyone can join now!`)
              .setFooter(es.footertext, es.footericon)
            )
          })
        } else {
          return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> You have to be in a **temp.** VoiceChannel, for this Command!")
            .setFooter(es.footertext, es.footericon)
          )
        }
      } else if (cmd === "kick") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply(new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle("<:no:833101993668771842> You have to be in a VoiceChannel, for this Command")
          .setFooter(es.footertext, es.footericon)
        )
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> You have to be the Owner of the **temp.** VoiceChannel!")
              .setFooter(es.footertext, es.footericon)
            )
          if (!args[0]) return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> Please add a User via Ping / ID!")
            .setDescription(`Useage: \`${prefix}kick @User\``)
            .setFooter(es.footertext, es.footericon)
          )
          let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]);
          if (!member || member == null || member == undefined) return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> Please add a User via Ping / ID!")
            .setDescription(`Useage: \`${prefix}kick @User\``)
            .setFooter(es.footertext, es.footericon)
          )
          if (!member.voice.channel)
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> Your pinged user, is not connected to a Channel")
              .setFooter(es.footertext, es.footericon)
            )
          if (member.voice.channel.id != channel.id)
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> Your pinged user, is not connected in your Channel")
              .setFooter(es.footertext, es.footericon)
            )
          try {
            member.voice.kick();
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(`✅ Kicked ${member.user.tag} out of your Channel`)
              .setFooter(es.footertext, es.footericon)
            )
          } catch (e) {
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> An Error occurred")
              .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
              .setFooter(es.footertext, es.footericon)
            )
          }
        } else {
          return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> You have to be in a **temp.** VoiceChannel, for this Command!")
            .setFooter(es.footertext, es.footericon)
          )
        }
      } else if (["invite", "add"].includes(cmd)) {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply(new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle("<:no:833101993668771842> You have to be in a VoiceChannel, for this Command")
          .setFooter(es.footertext, es.footericon)
        )
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> You have to be the Owner of the **temp.** VoiceChannel!")
              .setFooter(es.footertext, es.footericon)
            )
          if (!args[0]) return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> Please add a User via Ping / ID!")
            .setDescription(`Useage: \`${prefix}invite @User [optional Message]\``)
            .setFooter(es.footertext, es.footericon)
          )
          let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]);
          if (!member || member == null || member == undefined) return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> Please add a User via Ping / ID!")
            .setDescription(`Useage: \`${prefix}invite @User [optional Message]\``)
            .setFooter(es.footertext, es.footericon)
          )
          let txt = args.slice(1).join(" ");
          try {
            channel.createInvite().then(invite => {
              vc.updateOverwrite(member.user.id, {
                VIEW_CHANNEL: true,
                CONNECT: true
              }).then(lol => {
                vc.updateOverwrite(message.author.id, {
                  MANAGE_CHANNELS: true,
                  VIEW_CHANNEL: true,
                  MANAGE_ROLES: true,
                  CONNECT: true
                })
                member.user.send(new Discord.MessageEmbed()
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setTitle(`You got invited to join ${message.author.tag}'s Voice Channel`)
                  .setDescription(`[Click here](${invite.url}) to join **${channel.name}**\n\n${txt ? txt : ""}`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                ).catch(e => {
                  return message.reply(new Discord.MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setTitle(`<:no:833101993668771842> Error | Couldn't Dm \`${member.user.tag}\``)
                    .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                    .setFooter(es.footertext, es.footericon)
                  )
                })
              })
              return message.reply(new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setTitle(`✅ Invited ${member.user.tag} to your Channel`)
                .setFooter(es.footertext, es.footericon)
              )
            })
    
          } catch (e) {
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> An Error occurred")
              .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
              .setFooter(es.footertext, es.footericon)
            )
          }
        } else {
          return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> You have to be in a **temp.** VoiceChannel, for this Command!")
            .setFooter(es.footertext, es.footericon)
          )
        }
      } else if (cmd === "ban") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply(new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle("<:no:833101993668771842> You have to be in a VoiceChannel, for this Command")
          .setFooter(es.footertext, es.footericon)
        )
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> You have to be the Owner of the **temp.** VoiceChannel!")
              .setFooter(es.footertext, es.footericon)
            )
          if (!args[0]) return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> Please add a User via Ping / ID!")
            .setDescription(`Useage: \`${prefix}ban @User\``)
            .setFooter(es.footertext, es.footericon)
          )
          let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]);
          if (!member || member == null || member == undefined) return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> Please add a User via Ping / ID!")
            .setDescription(`Useage: \`${prefix}ban @User\``)
            .setFooter(es.footertext, es.footericon)
          )
          if (member.voice.channel && member.voice.channel.id == channel.id)
            try {
              member.voice.kick();
              message.reply(new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setTitle(`✅ Disconnected ${member.user.tag} out of your Channel`)
                .setFooter(es.footertext, es.footericon)
              )
            } catch (e) {
              message.reply(new Discord.MessageEmbed()
                .setColor(es.wrongcolor)
                .setTitle("<:no:833101993668771842> An Error occurred")
                .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                .setFooter(es.footertext, es.footericon)
              )
            }
          vc.updateOverwrite(member.user.id, {
            VIEW_CHANNEL: true,
            CONNECT: false
          }).then(lol => {
            vc.updateOverwrite(message.author.id, {
              MANAGE_CHANNELS: true,
              VIEW_CHANNEL: true,
              MANAGE_ROLES: true,
              CONNECT: true
            })
            message.reply(new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(`✅ Banned ${member.user.tag} out from your Channel!`)
              .setFooter(es.footertext, es.footericon)
            )
          })
    
    
        } else {
          return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> You have to be in a **temp.** VoiceChannel, for this Command!")
            .setFooter(es.footertext, es.footericon)
          )
        }
      } else if (cmd === "unban") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply(new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle("<:no:833101993668771842> You have to be in a VoiceChannel, for this Command")
          .setFooter(es.footertext, es.footericon)
        )
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> You have to be the Owner of the **temp.** VoiceChannel!")
              .setFooter(es.footertext, es.footericon)
            )
          if (!args[0]) return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> Please add a User via Ping / ID!")
            .setDescription(`Useage: \`${prefix}unban @User\``)
            .setFooter(es.footertext, es.footericon)
          )
          let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]);
          if (!member || member == null || member == undefined) return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> Please add a User via Ping / ID!")
            .setDescription(`Useage: \`${prefix}unban @User\``)
            .setFooter(es.footertext, es.footericon)
          )
          vc.updateOverwrite(member.user.id, {
            VIEW_CHANNEL: true,
            CONNECT: true
          }).then(lol => {
            vc.updateOverwrite(message.author.id, {
              MANAGE_CHANNELS: true,
              VIEW_CHANNEL: true,
              MANAGE_ROLES: true,
              CONNECT: true
            })
            message.reply(new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(`✅ Unbanned ${member.user.tag} from your Channel!`)
              .setDescription("He can now join your Channel again!")
              .setFooter(es.footertext, es.footericon)
            )
          })
        } else {
          return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> You have to be in a **temp.** VoiceChannel, for this Command!")
            .setFooter(es.footertext, es.footericon)
          )
        }
      } else if (cmd === "trust") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply(new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle("<:no:833101993668771842> You have to be in a VoiceChannel, for this Command")
          .setFooter(es.footertext, es.footericon)
        )
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> You have to be the Owner of the **temp.** VoiceChannel!")
              .setFooter(es.footertext, es.footericon)
            )
          if (!args[0]) return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> Please add a User via Ping / ID!")
            .setDescription(`Useage: \`${prefix}trust @User\``)
            .setFooter(es.footertext, es.footericon)
          )
          let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]);
          if (!member || member == null || member == undefined) return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> Please add a User via Ping / ID!")
            .setDescription(`Useage: \`${prefix}trust @User\``)
            .setFooter(es.footertext, es.footericon)
          )
          vc.updateOverwrite(member.user.id, {
            VIEW_CHANNEL: true,
            CONNECT: true
          }).then(lol => {
            vc.updateOverwrite(message.author.id, {
              MANAGE_CHANNELS: true,
              VIEW_CHANNEL: true,
              MANAGE_ROLES: true,
              CONNECT: true
            })
            message.reply(new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(`✅ Trusted ${member.user.tag} to your Channel!`)
              .setDescription("He can now join your Channel!")
              .setFooter(es.footertext, es.footericon)
            )
          })
        } else {
          return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> You have to be in a **temp.** VoiceChannel, for this Command!")
            .setFooter(es.footertext, es.footericon)
          )
        }
      } else if (cmd === "untrust") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply(new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle("<:no:833101993668771842> You have to be in a VoiceChannel, for this Command")
          .setFooter(es.footertext, es.footericon)
        )
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> You have to be the Owner of the **temp.** VoiceChannel!")
              .setFooter(es.footertext, es.footericon)
            )
          if (!args[0]) return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> Please add a User via Ping / ID!")
            .setDescription(`Useage: \`${prefix}untrust @User\``)
            .setFooter(es.footertext, es.footericon)
          )
          let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]);
          if (!member || member == null || member == undefined) return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> Please add a User via Ping / ID!")
            .setDescription(`Useage: \`${prefix}untrust @User\``)
            .setFooter(es.footertext, es.footericon)
          )
          vc.updateOverwrite(member.user.id, {
            VIEW_CHANNEL: true,
            CONNECT: false
          }).then(lol => {
            vc.updateOverwrite(message.author.id, {
              MANAGE_CHANNELS: true,
              VIEW_CHANNEL: true,
              MANAGE_ROLES: true,
              CONNECT: true
            })
            message.reply(new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(`✅ Untrusted ${member.user.tag} from your Channel!`)
              .setDescription("He can now no longer join your Channel!")
              .setFooter(es.footertext, es.footericon)
            )
          })
        } else {
          return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> You have to be in a **temp.** VoiceChannel, for this Command!")
            .setFooter(es.footertext, es.footericon)
          )
        }
      } else if (cmd === "limit") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply(new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle("<:no:833101993668771842> You have to be in a VoiceChannel, for this Command")
          .setFooter(es.footertext, es.footericon)
        )
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> You have to be the Owner of the **temp.** VoiceChannel!")
              .setFooter(es.footertext, es.footericon)
            )
          if (!args[0]) return message.reply(
            new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle("<:no:833101993668771842> You have to include the limit you want to set to")
          );
          if (isNaN(args[0])) return message.reply(
            new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle("<:no:833101993668771842> You have to include the limit you want to set to | It MUST be a **Numer**")
          );
          let userlimit = Number(args[0]);
          if (userlimit > 99 || userlimit < 0) return message.reply(
            new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle("<:no:833101993668771842> Your included Number is not in the valid Range (`0` - `99`)")
          );
          channel.setUserLimit(userlimit).then(vc => {
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(`✅ Set User-limit to \`${vc.userLimit}\``)
              .setFooter(es.footertext, es.footericon)
            )
          })
        } else {
          return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> You have to be in a **temp.** VoiceChannel, for this Command!")
            .setFooter(es.footertext, es.footericon)
          )
        }
      } else if (cmd === "bitrate") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply(new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle("<:no:833101993668771842> You have to be in a VoiceChannel, for this Command")
          .setFooter(es.footertext, es.footericon)
        )
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> You have to be the Owner of the **temp.** VoiceChannel!")
              .setFooter(es.footertext, es.footericon)
            )
          if (!args[0]) return message.reply(
            new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle("<:no:833101993668771842> You have to include the limit you want to set to")
          );
          if (isNaN(args[0])) return message.reply(
            new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle("<:no:833101993668771842> You have to include the limit you want to set to | It MUST be a **Numer**")
          );
          let maxbitrate = 96000;
          let boosts = message.guild.premiumSubscriptionCount;
          if (boosts >= 2) maxbitrate = 128000;
          if (boosts >= 15) maxbitrate = 256000;
          if (boosts >= 30) maxbitrate = 384000;
          let userlimit = Number(args[0]);
          if (userlimit > maxbitrate || userlimit < 8000) return message.reply(
            new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> Your included Number is not in the valid Range (\`8000\` - \`${maxbitrate}\`)`)
          );
          channel.setBitrate(userlimit).then(vc => {
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTitle(`✅ Set the Bitrate to \`${vc.bitrate}\``)
              .setFooter(es.footertext, es.footericon)
            )
          })
        } else {
          return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> You have to be in a **temp.** VoiceChannel, for this Command!")
            .setFooter(es.footertext, es.footericon)
          )
        }
      } else if (cmd === "promote") {
        let {
          channel
        } = message.member.voice;
        if (!channel) return message.reply(new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle("<:no:833101993668771842> You have to be in a VoiceChannel, for this Command")
          .setFooter(es.footertext, es.footericon)
        )
        client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
        client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
        if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
          var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
          let perms = vc.permissionOverwrites.map(c => c)
          let owner = false;
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
          }
          if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
          if (!owner)
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> You have to be the Owner of the **temp.** VoiceChannel!")
              .setFooter(es.footertext, es.footericon)
            )
          if (!args[0]) return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> Please add a User via Ping / ID!")
            .setDescription(`Useage: \`${prefix}promote @User\``)
            .setFooter(es.footertext, es.footericon)
          )
          let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]);
          if (!member || member == null || member == undefined) return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> Please add a User via Ping / ID!")
            .setDescription(`Useage: \`${prefix}promote @User\``)
            .setFooter(es.footertext, es.footericon)
          )
          if (!member.voice.channel)
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> Your pinged user, is not connected to a Channel")
              .setFooter(es.footertext, es.footericon)
            )
          if (member.voice.channel.id != channel.id)
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> Your pinged user, is not connected in your Channel")
              .setFooter(es.footertext, es.footericon)
            )
          try {
            vc.updateOverwrite(member.user.id, {
              MANAGE_CHANNELS: true,
              VIEW_CHANNEL: true,
              MANAGE_ROLES: true,
              CONNECT: true
            }).then(l => {
              vc.updateOverwrite(message.author.id, {
                  MANAGE_CHANNELS: false,
                  VIEW_CHANNEL: true,
                  MANAGE_ROLES: false,
                  CONNECT: true
                })
                .then(lol => {
                  client.jointocreatemap.set(`owner_${vc.guild.id}_${vc.id}`, member.user.id);
                  return message.reply(new Discord.MessageEmbed()
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setTitle(`✅ Promoted ${member.user.tag} to the new Owner of your Channel\nRemoved your permissions!`)
                    .setFooter(es.footertext, es.footericon)
                  )
                })
            })
          } catch (e) {
            return message.reply(new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle("<:no:833101993668771842> An Error occurred")
              .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
              .setFooter(es.footertext, es.footericon)
            )
          }
        } else {
          return message.reply(new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle("<:no:833101993668771842> You have to be in a **temp.** VoiceChannel, for this Command!")
            .setFooter(es.footertext, es.footericon)
          )
        }
      } else{
        return message.reply(new Discord.MessageEmbed()
        .setTitle("ERROR | Please add a VALID TYPE")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setDescription(`Useage: \`${prefix}voice <CMD_TYPE> [Options]\`\nValid CMD_TYPES: \`lock\`,\`invite\`,\`add\`,\`kick\`,\`unlock\`,\`ban\`,\`unban\`,\`trust\`,\`untrust\`,\`limit\`,\`bitrate\`,\`promote\``)
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
