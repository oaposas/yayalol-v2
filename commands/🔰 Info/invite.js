const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton } = require('discord-buttons')
module.exports = {
  name: "invite",
  category: "🔰 Info",
  aliases: ["add"],
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let button_support_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://discord.com/invite/FQGXbypRf8")
      let button_invite = new MessageButton().setStyle('url').setLabel('Invite this Bot').setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
      //array of all buttons
      const allbuttons = [button_public_invite, button_support_dc, button_invite]
      message.channel.send({
        embed: new MessageEmbed()
          .setColor(ee.color)
          .setTitle("Thanks for inviting Luna Services")
          .addField(`Bot Powered by Luna`, `**[Invite Public Bot](https://discord.com/api/oauth2/authorize?client_id=784364932149280778&permissions=8&scope=bot)  •  [Support Server/Get your Own Bot](https://discord.com/invite/FQGXbypRf8)**\n\n[*Invite* **${client.user.username}**](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
          .setFooter("Luna Services | powered by Luna", "https://media.discordapp.net/attachments/845646789020745738/856873122862727208/standard.gif?width=351&height=45"),
        buttons: allbuttons
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}