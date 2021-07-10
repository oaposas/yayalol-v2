const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "coinflip",
  category: "💸 Economy",
  description: "Earn your Coinflip cash",
  usage: "coinflip <roll-result> <Gamble-Amount>",
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
      var flip = args[0] ? args[0].toLowerCase() : false //Heads or Tails
      var amount = args[1] //Coins to gamble
  
      if (!flip || !['heads', 'tails'].includes(flip)) 
        return message.reply(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> Specify the \`flip-result\`, it should be a number between \`heads\`-\`tails\``)
          .setDescription(`Usage: \`${prefix}coinflip <roll-result> <Gamble-Amount>\`\n\n\Example: \`${prefix}coinflip heads 100\``)
          );
      if (!amount) 
        return message.reply(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> Specify the **amount of \`Coins 💸\`** you want to gamble!`)
          .setDescription(`Usage: \`${prefix}coinflip <roll-result> <Gamble-Amount>\`\n\n\Example: \`${prefix}coinflip heads 100\``)
        );
      if (data.balance < amount) return message.reply(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> You can't gamble more Money than you have in your **👛 Pocket (\`${data.balance} 💸\`)**`)
      );
      var valid_Numbers = ['heads', 'tails'];
      var result = valid_Numbers[Math.floor((Math.random() * valid_Numbers.length))]
      let win = false;
      if(flip == result) win = true;
      if (win) {
        //double the amount
        amount *= 1.5; 
        //write the DB
        client.economy.math(`${message.guild.id}-${message.author.id}`, "+", amount, "balance");
        //get the latest data
        data = client.economy.get(`${message.guild.id}-${message.author.id}`);
        //send the Information Message
        message.channel.send(new MessageEmbed()
          .setTitle(`<a:yes:833101995723194437> You've won \`${amount} 💸\``)
          .setDescription(`**The Coin Flipped: \`${result}\`**\n\n👛 You now have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        )
      } else {
        //write the DB
        client.economy.math(`${message.guild.id}-${message.author.id}`, "-", amount, "balance")
        //get the latest data
        data = client.economy.get(`${message.guild.id}-${message.author.id}`)
        //send the Information Message
        message.channel.send(new MessageEmbed()
          .setTitle(`<:no:833101993668771842> You've lost \`${amount} 💸\``)
          .setDescription(`**The Coin Flipped: \`${result}\`**\n\n👛 You now have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
          .setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        )
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
