const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const {
  databasing
} = require("../../handlers/functions");
module.exports = {
  name: "embed",
  category: "🚫 Administration",
  aliases: ["embed"],
  cooldown: 2,
  usage: "embed <TITLE> ++ <DESCRIPTION>",
  description: "Resends a message from u as an Embed\n\n To have forexample no title do that:  embed ++ This is what an Embed without Image Looks like",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.embed")
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
              client.settings.remove(message.guild.id, r, `cmdadminroles.embed`)
            }
          }
        }
      if ((message.member.roles.cache.array() && !message.member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(message.author.id) && (message.member.roles.cache.array() && !message.member.roles.cache.some(r => adminroles.includes(r.id))) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<a:Deny:863000078690811905> You are not allowed to run this Command`)
          .setDescription(`${adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(role => `<@&${role}>`).join(" | ") + cmdrole.join("")  : `No Admin Roles Setupped yet! Do it with: \`${prefix}setup-admin\``}`)
        );
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<a:Deny:863000078690811905> You Didn't Provide a Title, Nor a Description`)
          .setDescription(`Usage: \`${prefix}embed <TITLE> ++ <DESCRIPTION>\``)
        );
      let userargs = args.join(" ").split("++");
      let title = userargs[0];
      let desc = userargs.slice(1).join(" ")
      let attachment = false;
      let name = false;
      if (message.attachments.size > 0) {
        if (message.attachments.every(attachispng)) {
          name = "image.png"
          attachment = new MessageAttachment(url, name)
        }
        if (message.attachments.every(attachisjpg)) {
          name = "image.jpg"
          attachment = new MessageAttachment(url, name)
        }
        if (message.attachments.every(attachisgif)) {
          name = "image.gif"
          attachment = new MessageAttachment(url, name)
        }
      }
      message.delete().catch(e => console.log("Couldn't delete msg, this is a catch to prevent crash"))
      let sendembed = new MessageEmbed()
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(title && desc ? title.substr(0, 256) : "")
      .setDescription(desc ? desc : title ? title.substr(0, 2048) : "")
      if(attachment) {
        sendembed.setImage("attachment://" + name)
        sendembed.attachFiles(attachment)
      }
      message.channel.send({embed: sendembed })
      
      client.stats.push(message.guild.id+message.author.id, new Date().getTime(), "says"); 
      
      var ee = "Here is your Command, if you wanna use it again!";
      if(message.content.length > 2000){
        ee = "Here is your Command"
      }
      if(message.content.length > 2020){
        ee = ""
      }
      if(client.settings.get(message.author.id, "dm"))
      message.author.send(`${ee}\`\`\`${message.content}`.substr(0, 2040) + "\`\`\`").catch(e => console.log("Couldn't Dm Him this log prevents a crash"))
    
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

      function attachispng(msgAttach) {
        url = msgAttach.url;
        return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1;
      }
      function attachisjpg(msgAttach) {
        url = msgAttach.url;
        return url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
      }
      function attachisgif(msgAttach) {
        url = msgAttach.url;
        return url.indexOf("gif", url.length - "gif".length /*or 3*/ ) !== -1;
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
