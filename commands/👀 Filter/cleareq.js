const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `cleareq`,
  category: `👀 Filter`,
  aliases: [`ceq`, `reseteq`, `clearequalizer`, `resetequalizer`, `restoreequalizer`, `req`],
  description: `Clears the Equalizer`,
  usage: `clearEQ`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    ee = client.settings.get(message.guild.id, "embed")
    try {
      player.clearEQ();
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`<a:yes:833101995723194437> Resetted the Equalizer`)
        .addField(`${emoji.msg.equalizer} FILTER: `, `${emoji.msg.ERROR} Nothing`)
        .addField(`${emoji.msg.equalizer} EQUALIZER: `, `${emoji.msg.ERROR} Nothing`)
        .setDescription(`Note: *It might take up to 5 seconds until you hear the new Equalizer*`)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`<:no:833101993668771842> An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
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
