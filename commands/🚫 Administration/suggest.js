const {
    MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
    delay, databasing
} = require(`../../handlers/functions`);
module.exports = {
    name: `suggest`,
    aliases: [`suggestion`, "feedback"],
    category: `🚫 Administration`,
    description: `Approves, Denies or even Maybies a Suggestion from your SETUP!`,
    usage: `suggest <approve/deny/maybe> <Suggestion_id> [REASON]`,
    run: async (client, message, args, cmduser, text, prefix) => {
        let es = client.settings.get(message.guild.id, "embed")
        try {
          let adminroles = client.settings.get(message.guild.id, "adminroles")
          let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.suggest")
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
                  client.settings.remove(message.guild.id, r, `cmdadminroles.suggest`)
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
            var approvetext = client.settings.get(message.guild.id, `suggest.approvemsg`);
            var denytext = client.settings.get(message.guild.id, `suggest.denymsg`);
            var maybetext = client.settings.get(message.guild.id, `suggest.maybemsg`);   
            var feedbackchannel = client.settings.get(message.guild.id, `suggest.channel`);
             
            let reason = `No reason`;
            if(!args[0]) 
                return message.channel.send(new MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon).setThumbnail(es.thumb ? es.footericon : `https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png`)
                    .setTitle(`<:no:833101993668771842> You did not add the method!`)
                    .setDescription(`Useage: \`${prefix}suggest <approve/deny/maybe> <suggest_id> [REASON]\``)
                );
            //wenn kein grund
            if (!args[1]) 
                return message.channel.send(new MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon).setThumbnail(es.thumb ? es.footericon : `https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png`)
                    .setTitle(`<:no:833101993668771842> You did not add the Suggestion ID!`)
                    .setDescription(`Useage: \`${prefix}suggest <approve/deny/maybe> <suggest_id> [REASON]\``)
                );
            
            if(args[1].length !== 18)
                return message.channel.send(new MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon).setThumbnail(es.thumb ? es.footericon : `https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png`)
                    .setTitle(`<:no:833101993668771842> It seems that the suggestion doesnt exist!`)
                    .setDescription(`Useage: \`${prefix}suggest <approve/deny/maybe> <suggest_id> [REASON]\``)
                );
            if(!args[2]) reason = `No reason`;
            else reason = args.slice(2).join(` `);
            //finde feedbackchannel
            const channel = message.guild.channels.cache.get(feedbackchannel)
            if (!channel) 
                return message.channel.send(new MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon).setThumbnail(es.thumb ? es.footericon : `https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png`)
                    .setTitle(`<:no:833101993668771842> Could not find the Suggestions Channel!`)
                    .setDescription(`Set it up with: \`${prefix}setup-suggestions\``)
                );
            
            //finde die nachricht
            const targetMessage = await channel.messages.fetch(args[1])
            if (!targetMessage) 
                return message.channel.send(new MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon).setThumbnail(es.thumb ? es.footericon : `https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png`)
                    .setTitle(`<:no:833101993668771842> Could not find the Suggestion!`)
                );
            
            //altes embed
            const oldEmbed = targetMessage.embeds[0];
      
            if(!oldEmbed)    
                return message.channel.send(new MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon).setThumbnail(es.thumb ? es.footericon : `https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png`)
                    .setTitle(`<:no:833101993668771842> Could not find the Suggestion!`)
                );
    
            //bekomme was er machen will
            let color;
            let statustext;
      
            switch(args[0]){
              case `approve`:
                color = `GREEN`;
                statustext = `${approvetext}\n\n**Reason:**\n ${reason}`;
                await message.channel.send(
                  new MessageEmbed()
                    .setColor(`GREEN`).setThumbnail(es.thumb ? es.footericon : `https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png`)
                    .setTitle(`**✅ | Suggestion got \`approved\`!**`)
                    .setDescription(`${channel}`)
                );
                break;
      
              case `deny`:
                color = `RED`;
                statustext = `${denytext}\n\n**Reason:**\n ${reason}`;
                await message.channel.send(
                  new MessageEmbed()
                    .setColor(`RED`).setThumbnail(es.thumb ? es.footericon : `https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png`)
                    .setTitle(`**✅ | Suggestion got \`declined\`!**`)
                    .setDescription(`${channel}`)
                );
              break;
      
              case `maybe`:
                color = `ORANGE`;
                statustext = `${maybetext}\n\n**Reason:**\n ${reason}`;
                await message.channel.send(
                  new MessageEmbed()
                    .setColor(`#ff712e`)
                    .setTitle(`**✅ | Suggestion got \`maybed\`!**`)
                    .setDescription(`${channel}`)
                );
                break;
      
              default:
                message.reply(`Please add a method:  \`approve\` / \`deny\` / \`maybe\``);
              break;
            }
      
            const embed = new MessageEmbed()
                .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL)
                .setDescription(oldEmbed.description)
                .setColor(color)
                .setFooter('Want to suggest something? Simply type it in this channel', "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/light-bulb_1f4a1.png")
              if (oldEmbed.fields.length === 2) {
                embed.addFields(oldEmbed.fields[0], {
                  name: 'Status',
                  value: statustext,
                })
              } else {
                embed.addFields({
                  name: 'Status',
                  value: statustext,
                })
              }
              targetMessage.edit({embed: embed})

              if(client.settings.get(message.guild.id, `adminlog`) != "no"){
                try{
                  var channel2send = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
                  if(!channel2send) return client.settings.set(message.guild.id, "no", `adminlog`);
                  channel2send.send(new MessageEmbed()
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
            console.log(String(e.stack).red);
            return message.channel.send(new MessageEmbed()
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon)
                .setTitle(`<:no:833101993668771842> An error occurred`)
                .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
            );
        }
    }
}
