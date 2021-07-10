const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "ecohelp",
  category: "💸 Economy",
  aliases: ["economyhelp"],
  description: "Shows Help for the Economy",
  usage: "ecohelp [@USER]",
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
      var user = message.author
      const economycmds = [`work`, `beg`, `rob`, `crime`,  `pay`, `balance`, `profile`, `withdraw`, `deposit`, `hourly`, `daily`, `weekly`, `monthly`, `store`, `buy`, `sell`]
      const gamblingcmds = ["slots", "coinflip", "dice"]
      const extracmds = [`storeinfo`, `buy <item> [Amount]`]
      //return some message!
      return message.reply(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`**💸 Economy help | Prefix: \`${prefix}\`**`)
        .addField(`💸 **__Economy Commands__**`, "**" + economycmds.map(i => `\`${i}\``).join("・") + "**" )
        .addField(`🎰 **__Gambling Commands__**`, "**" + gamblingcmds.map(i => `\`${i}\``).join("・") + "**" )
        .addField(`✨ **__Extra Commands__**`, "**" + extracmds.map(i => `\`${i}\``).join("・") + "**" )
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
