const {
    MessageEmbed,
    MessageAttachment
  } = require("discord.js");
  const config = require("../../botconfig/config.json");
  var ee = require("../../botconfig/embed.json");

  module.exports = {
    name: "test",
    aliases: [""],
    category: "🕹️ Fun",
    description: "IMAGE CMD",
    usage: "test",
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
        //get pinged user, if not then use cmd user
        var user = message.mentions.users.first();
        //if user pinged, shift the args, 
        if(user) args.shift();
        //else not and define the user to be message.author
        else user = message.author;
        //get avatar of the user
        var avatar = user.displayAvatarURL({ format: "png" });
        //get the additional text
        var text = args.join(" ");
        const canvacord = require("canvacord");
        const duration = 2.6 * 60 * 1000;
        const position = ((Math.random() * 2.4 * 60) + 0.2) * 1000;
        var now = Date.now()
        const data = {
            author: user.username,
            title: text ? text : "UNKNOWN SONG",
            start: now -position, 
            end: now + duration,
            image: avatar
        }
        const card = new canvacord.Spotify()
            .setAuthor(data.author)
            .setStartTimestamp(data.start)
            .setEndTimestamp(data.end)
            .setImage(data.image)
            .setTitle(data.title);

        const image = await card.build()
        var attachment = new MessageAttachment(image, "spotify.png");
        //delete old message
        tempmsg.delete();
        //send new Message
        message.channel.send(tempmsg.embeds[0]
        .setAuthor(`Command for: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
        .setImage("attachment://spotify.png")
        .attachFiles(attachment)
        ).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray))
        
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
  