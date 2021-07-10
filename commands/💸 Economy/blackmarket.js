const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "blackmarket",
  category: "💸 Economy",
  description: "Shows the Black Market",
  usage: "blackmarket <Multiplier>",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if(!client.settings.get(message.guild.id, "ECONOMY")){
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
        .setDescription(`An Admin can enable it with: **\`${prefix}setup-commands\``)
      );
    }
    try {
    //command
    var user = message.author;
    if(user.bot) return message.reply("<:no:833101993668771842> **A Discord Bot can not have Economy!**")
    
    //ensure the economy data
    ensure_economy_user(client, message.guild.id, user.id)
    //get the economy data 
    let data = client.economy.get(`${message.guild.id}-${user.id}`)
    //get the delays
    let timeout = 86400000 * 5;
    //if the user is on delay return some error
    if(data.black_market.boost.time !== 0 && timeout - (Date.now() - data.black_market.boost.time) > 0){
      let time = duration(timeout - (Date.now() - data.black_market.boost.timee));
      return message.reply({embed: new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle(`<:no:833101993668771842> You've already bought a 2 Day Boost in the last 5 Days!`)
        .setDescription(`🕐 **Try again in ${time.map(i=> `\`${i}\``).join(", ")}**\n\n👛 You still have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
      });
    } 
    //YEA
    else {
      let prize = 10000;
      let amount = parseInt(args[0]);
      if(!amount)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setTitle(`<:no:833101993668771842> You did not add the Multiplier you want to buy for 2 Days!`)
          .setDescription(`Usage: \`${prefix}blackmarket <Multiplier>\`\n\n\Example: \`${prefix}blackmarket 3\``)
        );
      if(amount == 0 || amount < 0)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setTitle(`<:no:833101993668771842> You cannot buy a 0 or less then 0 Multiplier, for 2 Days`)
          .setDescription(`Usage: \`${prefix}blackmarket <Multiplier>\`\n\n\Example: \`${prefix}blackmarket 3\``)
        );
      if(amount == 1)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setTitle(`<:no:833101993668771842> You cannot buy a 1 Multiplier, for 2 Days`)
          .setDescription(`Usage: \`${prefix}blackmarket <Multiplier>\`\n\n\Example: \`${prefix}blackmarket 3\``)
        );
        
      if(amount > 5)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setTitle(`<:no:833101993668771842> You cannot buy a Multiplier bigger then 5, for 2 Days`)
          .setDescription(`Usage: \`${prefix}blackmarket <Multiplier>\`\n\n\Example: \`${prefix}blackmarket 3\``)
        );
      if(prize * (amount - 1) > data.balance)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setTitle(`<:no:833101993668771842> You can't pay more Money (\`${(amount - 1)}x ${prize}\`) than you have in your **👛 Pocket (\`${data.balance} 💸\`)**`)
        );
      //add the Money to the User's Balance in this Guild
      client.economy.math(`${message.guild.id}-${message.author.id}`, "-", prize * (amount - 1), "balance")
      //set the current time to the db
      client.economy.set(`${message.guild.id}-${message.author.id}`, Date.now(), "black_market.boost.time")
      client.economy.set(`${message.guild.id}-${message.author.id}`, amount, "black_market.boost.multiplier")
      //get the new data
      data = client.economy.get(`${message.guild.id}-${message.author.id}`)
      //return some message!
      return message.reply(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle(`<a:yes:833101995723194437> You've bought a ${amount}x Boost for 2 Days, for \`${prize * (amount - 1)} 💸\`, You can buy one again in 5 Days`)
        .setDescription(`👛 You now have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket\n\nEvery single INCOME will now be ${amount}x Worth for 3 DAYS`)
      );
    }
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
