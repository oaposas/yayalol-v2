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
  name: `addrole`,
  category: `🚫 Administration`,
  aliases: [`roleadd`, "add-role", "role-add"],
  cooldown: 4,
  usage: `addrole @User @Role`,
  description: `Adds a Role to a User`,
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      if(!message.guild.me.hasPermission("MANAGE_ROLES"))      
      return message.channel.send({embed: new Discord.MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle("<:no:833101993668771842> I am missing the permission to `MANAGE ROLES`!")
      })
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.addrole")
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
            client.settings.remove(message.guild.id, r, `cmdadminroles.addrole`)
          }
        }
      }
      if ((message.member.roles.cache.array() && !message.member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(message.author.id) && (message.member.roles.cache.array() && !message.member.roles.cache.some(r => adminroles.includes(r.id))) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send({embed: new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> You are not allowed to run this Command`)
          .setDescription(`${adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(role => `<@&${role}>`).join(" | ") + cmdrole.join("")  : `No Admin Roles Setupped yet! Do it with: \`${prefix}setup-admin\``}`)
        });
      let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]);
      if (!member)
        return message.channel.send({embed: new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> please ping a USER!`)
          .setDescription(` Usage: \`${prefix}addrole @USER @ROLE\``)
        });
      let role = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first() || message.guild.roles.cache.get(args[1]);
      if (!role || role == null || role == undefined || role.name == null || role.name == undefined)
        return message.channel.send({embed: new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> please ping a ROLE!`)
          .setDescription(` Usage: \`${prefix}addrole @USER @ROLE\``)
        });
      if (member.roles.highest.position >= message.member.roles.highest.position)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> I cannot give that Role to this Member, because he is higher/Equal to your Rang Position!`)
        );
      if (message.member.roles.highest.position <= role.position)
        return message.channel.send({embed: new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> I cannot give that Role to this Member, because it's higher then your highest ROLE!`)
        });
      if (member.roles.cache.some(r => r.id == (role.id)))
        return message.channel.send({embed: new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> I cannot give that Role to this Member, because he already has it!!`)
        });
      var ge = false;
      member.roles.add(role.id).catch(e => {
        console.log(e)
        ge = e;
      })
      if (ge)
        return message.channel.send({embed: new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> Something went wrong`)
          .setDescription(ge.message)
        });
      message.channel.send({embed: new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<a:yes:833101995723194437> added \`${role.name}\` to \`${member.user.tag}\``)
      });

      if (client.settings.get(message.guild.id, `adminlog`) != "no") {
        try {
          var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
          if (!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
          channel.send({embed: new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
            .setAuthor(`${require("path").parse(__filename).name} | ${message.author.tag}`, message.author.displayAvatarURL({
              dynamic: true
            }))
            .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
            .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
            .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
            .setTimestamp().setFooter("ID: " + message.author.id)
          })
        } catch (e) {
          console.log(e)
        }
      }

    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send({embed: new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      });
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