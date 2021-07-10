const superagent = require("node-fetch");
const Discord = require('discord.js')
const {MessageEmbed} = require('discord.js')

const rp = require('request-promise-native');
const config = require("../../botconfig/config.json")
module.exports = {
    name: "ass",
    category: "🔞 NSFW",
  description: "Sends ass",
  usage: "ass",
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


  
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply("This Channel is not a NSFW Channel")
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

  return rp.get('http://api.obutts.ru/butts/0/1/random').then(JSON.parse).then(function(res)  {
    return rp.get({
        url:'http://media.obutts.ru/' + res[0].preview,
        encoding: null
    });
}).then(function(res)   {

const ass = new Discord.MessageEmbed()
      .setTitle("Ass")
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
      .setImage("attachment://file.png").attachFiles([{ attachment: res, name: "file.png" }])


    message.channel.send(ass);
});
  }
  };