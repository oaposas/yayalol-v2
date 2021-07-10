const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  databasing
} = require("../../handlers/functions");
module.exports = {
  name: `ban`,
  category: `🚫 Administration`,
  aliases: [`banhammer`, "tempban"],
  description: `Bans a Member from a Guild`,
  usage: `ban @User [0-7 Days, 0 == Infinite] [Reason]`,
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")

    try {
      if(!message.guild.me.hasPermission("BAN_MEMBERS"))      
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle("I am missing the permission to `BAN MEMBERS`!")
      )
      databasing(client, message.guild.id, message.author.id);
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.ban")
      var cmdrole = []
      if (cmdroles.length > 0) {
        for (const r of cmdroles) {
          if (message.guild.roles.cache.get(r)) {
            cmdrole.push(` | <@&${r}>`)
          } else if (message.guild.members.cache.get(r)) {
            cmdrole.push(` | <@${r}>`)
          } else {
            console.log("F")
            console.log(r)
            client.settings.remove(message.guild.id, r, `cmdadminroles.ban`)
          }
        }
      }
      if ((message.member.roles.cache.array() && !message.member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(message.author.id) && (message.member.roles.cache.array() && !message.member.roles.cache.some(r => adminroles.includes(r.id))) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`You are not allowed to run this Command`)
          .setDescription(`${adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(role => `<@&${role}>`).join(" | ") + cmdrole.join("")  : `No Admin Roles Setupped yet! Do it with: \`${prefix}setup-admin\``}`)
        );
      let kickmember = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0] ? args[0] : ``);
      if (!kickmember)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`Please add a Member you want to kick!`)
          .setDescription(`Useage: \`${prefix}ban @User [Reason]\``)
        );

      let days;
      if (!isNaN(args[1])) days = Number(args[1]);
      else days = 0;
      if (Number(days) >= 7) days = 7;
      if (Number(days) <= 0) days = 0;
      let reason = args.slice(2).join(` `);
      if (days == 0) reason = args.slice(1).join(" ")
      if (!reason) {
        reason = `NO REASON`;
      }

      const memberPosition = kickmember.roles.highest.rawPosition;
      const moderationPosition = message.member.roles.highest.rawPosition;

      if (moderationPosition <= memberPosition)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`I cannot ban someone, who is above/equal you`)
        );

      if (!kickmember.bannable)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`The Member is not bannable, sorry!`)
        );
      try{
        kickmember.send(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`You got banned by \`${message.author.tag}\` from \`${message.guild.name}\` for ${days === 0 ? `Infinite Days` : `${days} Days`}`)
          .setDescription(`Reason:\n> ${reason}`)
        );
      } catch{
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`Could not DM the Reason to: \`${kickmember.user.tag}\``)
          .setDescription(`${kickmember.user}`)
        );
      }
      try {
        kickmember.ban({
          days: days,
          reason: reason
        }).then(() => {
          client.stats.push(message.guild.id+message.author.id, new Date().getTime(), "ban"); 
          message.channel.send(new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`Banned \`${kickmember.user.tag}\` for ${days === 0 ? `Infinite Days` : `${days} Days`}`)
            .setDescription(`Reason:\n> ${reason}`)
            .setImage("https://i.imgur.com/O3DHIA5.gif")
          );
          if (client.settings.get(message.guild.id, `adminlog`) != "no") {
            try {
              var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
              if (!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
              channel.send(new MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                .setAuthor(`${require("path").parse(__filename).name} | ${message.author.tag}`, message.author.displayAvatarURL({
                  dynamic: true
                }))
                .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
                .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
                .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
                .setTimestamp().setFooter("ID: " + message.author.id)
              )
            } catch (e) {
              console.log(e)
            }
          }
        });
      } catch (e) {
        console.log(String(e.stack).red);
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`An error occurred`)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
        );
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
};
