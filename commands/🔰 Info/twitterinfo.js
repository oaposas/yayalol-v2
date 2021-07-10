const Discord = require("discord.js");
const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const moment = require('moment');
const twitconfig = require("../../social_log/twitter.json");
const Twit = require('twit');
module.exports = {
  name: "twitterinfo",
  aliases: ["twitterinfo", "twitteruserinfo", "tuserinfo", "uinfo", "tuser", "twitteruser"],
  category: "🔰 Info",
  description: "Get information about a Twitter User",
  usage: "twitterinfo <TWITTERUSER>",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      var T = new Twit({
        consumer_key: twitconfig.consumer_key,
        consumer_secret: twitconfig.consumer_secret,
        access_token: twitconfig.access_token,
        access_token_secret: twitconfig.access_token_secret,
        timeout_ms: twitconfig.timeout_ms,
        strictSSL: twitconfig.strictSSL,
      })
      await T.get('users/search', {
        q: `${args[0]}`,
        count: 1
      }, function (err, data, response) {
        if (err) return message.reply("UNABLE TO FIND USER")
        var user = data[0];
        if(!user) return message.reply("UNABLE TO FIND USER")
        var embed = new Discord.MessageEmbed()
        .setColor(`#${user.profile_background_color}`)
        .setThumbnail(user.profile_image_url_https ? user.profile_image_url_https : user.profile_image_url)
        .setFooter(`ID: ${user.id_str}`, user.profile_image_url_https ? user.profile_image_url_https : user.profile_image_url)
        .addField("Name", `\`${user.name}\``, true)
        .addField("Created at:", `\`${moment(user.created_at).format("DD/MM/YYYY")}\`\n\`${moment(user.created_at).format("hh:mm:ss")}\``, true)
        .addField("Followers", `\`${user.followers_count} Followers\``, true)
        .addField("Friends", `\`${user.friends_count} Friends\``, true)
        .addField("Tweets", `\`${user.statuses_count} Tweets\``, true)
        if(user.location) embed.addField("Location", `\`${user.location}\``, true)
        .setTitle(`Twitterinformation about: \`${user.screen_name}\``)
        .setURL(`https://twitter.com/${user.screen_name}`)
        if(user.description) embed.setDescription(`\`\`\`${user.description}\`\`\``)
        message.channel.send(embed)
      })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> ERROR | An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
    return;
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
