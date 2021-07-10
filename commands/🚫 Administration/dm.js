const { fail } = require("assert");
const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
const ms = require("ms")
const {
  databasing, delay
} = require("../../handlers/functions");
const { memberpermissions } = require("../💪 Setup/setup-twitter");
module.exports = {
  name: "dm",
  category: "🚫 Administration",
  aliases: ["dm"],
  cooldown: 2,
  usage: "dm <@User/@Role> <MESSAGE>",
  description: "Allows you to DM a USER or every USER of a ROLE",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> You are not allowed to run this Command`)
          .setDescription(`You need to be a Server Administrator`)
        );
      let member = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first();
      let role = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
      if(member){
        if (!args[1])
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> You didn't provide a Text`)
          .setDescription(`Usage: \`${prefix}dm <@USER/@ROLE> <Your Text>\``)
        );
        message.delete().catch(e => console.log("Couldn't delete msg, this is a catch to prevent crash"))
        try{
          member.send(new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setFooter(es.footertext, es.footericon)
            .setAuthor(`Message from: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}), "https://discord.gg/FQGXbypRf8")
            .setDescription(args.slice(1).join(" ").substr(0, 2048))
          )
          message.channel.send(new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<a:yes:833101995723194437> Successfully Dmed ${member.user.username}`)
          )
        }catch{
          message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle("<:no:833101993668771842> Unable to Dm this User, this is probably because he either blocked me or turned his Dms off!")
          )
        }
      }
      else if(role){
        await message.guild.members.fetch();
        if (!args[1])
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> You didn't provide a Text`)
            .setDescription(`Usage: \`${prefix}dm <@USER/@ROLE> <Your Text>\``)
          );
        var members = message.guild.members.cache.filter(member=> member.roles.cache.has(role.id) && !member.user.bot).array();  
        var failed = [];
        var succeeded = [];
        message.delete().catch(e => console.log("Couldn't delete msg, this is a catch to prevent crash"))
        if (!members || members == null || members.length == null || members.length == 0)
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> Found no Members!`)
            .setDescription(`Most of the Times this means, no one has this ROLE! But you can retry..`)
          );
        let seconds = Number(members.length) * 1500;
        await message.channel.send(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setAuthor(`Dming ${members.length} Members...`, "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif", "https://discord.gg/2dKrZQyaC4")
          .setDescription(`This will take ${ms(seconds, {long: true})} in ideal conditions. Please be patient.`)
        );
        for(const member of members) {
          try{
            var failedd = false
            await member.send(new MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setFooter(es.footertext, es.footericon)
              .setAuthor(`Message from: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}), "https://discord.gg/FQGXbypRf8")
              .setDescription(args.slice(1).join(" ").substr(0, 2048))
            ).catch(e=>{
              failedd = true
            })
            if(failedd){
              failed.push(member.user.tag)
            }else {
              succeeded.push(member.user.tag)
            }
          }catch{
            failed.push(member.user.tag)
          }
          await delay(1500);
        }
        await message.channel.send({content: `<@${message.author.id}>`, embed: new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<a:yes:833101995723194437> SUCCESS, send a Dm to \`${succeeded.length}\` / \`${failed.length + succeeded.length}\` Members`)
          .setDescription(failed.length > 0 ? `**FAILED MEMBERS:**\n> ${failed.map(r => `\`${r}\``).join("\n")}`.substr(0, 2048) : "**FAILED MEMBERS:**\n> No one Failed")
          .addField("\u200b", "*If a Member is Failed it probably is because he either blocked me or turned his Dms off*")
        })
      }
      else {
        return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> You need to ping a ROLE or a MEMBER`)
        .setDescription(`Useage: ${prefix}dm <@USER/@ROLE> <TEXT>`)
      );
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
        .setDescription(`\`\`\`${String(e).substr(0, 2048)}\`\`\``)
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
