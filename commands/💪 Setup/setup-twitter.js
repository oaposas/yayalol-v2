var {
    MessageEmbed
  } = require(`discord.js`);
  var Discord = require(`discord.js`);
  var config = require(`../../botconfig/config.json`);
  var ee = require(`../../botconfig/embed.json`);
  var emoji = require(`../../botconfig/emojis.json`);
  var fs = require("fs");
  var {
    databasing,
  } = require(`../../handlers/functions`);
  const twitconfig = require("../../social_log/twitter.json");
  const Twit = require('twit');
  module.exports = {
    name: "setup-twitter",
    category: "💪 Setup",
    aliases: ["setuptwitter", "twitter-setup"],
    cooldown: 5,
    usage: "setup-twitter  --> Follow the Steps",
    description: "Manage the 2x Twitter Systems (set channel, set twitter)",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, cmduser, text, prefix) => {
      var es = client.settings.get(message.guild.id, "embed")
      try {
        
        var adminroles = client.settings.get(message.guild.id, "adminroles")
  
  
        var timeouterror = false;
        var filter = (reaction, user) => {
          return user.id === message.author.id;
        };
        var temptype = ""
        var tempmsg;
        var add = "";
  


        tempmsg = await message.channel.send(new Discord.MessageEmbed()
        .setTitle("What do you want to do?")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setDescription(`1️⃣ **==** Manage **first** Twitter Logger\n\n2️⃣ **==** Manage **second** Twitter Logger\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
      )
      try {
        tempmsg.react("1️⃣")
        tempmsg.react("2️⃣")
      } catch (e) {
        return message.reply(new Discord.MessageEmbed()
          .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
          .setColor(es.wrongcolor)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );
      }
      await tempmsg.awaitReactions(filter, {
          max: 1,
          time: 90000,
          errors: ["time"]
        })
        .then(collected => {
          var reaction = collected.first()
          reaction.users.remove(message.author.id)
          if (reaction.emoji.name === "1️⃣") add = ""
          else if (reaction.emoji.name === "2️⃣") add = "second"
          else throw "You reacted with a wrong emoji"

        })
        .catch(e => {
          timeouterror = e;
        })
      if (timeouterror)
        return message.reply(new Discord.MessageEmbed()
          .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
          .setColor(es.wrongcolor)
          .setDescription(`Cancelled the Operation!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );




        if(add == "second")
        return message.reply(new Discord.MessageEmbed()
          .setTitle("<:no:833101993668771842> ERROR | SECOND TWITTER IS DISABLED")
          .setColor(es.wrongcolor)
          .setDescription(`Due to rate limits, the second Twitter Log got disabled! SORRY!`.substr(0, 2000))
          .setFooter(es.footertext, es.footericon)
        );




        tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
          .setTitle("What do you want to do?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`1️⃣ **== Set** **Twitter Account** (/Overwrite)\n\n2️⃣ **== Set** Discord **Channel**\n\n3️⃣ **== Set** Posting **Message**\n\n4️⃣ **==** ${client.social_log.get(message.guild.id, `${add}twitter.REETWET`) ? "Disable Posting Retweets": "Enable that i also Post Retweets"}\n\n5️⃣ **==** Manually set the **TWITTER ID** && **TWITTER NAME**\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
        })
        try {
          tempmsg.react("1️⃣")
          tempmsg.react("2️⃣")
          tempmsg.react("3️⃣")
          tempmsg.react("4️⃣")
          tempmsg.react("5️⃣")
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Missing Permissions to add Reactions")
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        }
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            if (reaction.emoji.name === "1️⃣") temptype = "account"
            else if (reaction.emoji.name === "2️⃣") temptype = "channel"
            else if (reaction.emoji.name === "3️⃣") temptype = "message"
            else if (reaction.emoji.name === "4️⃣") temptype = "retweet"
            else if (reaction.emoji.name === "5️⃣") temptype = "id"
            else throw "You reacted with a wrong emoji"
  
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
  
        if (temptype == "account") {
            var username;
            var userid;
          tempmsg = await message.channel.send(new Discord.MessageEmbed()
            .setTitle("Which account do you wanna use?")
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`Please send me the TWITTER LINK like that: \`https://twitter.com/MilratoDev\``)
            .setFooter(es.footertext, es.footericon)
          )
          await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(collected => {
              var twitlink = collected.first().content;
              if(!String(twitlink).toLowerCase().includes("https")) {
                timeouterror = "INVALID LINK";return message.reply("INVALID TWITTER LINK, a Twitter Link looks like that: \`https://twitter.com/MilratoDev\`");}
              if(!String(twitlink).toLowerCase().includes("twitter")) {
                timeouterror = "INVALID LINK";return message.reply("INVALID TWITTER LINK, a Twitter Link looks like that: \`https://twitter.com/MilratoDev\`");}
              username = twitlink.replace("https://twitter", "").split("/")[1];
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply(new Discord.MessageEmbed()
              .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
              .setColor(es.wrongcolor)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            );

            var T = new Twit({
              consumer_key: twitconfig.consumer_key,
              consumer_secret: twitconfig.consumer_secret,
              access_token: twitconfig.access_token,
              access_token_secret: twitconfig.access_token_secret,
              timeout_ms: twitconfig.timeout_ms,
              strictSSL: twitconfig.strictSSL,
            })
            await T.get('users/search', {
              q: `${username}`,
              count: 1
            }, function (err, data, response) {
              if (err) return message.reply("UNABLE TO FIND USER")
              var user = data[0];
              if(!user) return message.reply("UNABLE TO FIND USER")
              userid = user.id_str;
              var TwitterName = user.screen_name;
              try {
                client.social_log.set(message.guild.id, userid, `${add}twitter.TWITTER_USER_ID`)
                client.social_log.set(message.guild.id, username, `${add}twitter.TWITTER_USER_NAME_ONLY_THOSE`)
                //require("../../social_log/twitterfeed").creat_twit(client);
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> I will now watch for new Posts in this account: \`${TwitterName}\``)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`**IF YOU TWITTER IS NOT THE SAME, THEN MANUALLY DEFINE THE ID THROUGH COMMAND!!!**\n\n**Make sure that you defined a \`Discord Channel\` too! Otherwise it won't post things!**\n\nYou need to have The TWITTERNAME, TWITTERID, and DISCORDCHANNEl and MESSAGE to be right, so that the autoposter works!`)
                  .addField("**NOTE THERE MIGHT BE AN UP TO 7 MINUTES DELAY!** (because of Rate limits)", "When posting a new Twit")
                  .setURL(`https://twitter.com/${TwitterName}`)
                  .setFooter(es.footertext, es.footericon)
                );
            } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                .setColor(es.wrongcolor)
                .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                .setFooter(es.footertext, es.footericon)
                );
            }
            })
          
        } else if (temptype == "channel") {
  
            tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
              .setTitle("Which Channel do you wanna use?")
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setDescription(`Please Ping the Channel now!`)
              .setFooter(es.footertext, es.footericon)
            })
            await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                max: 1,
                time: 90000,
                errors: ["time"]
              })
              .then(collected => {
                var message = collected.first();
                var channel = message.mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
                if (channel) {
                    try {
                        client.social_log.set(message.guild.id, channel.id, `${add}twitter.DISCORD_CHANNEL_ID`)
                        //require("../../social_log/twitterfeed").creat_twit(client);
                        return message.reply(new Discord.MessageEmbed()
                          .setTitle(`<a:yes:833101995723194437> I will now post Twitter Messages in \`${channel.name}\``)
                          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                          .setDescription(`\n\nYou need to have The TWITTERNAME, TWITTERID, and DISCORDCHANNEl and MESSAGE to be right, so that the autoposter works!`)
                          .addField("**NOTE THERE MIGHT BE AN UP TO 7 MINUTES DELAY!** (because of Rate limits)", "When posting a new Twit")
                          .setFooter(es.footertext, es.footericon)
                        );
                    } catch (e) {
                        return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                        );
                    }
                } else {
                  throw "you didn't ping a valid Channel"
                }
              })
              .catch(e => {
                timeouterror = e;
              })
            if (timeouterror)
              return message.reply(new Discord.MessageEmbed()
                .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                .setColor(es.wrongcolor)
                .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
    
        } else if (temptype == "message") {
  
            tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
              .setTitle("Which MEssage do you wanna send with the Twitter Post?")
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setDescription(`\`{url}\` Will be replaced with the Twitter POST LINK\n\n\`{Twittername}\` will be replaced with the TwitterAccountname`)
              .setFooter(es.footertext, es.footericon)
            })
            await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                max: 1,
                time: 90000,
                errors: ["time"]
              })
              .then(collected => {
                try {
                  client.social_log.set(message.guild.id, collected.first().content, `${add}twitter.infomsg`)
                  //require("../../social_log/twitterfeed").creat_twit(client);
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(`<a:yes:833101995723194437> I will now post The Twitter Messages with the Twitter Post: `)
                    .setDescription(`${collected.first().content.replace("{url}", "https://twitter.com/MilratoDev").replace("{Twittername}", "Tomato6966")}\n\nNote that this is just an **example**\n\nYou need to have The TWITTERNAME, TWITTERID, and DISCORDCHANNEl and MESSAGE to be right, so that the autoposter works!`)
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .addField("**NOTE THERE MIGHT BE AN UP TO 7 MINUTES DELAY!** (because of Rate limits)", "When posting a new Twit")
                    .setFooter(es.footertext, es.footericon)
                  );

                } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                    .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                    .setColor(es.wrongcolor)
                    .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                    .setFooter(es.footertext, es.footericon)
                    );
                }
              })
              .catch(e => {
                timeouterror = e;
              })
            if (timeouterror)
              return message.reply(new Discord.MessageEmbed()
                .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                .setColor(es.wrongcolor)
                .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
    
        } else if (temptype == "retweet") {

                  client.social_log.set(message.guild.id, !client.social_log.get(message.guild.id, `${add}twitter.REETWET`), `${add}twitter.REETWET`)
                  //require("../../social_log/twitterfeed").creat_twit(client);
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle(`<a:yes:833101995723194437> ${client.social_log.get(message.guild.id, `${add}twitter.REETWET`) ? "Enabled Showing Retweets": "Disabled Showing Retweets"}`)
                    .setDescription(`${client.social_log.get(message.guild.id, `${add}twitter.REETWET`) ? "I will now post Retweets too!": "I will not Post Retweets!"}`)
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .addField("**NOTE THERE MIGHT BE AN UP TO 7 MINUTES DELAY!** (because of Rate limits)", "When posting a new Twit")
                    .setFooter(es.footertext, es.footericon)
                  );
   
        } else if (temptype == "id") {

          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle("What should be the new USERID of your TWITTER LOGGER?")
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setURL("https://tweeterid.com")
            .setDescription(`Go to: https://tweeterid.com to get your USERID and **ENTER IT __NOW__**`)
            .setFooter(es.footertext, es.footericon)
          })
          await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(async collected => {
              try {
                client.social_log.set(message.guild.id, collected.first().content, `${add}twitter.TWITTER_USER_ID`)
                //require("../../social_log/twitterfeed").creat_twit(client);
                message.reply(new Discord.MessageEmbed()
                  .setTitle(`<a:yes:833101995723194437> Set the TWITTER USER ID TO: \`${collected.first().content}\``.substr(0, 256))
                  .setDescription(`You need to have The TWITTERNAME, TWITTERID, and DISCORDCHANNEl and MESSAGE to be right, so that the autoposter works!`)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                );

                tempmsg = await message.reply(new Discord.MessageEmbed()
                  .setTitle("What should be the new USERNAME of your TWITTER LOGGER?")
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`That's your @, forexample: MilratoDev\n\nPlease **just** enter the Name!`)
                  .setFooter(es.footertext, es.footericon)
                )
                await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 90000,
                    errors: ["time"]
                  })
                  .then(async collected => {
                    try {
                      client.social_log.set(message.guild.id, collected.first().content, `${add}twitter.TWITTER_USER_NAME_ONLY_THOSE`)
                      //require("../../social_log/twitterfeed").creat_twit(client);
                      return message.reply(new Discord.MessageEmbed()
                        .setTitle(`<a:yes:833101995723194437> Set the TWITTER USER Name TO: \`${collected.first().content}\``.substr(0, 256))
                        .setDescription(`${collected.first().content.replace("{url}", `https://twitter.com/${collected.first().content}`).replace("{Twittername}", collected.first().content)}\n\nNote that this is just an **example**\n\nYou need to have The TWITTERNAME, TWITTERID, and DISCORDCHANNEl and MESSAGE to be right, so that the autoposter works!`)
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                        .addField("**NOTE THERE MIGHT BE AN UP TO 7 MINUTES DELAY!** (because of Rate limits)", "When posting a new Twit")
                        .setFooter(es.footertext, es.footericon)
                      );
                    } catch (e) {
                        return message.reply(new Discord.MessageEmbed()
                        .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                        .setColor(es.wrongcolor)
                        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                        .setFooter(es.footertext, es.footericon)
                        );
                    }
                  })
                  .catch(e => {
                    timeouterror = e;
                  })
                if (timeouterror)
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                    .setColor(es.wrongcolor)
                    .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                    .setFooter(es.footertext, es.footericon)
                  );


              } catch (e) {
                  return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Something went wrong, please contact: `Tomato#6966`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                  );
              }
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply(new Discord.MessageEmbed()
              .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
              .setColor(es.wrongcolor)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            );
  
       } else {
            return message.reply(new Discord.MessageEmbed()
            .setTitle("<:no:833101993668771842> ERROR | PLEASE CONTACT `Tomato#6966`")
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            );
        }

      } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> Something went Wrong`)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
        );
      }
    },
  };
  /**
   * @INFO
   * Bot Coded by Tomato#6966 | https://github.com/MilratoDev/discord-js-lavalink-Music-Bot-erela-js
   * @INFO
   * Work for Milrato Development | https://milrato.eu
   * @INFO
   * Please mention Him / Milrato Development, when using this Code!
   * @INFO
   */
  