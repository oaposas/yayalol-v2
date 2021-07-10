const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "pay",
  category: "💸 Economy",
  aliases: ["givemoney"],
  description: "Pays Money to someone else!",
  usage: "pay <@USER> <Amount>",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if(!client.settings.get(message.guild.id, "ECONOMY")){
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
        .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
      );
    }
    try {
    //command
    var user  = message.author;
    var topay = message.mentions.members.filter(member=>member.guild.id == message.guild.id).first();
    if(!topay) 
    return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`<:no:833101993668771842> You didn't pinged to whom you want to pay`)
        .setDescription(`Usage: \`${prefix}pay <@USER> <Amount>\`\n\n\Example: \`${prefix}pay <@442355791412854784> 42069\``)
      );
    topay = topay.user;
    let payamount = Number(args[1]);
    if(!payamount)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`<:no:833101993668771842> You didn't add the payamount`)
        .setDescription(`Usage: \`${prefix}pay <@USER> <Amount>\`\n\n\Example: \`${prefix}pay <@442355791412854784> 42069\``)
      );
    //if user or the topay user is a bot, return error
    if(user.bot || topay.bot) return message.reply("<:no:833101993668771842> **A Discord Bot can not have Economy!**")
    //ensure the economy data
    ensure_economy_user(client, message.guild.id, user.id);
    //ensure the economy data
    ensure_economy_user(client, message.guild.id, topay.id)
    //get the economy data 
    let data = client.economy.get(`${message.guild.id}-${user.id}`)
    let data2 = client.economy.get(`${message.guild.id}-${topay.id}`)

    if(payamount <= 0)
    return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`<:no:833101993668771842> You can't pay a negative Amount of Money or no Money, to ${topay}`)
      );
    
    if(payamount > data.balance)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`<:no:833101993668771842> You can't pay more Money than you have in your **👛 Pocket (\`${data.balance} 💸\`)**`)
      );
  
    client.economy.math(`${message.guild.id}-${user.id}`, "-", payamount, "balance")
    client.economy.math(`${message.guild.id}-${topay.id}`, "+", payamount, "balance")
    data = client.economy.get(`${message.guild.id}-${user.id}`)
    data2 = client.economy.get(`${message.guild.id}-${topay.id}`)
    //return some message!
    return message.reply(new MessageEmbed()
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
      .setTitle(`<a:yes:833101995723194437> **You payed \`${payamount} 💸\` to \`${topay.tag}\`**`)
      .setDescription(`👛 **You** now have \`${Math.floor(data.balance)} 💸\` in your Pocket\n\n👛 **${topay.username}** now has \`${Math.floor(data2.balance)} 💸\` in his/her Pocket`)
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
