 const config = require(`../../botconfig/config.json`);
 const ms = require(`ms`);
 var ee = require(`../../botconfig/embed.json`)
 const emoji = require(`../../botconfig/emojis.json`);
 const map = new Map();
 const {
   MessageEmbed
 } = require(`discord.js`)
 const {
   databasing,
   delay
 } = require("../../handlers/functions");
 module.exports = {
   name: `addroletoeveryone`,
   category: `🚫 Administration`,
   aliases: [`roleaddtoeveryone`, "add-role-to-everyone", "role-add-to-everyone", "addrole2everyone", "addroleeveryone"],
   cooldown: 4,
   useage: `addroletoeveryone @Role`,
   description: `Adds a Role to every User in this Guild`,
   run: async (client, message, args, cmduser, text, prefix) => {
     let es = client.settings.get(message.guild.id, "embed")
     try {
      if(!message.guild.me.hasPermission("MANAGE_ROLES"))      
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle("<:no:833101993668771842> I am missing the permission to `MANAGE ROLES`!")
      )
       let adminroles = client.settings.get(message.guild.id, "adminroles")
       let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.addroletoeveryone")
       var cmdrole = []
       if (cmdroles.length > 0) {
         for (const r of cmdroles) {
           if (message.guild.roles.cache.get(r)) {
             cmdrole.push(` | <@&${r}>`)
           } else if (message.guild.members.cache.get(r)) {
             cmdrole.push(` | <@${r}>`)
           } else {
             console.log("F")
             console.log(r)
             client.settings.remove(message.guild.id, r, `cmdadminroles.addroletoeveryone`)
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
       if (map.get(message.guild.id))
         return message.channel.send(new MessageEmbed()
           .setColor(es.wrongcolor)
           .setFooter(es.footertext, es.footericon)
           .setTitle(`<:no:833101993668771842> There is an active \`addroletoeveryone\` Command already executing in this Server!`)
         );
       let role = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first() || message.guild.roles.cache.get(args[0]);
       if (!role || role == null || role == undefined || role.name == null || role.name == undefined)
         return message.channel.send(new MessageEmbed()
           .setColor(es.wrongcolor)
           .setFooter(es.footertext, es.footericon)
           .setTitle(`<:no:833101993668771842> please ping a ROLE!`)
           .setDescription(` Usage: \`${prefix}addroletoeveryone @ROLE\``)
         );
       if (message.member.roles.highest.position <= role.position)
         return message.channel.send(new MessageEmbed()
           .setColor(es.wrongcolor)
           .setFooter(es.footertext, es.footericon)
           .setTitle(`<:no:833101993668771842> I cannot give that Role to all Members, because it's higher then your highest ROLE!`)
         );
       await message.guild.members.fetch();
       var members = message.guild.members.cache.filter(member => !member.roles.cache.has(role.id)).array();
       if (!members || members.length == 0)
         return message.channel.send(new MessageEmbed()
           .setColor(es.wrongcolor)
           .setFooter(es.footertext, es.footericon)
           .setTitle(`<:no:833101993668771842> Found no Members!`)
           .setDescription(`Most of the Times this means, **everyone** already has this ROLE! But you can retry..`)
         );
       let seconds = (Number(members.length) * 1500);
       console.log(members)
       message.channel.send(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
         .setFooter(es.footertext, es.footericon)
         .setAuthor(`Changing roles for ${members.length} Members...`, "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif", "https://discord.gg/2dKrZQyaC4")
         .setDescription(`This will take ${ms(seconds, {long: true})} in ideal conditions. Please be patient.`)
       );
       if (client.settings.get(message.guild.id, `adminlog`) != "no") {
         try {
           var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
           if (!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
           channel.send(new MessageEmbed()
             .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
             .setAuthor(`${require("path").parse(__filename).name} | ${message.author.tag}`, message.author.displayAvatarURL({
               dynamic: true
             }))
             .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
             .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
             .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
             .setTimestamp().setFooter("ID: " + message.author.id)
           )
         } catch (e) {
           console.log(e)
         }
       }
       var success = 0;
       var failed = 0;
       var counter = 0;
       addroletomember(members[counter])
       map.set(message.guild.id, true)
       async function addroletomember(member) {
         if (counter == members.length) return send_finished()
         counter++;
         await member.roles.add(role.id).then(async s => {
           success++;
           await delay(1500)
           addroletomember(members[counter]);
         }).catch(e => {
           failed++;
           addroletomember(members[counter]);
         })
       }

       function send_finished() {
         map.set(message.guild.id, false)
         message.channel.send({
           content: `<@${message.author.id}>`,
           embed: new MessageEmbed()
             .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
             .setFooter(es.footertext, es.footericon)
             .setTitle(`${emoji.msg.SUCCESS} SUCCESS`)
             .setDescription(`Successfully added ${role} to \`${success} Members\` of \`${counter} Members\`${failed != 0 ? `\n${failed} Members, did not get the ROLE, redo it with: \`${prefix}addroletoeveryone ${role.id}\``: ""}`)
         });
       }

     } catch (e) {
       map.set(message.guild.id, false)
       console.log(String(e.stack).bgRed)
       return message.channel.send(new MessageEmbed()
         .setColor(es.wrongcolor)
         .setFooter(es.footertext, es.footericon)
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