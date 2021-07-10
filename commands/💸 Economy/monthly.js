const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "monthly",
  category: "💸 Economy",
  description: "Earn your monthly cash",
  usage: "monthly",
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
      let timeout = 86400000*30;

      if(data.monthly !== 0 && timeout - (Date.now() - data.monthly) > 0){
        let time = duration(timeout - (Date.now() - data.monthly));
        return message.reply({embed: new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
          .setTitle(`<:no:833101993668771842> You've already collected your monthly reward!`)
          .setDescription(`🕐 **Try again in ${time.map(i=> `\`${i}\``).join(", ")}**\n\n👛 You still have \`${Math.floor(data.balance)} 💸\` in your Pocket`)
        });
      } 
      //YEA
      else {
        let amountarray = [300*12.5, 350*12.5, 400*12.5, 340*12.5, 360*12.5, 350*12.5, 355*12.5, 345*12.5, 365*12.5, 350*12.5, 340*12.5, 360*12.5, 325*12.5, 375*12.5, 312.5*12.5, 387.5*12.5];
        let amount = Math.floor(amountarray[Math.floor((Math.random() * amountarray.length))]);
        amount = amount * data.black_market.boost.multiplier
        //add the Money to the User's Balance in this Guild
        client.economy.math(`${message.guild.id}-${message.author.id}`, "+", amount, "balance")
        //set the current time to the db
        client.economy.set(`${message.guild.id}-${message.author.id}`, Date.now(), "monthly")
        //get the new data
        data = client.economy.get(`${message.guild.id}-${message.author.id}`)
        //return some message!
        return message.reply(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
          .setTitle(`<a:yes:833101995723194437> You've collected your monthly reward of \`${amount} 💸\``)
          .setDescription(`👛 You now have \`${Math.floor(data.balance)} 💸\` in your Pocket`)
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
