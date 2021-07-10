const config = require(`../../botconfig/config.json`);
const ms = require(`ms`);
var ee = require(`../../botconfig/embed.json`)
const emoji = require(`../../botconfig/emojis.json`);
const {
  MessageEmbed
} = require(`discord.js`)
const {
  databasing
} = require("../../handlers/functions");
module.exports = {
  name: `mute`,
  category: `🚫 Administration`,
  aliases: [``],
  cooldown: 4,
  usage: `mute @User <Time+Format(e.g: 10m) / perma> [REASON]`,
  description: `Mutes a User for a specific Time!`,
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      if(!message.guild.me.hasPermission("MANAGE_ROLES"))      
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle("<:no:833101993668771842> I am missing the permission to `MANAGE ROLES`!")
      )
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.mute")
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
              client.settings.remove(message.guild.id, r, `cmdadminroles.mute`)
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
      let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first();
      if (!member)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> please ping a USER!`)
          .setDescription(` Usage: \`${prefix}mute @User <Time+Format(e.g: 10m) / perma> [REASON]\`\n\nExample: \`${prefix}mute @User 10m He is doing bad stuff!\``)
        );
      args.shift();
      if (member.roles.highest.position >= message.member.roles.highest.position)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> I cannot mute this Member, because he is higher/Equal to your Rang Position!`)
        );

      let time = args[0];
      if (!time)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> please add a TIME!`)
          .setDescription(` Usage: \`${prefix}mute @User <Time+Format(e.g: 10m) / perma> [REASON]\`\n\nExample: \`${prefix}mute @User 10m He is doing bad stuff!\``)
        );

      args.shift();
      let reason = args.join(` `);
      let allguildroles = message.guild.roles.cache.array();
      let mutedrole = false;
      for (let i = 0; i < allguildroles.length; i++) {
        if (allguildroles[i].name.toLowerCase().includes(`muted`)) {
          mutedrole = allguildroles[i];
          break;
        }
      }
      if (!mutedrole) {
        let highestrolepos = message.guild.me.roles.highest.position;
        mutedrole = await message.guild.roles.create({
          data: {
            name: `muted`,
            color: `#222222`,
            hoist: true,
            position: Number(highestrolepos) - 1
          },
          reason: `This role got created, to mute Members!`
        }).catch((e) => {
          console.log(String(e.stack).red);
          message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> I COULD NOT CREATE A ROLE, sorry`)
          );
        });
      }
      if (mutedrole.position > message.guild.me.roles.highest.position)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> I cannot access the Role, because it's above me`)
        );

      let mutetime;
      if(time.toLowerCase() === "perma"){
        try {
          mutetime = ms(time);
        } catch (e) {
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> please add a TIME!`)
            .setDescription(` Usage: \`${prefix}mute @User <Time+Format(e.g: 10m) / perma> [REASON]\`\n\nExample: \`${prefix}mute @User 10m He is doing bad stuff!\``)
          );
        }

        if (!mutetime || mutetime === undefined) return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> please add a TIME!`)
          .setDescription(` Usage: \`${prefix}mute @User <Time+Format(e.g: 10m) / perma> [REASON]\`\n\nExample: \`${prefix}mute @User 10m He is doing bad stuff!\``)
        );
        await message.guild.channels.cache.filter(c => !c.permissionOverwrites.has(mutedrole.id)).forEach((ch) => {
          try {
            ch.updateOverwrite(mutedrole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              CONNECT: false,
              SPEAK: false
            });
          } catch (e) {
            console.log(String(e.stack).red);
          }
        });
        try {
          member.roles.add(mutedrole);
        } catch (e) {
          message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> An error occurred`)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
          );
        }

        message.channel.send(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<a:yes:833101995723194437> \`${member.user.tag}\` got **MUTED** \`for ever\``)
          .setDescription(`Reason:\n> ${reason ? `${reason.substr(0, 1800)}` : `NO REASON`}`)
        );
        client.stats.push(message.guild.id+message.author.id, new Date().getTime(), "mute"); 
        member.send(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<a:yes:833101995723194437> \`${message.author.tag}\` muted you \`for ever\``)
          .setDescription(`Reason:\n> ${reason ? `${reason.substr(0, 1800)}` : `NO REASON`}`)
        );
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
      } else{
        try {
          mutetime = ms(time);
        } catch (e) {
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> please add a TIME!`)
            .setDescription(` Usage: \`${prefix}mute @User <Time+Format(e.g: 10m) / perma> [REASON]\`\n\nExample: \`${prefix}mute @User 10m He is doing bad stuff!\``)
          );
        }

        if (!mutetime || mutetime === undefined) return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> please add a TIME!`)
          .setDescription(` Usage: \`${prefix}mute @User <Time+Format(e.g: 10m) / perma> [REASON]\`\n\nExample: \`${prefix}mute @User 10m He is doing bad stuff!\``)
        );
        await message.guild.channels.cache.filter(c => !c.permissionOverwrites.has(mutedrole.id)).forEach((ch) => {
          try {
            ch.updateOverwrite(mutedrole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              CONNECT: false,
              SPEAK: false
            });
          } catch (e) {
            console.log(String(e.stack).red);
          }
        });
        try {
          member.roles.add(mutedrole);
        } catch (e) {
          message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> An error occurred`)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
          );
        }

        message.channel.send(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<a:yes:833101995723194437> \`${member.user.tag}\` got **MUTED** for \`${ms(mutetime, { long: true })}\``)
          .setDescription(`Reason:\n> ${reason ? `${reason.substr(0, 1800)}` : `NO REASON`}`)
        );
        client.stats.push(message.guild.id+message.author.id, new Date().getTime(), "mute"); 
        member.send(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<a:yes:833101995723194437> \`${message.author.tag}\` muted you for \`${ms(mutetime, { long: true })}\``)
          .setDescription(`Reason:\n> ${reason ? `${reason.substr(0, 1800)}` : `NO REASON`}`)
        );
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
        setTimeout(() => {
          try {
            message.channel.send(new MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setFooter(es.footertext, es.footericon)
              .setTitle(`<a:yes:833101995723194437> \`${member.user.tag}\` got **UNMUTED** after\`${ms(mutetime, { long: true })}\``)
              .setDescription(`Reason:\n> ${reason ? `${reason.substr(0, 1800)}` : `NO REASON`}`)
            );
            member.roles.remove(mutedrole);
          } catch (e) {
            return message.channel.send(new MessageEmbed()
              .setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
              .setTitle(`<:no:833101993668771842> An error occurred`)
              .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
            );
          }
        }, mutetime);
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
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
