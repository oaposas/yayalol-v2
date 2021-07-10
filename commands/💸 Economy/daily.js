const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "daily",
  category: "💸 Economy",
  description: "earn your daily cash",
  usage: "daily",
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
      var user = message.author
      if(user.bot) return message.reply("<:no:833101993668771842> **A Discord Bot can not have Economy!**")
      
      //ensure the economy data
      ensure_economy_user(client, message.guild.id, user.id)
      //get the economy data 
      let data = client.economy.get(`${message.guild.id}-${user.id}`)
      //get the delays
      let timeout = 86400000;
      //if the user is on delay return some error
      if(data.daily !== 0 && timeout - (Date.now() - data.daily) > 0){
        let time = duration(timeout - (Date.now() - data.daily));
        return message.reply({embed: new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
          .setTitle(`<:no:833101993668771842> You've already collected your daily reward!`)
          .setDescription(`🕐 **Try again in ${time.map(i=> `\`${i}\``).join(", ")}**\n\n👛 You still have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
        });
      } 
      //YEA
      else {
        let amountarray = [300, 350, 400, 340, 360, 350, 355, 345, 365, 350, 340, 360, 325, 375, 312.5, 387.5];
        let amount = Math.floor(amountarray[Math.floor((Math.random() * amountarray.length))]);
        amount = amount * data.black_market.boost.multiplier
        //add the Money to the User's Balance in this Guild
        client.economy.math(`${message.guild.id}-${message.author.id}`, "+", amount, "balance")
        //set the current time to the db
        client.economy.set(`${message.guild.id}-${message.author.id}`, Date.now(), "daily")
        //get the new data
        data = client.economy.get(`${message.guild.id}-${message.author.id}`)
        //return some message!
        return message.reply(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
          .setTitle(`<a:yes:833101995723194437> You've collected your daily reward of \`${amount} 💸\``)
          .setDescription(`👛 You now have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
        );
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
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
