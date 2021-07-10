const superagent = require("node-fetch");
const Discord = require('discord.js')

const rp = require('request-promise-native');
const config = require("../../botconfig/config.json")
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "boobs",
    category: "🔞 NSFW",
  description: "Sends boobs",
  usage: "boobs",
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
  //command

  //Checks channel for nsfw
  
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply("This Channel is not a NSFW Channel")
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

  return rp.get('http://api.oboobs.ru/boobs/0/1/random').then(JSON.parse).then(function(res)  {
    return rp.get({
        url:'http://media.oboobs.ru/' + res[0].preview,
        encoding: null
    });
}).then(function(res)   {

const boobs = new Discord.MessageEmbed()
      .setTitle("Boobs")
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
      .setImage("attachment://file.png").attachFiles([{ attachment: res, name: "file.png" }])


    message.channel.send(boobs);
});
  }
  };