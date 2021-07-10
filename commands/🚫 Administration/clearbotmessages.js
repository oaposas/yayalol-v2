const {
  MessageEmbed, Collection
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  delay,
  databasing
} = require(`../../handlers/functions`);
module.exports = {
  name: `clearbotmessages`,
  aliases: [`clearbotmsgs`, "purgebotmessages", "purgebotmsgs", "prune"],
  category: `🚫 Administration`,
  description: `Deletes a amount of messages from the bot in a Channel.`,
  usage: `clearbotmessages <Amount of messages>`,
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      if(!message.guild.me.hasPermission("MANAGE_MESSAGES"))      
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle("<:no:833101993668771842> I am missing the permission to `MANAGE MESSAGES`!")
      )
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.clearbotmessages")
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
            client.settings.remove(message.guild.id, r, `cmdadminroles.clearbotmessages`)
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

      let messageCollection = new Collection(); //make a new collection
      let channelMessages = await message.channel.messages.fetch({ //fetch the last 100 messages
          limit: 100
      }).catch(err => console.log(err)); //catch any error
      messageCollection = messageCollection.concat(channelMessages.filter(msg => msg.author.id == client.user.id)); //add them to the Collection
      let tomanymsgs = 1; //some calculation for the messagelimit
      let messagelimit = 250 / 100; //devide it by 100 to get a counter
      if(args[0]){
          if(Number(args[0]) > 5000 || Number(args[0]) < 100) return message.reply("**<:no:833101993668771842> Maximum amount of Messages to be pruned are 5000 (minimum 100)**")
          if(isNaN(args[0])) return message.reply("**<:no:833101993668771842> Maximum amount of Messages to be pruned are 5000 (minimum 100)**")
          messagelimit = Number(args[0]) / 100;
      }
      while (channelMessages.size === 100) { //make a loop if there are more then 100 messages in this channel to fetch
          if (tomanymsgs === messagelimit) break; //if the counter equals to the limit stop the loop
          tomanymsgs += 1; //add 1 to the counter
          let lastMessageId = channelMessages.lastKey(); //get key of the already fetched messages above
          channelMessages = await message.channel.messages.fetch({
          limit: 100,
          before: lastMessageId
          }).catch(err => console.log(err)); //Fetch again, 100 messages above the already fetched messages
          if (channelMessages) //if its true
          messageCollection = messageCollection.concat(channelMessages.filter(msg => msg.author.id == client.user.id)); //add them to the collection
      }
      let msgs = messageCollection.array()
      message.channel.bulkDelete(msgs)

      await message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`${emoji.msg.SUCCESS} ${msgs.length} messages successfully deleted!`)
      ).then(msg => msg.delete({
        timeout: 3000
      }));
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
    } catch (e) {
      console.log(String(e.stack).red);
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}
