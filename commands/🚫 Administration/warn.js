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
  name: `warn`,
  category: `🚫 Administration`,
  aliases: [``],
  cooldown: 0.5,
  description: `Warns a Member with a Reason`,
  usage: `warn @User [Reason]`,
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.warn")
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
              client.settings.remove(message.guild.id, r, `cmdadminroles.warn`)
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
      let warnmember = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0] ? args[0] : ``);
      if (!warnmember)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> Please add a Member you want to warn!`)
          .setDescription(`Useage: \`${prefix}warn @User [Reason]\``)
        );

      let reason = args.slice(1).join(` `);
      if (!reason) {
        reason = `NO REASON`;
      }

      const memberPosition = warnmember.roles.highest.position;
      const moderationPosition = message.member.roles.highest.position;

      if (moderationPosition <= memberPosition)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> I cannot warn someone, who is above/equal you`)
        );

      try {
        client.userProfiles.ensure(warnmember.user.id, {
          id: message.author.id,
          guild: message.guild.id,
          totalActions: 0,
          warnings: [],
          kicks: []
        });
        const newActionId = client.modActions.autonum;
        client.modActions.set(newActionId, {
          user: warnmember.user.id,
          guild: message.guild.id,
          type: 'warning',
          moderator: message.author.id,
          reason: reason,
          when: new Date().toLocaleString(`de`),
          oldhighesrole: warnmember.roles ? warnmember.roles.highest : `Had No Roles`,
          oldthumburl: warnmember.user.displayAvatarURL({
            dynamic: true
          })
        });
        // Push the action to the user's warnings
        client.userProfiles.push(warnmember.user.id, newActionId, 'warnings');
        client.userProfiles.inc(warnmember.user.id, 'totalActions');
        
        client.stats.push(message.guild.id+message.author.id, new Date().getTime(), "warn"); 
        const warnIDs = client.userProfiles.get(warnmember.user.id, 'warnings')
        const warnData = warnIDs.map(id => client.modActions.get(id));
        let warnings = warnData.filter(v => v.guild == message.guild.id);
        warnmember.send(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(`He has: ${client.userProfiles.get(warnmember.user.id, 'warnings') ? client.userProfiles.get(warnmember.user.id, 'warnings').length : 0} Global Warns`, "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/275/globe-with-meridians_1f310.png")
          
          .setAuthor(`You've got warned by: ${message.author.tag}`, message.author.displayAvatarURL({
            dynamic: true
          }))
          .setDescription(`**You now have: ${warnings.length} Warnings in ${message.guild.name}**\n\nReason:\n> ${reason}`)).catch(e => console.log(e.message))

        message.channel.send(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(`He has: ${client.userProfiles.get(warnmember.user.id, 'warnings') ? client.userProfiles.get(warnmember.user.id, 'warnings').length : 0} Global Warns`, "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/275/globe-with-meridians_1f310.png")
          
          .setTitle(`<a:yes:833101995723194437> Warned ${warnmember.user.tag}`)
          .setThumbnail(warnmember.user.displayAvatarURL({
            dynamic: true
          }))
          .setDescription(`**He now has: ${warnings.length} Warnings in ${message.guild.name}**\n\nReason:\n> ${reason}`.substr(0, 2048))
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
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
