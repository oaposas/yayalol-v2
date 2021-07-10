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
  name: `kick`,
  category: `🚫 Administration`,
  aliases: [``],
  description: `Kicks a Member from a Guild`,
  usage: `kick @User [Reason]`,
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      if(!message.guild.me.hasPermission("KICK_MEMBERS"))      
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle("<:no:833101993668771842> I am missing the permission to `KICK MEMBERS`!")
      )
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.kick")
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
              client.settings.remove(message.guild.id, r, `cmdadminroles.kick`)
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
      let kickmember = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0] ? args[0] : ``);
      if (!kickmember)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> Please add a Member you want to kick!`)
          .setDescription(`Useage: \`${prefix}kick @User [Reason]\``)
        );

      let reason = args.slice(1).join(` `);
      if (!reason) {
        reason = `NO REASON`;
      }

      const memberPosition = kickmember.roles.highest.position;
      const moderationPosition = message.member.roles.highest.position;
      if (moderationPosition <= memberPosition)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> I cannot kick someone, who is above/equal you`)
        );

      if (!kickmember.kickable)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> The Member is not kickable, sorry!`)
        );

        try{
          kickmember.send(new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<a:yes:833101995723194437> You got kicked by \`${message.author.tag}\` from \`${message.guild.name}\` for ${days === 0 ? `Infinite Days` : `${days} Days`}`)
            .setDescription(`Reason:\n> ${reason}`)
          );
        } catch{
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> Could not DM the Reason to: \`${kickmember.user.tag}\``)
            .setDescription(`${kickmember.user}`)
          );
        }
      try {
        kickmember.kick({
          reason: reason
        }).then(() => {
          client.stats.push(message.guild.id+message.author.id, new Date().getTime(), "kick"); 
          message.channel.send(new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<a:yes:833101995723194437> Kicked ${kickmember.user.tag}`)
            .setDescription(`Reason:\n> ${reason}`)
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
        });
      } catch (e) {
        console.log(String(e.stack).red);
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> An error occurred`)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
        );
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
