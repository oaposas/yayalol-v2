const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../botconfig/config.json")
const {MessageEmbed} = require('discord.js')
module.exports = {
  name: "bj",
  category: "🔞 NSFW",
  usage: "bj",
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
		return message.channel.send({embed: {
                color: 16734039,
                description: "You can use this command in an NSFW Channel!"
            }})
      }
      var superagent = require('superagent');


    superagent.get('https://nekos.life/api/v2/img/blowjob')
        .end((err, response) => {
      const embed = new Discord.MessageEmbed()
      .setTitle(":smirk: Blowjob")
      .setImage(response.body.url)
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
      .setFooter(`Tags: blowjob`)
      .setURL(response.body.url);
  message.channel.send(embed);
    });
}
                };