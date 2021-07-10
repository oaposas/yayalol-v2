var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing, isValidURL
} = require(`../../handlers/functions`);
module.exports = {
  name: "restartbot",
  category: "👑 Owner",
  aliases: ["botrestart"],
  cooldown: 5,
  usage: "restartbot",
  description: "Restarts the Bot, if it's not working as intended or so..",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if(message.author.id != "645715831753408548")
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`**You are not allowed to run this Command**`)
        .setDescription(`***Only <@645715831753408548> is allowed to execute this Command, this is to prevent Rate Limits, if you need a Bot restart Contact him (\`NotMichx#6969\`)***`)
      );
    try {
      message.reply("RESTARTING BOT .... please stand by... if the Bot is not restarting then DM: `NotMichx#6969`")
      require("child_process").exec(`pm2 restart index.js CLANBOT_${process.cwd().split(require("path").sep).pop()}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          message.reply("SOMETHING WENT WRONG, CONTACT THE OWNER PLEASE! `NotMichx#6969`")
          return;
        }
        message.reply("RESTARTED SUCCESSFUL! PLEASE TEST THAT THE BOT WORKS (in 5-10 Seconds)!")
      });
      message.reply("RESTARTED SUCCESSFUL! PLEASE TEST THAT THE BOT WORKS (in 5-10 Seconds)!")
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`Something went Wrong`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
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