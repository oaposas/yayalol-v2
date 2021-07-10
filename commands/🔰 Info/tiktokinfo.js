const Discord = require("discord.js");
const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const moment = require('moment');
const TikTokScraper = require('tiktok-scraper');
module.exports = {
  name: "tiktokinfo",
  aliases: ["tiktokinfo", "tiktokuserinfo", "tuserinfo", "uinfo", "tuser", "tiktokuser"],
  category: "🔰 Info",
  description: "Get information about a Twitter User",
  usage: "tiktokinfo <TWITTERUSER>",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      (async () => {
        try {
            const posts = await TikTokScraper.user(args.join(" "), {
                number: 5,
            });
            if(!posts.collector[0]) return message.reply("<:no:833101993668771842> NOT FOUND / No Posts!") 
            author = posts.collector[0].authorMeta;
            var embed = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setThumbnail(author.avatar)
            .setTitle(`Information about: **\`${author.name}\`**`)
            .setDescription(`**Nickname:** \`${author.nickName}\`\n**Bio:**\n> ${author.signature}\n\n> **\`${author.fans} Followers\` | \`${author.following} Follows\` | \`${author.video}Posts\`**`)
            //.setFooter(`ID: ${user.id_str}`, user.profile_image_url_https ? user.profile_image_url_https : user.profile_image_url)
            const dDate = new Date()
            var num = dDate.getTime();
            var allposts = posts.collector.map(p => {
                const Obj = {};
                Obj.id = p.id;
                Obj.url = p.webVideoUrl;
                Obj.views = p.playCount;
                Obj.shares = p.shareCount;
                Obj.comments = p.commentCount;
                Obj.mentions = p.mentions;
                Obj.hashtags = p.hashtags;
                let title = p.text;
                for(const tag of p.hashtags) title = String(title).toLowerCase().replace(String(tag.name).toLowerCase(), "")
                for(const mention of p.mentions) title = String(title).toLowerCase().replace(String(mention), "")
                Obj.title = title.split("#").join("");
                if(title.length <= 1) Obj.title = p.id;
                return Obj;
            })
            for(const post of allposts)
            embed.addField(`**${String(post.title).charAt(0).toUpperCase() + String(post.title).slice(1)}**`, `> **[Watch it](${post.url}) | \`${post.views} Views\` | \`${post.shares} Shares\` | \`${post.comments} Comments\`**`)
            message.channel.send(embed)
            function timeSince(date) {

              var seconds = Math.floor((new Date() - date) / 1000);
            
              var interval = seconds / 31536000;
            
              if (interval > 1) {
                return Math.floor(interval) + " years";
              }
              interval = seconds / 2592000;
              if (interval > 1) {
                return Math.floor(interval) + " months";
              }
              interval = seconds / 86400;
              if (interval > 1) {
                return Math.floor(interval) + " days";
              }
              interval = seconds / 3600;
              if (interval > 1) {
                return Math.floor(interval) + " hours";
              }
              interval = seconds / 60;
              if (interval > 1) {
                return Math.floor(interval) + " minutes";
              }
              return Math.floor(seconds) + " seconds";
            }
        } catch (error) {
            console.log(error);
        }
    })();
     
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`ERROR | An error occurred`)
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
