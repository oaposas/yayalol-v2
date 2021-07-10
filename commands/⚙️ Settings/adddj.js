const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `adddj`,
    aliases: [`adddjrole`],
    category: `⚙️ Settings`,
    description: `Let's you define a DJ ROLE (as an array, aka you can have multiple)`,
    usage: `adddj @role`,
    memberpermissions: [`ADMINISTRATOR`],
    run: async (client, message, args, cmduser, text, prefix) => {
      let es = client.settings.get(message.guild.id, "embed")
    try{
      
      //get the role of the mention
      let role = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
      //if no pinged role return error
      if (!role)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> Please add a Role via ping, @role!`)
        );
      //try to find the role in the guild just incase he pings a role of a different server
      try {
          message.guild.roles.cache.get(role.id);
      } catch {
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> It seems that the Role does not exist in this Server!`)
        );
      }
      //if ther role is already in the Database, return error
      if(client.settings.get(message.guild.id,`djroles`).includes(role.id))
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> This Role is alerady in the List!`)
        );
      //push it into the database
      client.settings.push(message.guild.id, role.id, `djroles`);
      //these lines creates a string with all djroles
      let leftb = ``;
      if(client.settings.get(message.guild.id, `djroles`).join(``) === ``) leftb = `no Dj Roles, aka All Users are Djs`
      else
      for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
        leftb += `<@&` + client.settings.get(message.guild.id, `djroles`)[i] + `> | `
      }

      return message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<a:yes:833101995723194437> Added the DJ ROLE \`${role.name}\``)
        .setDescription(`All Dj Roles:\n> ${leftb.substr(0, leftb.length - 3)}`)
      );
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
						.setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> An error occurred`)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
        );
    }
  }
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
