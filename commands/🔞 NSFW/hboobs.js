const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const {MessageEmbed} = require('discord.js')
const config = require("../../botconfig/config.json")
module.exports = {
  name: "hboobs",
  category: "🔞 NSFW",
  usage: "hboobs",
    run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if(!client.settings.get(message.guild.id, "NSFW")){
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
        .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
      );
    }

  //Checks channel for nsfw
  
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply("This Channel is not a NSFW Channel")
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }
  var superagent = require('superagent');

  if (!message.channel.nsfw) return message.channel.send('You must use this command in an nsfw lounge!') 

  var lo = new Discord.MessageEmbed()
              .setDescription(`Please wait...`)
              .setTimestamp().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)

  message.channel.send(lo).then(m => {

      superagent.get('https://nekobot.xyz/api/image').query({ type: 'hboobs'}).end((err, response) => {

          var embed_nsfw = new Discord.MessageEmbed()
              .setDescription(`:underage:\n**[image not loading? click here](${response.body.message})**`)
              .setTimestamp().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
              .setImage(response.body.message)
          
          m.edit(embed_nsfw);
      });
  });
  
}
};