var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing
} = require(`../../handlers/functions`);
module.exports = {
  name: "setup",
  category: "💪 Setup",
  aliases: [""],
  cooldown: 5,
  usage: "setup  -->  Follow the Steps",
  description: "Shows all setup commands",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    var es = client.settings.get(message.guild.id, "embed");
    try {
      const emojis = [
        "🚫", "🔨", "🅰️", "🅱️", "🔗", "📩", "🛠", "📘", "⚙️", "💯", "👍", "🔈", "🆗", "📤", "💥", "📻", "🔱", "📌", "📯", "📑", "💡", "🏷", "840260133753061408", "840255600851812393", "📥"
      ];
      var items = client.commands.filter((cmd) => cmd.category.toLowerCase().includes("setup")).map((cmd) => `\`${cmd.name}\``);
      var items2 = client.commands.filter((cmd) => cmd.category.toLowerCase().includes("setup")).map((cmd) => `*${cmd.description}*`);

      var embed = new MessageEmbed()
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`💪 The Setup Commands \`1/2\``)
      var embed2 = new MessageEmbed()
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`💪 The Setup Commands \`2/2\``)


      for(let i = 0; i < 20; i++){
        embed.addField(`${emojis[i] ? emojis[i].length == 18 ? `${emojistring(client.guilds.cache.get("773668217163218944").emojis.cache.find(emoji => emoji.id === emojis[i]))}`: emojis[i] + " " : ""}`+ items[i], items2[i], true);
      }
      for(let i = 20; i < items.length; i++){
        embed2.addField(`${emojis[i] ? emojis[i].length == 18 ? `${emojistring(client.guilds.cache.get("773668217163218944").emojis.cache.find(emoji => emoji.id === emojis[i]))}`: emojis[i] + " " : ""}`+ items[i], items2[i], true);
      } 
      function emojistring(emoji){
        if(!emoji || !emoji.id) return "";
        var string = "<"
        if(emoji.id.length == 18){
          if(emoji.animated) string += "a"
          string += `:${emoji.name}:${emoji.id}>`
        }else {
          string = emoji.name
        }
        return string;
      }

      const themsg = await message.channel.send(embed);
      const themsg2 = await message.channel.send(embed2);


      for(let i = 0; i < 20; i++){
        try{
          themsg.react(emojis[i]);
        }catch{
          break;
        }
      }
      for(let i = 20; i < items.length; i++){
        try{
          themsg2.react(emojis[i]);
        }catch{
          break;
        }
      }

      var error = false;
      themsg.awaitReactions((r, u) => u.id == cmduser.id, {max: 1, time: 60000, errors: ["time"]}).then(collected=>{
        themsg.reactions.removeAll().catch(error => {if(error) return;});
        themsg2.reactions.removeAll().catch(error => {if(error) return;});
        require(`./${client.commands.filter((cmd) => cmd.category.toLowerCase().includes("setup")).map(cmd=>cmd.name)[emojis.indexOf(collected.first().emoji.id || collected.first().emoji.name)]}.js`).run(client, message, args, cmduser, text, prefix);
      }).catch(e=>{
        themsg.reactions.removeAll().catch(error => {if(error) return;});
        themsg2.reactions.removeAll().catch(error => {if(error) return;});
        if(!error) {
          error = true;
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        }

      })
      themsg2.awaitReactions((r, u) => u.id == cmduser.id, {max: 1, time: 60000, errors: ["time"]}).then(collected=>{
        themsg.reactions.removeAll().catch(error => {if(error) return;});
        themsg2.reactions.removeAll().catch(error => {if(error) return;});
        require(`./${client.commands.filter((cmd) => cmd.category.toLowerCase().includes("setup")).map(cmd=>cmd.name)[emojis.indexOf(collected.first().emoji.id || collected.first().emoji.name)]}.js`).run(client, message, args, cmduser, text, prefix);
      }).catch(e=>{
        themsg.reactions.removeAll().catch(error => {if(error) return;});
        themsg2.reactions.removeAll().catch(error => {if(error) return;});
        if(!error) {
          error = true;
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        }
      })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> Something went Wrong`)
        .setDescription(`\`\`\`${String(JSON.stringify(e, null, 2)).substr(0, 2000)}\`\`\``)
      );
    }
  },
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
