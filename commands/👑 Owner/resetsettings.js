var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
const fs = require('fs');
const fetch = require('node-fetch');
var {
  databasing, isValidURL
} = require(`../../handlers/functions`);
module.exports = {
  name: "resetsettings",
  category: "👑 Owner",
  aliases: ["resetallsettings", "hardreset"],
  cooldown: 5,
  usage: "resetsettings",
  description: "Reset (delete) All settings",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if (!config.ownerIDS.some(r => r.includes(message.author.id)))
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> You are not allowed to run this Command`)
          .setDescription(`You need to be one of those guys: ${config.ownerIDS.map(id => `<@${id}>`)}`)
        );
    try {
      message.channel.send("Do you really wanna reset all the settings? reply with `yes`").then(msg=>{
        msg.channel.awaitMessages(m=>m.author.id == message.author.id, {max: 1, time: 30e3, errors: ["time"]}).then(collected=>{
          if(collected.first().content.toLowerCase() == "yes"){

          client.youtube_log.delete(message.guild.id)
          client.premium.delete(message.guild.id) 
          client.stats.delete(message.guild.id) 
          client.settings.delete(message.guild.id) 
          client.jtcsettings.delete(message.guild.id) 
          client.jtcsettings2.delete(message.guild.id)
          client.jtcsettings3.delete(message.guild.id) 
          client.jointocreatemap.delete(message.guild.id)
          client.setups.delete(message.guild.id)
          client.queuesaves.delete(message.guild.id) 
          client.modActions.delete(message.guild.id) 
          client.userProfiles.delete(message.guild.id) 
          client.apply.delete(message.guild.id) 
          client.apply2.delete(message.guild.id)
          client.apply3.delete(message.guild.id) 
          client.apply4.delete(message.guild.id)
          client.apply5.delete(message.guild.id) 
          client.points.delete(message.guild.id) 
          client.voicepoints.delete(message.guild.id) 
          client.reactionrole.delete(message.guild.id) 
          client.roster.delete(message.guild.id) 
          client.roster2.delete(message.guild.id) 
          client.roster3.delete(message.guild.id) 
          client.social_log.delete(message.guild.id) 
          client.blacklist.delete(message.guild.id) 
          client.customcommands.delete(message.guild.id)
          client.keyword.delete(message.guild.id) 
          databasing(client, message.guild.id)
          es = client.settings.get(message.guild.id, "embed")
          return message.channel.send(new MessageEmbed()
            .setColor(es.color)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`Successfully resetted all of the DATA`)
          );
          }else{
            return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> You did not enter \`yes\``)
          );
          }
        })
      })

    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> Something went Wrong`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  },
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
