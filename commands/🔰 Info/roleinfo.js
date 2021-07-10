const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const moment = require('moment');
const { GetRole } = require("../../handlers/functions")
module.exports = {
  name: "roleinfo",
  aliases: ["rinfo"],
  category: "🔰 Info",
  description: "Get information about a role",
  usage: "roleinfo [@Role/Id/Name]",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {   
      var role;
      if(args[0]){
        try{
          role = await GetRole(message, args)
        }catch (e){
          if(!e) return message.reply("UNABLE TO FIND THE ROLE")
          return message.reply(e)
        }
      }else{
        return message.reply("<:no:833101993668771842> Please retry but add a Role/Rolename/Roleid");
      }
      if(!role || role == null || role.id == null || !role.id) message.reply("<:no:833101993668771842> Could not find the ROLE")
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
        embeduserinfo.setAuthor("Information about:   " + role.name, message.guild.iconURL({ dynamic: true }), "https://discord.gg/FQGXbypRf8")
        embeduserinfo.addField('**<:arrow:832598861813776394> Name:**',`\`${role.name}\``,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> ID:**',`\`${role.id}\``,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Color:**',`\`${role.hexColor}\``,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Date Created:**', "\`"+moment(role.createdAt).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(role.createdAt).format("hh:mm:ss") + "\`",true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Position:**',`\`${role.rawPosition}\``,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> MemberCount:**',`\`${role.members.size} Members have it\``,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Hoisted:**',`\`${role.hoist ? "✔️" : "❌"}\``,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Mentionable:**',`\`${role.mentionable ? "✔️" : "❌"}\``,true)
        embeduserinfo.addField('**<:arrow:832598861813776394> Permissions:**',`${role.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
        embeduserinfo.setColor(role.hexColor)
        embeduserinfo.setFooter(es.footertext, es.footericon)
        //send the EMBED
        message.channel.send(embeduserinfo)

      
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
