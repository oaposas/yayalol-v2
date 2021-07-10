const config = require("../botconfig/config.json")
const ee = require("../botconfig/embed.json")
const Discord = require("discord.js")
const Canvas = require("canvas");
Canvas.registerFont('Genta.ttf', { family: 'Genta' })
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


  client.on("guildMemberRemove", async member => {
      if(!member.guild) return;
      let es = client.settings.get(member.guild.id, "embed")
      if(!client.invites[member.guild.id]) await getInviteCounts(member.guild)
      message(member)
  })


async function message(member) {
let invitedstring;
const invitesBefore = client.invites[member.guild.id]
const invitesAfter = await getInviteCounts(member.guild)
let ts;
for (const inviter in invitesAfter) {
  try{
    if (invitesBefore[inviter] === invitesAfter[inviter] - 1) {
      ts = `${inviter} \`(${invitesAfter[inviter]} invites)\``
      client.invites[member.guild.id] = invitesAfter
      break;
    }
  }catch{
    ts = "Could not find who invited him"
  }
}

invitedstring = `> Was invited by: **${ts}**`.substr(0, 1024);

  let leave = client.settings.get(member.guild.id, "leave")
  if(leave && leave.channel !== "nochannel"){
      if(leave.image){
          if(leave.dm){
              if(leave.customdm === "no") dm_msg_autoimg(member);
              else dm_msg_withimg(member);
          }
          if(leave.custom === "no") msg_autoimg(member);
              else msg_withimg(member);
      }
      else{
          if(leave.dm){
              dm_msg_withoutimg(member);
          }
          msg_withoutimg(member)
      }
  }


  
  async function msg_withoutimg(member) {
      if(!member.guild) return;
      let es = client.settings.get(member.guild.id, "embed")
      let leavechannel = client.settings.get(member.guild.id, "leave.channel");
      if(!leavechannel) return;
      let channel = await client.channels.fetch(leavechannel)
      if(!channel) return;
      
    //define the leave embed
      const leaveembed = new Discord.MessageEmbed()
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setTimestamp()
      .setFooter("Good bye | " + member.user.id, member.user.displayAvatarURL({ dynamic: true }))
      .setTitle(`**${member.user.tag} left  ${member.guild.name}**`)
      .setDescription(client.settings.get(member.guild.id, "leave.msg").replace("{user}", `${member.user}`))
      .addField("\u200b", invitedstring)
      //send the leave embed to there
      channel.send(leaveembed).catch(e=>console.log("This catch prevents a crash"))
  }
  async function dm_msg_withoutimg(member) {         
    //define the leave embed
    const leaveembed = new Discord.MessageEmbed()
    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
    .setTimestamp()
    .setFooter("Good bye | " + member.user.id, member.user.displayAvatarURL({ dynamic: true }))
    .setTitle(`**${member.user.tag} left  ${member.guild.name}**`)
    .setDescription(client.settings.get(member.guild.id, "leave.dm_msg").replace("{user}", `${member.user}`))
    .addField("\u200b", invitedstring)
    //send the leave embed to there
    member.user.send(leaveembed).catch(e=>console.log("This catch prevents a crash"))
  }


  async function dm_msg_withimg(member) {
    //define the leave embed
      const leaveembed = new Discord.MessageEmbed()
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setTimestamp()
      .setFooter("Good bye | " + member.user.id, member.user.displayAvatarURL({ dynamic: true }))
      .setTitle(`**${member.user.tag} left  ${member.guild.name}**`)
      .setDescription(client.settings.get(member.guild.id, "leave.dm_msg").replace("{user}", `${member.user}`))
      .setImage(client.settings.get(member.guild.id, "leave.customdm"))
      .addField("\u200b", invitedstring)
      //send the leave embed to there
      member.user.send(leaveembed).catch(e=>console.log("This catch prevents a crash"))
  }
  async function msg_withimg(member) {
      if(!member.guild) return;
      let es = client.settings.get(member.guild.id, "embed")
      let leavechannel = client.settings.get(member.guild.id, "leave.channel");
      if(!leavechannel) return;
      let channel = await client.channels.fetch(leavechannel)
      if(!channel) return;

      //define the leave embed
      const leaveembed = new Discord.MessageEmbed()
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setTimestamp()
      .setFooter("Good bye | " + member.user.id, member.user.displayAvatarURL({ dynamic: true }))
      .setTitle(`**${member.user.tag} left  ${member.guild.name}**`)
      .setDescription(client.settings.get(member.guild.id, "leave.msg").replace("{user}", `${member.user}`))
      .setImage(client.settings.get(member.guild.id, "leave.custom"))
      .addField("\u200b", invitedstring)
     //send the leave embed to there
      channel.send(leaveembed).catch(e=>console.log("This catch prevents a crash"))
  }

  async function dm_msg_autoimg(member) {
      try {
          if(!member.guild) return;

          let es = client.settings.get(member.guild.id, "embed")
          //define the leave embed
          const leaveembed = new Discord.MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
              .setTimestamp()
              .setFooter("Good bye | " + member.user.id, member.user.displayAvatarURL({ dynamic: true }))
              .setTitle(`**${member.user.tag} left  ${member.guild.name}**`)
              .addField("\u200b", invitedstring)
              .setDescription(client.settings.get(member.guild.id, "leave.dm_msg").replace("{user}", `${member.user}`))
  
          //member roles add on leave every single role
          const canvas = Canvas.createCanvas(1772, 633);
                    //make it "2D"
          const ctx = canvas.getContext('2d');

          if (client.settings.get(member.guild.id, "leave.backgrounddm") !== "transparent") {
            try {
              const bgimg = await Canvas.loadImage(client.settings.get(member.guild.id, "leave.backgrounddm"));
              ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);
            } catch { }
          } else {
            try {
              if(!member.guild.iconURL() || member.guild.iconURL() == null || member.guild.iconURL() == undefined) return;
              const img = await Canvas.loadImage(member.guild.iconURL({ format: "png" }));
              ctx.globalAlpha = 0.3;
              //draw the guildicon
              ctx.drawImage(img, 1772 - 633, 0, 633, 633);
              ctx.globalAlpha = 1;
            } catch {  }
        }

        if(client.settings.get(member.guild.id, "leave.framedm")){
          let background;
          var framecolor = client.settings.get(member.guild.id, "leave.framecolordm").toUpperCase();
          if(framecolor == "WHITE") framecolor = "#FFFFF9";
          if(client.settings.get(member.guild.id, "leave.discriminatordm") && client.settings.get(member.guild.id, "leave.servernamedm"))
          background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome3frame.png`);
          
          else if(client.settings.get(member.guild.id, "leave.discriminatordm"))
          background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome2frame_unten.png`);

          else if(client.settings.get(member.guild.id, "leave.servernamedm"))
          background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome2frame_oben.png`);
          
          else 
          background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome1frame.png`);

          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
          if(client.settings.get(member.guild.id, "leave.pbdm")){
            background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome1framepb.png`);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
          }
        }

        var fillcolors = client.settings.get(member.guild.id, "leave.framecolordm").toUpperCase();
        if(fillcolors == "WHITE") fillcolor == "#FFFFF9"
        ctx.fillStyle = fillcolors.toLowerCase();

        //set the first text string 
        var textString3 = `${member.user.username}`;
        //if the text is too big then smaller the text
        if (textString3.length >= 14) {
          ctx.font = 'bold 100px Genta';
          ctx.fillText(textString3, 720, canvas.height / 2 );
        }
        //else dont do it
        else {
          ctx.font = 'bold 150px Genta';
          ctx.fillText(textString3, 720, canvas.height / 2 + 20);
        }


        
        ctx.font = 'bold 50px Genta';
          //define the Discriminator Tag
          if(client.settings.get(member.guild.id, "leave.discriminatordm")){
            ctx.fillText(`#${member.user.discriminator}`,  750, canvas.height / 2 + 125);
          }
          //define the Member count
          if(client.settings.get(member.guild.id, "leave.membercountdm")){
            ctx.fillText(`Member #${member.guild.memberCount}`, 750, canvas.height / 2 + 200);
          }
          //get the Guild Name
          if(client.settings.get(member.guild.id, "leave.servernamedm")){
            ctx.fillText(`${member.guild.name}`, 700, canvas.height / 2 - 150);
          }

          if(client.settings.get(member.guild.id, "leave.pbdm")){
            //create a circular "mask"
            ctx.beginPath();
            ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
            ctx.closePath();
            ctx.clip();
            //define the user avatar
            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
            //draw the avatar
            ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
          }
        
        //get it as a discord attachment
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'leave-image.png');
        //define the leave embed
        leaveembed.setImage("attachment://leave-image.png")
        leaveembed.attachFiles(attachment);
        //send the leave embed to there
        member.user.send(leaveembed).catch(e=>console.log("This catch prevents a crash"))
        //member roles add on leave every single role
      } catch {
      }
  }
  async function msg_autoimg(member) {
      try {
          if(!member.guild) return;
          let es = client.settings.get(member.guild.id, "embed")
          let leavechannel = client.settings.get(member.guild.id, "leave.channel");
          if(!leavechannel) return;
          let channel = await client.channels.fetch(leavechannel)
          if(!channel) return;
        //define the leave embed
        const leaveembed = new Discord.MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTimestamp()
          .setFooter("Good bye | " + member.user.id, member.user.displayAvatarURL({ dynamic: true }))
          .addField("\u200b", invitedstring)
          .setTitle(`**${member.user.tag} left  ${member.guild.name}**`)
          .setDescription(client.settings.get(member.guild.id, "leave.msg").replace("{user}", `${member.user}`))
  
          //member roles add on leave every single role
          const canvas = Canvas.createCanvas(1772, 633);
                                //make it "2D"
        const ctx = canvas.getContext('2d');

        if (client.settings.get(member.guild.id, "leave.background") !== "transparent") {
          try {
            const bgimg = await Canvas.loadImage(client.settings.get(member.guild.id, "leave.background"));
            ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);
          } catch {
          }
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
          } catch {
          }
        }
       
        
        if(client.settings.get(member.guild.id, "leave.frame")){
          let background;
          var framecolor = client.settings.get(member.guild.id, "leave.framecolor").toUpperCase();
          if(framecolor == "WHITE") framecolor = "#FFFFF9";
          if(client.settings.get(member.guild.id, "leave.discriminator") && client.settings.get(member.guild.id, "leave.servername"))
          background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome3frame.png`);
          
          else if(client.settings.get(member.guild.id, "leave.discriminator"))
          background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome2frame_unten.png`);

          else if(client.settings.get(member.guild.id, "leave.servername"))
          background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome2frame_oben.png`);
          
          else 
          background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome1frame.png`);

          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
          
          if(client.settings.get(member.guild.id, "leave.pb")){
            background = await Canvas.loadImage(`./assets/welcome/${framecolor}/welcome1framepb.png`);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
          }
        }


        var fillcolor = client.settings.get(member.guild.id, "leave.framecolor").toUpperCase();
        if(fillcolor == "WHITE") fillcolor == "#FFFFF9";
        ctx.fillStyle =  fillcolor.toLowerCase();

        //set the first text string 
        var textString3 = `${member.user.username}`;
        //if the text is too big then smaller the text
        if (textString3.length >= 14) {
          ctx.font = 'bold 100px Genta';
          ctx.fillText(textString3, 720, canvas.height / 2 );
        }
        //else dont do it
        else {
          ctx.font = 'bold 150px Genta';
          ctx.fillText(textString3, 720, canvas.height / 2 + 20);
        }

        ctx.font = 'bold 50px Genta';
          //define the Discriminator Tag
          if(client.settings.get(member.guild.id, "leave.discriminator")){
            ctx.fillText(`#${member.user.discriminator}`,  750, canvas.height / 2 + 125);
          }
          //define the Member count
          if(client.settings.get(member.guild.id, "leave.membercount")){
            ctx.fillText(`Member #${member.guild.memberCount}`, 750, canvas.height / 2 + 200);
          }
          //get the Guild Name
          if(client.settings.get(member.guild.id, "leave.servername")){
            ctx.fillText(`${member.guild.name}`, 700, canvas.height / 2 - 150);
          }

        
          if(client.settings.get(member.guild.id, "leave.pb")){
            //create a circular "mask"
            ctx.beginPath();
            ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
            ctx.closePath();
            ctx.clip();
            //define the user avatar
            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
            //draw the avatar
            ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
          }
        //get it as a discord attachment
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'leave-image.png');
        //define the leave embed
          leaveembed.setImage("attachment://leave-image.png")
          leaveembed.attachFiles(attachment);
        //send the leave embed to there
        channel.send(leaveembed).catch(e=>console.log("This catch prevents a crash"))
        //member roles add on leave every single role
      } catch (e){console.log(e)
      }
  }
}

 
}