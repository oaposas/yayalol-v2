const {
  MessageEmbed,
  MessageAttachment
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");




module.exports = {
  name: "bed",
  aliases: [""],
  category: "🕹️ Fun",
  description: "IMAGE CMD",
  usage: "bed @User @User2",
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
     //find the USER
     let user = message.mentions.users.first();
     if(!user && args[0] && args[0].length == 18) {
       let tmp = await client.users.fetch(args[0])
       if(tmp) user = tmp;
       if(!tmp) return message.reply("<:no:833101993668771842> I failed finding that User...")
     }
     else if(!user && args[0]){
       let alluser = message.guild.members.cache.map(member=> String(member.user.username).toLowerCase())
       user = alluser.find(user => user.includes(args[0].toLowerCase()))
       user = message.guild.members.cache.find(me => (me.user.username).toLowerCase() == user).user
       if(!user || user == null || !user.id) return message.reply("<:no:833101993668771842> I failed finding that User...")
     }
     else {
       user = message.mentions.users.first() || message.author;
     }
     //find the USER
     let user2 = message.mentions.users.last();
     if(!user2 && args[1] && args[1].length == 18) {
       let tmp = await client.users.fetch(args[1])
       if(tmp) user2 = tmp;
       if(!tmp) user2 = message.author;
     }
     else if(!user2 && args[1]){
       let alluser = message.guild.members.cache.map(member=> String(member.user.username).toLowerCase())
       user2 = alluser.find(user => user.includes(args[1].toLowerCase()))
       user2 = message.guild.members.cache.find(me => (me.user.username).toLowerCase() == user2).user
       if(!user2 || user2 == null || !user2.id) user2 = message.author;
     }
     else {
       user2 = message.mentions.users.last() || message.author;
     }
     let avatar1 = user.displayAvatarURL({
       dynamic: false,
       format: "png"
     });
     let avatar2 = user2.displayAvatarURL({
       dynamic: false,
       format: "png"
     });
      client.memer.bed(avatar1, avatar2).then(image => {
        //make an attachment
        var attachment = new MessageAttachment(image, "bed.png");
        //delete old message
        tempmsg.delete();
        //send new Message
        message.channel.send(tempmsg.embeds[0]
          .setAuthor(`Meme for: ${user1.tag} | ${user2.tag}`, avatar1)
          .setImage("attachment://bed.png")
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
