const Discord = require("discord.js")
const {
  MessageEmbed
} = require("discord.js")
const config = require("../botconfig/config.json")
ee = require("../botconfig/embed.json")
const {
  format,
  delay,
  arrayMove
} = require("../handlers/functions")
module.exports = async (client, message, args, type) => {
  let method = type.includes(":") ? type.split(":") : Array(type)
  if (!message.guild) return;
  //just visual for the console
  
  ee = client.settings.get(message.guild.id, "embed")

  let {
    channel
  } = message.member.voice;
  const permissions = channel.permissionsFor(client.user);

  if (!permissions.has("CONNECT"))
    return message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("<:no:833101993668771842> I need permissions to join your channel")
    );
  if (!permissions.has("SPEAK"))
    return message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("<:no:833101993668771842> I need permissions to speak in your channel")
    );

  if (method[0] === "song")
    require("./playermanagers/song")(client, message, args, type); 
  else if (method[0] === "request")
    require("./playermanagers/request")(client, message, args, type);  
  else if (method[0] === "playlist")
    require("./playermanagers/playlist")(client, message, args, type);
  else if (method[0] === "similar")
    require("./playermanagers/similar")(client, message, args, type);
  else if (method[0] === "search")
    require("./playermanagers/search")(client, message, args, type);
  else if (method[0] === "skiptrack")
    require("./playermanagers/skiptrack")(client, message, args, type); 
  else if (method[0] === "playtop")
    require("./playermanagers/playtop")(client, message, args, type)
  else
    return message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("<:no:833101993668771842> No valid search Term? ... Please Contact: `Tomato#6966`")
    );
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
