const {
  MessageEmbed,
  MessageAttachment
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");




module.exports = {
  name: "cry",
  aliases: [""],
  category: "🕹️ Fun",
  description: "IMAGE CMD",
  usage: "cry <TEXT>",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "FUN")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
      //send loading message
      var tempmsg = await message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setAuthor("Getting Image Data..", "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif")
      );
      //get the additional text
      var text = args.join(" ");
      //If no text added, return error
      if(!text) return tempmsg.edit(tempmsg.embeds[0]
        .setTitle("<:no:833101993668771842> You did not enter a Valid Text!")
        .setColor("RED")
        .setDescription(`Useage: \`${prefix}cry <TEXT>\``)
      ).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray))
      
      //get the memer image
      client.memer.cry(text).then(image => {
        //make an attachment
        var attachment = new MessageAttachment(image, "cry.png");
        //delete old message
        tempmsg.delete();
        //send new Message
        message.channel.send(tempmsg.embeds[0]
          .setAuthor(`Meme for: ${message.author.tag}`, message.author.displayAvatarURL())
          .setImage("attachment://cry.png")
          .attachFiles(attachment)
        ).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray))
      })
      
  }
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
