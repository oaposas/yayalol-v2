const config = require("../botconfig/config.json")
const ee = require("../botconfig/embed.json")
const Discord = require("discord.js")
const Canvas = require("canvas");
Canvas.registerFont('Genta.ttf', {
  family: 'Genta'
})
const { delay } = require("../handlers/functions")
const {
  CaptchaGenerator
} = require('captcha-canvas'); //require package here
//Start the module
module.exports = client => {


  const getInviteCounts = async (guild) => {
    return await new Promise((resolve) => {
      try {
        guild.fetchInvites().then((invites) => {
          const inviteCounter = {} // { memberId: count }
          try {
            invites.forEach((invite) => {
              try {
                const {
                  uses,
                  inviter
                } = invite
                const {
                  username,
                  discriminator
                } = inviter

                const name = `${username}#${discriminator}`

                inviteCounter[name] = (inviteCounter[name] || 0) + uses
              } catch {

              }
            })
            resolve(inviteCounter)
          } catch {

          }

        }).catch(e => console.log("\n\n\n\n\n\nwelcome.js | Line 35 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n"))
      } catch {

      }
    })

  }

  client.on("ready", async () => {
    try {
      for(const guild of client.guilds.cache.array())
        {
          await delay(1000)
          client.invites[guild.id] = await getInviteCounts(guild)
        }
    } catch {}
  })
  
  client.on("guildCreate", async  (guild) => {
    try {
        client.invites[guild.id] = await getInviteCounts(guild)
    } catch {}
  })

  client.on("guildMemberAdd", async member => {
    if (!member.guild) return;
    if(!client.invites[member.guild.id]) await getInviteCounts(member.guild)
    let es = client.settings.get(member.guild.id, "embed")
    
    if (client.settings.get(member.guild.id, "welcome.captcha") && !member.user.bot) {
      const captcha = new CaptchaGenerator({
        height: 200,
        width: 600
      });

      const buffer = await captcha.generate(); //returns buffer of the captcha image
      const attachment = new Discord.MessageAttachment(buffer, `${captcha.text}_Captcha.png`)
      let mutedrole = false;
      let allguildroles = member.guild.roles.cache.array();
      for (let i = 0; i < allguildroles.length; i++) {
        if (allguildroles[i].name.toLowerCase().includes(`captcha`)) {
          mutedrole = allguildroles[i];
          break;
        }
      }
      if (!mutedrole) {
        let highestrolepos = member.guild.me.roles.highest.position;
        mutedrole = await member.guild.roles.create({
          data: {
            name: `DISABLED - CAPTCHA`,
            color: `#222222`,
            hoist: true,
            position: Number(highestrolepos) - 1
          },
          reason: `This role got created, to DISABLED - CAPTCHA Members!`
        }).catch((e) => {
          console.log(String(e.stack).red);
        });
      }
      await member.guild.channels.cache.forEach((ch) => {
        try {
          ch.updateOverwrite(mutedrole, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            CONNECT: false,
            SPEAK: false
          });
        } catch (e) {
          console.log(String(e.stack).red);
        }
      });

      member.roles.add(mutedrole.id).catch(e => console.log(e))
      const captchaembed = new Discord.MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setTimestamp()
        .setFooter(es.footertext, es.footericon)
        .setTitle(`**${member.guild.name} IS PROTECT BY A CAPTCHA SYSTEM**`)
        .setDescription(`<@${member.user.id}> please send me (type) the Captcha Code (Text) in the next 30 Seconds, otherwise, you will be not verified and kicked!`)
        .setImage(`attachment://${captcha.text}_Captcha.png`)
        .attachFiles(attachment);
      member.send(captchaembed).then(msg => {
        msg.channel.awaitMessages(m => m.author.id === member.user.id, {
          max: 1,
          time: 30000,
          errors: ["time"]
        }).then(collected => {
          if (collected.first().content.trim().toLowerCase() == captcha.text.toLowerCase()) {
            member.roles.remove(mutedrole.id).catch(e => console.log(e))
            msg.edit({embed: msg.embeds[0].setDescription(`✅ Successfully verified for: **${member.guild.name}**`).setImage("https://cdn.discordapp.com/attachments/807985610265460766/834519837782704138/success-3345091_1280.png")})
            add_roles(member)
            message(member)
          } else {
            member.guild.channels.cache.filter(ch => ch.type == "text").first().create({
              temporary: false
            }).then(invite => {
              member.user.send("BECAUSE U FAILED THE CAPTCHA, I KICKED U! HERE IS AN INVITE: " + invite.url).catch(e => console.log("prevented bug"))
              member.kick("FAILED THE CAPTCHA")
            }).catch(e => {
              console.log(e)
              member.user.send("BECAUSE U FAILED THE CAPTCHA, I KICKED U!").catch(e => console.log("prevented bug"))
              member.kick("FAILED THE CAPTCHA")
            })
          }
        })
      }).catch(e => {
        member.guild.channels.create(`VERIFY-YOURSELF`, {
          type: "text",
          topic: "PLEASE SEND THE CAPTCHA CODE IN THE CHAT!",
          permissionOverwrites: [{
              id: member.user.id,
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
            },
            {
              id: member.guild.id,
              deny: ["VIEW_CHANNEL"]
            }
          ]
        }).then(ch => {
          ch.send({
            content: `<@${member.user.id}>`,
            embed: captchaembed
          }).then(msg => {
            msg.channel.awaitMessages(m => m.author.id === member.user.id, {
              max: 1,
              time: 30000,
              errors: ["time"]
            }).then(collected => {
              if (collected.first().content.trim().toLowerCase() == captcha.text.toLowerCase()) {
                member.roles.remove(mutedrole.id).catch(e => console.log(e))
                msg.edit({embed: msg.embeds[0].setDescription(`✅ Successfully verified for: **${member.guild.name}**\n\nDELETING CHANNEL in 15 SECONDS, *only if noone else joins until then!*`).setImage("https://cdn.discordapp.com/attachments/807985610265460766/834519837782704138/success-3345091_1280.png")}).catch(e => console.log("PREVENTED BUG"))
                ch.delete().catch(e => console.log("e"))
                add_roles(member)
                message(member)
              } else {
                member.guild.channels.cache.filter(ch => ch.type == "text").first().create({
                  temporary: false
                }).then(invite => {
                  member.kick("FAILED THE CAPTCHA").catch(e => console.log("e"))
                  ch.delete().catch(e => console.log("e"))
                }).catch(e => {
                  console.log(e)
                  member.kick("FAILED THE CAPTCHA").catch(e => console.log("e"))
                  console.log("channel delete")
                  ch.delete().catch(e => console.log("e"))

                })
              }
            })
          })
        })
      })
    } else {
      add_roles(member)
      message(member)
    }

  })


  async function message(member) {
    let invitedstring;
    let ts;
    try {
      const invitesBefore = client.invites[member.guild.id]
      const invitesAfter = await getInviteCounts(member.guild)
      for (const inviter in invitesAfter) {
        try {
          if (invitesBefore[inviter] === invitesAfter[inviter] - 1) {
            ts = `${inviter} \`(${invitesAfter[inviter]} invites)\``
            client.invites[member.guild.id] = invitesAfter
            break;
          }
        } catch {
          ts = "Could not find who invited him"
        }
      }
    } catch {
      ts = "Could not find who invited him"
    }


    invitedstring = `> Invited by: **${ts}**`.substr(0, 1024);

    let welcome = client.settings.get(member.guild.id, "welcome")
    
    if (welcome && welcome.channel !== "nochannel") {
      if (welcome.image) {
        if (welcome.dm) {
          if (welcome.customdm === "no") dm_msg_autoimg(member);
          else dm_msg_withimg(member);
        }

        if (welcome.custom === "no") msg_autoimg(member);
        else msg_withimg(member);
      } else {

        if (welcome.dm) {
          dm_msg_withoutimg(member);
        }

        msg_withoutimg(member)
      }
    }


    async function msg_withoutimg(member) {
      if (!member.guild) return;
      let es = client.settings.get(member.guild.id, "embed")
      let welcomechannel = client.settings.get(member.guild.id, "welcome.channel");
      if (!welcomechannel) return;
      let channel = await client.channels.fetch(welcomechannel)
      if (!channel) return;

      //define the welcome embed
      const welcomeembed = new Discord.MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setTimestamp()
        .setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
          dynamic: true
        }))
        .setTitle(`**Welcome to ${member.guild.name}!**`)
        .setDescription(client.settings.get(member.guild.id, "welcome.msg").replace("{user}", `${member.user}`))
        .addField("\u200b", invitedstring)
      //send the welcome embed to there
      channel.send({content: `<@${member.user.id}>`, embed: welcomeembed}).catch(e => console.log("\n\n\n\n\n\nwelcome.js | Line 237 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n"))
    }
    async function dm_msg_withoutimg(member) {
      if (!member.guild) return; 
      let es = client.settings.get(member.guild.id, "embed")
      //define the welcome embed
      const welcomeembed = new Discord.MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setTimestamp()
        .setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
          dynamic: true
        }))
        .setTitle(`**Welcome to ${member.guild.name}!**`)
        .setDescription(client.settings.get(member.guild.id, "welcome.dm_msg").replace("{user}", `${member.user}`))
        .addField("\u200b", invitedstring)
      //send the welcome embed to there
      member.user.send({content: `<@${member.user.id}>`, embed: welcomeembed}).catch(e => console.log("\n\n\n\n\n\nwelcome.js | Line 249 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n"))
    }


    async function dm_msg_withimg(member) {
      if (!member.guild) return; 
      let es = client.settings.get(member.guild.id, "embed")
      //define the welcome embed
      const welcomeembed = new Discord.MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setTimestamp()
        .setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
          dynamic: true
        }))
        .setTitle(`**Welcome to ${member.guild.name}!**`)
        .setDescription(client.settings.get(member.guild.id, "welcome.dm_msg").replace("{user}", `${member.user}`))
        .setImage(client.settings.get(member.guild.id, "welcome.customdm"))
        .addField("\u200b", invitedstring)
      //send the welcome embed to there
      member.user.send({content: `<@${member.user.id}>`, embed: welcomeembed}).catch(e => console.log("\n\n\n\n\n\nwelcome.js | Line 264 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n"))
    }
    async function msg_withimg(member) {
      if (!member.guild) return;
      let es = client.settings.get(member.guild.id, "embed")
      let welcomechannel = client.settings.get(member.guild.id, "welcome.channel");
      if (!welcomechannel) return;
      let channel = await client.channels.fetch(welcomechannel)
      if (!channel) return;

      //define the welcome embed
      const welcomeembed = new Discord.MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setTimestamp()
        .setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
          dynamic: true
        }))
        .setTitle(`**Welcome to ${member.guild.name}!**`)
        .setDescription(client.settings.get(member.guild.id, "welcome.msg").replace("{user}", `${member.user}`))
        .setImage(client.settings.get(member.guild.id, "welcome.custom"))
        .addField("\u200b", invitedstring)
      //send the welcome embed to there
      channel.send({content: `<@${member.user.id}>`, embed: welcomeembed}).catch(e => console.log("\n\n\n\n\n\nwelcome.js | Line 284 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n"))
    }

    async function dm_msg_autoimg(member) {
      try {
        if (!member.guild) return;

        let es = client.settings.get(member.guild.id, "embed")
        //define the welcome embed
        const welcomeembed = new Discord.MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTimestamp()
          .setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
            dynamic: true
          }))
          .setTitle(`**Welcome to ${member.guild.name}!**`)
          .addField("\u200b", invitedstring)
          .setDescription(client.settings.get(member.guild.id, "welcome.dm_msg").replace("{user}", `${member.user}`))

        //member roles add on welcome every single role
        const canvas = Canvas.createCanvas(1772, 633);
        //make it "2D"
        const ctx = canvas.getContext('2d');

        if (client.settings.get(member.guild.id, "welcome.backgrounddm") !== "transparent") {
          try {
            const bgimg = await Canvas.loadImage(client.settings.get(member.guild.id, "welcome.backgrounddm"));
            ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);
          } catch {}
        } else {
          try {
            if(!member.guild.iconURL() || member.guild.iconURL() == null || member.guild.iconURL() == undefined) return;
            const img = await Canvas.loadImage(member.guild.iconURL({
              format: "png"
            }));
            ctx.globalAlpha = 0.3;
            //draw the guildicon
            ctx.drawImage(img, 1772 - 633, 0, 633, 633);
            ctx.globalAlpha = 1;
          } catch {}
        }

        if (client.settings.get(member.guild.id, "welcome.framedm")) {
          let background;
          var framecolor = client.settings.get(member.guild.id, "welcome.framecolordm").toUpperCase();
          if (framecolor == "WHITE") framecolor = "#FFFFF9";
          if (client.settings.get(member.guild.id, "welcome.discriminatordm") && client.settings.get(member.guild.id, "welcome.servernamedm"))
            background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome3frame.png`);

          else if (client.settings.get(member.guild.id, "welcome.discriminatordm"))
            background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome2frame_unten.png`);

          else if (client.settings.get(member.guild.id, "welcome.servernamedm"))
            background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome2frame_oben.png`);

          else
            background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome1frame.png`);

          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
          if (client.settings.get(member.guild.id, "welcome.pbdm")) {
            background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome1framepb.png`);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
          }
        }

        var fillcolors = client.settings.get(member.guild.id, "welcome.framecolordm").toUpperCase();
        if (fillcolors == "WHITE") framecolor = "#FFFFF9";
        ctx.fillStyle = fillcolors.toLowerCase();

        //set the first text string 
        var textString3 = `${member.user.username}`;
        //if the text is too big then smaller the text
        if (textString3.length >= 14) {
          ctx.font = 'bold 100px Genta';
          ctx.fillText(textString3, 720, canvas.height / 2);
        }
        //else dont do it
        else {
          ctx.font = 'bold 150px Genta';
          ctx.fillText(textString3, 720, canvas.height / 2 + 20);
        }



        ctx.font = 'bold 50px Genta';
        //define the Discriminator Tag
        if (client.settings.get(member.guild.id, "welcome.discriminatordm")) {
          ctx.fillText(`#${member.user.discriminator}`, 750, canvas.height / 2 + 125);
        }
        //define the Member count
        if (client.settings.get(member.guild.id, "welcome.membercountdm")) {
          ctx.fillText(`Member #${member.guild.memberCount}`, 750, canvas.height / 2 + 200);
        }
        //get the Guild Name
        if (client.settings.get(member.guild.id, "welcome.servernamedm")) {
          ctx.fillText(`${member.guild.name}`, 700, canvas.height / 2 - 150);
        }

        if (client.settings.get(member.guild.id, "welcome.pbdm")) {
          //create a circular "mask"
          ctx.beginPath();
          ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img
          ctx.closePath();
          ctx.clip();
          //define the user avatar
          const avatar = await Canvas.loadImage(member.user.displayAvatarURL({
            format: 'png'
          }));
          //draw the avatar
          ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
        }

        //get it as a discord attachment
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        //define the welcome embed
        welcomeembed.setImage("attachment://welcome-image.png")
        welcomeembed.attachFiles(attachment);
        //send the welcome embed to there
        member.user.send({content: `<@${member.user.id}>`, embed: welcomeembed}).catch(e => console.log("\n\n\n\n\n\nwelcome.js | Line 395 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n"))
        //member roles add on welcome every single role
      } catch {}
    }
    async function msg_autoimg(member) {
      try {
        console.log("WELCOME - (fn-msg_autoimg)".italic.yellow); 
        if (!member.guild) return console.log("WELCOME - (fn-msg_autoimg) - NOT IN A GUILD".italic.yellow); 
        let es = client.settings.get(member.guild.id, "embed")
        let welcomechannel = client.settings.get(member.guild.id, "welcome.channel");
        if (!welcomechannel) return console.log("WELCOME - (fn-msg_autoimg) - NO SETTINGS FOR WELCOME CHANNEL FOUND".italic.yellow);  
        let channel = await client.channels.fetch(welcomechannel)
        if (!channel) return console.log("WELCOME - (fn-msg_autoimg) - CHANNEL NOT FOUND".italic.yellow); 
        //define the welcome embed
        const welcomeembed = new Discord.MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTimestamp()
          .setFooter("WELCOME  |  " + member.user.id, member.user.displayAvatarURL({
            dynamic: true
          }))
          .addField("\u200b", invitedstring)
          .setTitle(`**Welcome to ${member.guild.name}!**`)
          .setDescription(client.settings.get(member.guild.id, "welcome.msg").replace("{user}", `${member.user}`))
      try{
        //member roles add on welcome every single role
        const canvas = Canvas.createCanvas(1772, 633);
        //make it "2D"
        const ctx = canvas.getContext('2d');

        if (client.settings.get(member.guild.id, "welcome.background") !== "transparent") {
          try {
            const bgimg = await Canvas.loadImage(client.settings.get(member.guild.id, "welcome.background"));
            ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);
          } catch {}
        } else {
          try {
            if(!member.guild.iconURL() || member.guild.iconURL() == null || member.guild.iconURL() == undefined) return;
            const img = await Canvas.loadImage(member.guild.iconURL({
              format: "png"
            }));
            ctx.globalAlpha = 0.3;
            //draw the guildicon
            ctx.drawImage(img, 1772 - 633, 0, 633, 633);
            ctx.globalAlpha = 1;
          } catch {}
        }


        if (client.settings.get(member.guild.id, "welcome.frame")) {
          let background;
          var framecolor = client.settings.get(member.guild.id, "welcome.framecolor").toUpperCase();
          if (framecolor == "WHITE") framecolor = "#FFFFF9";
          if (client.settings.get(member.guild.id, "welcome.discriminator") && client.settings.get(member.guild.id, "welcome.servername"))
            background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome3frame.png`);

          else if (client.settings.get(member.guild.id, "welcome.discriminator"))
            background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome2frame_unten.png`);

          else if (client.settings.get(member.guild.id, "welcome.servername"))
            background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome2frame_oben.png`);

          else
            background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome1frame.png`);

          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

          if (client.settings.get(member.guild.id, "welcome.pb")) {
            background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome1framepb.png`);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
          }
        }

        var fillcolor = client.settings.get(member.guild.id, "welcome.framecolor").toUpperCase();
        if (fillcolor == "WHITE") framecolor = "#FFFFF9";
        ctx.fillStyle = fillcolor.toLowerCase();

        //set the first text string 
        var textString3 = `${member.user.username}`;
        //if the text is too big then smaller the text
        if (textString3.length >= 14) {
          ctx.font = 'bold 100px Genta';
          ctx.fillText(textString3, 720, canvas.height / 2);
        }
        //else dont do it
        else {
          ctx.font = 'bold 150px Genta';
          ctx.fillText(textString3, 720, canvas.height / 2 + 20);
        }

        ctx.font = 'bold 50px Genta';
        //define the Discriminator Tag
        if (client.settings.get(member.guild.id, "welcome.discriminator")) {
          ctx.fillText(`#${member.user.discriminator}`, 750, canvas.height / 2 + 125);
        }
        //define the Member count
        if (client.settings.get(member.guild.id, "welcome.membercount")) {
          ctx.fillText(`Member #${member.guild.memberCount}`, 750, canvas.height / 2 + 200);
        }
        //get the Guild Name
        if (client.settings.get(member.guild.id, "welcome.servername")) {
          ctx.fillText(`${member.guild.name}`, 700, canvas.height / 2 - 150);
        }


        if (client.settings.get(member.guild.id, "welcome.pb")) {
          //create a circular "mask"
          ctx.beginPath();
          ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img
          ctx.closePath();
          ctx.clip();
          //define the user avatar
          const avatar = await Canvas.loadImage(member.user.displayAvatarURL({
            format: 'png'
          }));
          //draw the avatar
          ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
        }
        //get it as a discord attachment
        const attachment = new Discord.MessageAttachment(await canvas.toBuffer(), 'welcome-image.png');
        //define the welcome embed
        welcomeembed.setImage("attachment://welcome-image.png")
        welcomeembed.attachFiles(attachment);
        console.log("WELCOME - (fn-msg_autoimg) - SEND MESSAGE".italic.yellow); 
        //send the welcome embed to there
        channel.send({content: `<@${member.user.id}>`, embed: welcomeembed}).catch(e => console.log("\n\n\n\n\n\nwelcome.js | Line 516 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n"))
        

      }catch (e){ 
        console.log(e); 
        channel.send({content: `<@${member.user.id}>`, embed: welcomeembed}).catch(e => console.log("\n\n\n\n\n\nwelcome.js | Line 516 This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n"))}
      } catch (e) {
        console.log("FASDASDAASFASD\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"+e)
      }
    }
  }

  function add_roles(member) {
    let roles = client.settings.get(member.guild.id, "welcome.roles")
    if (roles.length > 0) {
      for (const role of roles) {
        try {
          member.roles.add(role).catch(e => console.log("\n\n\n\n\n\nROLES ROLES This catch prevents a crash\n\n\n" + e.stack ? e.stack : e + "\n\n\n\n\n\n"))
        } catch {}
      }
    }
  }

}