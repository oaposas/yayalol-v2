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
  name: `report`,
  category: `🚫 Administration`,
  aliases: [`melden`],
  cooldown: 300,
  usage: `report @User <REASON>`,
  description: `Reports a User for a specific Reason!`,
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {      
      if(client.settings.get(message.guild.id, `reportlog`) == "no") 
        return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`Report System is not setup yet!`)
            .setDescription(`Set it up with: \`${prefix}setup-reportlog\``)
            );
      var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `reportlog`))
      if(!channel) return client.settings.set(message.guild.id, "no", `reportlog`);

      let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first();
      if (!member)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`please ping a USER!`)
          .setDescription(` Usage: \`${prefix}report @User <REASON>\`\n\nExample: \`${prefix}report @User 10m He is doing bad stuff!\``)
        );
      args.shift();
      if (member.roles.highest.position > message.member.roles.highest.position)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`I cannot report this Member, because he is higher to your Rang Position!`)
        );

      let reason = args[0];
      if (!reason)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`please add a REASON!`)
          .setDescription(` Usage: \`${prefix}report @User <REASON>\`\n\nExample: \`${prefix}report @User 10m He is doing bad stuff!\``)
        );

      reason = args.join(` `);


      message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`\`${member.user.tag}\` got **REPORTED** for:`)
        .setDescription(`Reason:\n> ${reason ? `${reason.substr(0, 1800)}` : `NO REASON`}`)
      );
      member.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`\`${message.author.tag}\` reported you for:`)
        .setDescription(`Reason:\n> ${reason ? `${reason.substr(0, 1800)}` : `NO REASON`}`)
      );

        try{
          channel.send(new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
            .setAuthor(`${require("path").parse(__filename).name} | ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setDescription(`**${member.user.tag}** (${member.user})\n*got reported for...*\n\`\`\`${reason ? `${reason.substr(0, 1800)}` : `NO REASON`}\`\`\``)
            
            .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
            .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
            .setTimestamp().setFooter("ID: " + member.user.id, member.user.displayAvatarURL({dynamic: true}))
          )
        }catch (e){
          console.log(e)
        }
      
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
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
};
