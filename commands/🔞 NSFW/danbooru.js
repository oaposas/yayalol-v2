const randomPuppy = require('random-puppy');
const request = require('node-fetch');
const fs = require("fs")
const config = require("../../botconfig/config.json")
const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js')
const booru = require('booru');

module.exports = {
    name: "danbooru",
    category: "🔞 NSFW",
    usage: "danbooru",
  description: "Searches danbooru image board",
  run: async (bot, message, args,) => {
    let es = client.settings.get(message.guild.id, "embed")
    if(!client.settings.get(message.guild.id, "NSFW")){
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
        .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
      );
    }

  if (!message.channel.nsfw) return message.reply("This Channel is not a NSFW Channel").then(msg => { message.react('💢'); msg.delete({ timeout: 3000 }) })

  if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('That kind of stuff is not allowed! Not even in NSFW channels!');

  var query = message.content.split(/\s+/g).slice(1).join(" ");
  booru.search('db', [query], {random: true })
      .then(booru.commonfy)
      .then(images => {
          for (let image of images) {
              const embed = new Discord.MessageEmbed()
              .setTitle("Danbooru:")
              .setImage(image.common.file_url)
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
              .setFooter(`Tags: danbooru ${query}`)
              .setURL(image.common.file_url);
          return message.channel.send({ embed });
          }

      }).catch(err => {
          if (err.name === 'booruError') {
              return message.channel.send(`No results found for **${query}**!`);
          } else {
              return message.channel.send(`No results found for **${query}**!`);
          }
})
  }
  };