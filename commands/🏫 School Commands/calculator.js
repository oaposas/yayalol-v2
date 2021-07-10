const math = require('math-expression-evaluator');
const ms = require("ms");
const moment = require("moment")
const {
  MessageEmbed,
  MessageAttachment
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton, MessageActionRow } = require('discord-buttons')
const { Calculator } = require('weky')
module.exports = {
  name: "calculator",
  aliases: ["ti82", "taschenrechner"],
  category: "🏫 School Commands",
  description: "Allows you to use a calculator",
  usage: "calc",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if(!client.settings.get(message.guild.id, "SCHOOL")){
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
        .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
      );
    }
    await Calculator(message)
  }
};