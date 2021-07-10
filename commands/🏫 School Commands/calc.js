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
module.exports = {
  name: "calc",
  aliases: ["calculate"],
  category: "🏫 School Commands",
  description: "Calculates a math equation",
  usage: "calc <INPUT>",
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
    //command

    if (args.length < 1)
      return message.channel.send(new MessageEmbed()
      .setColor(es.wrongcolor)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`<:no:833101993668771842> You must provide a equation to be solved on the calculator`)
      .setDescription(` Usage: \`${prefix}calc <Input>\`\n\nExample: \`${prefix}calc 10 + 4*5\`\n\nHey try out: \`${prefix}calculator\``)
      );

    let answer;

    try {
      answer = math.eval(args.join(" "));
    } catch (err) {
      message.channel.send(`Invalid math equation: ${err}`);
    }

    message.channel.send(new MessageEmbed() 
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setDescription(`Try out: \`${prefix}calculator\``)
      .setFooter(es.footertext, es.footericon)
      .addField(`**Equation:**`,`\`\`\`fix\n${args.join(" ")}\`\`\``)
      .addField(`**Result:**`,`\`\`\`fix\n${answer}\`\`\``)
    );
  }
};