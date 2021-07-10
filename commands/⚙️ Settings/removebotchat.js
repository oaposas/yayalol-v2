const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `removebotchat`,
    aliases: [`removebotchat`],
    category: `⚙️ Settings`,
    description: `Let's you delete the channel for the bot commands`,
    usage: `removebotchat`,
    memberpermissions: [`ADMINISTRATOR`],
    run: async (client, message, args, cmduser, text, prefix) => {
      let es = client.settings.get(message.guild.id, "embed")
    try{
      
      //get the mentioned channel
      let channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
      if (!channel)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> Please add a Channel via ping, for example: #channel!`)
      );
      //try to find it, just incase user pings channel from different server
      try {
          message.guild.channels.cache.get(channel.id)
      } catch {
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> It seems that the Channel does not exist in this Server!`)
        );
      }
      //if its not in the database return error
      if(!client.settings.get(message.guild.id,`botchannel`).includes(channel.id))
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> This Channel is not in the Bot Channel Settings!`)
        );
      //remove the Channel from the Database
      client.settings.remove(message.guild.id, channel.id, `botchannel`);
      //these lines creates the string for all botchannels
      let leftb = ``;
      if(client.settings.get(message.guild.id, `botchannel`).join(``) ===``) leftb = `no Channels, aka all Channels are Bot Channels`
      else
      for(let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++){
        leftb += `<#` +client.settings.get(message.guild.id, `botchannel`)[i] + `> | `
      }
      //send informational message
      return message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<a:yes:833101995723194437> Removed the Bot-Chat \`${channel.name}\``)
        .setDescription(`All left Bot Chats:\n> ${leftb.substr(0, leftb.length - 3)}`)
      );
    } catch (e) {
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
