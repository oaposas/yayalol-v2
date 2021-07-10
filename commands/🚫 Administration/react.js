const config = require(`../../botconfig/config.json`);
const emoji = require(`../../botconfig/emojis.json`);
var ee = require(`../../botconfig/embed.json`)
const {
  MessageEmbed
} = require(`discord.js`)
const {
  databasing
} = require("../../handlers/functions");
module.exports = {
  name: `react`,
  category: `🚫 Administration`,
  aliases: [``],
  description: `Closes the ticket`,
  useage: `react <msgid> <Emoji>`,
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.react")
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
              client.settings.remove(message.guild.id, r, `cmdadminroles.react`)
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
      
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> Please Include a MessageID`)
          .setDescription(`Usage: \`${prefix}react <msgid> <Emoji>\`\nExample: \`${prefix}react 442355791412854784 ${emoji.msg.SUCCESS}\``)
        );
      if (args[0].length != 18)
          return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> Please Include a Valid MessageID`)
        );

      if (!args[1]) 
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> Please Include a Emoji`)
          .setDescription(`Usage: \`${prefix}react <msgid> <Emoji>\`\nExample: \`${prefix}react 442355791412854784 ${emoji.msg.SUCCESS}\``)
        );

      if(args[1].includes("<")){
        let emojii = args[1].split(":")[args[1].split(":").length - 1].replace(">", "");
        console.log(emojii)
        if (!emojii)
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> Please Include a valid Emoji`)
            .setDescription(`Usage: \`${prefix}react <msgid> <Emoji>\`\nExample: \`${prefix}react 442355791412854784 ${emoji.msg.SUCCESS}\``)
          );
        message.channel.messages.fetch(args[0])
          .then((msg) => msg.react(emojii).catch((e) => console.log(String(e.stack).red)))
          .catch((e) => console.log(String(e.stack).red));
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
      }else{
        let emojii = args[1];
        if (!emojii)
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> Please Include a valid Emoji`)
            .setDescription(`Usage: \`${prefix}react <msgid> <Emoji>\`\nExample: \`${prefix}react 442355791412854784 ${emoji.msg.SUCCESS}\``)
          );
        message.channel.messages.fetch(args[0])
          .then((msg) => msg.react(emojii).catch((e) => console.log(String(e.stack).red)))
          .catch(e=>{
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
              .setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
              .setTitle(`<:no:833101993668771842> An error occurred`)
              .setDescription(`\`\`\`${e.stack}\`\`\``)
            );
          })
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
