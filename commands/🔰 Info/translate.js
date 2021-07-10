const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const translate = require("translatte");
module.exports = {
  name: "translate",
  category: "🔰 Info",
  aliases: ["trans", "tran", "tr"],
  cooldown: 5,
  usage: "translate <from> <to> <TEXT>",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      if(!args[0]) return message.channel.send(`<:no:833101993668771842> Error | Unknown Command Usage! \`${prefix}translate <from> <to> <Text>\`\nExample: \`${prefix}translate en de Hello World\``)

      if(!args[1]) return message.channel.send(`<:no:833101993668771842> Error | Unknown Command Usage! \`${prefix}translate <from> <to> <Text>\`\nExample: \`${prefix}translate en de Hello World\``)

      if(!args[2]) return message.channel.send(`<:no:833101993668771842> Error | Unknown Command Usage! \`${prefix}translate <from> <to> <Text>\`\nExample: \`${prefix}translate en de Hello World\``)

      translate(args.slice(2).join(" "), {from: args[0], to: args[1]}).then(res=>{
        let embed = new MessageEmbed()
        .setColor("#2f3136")
        .setAuthor(`Translated to: ${args[1]}`, "https://imgur.com/0DQuCgg.png", "https://discord.gg/FQGXbypRf8")
        .setFooter(`Translated from: ${args[0]}`, message.author.displayAvatarURL({dynamic:true}))
        .setDescription("```"+res.text.substr(0, 2000)+"```")
        message.channel.send(embed)
        }).catch(err => {
          let embed = new MessageEmbed()
          .setColor("#2f3136")
          .setTitle("<:no:833101993668771842> Error | Something went wrong")
          .setDescription(String("```"+err.stack+"```").substr(0, 2000))
          message.channel.send(embed)
            console.log(err);
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e.stack)).substr(0, 2000)}\`\`\``)
      );
    }
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
