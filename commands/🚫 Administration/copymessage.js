const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const {
  databasing
} = require("../../handlers/functions");
module.exports = {
  name: "copymessage",
  category: "🚫 Administration",
  aliases: ["copy", "copymsg", "cmsg", "copyembed", "copye"],
  cooldown: 2,
  usage: "copymessage <#Channel> <Message_ID>",
  description: "Copy the Message of it, if its an embed / message you will get the Command to your DMS",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.copymessage")
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
              client.settings.remove(message.guild.id, r, `cmdadminroles.copymessage`)
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
      var channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first() || message.guild.channels.cache.get(args[0]) || message.channel;
      var id = args[1]
      if (!channel || channel == null || !channel.id || channel.id == 0)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> You didn't ping a Valid Channel`)
          .setDescription(`Usage: \`${prefix}copymessage <#Channel> <Message_ID>\``)
        );
        if (!id || id.length != 18)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> You didn't add a Valid Message ID`)
          .setDescription(`Usage: \`${prefix}copymessage <#Channel> <Message_ID>\``)
        );

      message.delete().catch(e => console.log("Couldn't delete msg, this is a catch to prevent crash"))
     
   
      channel.messages.fetch(id).then(msg=>{
        if(msg.content){
          message.author.send(`\`\`\`${prefix}say ${msg.content}\`\`\``)
        }
        if(msg.embeds[0]){
          var embed = msg.embeds[0]
          message.author.send(`\`\`\`${prefix}${embed.image ? embed.image.url ? "img" : "" : ""}embed ${embed.title ? embed.title : ""}${embed.image ? embed.image.url ? "++" + embed.image.url : "" : ""}++${embed.description ? embed.description: ""}\`\`\``)
        }
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<a:yes:833101995723194437> Check your DMS!`)
        );
      }).catch(e=>{
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> An error occurred`)
          .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
      })
      

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
        .setDescription(`\`\`\`${e.stack}\`\`\``)
      );
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
