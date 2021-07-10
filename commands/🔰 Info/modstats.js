const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  getRandomInt, GetGlobalUser, GetUser
} = require("../../handlers/functions")
module.exports = {
  name: "modstats",
  category: "🔰 Info",
  aliases: ["adminstats"],
  usage: "modstats [@USER]",
  description: "Shows the Admin Stats of a Mod/Admin, how many cmds he has executed etc.",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      var user;
      if(args[0]){
        try{
          if(args[1] && args[1].toLowerCase() == "global"){
            args.pop()
            user = await GetGlobalUser(message, args)
          }else {
            user = await GetUser(message, args)
          }
        }catch (e){
          if(!e) return message.reply("UNABLE TO FIND THE USER")
          return message.reply(e)
        }
      }else{
        user = message.author;
      }
      if(!user || user == null || user.id == null || !user.id) return message.reply("<:no:833101993668771842> Could not find the USER")

      client.stats.ensure(message.guild.id + user.id, {
        ban: [],
        kick: [],
        mute: [],
        ticket: [],
        says: [],
        warn: [],
      })

      message.channel.send({embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
        .addField("Bans [7]", "**`" + client.stats.get(message.guild.id + user.id, "ban").filter(item=>{ var date = new Date(); date.setDate(date.getDate() - 7); return date <= Number(item); }).length + "`**", true)
        .addField("Bans [30]", "**`" + client.stats.get(message.guild.id + user.id, "ban").filter(item=>{ var date = new Date(); date.setDate(date.getDate() - 30); return date <= Number(item); }).length + "`**", true)
        .addField("Bans [All]", "**`" + client.stats.get(message.guild.id + user.id, "ban").length + "`**", true)
       
        .addField("Kicks [7]", "**`" + client.stats.get(message.guild.id + user.id, "kick").filter(item=>{ var date = new Date(); date.setDate(date.getDate() - 7); return date <= Number(item); }).length + "`**", true)
        .addField("Kicks [30]", "**`" + client.stats.get(message.guild.id + user.id, "kick").filter(item=>{ var date = new Date(); date.setDate(date.getDate() - 30); return date <= Number(item); }).length + "`**", true)
        .addField("Kicks [All]", "**`" + client.stats.get(message.guild.id + user.id, "kick").length + "`**", true)
       
        .addField("Mutes [7]", "**`" + client.stats.get(message.guild.id + user.id, "mute").filter(item=>{ var date = new Date(); date.setDate(date.getDate() - 7); return date <= Number(item); }).length + "`**", true)
        .addField("Mutes [30]", "**`" + client.stats.get(message.guild.id + user.id, "mute").filter(item=>{ var date = new Date(); date.setDate(date.getDate() - 30); return date <= Number(item); }).length + "`**", true)
        .addField("Mutes [All]", "**`" + client.stats.get(message.guild.id + user.id, "mute").length + "`**", true)
       
        .addField("Tickets [7]", "**`" + client.stats.get(message.guild.id + user.id, "ticket").filter(item=>{ var date = new Date(); date.setDate(date.getDate() - 7); return date <= Number(item); }).length + "`**", true)
        .addField("Tickets [30]", "**`" + client.stats.get(message.guild.id + user.id, "ticket").filter(item=>{ var date = new Date(); date.setDate(date.getDate() - 30); return date <= Number(item); }).length + "`**", true)
        .addField("Tickets [All]", "**`" + client.stats.get(message.guild.id + user.id, "ticket").length + "`**", true)
       
        .addField("Says [7]", "**`" + client.stats.get(message.guild.id + user.id, "says").filter(item=>{ var date = new Date(); date.setDate(date.getDate() - 7); return date <= Number(item); }).length + "`**", true)
        .addField("Says [30]", "**`" + client.stats.get(message.guild.id + user.id, "says").filter(item=>{ var date = new Date(); date.setDate(date.getDate() - 30); return date <= Number(item); }).length + "`**", true)
        .addField("Says [All]", "**`" + client.stats.get(message.guild.id + user.id, "says").length + "`**", true)
        
        .addField("Warns [7]", "**`" +  client.stats.get(message.guild.id + user.id, "warn").filter(item=>{ var date = new Date(); date.setDate(date.getDate() - 7); return date <= Number(item); }).length + "`**", true)
        .addField("Warns [30]", "**`" + client.stats.get(message.guild.id + user.id, "warn").filter(item=>{ var date = new Date(); date.setDate(date.getDate() - 30); return date <= Number(item); }).length + "`**", true)
        .addField("Warns [All]", "**`" + client.stats.get(message.guild.id + user.id, "warn").length + "`**", true)
        .addField("\u200b", "*[] ... Days the amount of Cmds were executed*\n*Says includes embeds too*")
        .setAuthor(`The Stats of:  ${user.tag}`, user.displayAvatarURL({dynamic: true, size: 512}))
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr([], 2000)}\`\`\``)
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
