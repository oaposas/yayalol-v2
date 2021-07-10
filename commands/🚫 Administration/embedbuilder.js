const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const {
  databasing
} = require("../../handlers/functions");
const { MessageButton, MessageActionRow } = require("discord-buttons") // using discord-buttons but edited!
module.exports = {
  name: "embedbuilder",
  category: "🚫 Administration",
  aliases: ["embedb"],
  cooldown: 2,
  usage: "embedbuilder --> follow Steps",
  description: "Resends a message from u as an Embed\n\n To have forexample no title do that:  embed ++ This is what an Embed without Image Looks like",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let adminroles = client.settings.get(message.guild.id, "adminroles")
      let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.embedbuilder")
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
              client.settings.remove(message.guild.id, r, `cmdadminroles.embedbuilder`)
            }
          }
        }
      if ((message.member.roles.cache.array() && !message.member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(message.author.id) && (message.member.roles.cache.array() && !message.member.roles.cache.some(r => adminroles.includes(r.id))) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> You are not allowed to run this Command`)
          .setDescription(`${adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(role => `<@&${role}>`).join(" | ") + cmdrole.join("")  : `No Admin Roles Setupped yet! Do it with: \`${prefix}setup-admin\``}`)
        );
    let embedToBuild = new MessageEmbed()
    .setAuthor(message.member.user.tag, message.member.user.avatarURL({dynamic:true}))

let title = new MessageButton()
    .setLabel("Title")
    .setStyle("blurple")
    .setID(`buildEmbed_builder_title`)

let description = new MessageButton()
    .setLabel("Description")
    .setStyle("blurple")
    .setID(`buildEmbed_builder_desc`)

let footer = new MessageButton()
    .setLabel("Footer")
    .setStyle("blurple")
    .setID(`buildEmbed_builder_footer`)

  
let footerImage = new MessageButton()
    .setLabel("Footer Image")
    .setStyle("blurple")
    .setID(`buildEmbed_builder_footerimg`)

let image = new MessageButton()
    .setLabel("Image")
    .setStyle("blurple")
    .setID(`buildEmbed_builder_img`)

let thumbnail = new MessageButton()
    .setLabel("Thumbnail")
    .setStyle("blurple")
    .setID(`buildEmbed_builder_thumb`)

let timestamp = new MessageButton()
    .setLabel("Timestamp")
    .setStyle("blurple")
    .setID(`buildEmbed_builder_timestamp`)

let color = new MessageButton()
    .setLabel("Color")
    .setStyle("blurple")
    .setID(`buildEmbed_builder_color`)

let save = new MessageButton()
    .setLabel("📨 Send")
    .setStyle("green")
    .setID(`buildEmbed_save`)

let cancel = new MessageButton()
    .setLabel("❌ Cancel")
    .setStyle("red")
    .setID(`buildEmbed_cancel`)

let channel = new MessageButton()
    .setLabel("💬 Select Channel")
    .setStyle("blurple")
    .setID(`buildEmbed_builder_channel`)

let buttonRow = new MessageActionRow()
    .addComponent(title).addComponent(description)

let buttonRow1 = new MessageActionRow()
    .addComponent(footer).addComponent(color).addComponent(timestamp)

let buttonRow2 = new MessageActionRow()
    .addComponent(footerImage).addComponent(image).addComponent(thumbnail)

let buttonRow3 = new MessageActionRow().addComponent(save).addComponent(cancel).addComponent(channel)

let msg = await message.channel.send({
    embed: embedToBuild,
    components: [buttonRow, buttonRow1, buttonRow2, buttonRow3]
})
let buttonEvent = async (button) => {
  if (button.message.id === msg.id) {
    if (button.clicker.user.id === message.member.id) {
      embedEditing(button);
    } else {
      await button.reply.send(`<:no:833101993668771842> You are not allowed to do that! Only: <@${message.author.id}>`, true); //ephemeral message
    }
  }
}
let channel2send = false;
client.on("clickButton", buttonEvent)

let embedEditing = async(button) => {
    if(!button.id.startsWith(`buildEmbed`) && button.message.id == msg.id) return;
    await button.defer();

    let id = button.id.split(`buildEmbed_`)[1]
    if(id.startsWith(`builder`)) {
        let builderId = id.split(`builder_`)[1]
        let noInput = ["timestamp"]
        let noInputFinal = !noInput.some(a => a == builderId);
        let ifUrl = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');

        button.message.edit(`Please send me Your Input now!`, {
            components: new MessageActionRow().addComponent(new MessageButton().setLabel("Cancel").setStyle("red").setID(`buildEmbed_cancel`))
        })

        let input;
        if(noInputFinal) {
            let filter = async(message) => button.clicker.user.id == message.author.id
            input = await button.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).catch(e => {
                return client.emit(`clickButton`, {
                    id: `buildEmbed_cancel`,
                    message: button.message,
                    channel: button.channel
                })
            })
        }

        let finalInput = input ? input.first() : "";
        if(builderId == "channel") channel2send = finalInput.mentions.channels.first() || false;
        if(builderId == "title") embedToBuild.setTitle(finalInput.content)
        if(builderId == "desc") embedToBuild.setDescription(finalInput.content)
        if(builderId == "footer") embedToBuild.setFooter(finalInput.content)
        
        if(builderId == "color") {
            if(!/^#[0-9A-F]{6}$/i.test(finalInput.content)) embedToBuild.setColor("RANDOM")
            else embedToBuild.setColor(finalInput.content)
        }
        if(builderId == "footerimg") {
            if(ifUrl.test(finalInput)) {
                embedToBuild.setFooter(`${embedToBuild.footer ? embedToBuild.footer.text : "\u200B"}`, finalInput.content)
            }
        }
        if(builderId == "img") {
            if(ifUrl.test(finalInput)) {
                embedToBuild.setImage(finalInput.content)
            }
        }
        if(builderId == "thumb") {
            if(ifUrl.test(finalInput)) {
                embedToBuild.setThumbnail(finalInput.content)
            }
        }

        if(builderId == "timestamp") embedToBuild.setTimestamp()

        button.message.edit({
            embed: embedToBuild,
            components: [buttonRow, buttonRow1, buttonRow2, buttonRow3]
        })
        finalInput.delete();
    }

    if(id == `cancel`) {
        button.message.edit(`Canceling...`, {component:null}) 

        setTimeout(async() => {
            let message = await button.channel.messages.fetch(button.message.id)
            message.delete();
        }, 3000)

        await client.removeListener("clickButton", buttonEvent);
    }

    if(id == `save`) {
        let messageToDelete = await button.channel.messages.fetch(button.message.id);

        messageToDelete.delete();
          embedToBuild = Object.keys(embedToBuild).reduce((object, key) => {
            if(key !== "author") {
              object[key] = embedToBuild[key]
            }
            return object
          }, {})

        if(channel2send) 
        channel2send.send({embed:embedToBuild,component:null}) 
        else
        button.channel.send({embed:embedToBuild,component:null}) 
        await client.removeListener("clickButton", buttonEvent);
    }

    setTimeout(() => {
        button.message.edit({embed:embedToBuild,components:null})
        client.removeListener("clickButton", buttonEvent);
    }, 300000)
  }

    if(client.settings.get(message.guild.id, `adminlog`) != "no"){
      try{
        var channel2 = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
        if(!channel2) return client.settings.set(message.guild.id, "no", `adminlog`);
        channel2.send(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
          .setAuthor(`${require("path").parse(__filename).name} | ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
          .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
          .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
          .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
          .setTimestamp().setFooter("ID: " + message.author.id)
        )
      }catch (e){
        console.log(e)
      }
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
