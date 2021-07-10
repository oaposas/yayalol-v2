const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "crime",
  category: "💸 Economy",
  description: "Earn your crime cash",
  usage: "crime @USER",
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
      var user = message.author;
      //ensure the economy data
      ensure_economy_user(client, message.guild.id, user.id)
      //get the economy data 
      let data = client.economy.get(`${message.guild.id}-${message.author.id}`)
      //get the delays
      let timeout = 86400000;
      //if the user is on COOLDOWN, return
      if(data.crime !== 0 && timeout - (Date.now() - data.crime) > 0){
        let time = duration(timeout - (Date.now() - data.crime));
        return message.reply({embed: new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
          .setTitle(`<:no:833101993668771842> You've already atempted a crime Today!!`)
          .setDescription(`**Try again in ${time.map(i=> `\`${i}\``).join(", ")}**\n\n👛 You still have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
        });
      } 
      //YEA
      else {
        let amountarray = [300*2, 350*2, 400*2, 340*2, 360*2, 350*2, 355*2, 345*2, 365*2, 350*2, 340*2, 360*2, 325*2, 375*2, 312.5*2, 387.5*2];
        let amount = Math.floor(amountarray[Math.floor((Math.random() * amountarray.length))]);
        amount = amount * data.black_market.boost.multiplier
        //get a random Crime Message
        let crimemsgarray = ["You robbed the Local Bank", "You destroyed the neigbour's mailbox", "You stolen a 24k Clock from the Shop", 
            "You robbed Döner from your Abi", "You kidnapped the sister of your stepmom", "You were driving to fast and escaped the police",
            "You cracked Discord Nitro", "You stole Discord Nitros", "You hacked the local Network", "You hacked the electricity of your town",
            "You crashed TikTok", "You stole Corona Tests", "You stole Masks"
        ];
        let thecrimemsg = crimemsgarray[Math.floor((Math.random() * crimemsgarray.length))];
        //add the Money to the User's Balance in this Guild
        client.economy.math(`${message.guild.id}-${message.author.id}`, "+", amount, "balance")
        client.economy.math(`${message.guild.id}-${user.id}`, "-", amount, "balance")
        //set the current time to the db
        client.economy.set(`${message.guild.id}-${message.author.id}`, Date.now(), "rob")
        //get the new data
        data = client.economy.get(`${message.guild.id}-${message.author.id}`)
        //return some message!
        return message.reply(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
          .setTitle(`<a:yes:833101995723194437> ${thecrimemsg} and earned \`${amount} 💸\``)
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
