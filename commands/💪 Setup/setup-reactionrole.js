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
  name: "setup-reactionrole",
  category: "💪 Setup",
  aliases: ["setupreactionrole", "setup-react", "setupreact", "reactionrolesetup", "reactionrole-setup", "react-setup", "reactsetup"],
  cooldown: 5,
  usage: "setup-reactionrole --> Follow Steps",
  description: "Create Reaction Roles, or delete all active Reaction Roles.",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    var es = client.settings.get(message.guild.id, "embed")
    try {
      var adminroles = client.settings.get(message.guild.id, "adminroles")
      var errored = false;

      var rembed = new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setTitle("What do u want to do?")
        .setDescription(`
**1️⃣** \`Create new Reaction Role\` - *Creates A New Reaction Role*
**2️⃣** \`Reset Settings\` - *Resets settings for Reaction Role*
`)
        .setFooter("Pick the INDEX NUMBER", es.footericon)
        

      message.reply(rembed).then(async msg => {
        var emojis = ["1️⃣", "2️⃣"]
        for (var emoji of emojis) await msg.react(emoji)
        msg.awaitReactions((reaction, user) => user.id === message.author.id && emojis.includes(reaction.emoji.name), {
          max: 1,
          time: 120000,
          erros: ["time"]
        }).then(collected => {
          switch (collected.first().emoji.name) {
            case "1️⃣":
              var rembed = new MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setTitle("THIS IS A INFORMATION EMBED!")
                .setDescription(`
       **How to setup Clan Bots's Reaction Role!**
       > 1. React to message __BELOW__ **this** message

       > 2. Then, afterwards a new message appears! After that, you can PING the ROLE for the reacted EMOJI

       > 3. Process 1... continues, enter \`finish\` to finish the process! (or just dont react)

       > 4. Once it's finished:

       > 4.1 I will ask you, which reaction role **type** you want!
           | - **Multiple** = *you can have every possible reaction option!*
           | - **Single** = *Only one Role at the same time!*
       > 4.2 You will be asked for the TITLE of the Reaction Role, that's necessary!
       > 4.3 After that, enter in which channel you want to have your Reaction Role listed at! Just ping it! \`#chat\`
       > 4.4 After that the Reaction Role Embed, with the information for every Parameter: \`EMOJI = ROLE\`, will be sent in your wished channel and it'll work!

       *You have 30 seconds for each input!*
       `)
                
                .setFooter(es.footertext, es.footericon)
              message.channel.send(rembed)
              var objet = {
                MESSAGE_ID: "",
                remove_others: false,
                Parameters: []
              };
              var counters = 0;
              ask_emoji()

              function ask_emoji() {
                counters++;
                if (counters.length === 21) return finished();
                var object2 = {
                  Emoji: "",
                  Emojimsg: "",
                  Role: ""
                };
                var rermbed = new MessageEmbed()
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setTitle("What's the next Emoji, which u want to use?")
                  .setDescription("Type `finish` when you're done\n\nReact with the **wished Emoji** to **this** Message")
                var cancel = false;
                message.channel.send(rermbed).then(msg => {
                  msg.awaitReactions((reaction, user) => user.id == message.author.id, {
                    max: 1,
                    time: 30000
                  }).then(collected => {
                    if (collected.first().emoji.id && collected.first().emoji.id.length > 2) {
                      msg.delete();
                      object2.Emoji = collected.first().emoji.id;
                      if (collected.first().emoji.animated)
                        object2.Emojimsg = "<" + "a:" + collected.first().emoji.name + ":" + collected.first().emoji.id + ">";
                      else
                        object2.Emojimsg = "<" + ":" + collected.first().emoji.name + ":" + collected.first().emoji.id + ">";
                      return ask_role();
                    } else if (collected.first().emoji.name) {
                      msg.delete();
                      object2.Emoji = collected.first().emoji.name;
                      object2.Emojimsg = collected.first().emoji.name;
                      return ask_role();
                    } else {
                      message.channel.send('Operation canceled. and finished!');
                      return finished();
                    }
                  }).catch(() => {
                    if (!cancel) {
                      message.reply('No reaction after 30 seconds, operation canceled');
                      return finished();
                    }
                  });
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000
                  }).then(collected => {
                    if (collected.first().content.toLowerCase() === "finish") {
                      cancel = true;
                      return finished();
                    }
                  }).catch(() => {
                    if (!cancel) {
                      message.reply('No reaction after 30 seconds, operation canceled');
                      return finished();
                    }
                  });
                })

                function ask_role() {
                  counters++;
                  var rermbed = new MessageEmbed()
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setTitle("What Role do you want for that emoji?")
                  message.channel.send(rermbed).then(msg => {
                    msg.channel.awaitMessages(m => m.author.id == message.author.id, {
                      max: 1,
                      time: 30000
                    }).then(collected => {
                      var role = collected.first().mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
                      if (!role) message.reply("CANCELLED, u didn't Pingged a valid Role")
                      if (role) {

                        object2.Role = role.id;
                        objet.Parameters.push(object2)


                        try {
                          msg.delete();
                        } catch {}
                        try {
                          msg.channel.bulkDelete(1);
                        } catch {}

                        return ask_emoji();
                      } else {
                        message.channel.send('Operation canceled. and finished!');
                        return finished();
                      }
                    }).catch((e) => {
                      console.log(e)
                      message.reply('No reaction after 30 seconds, operation canceled');
                      return finished();
                    });
                  })
                }
              }


              function finished() {
                message.reply(new MessageEmbed()
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                  .setTitle("What type of Reaction Role do you want?")
                  .setDescription(":one: === Multiple reaction Options\n\n:two: === Single reaction Options")).then(msg => {
                  var emojis2 = ["1️⃣", "2️⃣"]
                  for (var emoji of emojis2) msg.react(emoji)
                  msg.awaitReactions((reaction, user) => user.id === message.author.id && emojis2.includes(reaction.emoji.name), {
                    max: 1,
                    time: 120000,
                    erros: ["time"]
                  }).then(collected => {
                    switch (collected.first().emoji.name) {
                      case "1️⃣":
                        break;
                      case "2️⃣":
                        objet.remove_others = true;
                        break;
                      default:
                        message.reply("NO CORRECT INPUT! So i will use `MULTIPLE REACTION OPTION`")
                        break;
                    }


                    var thisembed = new MessageEmbed()
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setFooter(es.footertext, es.footericon)
                      .setTitle("What should be the **`Title`** of your Reaction Role?")
                      .setDescription("This will  be listed **above** the list of Emojis\n\n*Wich Emoji gives which Role*\nEnter the Title **now** (max 256 Letters)")
                    message.reply({
                      content: `I will use **${objet.remove_others ? "Single": "Multiple"}** Reaction Option!\n`,
                      embed: thisembed
                    }).then(msg => {
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 120000,
                        errors: ["TIME"]
                      }).then(collected => {
                        var title = String(collected.first().content).substr(0, 256);

                        message.reply(new MessageEmbed()
                          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                          .setFooter(es.footertext, es.footericon)
                          .setTitle("In which channel do you want your Reaction Role to Be?")
                          .setDescription("Ping the Channel **now** with #channel")
                        ).then(msg => {
                          msg.channel.awaitMessages(m => m.author.id === message.author.id, {
                            max: 1,
                            time: 120000,
                            errors: ["TIME"]
                          }).then(collected => {

                            if (collected.first().mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first()) {

                              var channel = collected.first().mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
                              var embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle(title.substr(0, 256)).setFooter(message.guild.name, message.guild.iconURL({
                                dynamic: true
                              }))
                              var buffer = "";
                              for (var i = 0; i < objet.Parameters.length; i++) {
                                try {
                                  buffer += objet.Parameters[i].Emojimsg + "  **==**  <@&" + objet.Parameters[i].Role + ">\n";
                                } catch (e) {
                                  console.log(e)
                                }
                              }
                              channel.send(embed.setDescription(buffer)).then(msg => {
                                for (var i = 0; i < objet.Parameters.length; i++) {
                                  try {
                                    msg.react(objet.Parameters[i].Emoji).catch(e => console.log(e))
                                  } catch (e) {
                                    console.log(e)
                                  }
                                }
                                objet.MESSAGE_ID = msg.id;
                                client.reactionrole.push(message.guild.id, objet, "reactionroles");
                                message.reply("YOUR REACTION ROLE IS FINISHED AND READY TO USE! \nIn: <#" + msg.channel.id + ">")
                              })

                            } else {
                              message.reply('You didn\'t Ping a CHANNEL, CANCELLED!');
                              return;
                            }
                          }).catch(e => console.log(e))
                        })
                      }).catch(e => console.log(e))
                    })
                  }).catch(e => console.log(e))
                })
              }
              break;
            case "2️⃣":
              client.reactionrole.set(message.guild.id, {
                reactionroles: []
              });
              return message.reply("Successfully resetted, ReactionRole Setup!")

              break;
            default:
              message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0, 1999))
              break;

          }


        }).catch(e => console.log(e))

      });

    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> Something went Wrong`)
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
