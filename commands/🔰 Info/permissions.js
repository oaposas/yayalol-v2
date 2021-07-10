const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const moment = require('moment');
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
module.exports = {
  name: "permissions",
  aliases: ["perms"],
  category: "🔰 Info",
  description: "Get permissions information about a user",
  usage: "permissions [@USER]",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {   
      var user;
      if(args[0]){
        try{
            user = await GetUser(message, args)
        }catch (e){
          if(!e) return message.reply("UNABLE TO FIND THE USER")
          return message.reply(e)
        }
      }else{
        user = message.author;
      }
      if(!user || user == null || user.id == null || !user.id) message.reply("<:no:833101993668771842> Could not find the USER")
      try{
        const member = message.guild.members.cache.get(user.id);
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor("Permissions from:   " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({ dynamic: true }), "https://clan.milrato.eu")
        embeduserinfo.addField('**<:arrow:832598861813776394> Permissions:**',`${message.member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
        embeduserinfo.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        embeduserinfo.setFooter(es.footertext, es.footericon)
        //send the EMBED
        message.channel.send(embeduserinfo)
      }catch{
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor("Permissions from:   " + user.username + "#" + user.discriminator, user.displayAvatarURL({ dynamic: true }), "https://clan.milrato.eu")
        embeduserinfo.addField('**<:arrow:832598861813776394> Permissions:**',`${message.member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
        embeduserinfo.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        embeduserinfo.setFooter(es.footertext, es.footericon)
        //send the EMBED
        message.channel.send(embeduserinfo)
      }
      
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> ERROR | An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
