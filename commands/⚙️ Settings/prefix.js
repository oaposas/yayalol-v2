const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `prefix`,
    aliases: [`changeprefix`],
    category: `⚙️ Settings`,
    description: `Let's you change the Prefix of the BOT`,
    usage: `prefix <NEW PREFIX>`,
    memberpermissions: [`ADMINISTRATOR`],
    run: async (client, message, args, cmduser, text, prefix) => {
      let es = client.settings.get(message.guild.id, "embed")
    try{
    
    //if no args return error
    if (!args[0])
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> Please provide a new prefix!`)
        .setDescription(`Current prefix: \`${prefix}\``)
      );
    //if there are multiple arguments
    if (args[1])
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> The prefix can\'t have two spaces`)
      );
    //if the prefix is too long
    if (args[0].length > 5)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> The prefix can\'t be Longer then \`5\``)
      );
    //set the new prefix
    client.settings.set(message.guild.id, args[0], `prefix`);
    //return success embed
    return message.channel.send(new MessageEmbed()
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`<a:yes:833101995723194437> Set new prefix to **\`${args[0]}\`**`)
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
