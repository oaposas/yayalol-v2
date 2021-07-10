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
  name: `detailwarn`,
  category: `🚫 Administration`,
  aliases: [`warninfo`, `snipe`, `infowarn`, `infowarning`, `detailwarning`, `warninginfo`],
  description: `Shows details about one warn Command of a Member`,
  usage: `detailwarn @User [Reason]`,
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      //find the USER
      let warnmember = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first() || message.guild.members.cache.get(args[0]) || message.member
      if (!warnmember)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> Please add a Member you want to detailwarn!`)
          .setDescription(`Useage: \`${prefix}detailwarn @User <WARN_ID>\``)
        );

      if (!args[1])
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> Please add the Warning you want to remove from him`)
          .setDescription(`See his warns: \`${prefix}detailwarn @User <WARN_ID>\``)
        );


      try {
        client.userProfiles.ensure(warnmember.user.id, {
          id: message.author.id,
          guild: message.guild.id,
          totalActions: 0,
          warnings: [],
          kicks: []
        });

        const warnIDs = client.userProfiles.get(warnmember.user.id, 'warnings');
        const dwarnData = warnIDs.map(id => client.modActions.get(id));
        const warnData = dwarnData.filter(v=> v.guild == message.guild.id)
        if (!warnIDs || !dwarnData || !dwarnData.length || !warnData || !warnData.length)
        if (!warnIDs)
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> User has no Warnings`)
          );
        if (Number(args[1]) >= warnIDs.length || Number(args[1]) < 0)
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> Value out of range`)
            .setDescription(`Usage: \`${prefix}detailwarn @User <WARN_ID>\` Highest ID: ${warnIDs.length - 1}`)
          );

        let warning = warnData[parseInt(args[1])]
        let warned_by = message.guild.members.cache.get(warning.moderator) ? `${message.guild.members.cache.get(warning.moderator).user.tag} (${warning.moderator})` : warning.moderator;
        let warned_in = client.guilds.cache.get(warning.guild) ? `${client.guilds.cache.get(warning.guild).name} (${warning.guild})` : warning.guild;

        message.channel.send(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setAuthor(`Warn from ${warnmember.user.tag}`, warnmember.user.displayAvatarURL({
            dynamic: true
          }))
          .setDescription(`**Reason:**\n\`\`\`${warning.reason.length > 2030 ? warning.reason.substr(0, 2030) + ` ...` : warning.reason}\`\`\``)
          .addField(`Warn:`, `\`${parseInt(args[1]) + 1}\` out of **${warnIDs.length} Warns**`, true)
          .addField(`Warned by:`, `\`${warned_by}\``, true)
          .addField(`Warned at:`, `\`${warning.when}\``, true)
          .addField(`Warned in:`, `\`${warned_in}\``, true)
          .addField(`Old Thumbnail URL`, `[\`Click here\`](${warning.oldthumburl})`, true)
          .addField(`Old Highest Role:`, `${message.guild.roles.cache.get(warning.oldhighesrole.id) ? `<@&`+message.guild.roles.cache.get(warning.oldhighesrole.id)+`>` : `\`${warning.oldhighesrole.name} (${warning.oldhighesrole.id})\``}`, true)
        );
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
