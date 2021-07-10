const {
  MessageEmbed, Collection, MessageAttachment
} = require("discord.js");
const Discord = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const moment = require("moment")
const officegen = require('officegen')
const fs = require('fs')
const {
  databasing, delay, create_transcript, GetUser, GetRole
} = require("../../handlers/functions");
module.exports = {
  name: "ticket",
  category: "🚫 Administration",
  aliases: ["close"],
  cooldown: 2,
  usage: "ticket",
  description: "Manages the Ticket, closes, deletes, createlog, etc. etc.",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.ticket")
      let cmdroles2 = client.settings.get(message.guild.id, "cmdadminroles.close")
      try{for (const r of cmdroles2) cmdrole.push(r)}catch{}
     
      let ticket = client.setups.get(message.guild.id, "ticketsystem")
      if (!ticket.enabled) return message.reply("Ticketsystem is not setup yet!")
      if(!client.setups.get("TICKETS", "tickets").includes(message.channel.id) &&
          !client.setups.get("TICKETS", "tickets2").includes(message.channel.id) &&
          !client.setups.get("TICKETS", "tickets3").includes(message.channel.id) &&
          !client.setups.get("TICKETS", "tickets4").includes(message.channel.id) &&
          !client.setups.get("TICKETS", "tickets5").includes(message.channel.id) 
      ) return message.reply("<:no:833101993668771842> This Channel is not a Ticket!")
      var cmdrole = []
        if(cmdroles.length > 0){
          for(const r of cmdroles){
            if(message.guild.roles.cache.get(r)){
              cmdrole.push(` | <@&${r}>`)
            }
            else if(message.guild.members.cache.get(r)){
              cmdrole.push(` | <@${r}>`)
            }
            else {
              console.log("F")
              console.log(r)
              try{ client.settings.remove(message.guild.id, r, `cmdadminroles.ticket`) }catch{ }
              try{ client.settings.remove(message.guild.id, r, `cmdadminroles.close`) }catch{ }
            }
          }
        }
      if ((message.member.roles.cache.array() && !message.member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(message.author.id) && (message.member.roles.cache.array() && !message.member.roles.cache.some(r => adminroles.includes(r.id))) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.some(r => ticket.adminroles.includes(r.id)))
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> You are not allowed to close a Ticket`)
          .setDescription(`${adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(role => `<@&${role}>`).join(" | ") + cmdrole.join(" | ") + ticket.adminroles.join(" | ")  : `No Admin Roles Setupped yet! Do it with: \`${prefix}setup-admin\` You can also add Ticket only Roles with \`${prefix}setup-ticket\``}`)
        );
        
        


        var originalowner = message.author;
        
          var timeouterror = false;
          var filter = (reaction, user) => {
            return user.id === message.author.id;
          };
          var temptype = ""
          var tempmsg;
    
          tempmsg = await message.channel.send(new Discord.MessageEmbed()
            .setTitle("What do you want to do?")
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`🔒 **== Close** the Ticket

            ⛔ **== Archive** the Ticket
            
            🗑 **== Delete** the Ticket
            
            📑 **== Create a Log** of the Ticket
            
            👤 **==** Manage **User** Access (Add/Remove)

            📌 **==** Manage **Role** Access (Add/Remove)
            
            
            
            *React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
          )
    
          try {
            tempmsg.react("🔒")
            tempmsg.react("⛔")
            tempmsg.react("🗑")
            tempmsg.react("📑")
            tempmsg.react("👤")
            tempmsg.react("📌")
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
              
              client.stats.push(message.guild.id + message.author.id, new Date().getTime(), "ticket"); 
              var reaction = collected.first()
              reaction.users.remove(message.author.id)
              if (reaction.emoji.name === "🔒") temptype = "close"
              else if (reaction.emoji.name === "⛔") temptype = "archive"
              else if (reaction.emoji.name === "🗑") temptype = "delete"
              else if (reaction.emoji.name === "📑") temptype = "log"
              else if (reaction.emoji.name === "👤") temptype = "user"
              else if (reaction.emoji.name === "📌") temptype = "role"
              else throw "You reacted with a wrong emoji"
    
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply(new Discord.MessageEmbed()
              .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
              .setColor(es.wrongcolor)
              .setDescription(`\`\`\`${String(JSON.stringify(timeouterror)).substr(0, 2000)}\`\`\``.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            );
    
          if(temptype == "close"){
            message.reply(new Discord.MessageEmbed()
              .setTitle("Verify the step!")
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setDescription(`React with the right Emoji (✅) to close the ticket!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            ).then(async msg=>{
              msg.react("✅").catch(e=>console.log(e))
              msg.awaitReactions((reaction, user) => user.id === originalowner.id, {max: 1, time: 30000, errors: ["time"]}).then(async collected=>{
                if(collected.first().emoji.name == "✅"){
                  let data = client.setups.get(message.channel.id, "ticketdata");
                    if(data.type == "ticket-setup-1"){
                      client.setups.remove("TICKETS", data.user, "tickets");
                    } else if(data.type == "ticket-setup-2"){
                      client.setups.remove("TICKETS", data.user, "tickets2");
                    }else if(data.type == "ticket-setup-3"){
                      client.setups.remove("TICKETS", data.user, "tickets3");
                    }else if(data.type == "ticket-setup-4"){
                      client.setups.remove("TICKETS", data.user, "tickets4");
                    } else {
                      client.setups.remove("TICKETS", data.user, "tickets5");
                    }

                  client.setups.set(message.channel.id, "closed", "ticketdata.state");
                  data = client.setups.get(message.channel.id, "ticketdata");
                  await message.channel.updateOverwrite(data.user, {
                    SEND_MESSAGES: false,
                    VIEW_CHANNEL: false,
                  });
                  message.reply(new Discord.MessageEmbed()
                  .setTitle("✅ Success!")
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`Closed the Ticket of <@${data.user}> and removed him from the Channel!`.substr(0, 2000))
                  .addField("User: ", `<@${data.user}>`)
                  .addField("Created at: ", `${moment(data.date).format("DD/MM/YYYY | hh:mm:ss")}`)
                  .addField("State: ", `${data.state}`)
                  .setFooter(es.footertext, es.footericon))
                  if (client.settings.get(message.guild.id, `adminlog`) != "no") {
                    try {
                      var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
                      if (!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
                      channel.send(new MessageEmbed()
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                        .setAuthor(`ticket --> CLOSED | ${message.author.tag}`, message.author.displayAvatarURL({
                          dynamic: true
                        }))
                        .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
                        .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
                        .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
                        .setTimestamp().setFooter("ID: " + message.author.id)
                      )
                    } catch (e) {
                      console.log(e)
                    }
                  }
                }else {
                  return message.reply("You've reacted with the wrong emoji")
                }
                if (client.settings.get(message.guild.id, `adminlog`) != "no") {
                  try {
                    var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
                    if (!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
                    channel.send(new MessageEmbed()
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                      .setAuthor(`ticket --> CLOSE | ${message.author.tag}`, message.author.displayAvatarURL({
                        dynamic: true
                      }))
                      .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
                      .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
                      .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
                      .setTimestamp().setFooter("ID: " + message.author.id)
                    )
                  } catch (e) {
                    console.log(e)
                  }
                }
              }).catch(e=>{
                console.log(e)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                  .setColor(es.wrongcolor)
                  .setDescription(`"Cancelled"`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
              })
            })
          }
          else if(temptype == "archive"){
            message.reply(new Discord.MessageEmbed()
              .setTitle("Verify the step!")
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setDescription(`React with the right Emoji (✅) to archive the ticket!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            ).then(async msg=>{
              msg.react("✅").catch(e=>console.log(e))
              msg.awaitReactions((reaction, user) => user.id === originalowner.id, {max: 1, time: 30000, errors: ["time"]}).then(async collected=>{
                if(collected.first().emoji.name == "✅"){
                  let data = client.setups.get(message.channel.id, "ticketdata");
                  
                  client.setups.set(message.channel.id, "archived", "ticketdata.state");
                  data = client.setups.get(message.channel.id, "ticketdata");

                  message.reply(new Discord.MessageEmbed()
                  .setTitle("✅ Success!")
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(`Archived the Ticket of <@${data.user}> and didn't remove him from the Channel!`.substr(0, 2000))
                  .addField("User: ", `<@${data.user}>`)
                  .addField("Created at: ", `${moment(data.date).format("DD/MM/YYYY | hh:mm:ss")}`)
                  .addField("State: ", `${data.state}`)
                  .setFooter(es.footertext, es.footericon))
                  if (client.settings.get(message.guild.id, `adminlog`) != "no") {
                    try {
                      var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
                      if (!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
                      channel.send(new MessageEmbed()
                        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                        .setAuthor(`ticket --> ARCHIVE | ${message.author.tag}`, message.author.displayAvatarURL({
                          dynamic: true
                        }))
                        .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
                        .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
                        .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
                        .setTimestamp().setFooter("ID: " + message.author.id)
                      )
                    } catch (e) {
                      console.log(e)
                    }
                  }
                }else {
                  return message.reply("You've reacted with the wrong emoji")
                }
                if (client.settings.get(message.guild.id, `adminlog`) != "no") {
                  try {
                    var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
                    if (!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
                    channel.send(new MessageEmbed()
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                      .setAuthor(`ticket --> ARCHIVE | ${message.author.tag}`, message.author.displayAvatarURL({
                        dynamic: true
                      }))
                      .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
                      .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
                      .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
                      .setTimestamp().setFooter("ID: " + message.author.id)
                    )
                  } catch (e) {
                    console.log(e)
                  }
                }
              }).catch(e=>{
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                  .setColor(es.wrongcolor)
                  .setDescription(`"Cancelled"`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
              })
            })
          }
          else if(temptype == "delete"){
            message.reply(new Discord.MessageEmbed()
            .setTitle("Verify the step!")
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`React with the right Emoji (✅) to delete the ticket!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          ).then(async msg=>{
            msg.react("✅").catch(e=>console.log(e))
            msg.awaitReactions((reaction, user) => user.id === originalowner.id, {max: 1, time: 30000, errors: ["time"]}).then(async collected=>{
              if(collected.first().emoji.name == "✅"){
                let data = client.setups.get(message.channel.id, "ticketdata");
                if(data.type == "ticket-setup-1"){
                  client.setups.remove("TICKETS", data.user, "tickets");
                  client.setups.remove("TICKETS", data.channel, "tickets");
                } else if(data.type == "ticket-setup-2"){
                  client.setups.remove("TICKETS", data.user, "tickets2");
                  client.setups.remove("TICKETS", data.channel, "tickets2");
                }else if(data.type == "ticket-setup-3"){
                  client.setups.remove("TICKETS", data.user, "tickets3");
                  client.setups.remove("TICKETS", data.channel, "tickets3");
                }else if(data.type == "ticket-setup-4"){
                  client.setups.remove("TICKETS", data.user, "tickets4");
                  client.setups.remove("TICKETS", data.channel, "tickets4");
                } else {
                  client.setups.remove("TICKETS", data.user, "tickets5");
                  client.setups.remove("TICKETS", data.channel, "tickets5");
                }
                try{
                  client.setups.delete(message.channel.id);
                }catch{

                }
              message.channel.delete({timeout: 2500}).catch(e=>{console.log(e)})
              message.reply(new Discord.MessageEmbed()
                .setTitle("✅ Success!")
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setDescription(`Deleting Ticket in less then **\`3 Seconds\`** ....\n\n*If not you can do it manually*`.substr(0, 2000))
             
                .setFooter(es.footertext, es.footericon))
              }else {
                return message.reply("You've reacted with the wrong emoji")
              }
              if (client.settings.get(message.guild.id, `adminlog`) != "no") {
                try {
                  var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
                  if (!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
                  channel.send(new MessageEmbed()
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                    .setAuthor(`ticket --> DELETE | ${message.author.tag}`, message.author.displayAvatarURL({
                      dynamic: true
                    }))
                    .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
                    .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
                    .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
                    .setTimestamp().setFooter("ID: " + message.author.id)
                  )
                } catch (e) {
                  console.log(e)
                }
              }
            }).catch(e=>{
              return message.reply(new Discord.MessageEmbed()
                .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                .setColor(es.wrongcolor)
                .setDescription(`"Cancelled"`.substr(0, 2000))
                .setFooter(es.footertext, es.footericon)
              );
            })
          })
          } 
          else if(temptype == "log"){
            msglimit = 1000;
            let data = client.setups.get(message.channel.id, "ticketdata");
            //do transcripting - making a docx file with design. Here the Docs: https://github.com/Ziv-Barber/officegen/blob/4bfff80e0915f884199495c0ea64e5a0f0549cfe/manual/docx/README.md#prgapi
            let tmmpmsg = await message.reply(new MessageEmbed().setAuthor("Transcripting...", "https://cdn.discordapp.com/emojis/757632044632375386.gif?v=1"))
            let docx = officegen({
              type: 'docx',
              author: client.user.username,
              creator: client.user.username,
              description: `Transcript for the Channel #${message.channel.name} with the ID: ${message.channel.id}`,
              pageMargins: {
                top: 1000,
                right: 1000,
                bottom: 1000,
                left: 1000
              },
              title: `Transcript!`
            })
            //Logs when to File Got CREATED   =  This does NOT mean that it is finished putting the text in!
            docx.on('finalize', function (written) {})
            //if an error occurs then stop
            docx.on('error', function (err) {
              console.log(err);
              return message.reply(err.substr(0, 2000), {code: "js"});
            })
            //The "TITLE" 
            pObj = docx.createP() //Make a new paragraph
            pObj.options.align = 'left'; //align it to the left page
            pObj.options.indentLeft = -350; //overdrive it 350px to the left
            pObj.options.indentFirstLine = -250; //go 250 px to the - left so right of the overdrive
            pObj.addText('Transcript for:    #' + message.channel.name, {
              font_face: 'Arial',
              color: '3c5c63',
              bold: true,
              font_size: 22
            }); //add the TEXT CHANNEL NAME
            pObj.addLineBreak() //make a new LINE
            pObj.addText("Channelid: " + message.channel.id, {
              font_face: 'Arial',
              color: '000000',
              bold: false,
              font_size: 10
            }); //Channel id
            pObj.addLineBreak() //Make a new LINE
            pObj.addText(`Oldest message at the BOTTOM `, {
              hyperlink: 'myBookmark',
              font_face: 'Arial',
              color: '5dbcd2',
              italic: true,
              font_size: 8
            }); //Make a hyperlink to the BOOKMARK (Created later)
            pObj.addText(`  [CLICK HERE TO JUMP]`, {
              hyperlink: 'myBookmark',
              font_face: 'Arial',
              color: '1979a9',
              italic: false,
              bold: true,
              font_size: 8
            }); //Make a hyperlink to the BOOKMARK (Created later)
            pObj.addLineBreak() //Make a new Line
            //The text content collection
            let messageCollection = new Collection(); //make a new collection
            let channelMessages = await message.channel.messages.fetch({ //fetch the last 100 messages
              limit: 100
            }).catch(err => console.log(err)); //catch any error
            messageCollection = messageCollection.concat(channelMessages); //add them to the Collection
            let tomanymsgs = 1; //some calculation for the messagelimit
            if (Number(msglimit) === 0) msglimit = 100; //if its 0 set it to 100
            let messagelimit = Number(msglimit) / 100; //devide it by 100 to get a counter
            if (messagelimit < 1) messagelimit = 1; //set the counter to 1 if its under 1
            while (channelMessages.size === 100) { //make a loop if there are more then 100 messages in this channel to fetch
              if (tomanymsgs === messagelimit) break; //if the counter equals to the limit stop the loop
              tomanymsgs += 1; //add 1 to the counter
              let lastMessageId = channelMessages.lastKey(); //get key of the already fetched messages above
              channelMessages = await message.channel.messages.fetch({
                limit: 100,
                before: lastMessageId
              }).catch(err => console.log(err)); //Fetch again, 100 messages above the already fetched messages
              if (channelMessages) //if its true
                messageCollection = messageCollection.concat(channelMessages); //add them to the collection
            }
            let msgs = messageCollection.array().reverse(); //reverse the array to have it listed like the discord chat
            //now for every message in the array make a new paragraph!
            await msgs.forEach(async msg => {
              // Create a new paragraph:
              pObj = docx.createP()
              pObj.options.align = 'left'; //Also 'right' or 'justify'.
              //Username and Date
              pObj.addText(`${msg.author.tag}`, {
                font_face: 'Arial',
                color: '3c5c63',
                bold: true,
                font_size: 14
              });
              pObj.addText(`  |  ${msg.createdAt.toDateString()}  |  ${msg.createdAt.toLocaleTimeString()}`, {
                font_face: 'Arial',
                color: '3c5c63',
                bold: true,
                font_size: 14
              }); //
              //LINEBREAK
              pObj.addLineBreak()
              //message of user     
              let umsg;

              if (msg.content.startsWith("```")) {
                umsg = msg.content.replace(/```/g, "");
              } else if (msg.attachments.size > 0) {
                umsg = "Unable to transcript (Embed/Video/Audio/etc.)";
              } else {
                umsg = msg.content;
              }
              pObj.addText(umsg, {
                font_face: 'Arial',
                color: '000000',
                bold: false,
                font_size: 10
              });
              //LINEBREAK
              pObj.addLineBreak()
              pObj.addText(`______________________________________________________________________________________________________________________________________________________________________________________________________________`, {
                color: 'a6a6a6',
                font_size: 4
              });

            });
            // Start somewhere a bookmark:
            pObj.startBookmark('myBookmark'); //add a bookmark at tha last message to make the jump 
            pObj.endBookmark();
            let out = fs.createWriteStream(`${message.channel.name}.docx`) //write everything in the docx file
            //if a error happens tells it
            out.on('error', function (err) {
              console.log(err)
            })
            //wenn the writing is finished
            out.on("finish", async function (err, result) {
              await delay(3000);
            })
            // Async call to generate the output file:
            await docx.generate(out)
            await delay(2000);
            try { // try to send the file
              const buffer = fs.readFileSync(`./${message.channel.name}.docx`); //get a buffer file
              const attachment = new MessageAttachment(buffer, `./${message.channel.name}.docx`); //send it as an attachment
              //send the Transcript Into the Channel and then Deleting it again from the FOLDER
              let sendembed = new MessageEmbed()
                .setTitle(`Log for Ticket-Channel: \`#${message.channel.name}\``)
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                
              try {
                let user = message.guild.members.cache.get(data.user)
                sendembed.setDescription(`${user.user}\n**\`${user.user.username}#${user.user.discriminator}\`**\n**\`(${user.user.id})\`**`)
                sendembed.setThumbnail(user.user.displayAvatarURL({
                  dynamic: true
                }))
      
              } catch {
                sendembed.setDescription(message.channel.topic)
              }
              await message.channel.send(sendembed)
              await message.channel.send(attachment)
              await tmmpmsg.delete().catch(e=>console.log(e))
              await fs.unlinkSync(`./${message.channel.name}.docx`)
              if (client.settings.get(message.guild.id, `adminlog`) != "no") {
                try {
                  var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
                  if (!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
                  channel.send(new MessageEmbed()
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                    .setAuthor(`ticket --> LOG | ${message.author.tag}`, message.author.displayAvatarURL({
                      dynamic: true
                    }))
                    .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
                    .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
                    .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
                    .setTimestamp().setFooter("ID: " + message.author.id)
                  )
                } catch (e) {
                  console.log(e)
                }
              }
          } catch (error) { //if the file is to big to be sent, then catch it!
            console.log(error)
            message.reply(new MessageEmbed().setAuthor("ERROR! Transcript is to big, to be sent into the Channel!", message.member.user.displayAvatarURL({
              dynamic: true
            })).setFooter("Smaller the maximum amount of Messages!"))
            fs.unlinkSync(`./${message.channel.name}.docx`) //delete the docx
          }
          }
          else if(temptype == "user"){
            message.reply(new Discord.MessageEmbed()
              .setTitle("Please ping the User you want to add/remove")
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setDescription(`Either with <@USERID> or with the USERNAME, or with the USERID`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            ).then(async msg=>{
              msg.channel.awaitMessages(m=>m.author.id === originalowner.id, {max: 1, time: 90000, errors: ["time"]}).then(async collected=>{
                var message = collected.first();
                var args = message.content.split(" ")
                var user;
                  try{
                      user = await GetUser(message, args)
                  }catch (e){
                    if(!e) return message.reply("UNABLE TO FIND THE USER")
                    return message.reply(e)
                  }
                if(!user || user == null || user.id == null || !user.id) message.reply("<:no:833101993668771842> Could not find the USER")
                var mapped = msg.channel.permissionOverwrites.map(p => {
                  if(p.type == "member"){
                    var obj = {id: "", allow: []};
                    obj.id = p.id;
                    obj.allow = p.allow ? p.allow.toArray() : []
                    return obj;
                  }
                  else{
                    return {id: "", allow: []};
                  }
                })
                var oldmapped = mapped;
                var undermapped = mapped.map(p=> p.id)
                if(undermapped.includes(user.id)){
                  oldmapped.forEach((element) => {
                      if(element.id == user.id){
                        console.log(element)
                        if(!element.allow.includes("VIEW_CHANNEL")){
                          message.channel.updateOverwrite(user.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                          }).then(channel => {
                            message.channel.send({content: `<@${user.id}>`, embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setFooter(es.footertext, es.footericon)
                              .setTitle(`SUCCESS | Added \`${user.tag}\` to the TICKET`)
                            })
                            if (client.settings.get(message.guild.id, `adminlog`) != "no") {
                              try {
                                var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
                                if (!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
                                channel.send(new MessageEmbed()
                                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                                  .setAuthor(`ticket --> USER | ${message.author.tag}`, message.author.displayAvatarURL({
                                    dynamic: true
                                  }))
                                  .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
                                  .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
                                  .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
                                  .setTimestamp().setFooter("ID: " + message.author.id)
                                )
                              } catch (e) {
                                console.log(e)
                              }
                            }
                          })
                          .catch(e=>{
                            return message.channel.send(new MessageEmbed()
                              .setColor(es.wrongcolor)
                              .setFooter(es.footertext, es.footericon)
                              .setTitle(`<:no:833101993668771842> An error occurred`)
                              .setDescription(`\`\`\`${e.stack}\`\`\``)
                            );
                          });
                        }else {
                          message.channel.updateOverwrite(user.id, {
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false,
                          }).then(channel => {
                            return message.channel.send({content: `<@${user.id}>`, embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setFooter(es.footertext, es.footericon)
                              .setTitle(`SUCCESS | REMOVED \`${user.tag}\` from the TICKET`)
                            })
                          })
                          .catch(e=>{
                            return message.channel.send(new MessageEmbed()
                              .setColor(es.wrongcolor)
                              .setFooter(es.footertext, es.footericon)
                              .setTitle(`<:no:833101993668771842> An error occurred`)
                              .setDescription(`\`\`\`${e.stack}\`\`\``)
                            );
                          });
                        }
                      }
                  });
                }else{
                  message.channel.updateOverwrite(user.id, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true,
                  }).then(channel => {
                    message.channel.send({content: `<@${user.id}>`, embed: new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setFooter(es.footertext, es.footericon)
                      .setTitle(`SUCCESS | Added \`${user.tag}\` to the TICKET`)
                    })
                    if (client.settings.get(message.guild.id, `adminlog`) != "no") {
                      try {
                        var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
                        if (!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
                        channel.send(new MessageEmbed()
                          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                          .setAuthor(`ticket --> USER | ${message.author.tag}`, message.author.displayAvatarURL({
                            dynamic: true
                          }))
                          .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
                          .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
                          .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
                          .setTimestamp().setFooter("ID: " + message.author.id)
                        )
                      } catch (e) {
                        console.log(e)
                      }
                    }
                  })
                  .catch(e=>{
                    return message.channel.send(new MessageEmbed()
                      .setColor(es.wrongcolor)
                      .setFooter(es.footertext, es.footericon)
                      .setTitle(`<:no:833101993668771842> An error occurred`)
                      .setDescription(`\`\`\`${e.stack}\`\`\``)
                    );
                  });
                }
              }).catch(e=>{
                console.log(e)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                  .setColor(es.wrongcolor)
                  .setDescription(`"Cancelled"`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
              })
            })
          }
          else if(temptype == "role"){
            message.reply(new Discord.MessageEmbed()
              .setTitle("Please ping the ROLE you want to add/remove")
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setDescription(`Either with <@&ROLEID> or with the ROLEID or with the ROLENAME`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            ).then(async msg=>{
              msg.channel.awaitMessages(m=>m.author.id === originalowner.id, {max: 1, time: 90000, errors: ["time"]}).then(async collected=>{
                var message = collected.first();
                var args = message.content.split(" ")
                var user;
                  try{
                      user = await GetRole(message, args)
                  }catch (e){
                    if(!e) return message.reply("UNABLE TO FIND THE ROLE")
                    return message.reply("ERROR" + e)
                  }
                if(!user || user == null || user.id == null || !user.id) message.reply("<:no:833101993668771842> Could not find the ROLE")
                var mapped = msg.channel.permissionOverwrites.map(p => {
                  if(p.type == "role"){
                    var obj = {id: "", allow: []};
                    obj.id = p.id;
                    obj.allow = p.allow ? p.allow.toArray() : []
                    return obj;
                  }
                  else{
                    return {id: "", allow: []};
                  }
                })
                var oldmapped = mapped;
                var undermapped = mapped.map(p=> p.id)
                if(undermapped.includes(user.id)){
                  oldmapped.forEach((element) => {
                      if(element.id == user.id){
                        console.log(element)
                        if(!element.allow.includes("VIEW_CHANNEL")){
                          message.channel.updateOverwrite(user.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                          }).then(channel => {
                            message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setFooter(es.footertext, es.footericon)
                              .setTitle(`SUCCESS | Added \`@${user.name}\` to the TICKET`)
                            )
                            if (client.settings.get(message.guild.id, `adminlog`) != "no") {
                              try {
                                var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
                                if (!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
                                channel.send(new MessageEmbed()
                                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                                  .setAuthor(`ticket --> ROLE | ${message.author.tag}`, message.author.displayAvatarURL({
                                    dynamic: true
                                  }))
                                  .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
                                  .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
                                  .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
                                  .setTimestamp().setFooter("ID: " + message.author.id)
                                )
                              } catch (e) {
                                console.log(e)
                              }
                            }
                          })
                          .catch(e=>{
                            return message.channel.send(new MessageEmbed()
                              .setColor(es.wrongcolor)
                              .setFooter(es.footertext, es.footericon)
                              .setTitle(`<:no:833101993668771842> An error occurred`)
                              .setDescription(`\`\`\`${e.stack}\`\`\``)
                            );
                          });
                        }else {
                          message.channel.updateOverwrite(user.id, {
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false,
                          }).then(channel => {
                            return message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                              .setFooter(es.footertext, es.footericon)
                              .setTitle(`SUCCESS | REMOVED \`@${user.name}\` from the TICKET`)
                            )
                          })
                          .catch(e=>{
                            return message.channel.send(new MessageEmbed()
                              .setColor(es.wrongcolor)
                              .setFooter(es.footertext, es.footericon)
                              .setTitle(`<:no:833101993668771842> An error occurred`)
                              .setDescription(`\`\`\`${e.stack}\`\`\``)
                            );
                          });
                        }
                      }
                  });
                }else{
                  message.channel.updateOverwrite(user.id, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true,
                  }).then(channel => {
                    message.channel.send(new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setFooter(es.footertext, es.footericon)
                      .setTitle(`SUCCESS | Added \`@${user.name}\` to the TICKET`)
                    )
                    if (client.settings.get(message.guild.id, `adminlog`) != "no") {
                      try {
                        var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
                        if (!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
                        channel.send(new MessageEmbed()
                          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                          .setAuthor(`ticket --> USER | ${message.author.tag}`, message.author.displayAvatarURL({
                            dynamic: true
                          }))
                          .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
                          .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
                          .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
                          .setTimestamp().setFooter("ID: " + message.author.id)
                        )
                      } catch (e) {
                        console.log(e)
                      }
                    }
                  })
                  .catch(e=>{
                    return message.channel.send(new MessageEmbed()
                      .setColor(es.wrongcolor)
                      .setFooter(es.footertext, es.footericon)
                      .setTitle(`<:no:833101993668771842> An error occurred`)
                      .setDescription(`\`\`\`${e.stack}\`\`\``)
                    );
                  });
                }
              }).catch(e=>{
                console.log(e)
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:no:833101993668771842> ERROR | Your Time ran out")
                  .setColor(es.wrongcolor)
                  .setDescription(`"Cancelled"`.substr(0, 2000))
                  .setFooter(es.footertext, es.footericon)
                );
              })
            })
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
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> An error occurred`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
      );
    }
  }
}

/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
