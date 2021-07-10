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
  name: `deleterole`,
  category: `🚫 Administration`,
  aliases: [`roledelete`, "delete-role", "role-delete"],
  cooldown: 4,
  usage: `deleterole  @Role`,
  description: `Delets a Role from this Server`,
  run: async (client, message, args, cmduser, text, prefix) => {
    if(!message.guild.me.hasPermission("MANAGE_ROLES"))      
    return message.channel.send(new Discord.MessageEmbed()
      .setColor(es.wrongcolor)
      .setFooter(es.footertext, es.footericon)
      .setTitle("<:no:833101993668771842> I am missing the permission to `MANAGE ROLES`!")
    )
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.deleterole")
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
            client.settings.remove(message.guild.id, r, `cmdadminroles.deleterole`)
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
      let role = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first() || message.guild.roles.cache.get(args[0]);
      if (!role || role == null || role == undefined || role.name == null || role.name == undefined)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> please ping a ROLE!`)
          .setDescription(` Usage: \`${prefix}deleterole @ROLE\``)
        );
      message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`Do you really wanna delete the ${role.name} from this Server?`)
        .setDescription("*This step cannot be undone!*\n\nReply with **__yes__** if you wanna delete it!")
      ).then(msg => {
        msg.channel.awaitMessages(m => m.author.id == message.author.id, {
          max: 1,
          time: 30000,
          errors: ["time"]
        }).then(collected => {
          if (collected.first().content.toLowerCase().includes("yes")) {
            let membersize = role.members.array().length;
            role.delete(`${message.author.tag} Requested a Role delete`)
              .then(r => {
                message.channel.send(new MessageEmbed()
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                  .setTitle(`<a:yes:833101995723194437> Deleted \`${r.name}\` and removed it from \`${membersize} Members\``)
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
              })
              .catch(console.error);
          } else {
            return message.channel.send(new MessageEmbed()
              .setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
              .setTitle(`<:no:833101993668771842> You did not add **__yes__**`)
              .setDescription(ge.message)
            );
          }
        }).catch(e => {
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> Something went wrong`)
            .setDescription(e.message)
          );
        })
      })

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
