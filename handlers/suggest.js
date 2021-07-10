const { Client, Collection, MessageEmbed, MessageAttachment } = require(`discord.js`);
module.exports = (client) => {

  client.on('message', async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.partial) await message.fetch();

    //////////////////////////////////////////
    //////////////////////////////////////////
    /////////////FEEDBACK SYSTEM//////////////
    //////////////////////////////////////////
    //////////////////////////////////////////
    client.settings.ensure(message.guild.id, {
        suggest: {
          channel: "",
          approvemsg: `<a:yes:833101995723194437> Accepted Idea! Expect this soon.`,
          denymsg: `<:no:833101993668771842> Thank you for the feedback, but we are not interested in this idea at this time.`,
          maybemsg: `💡 We are thinking about this idea!`,
          statustext: `<a:Loading:833101350623117342> Waiting for Community Feedback, please vote!`,
          footertext: `Want to suggest / Feedback something? Simply type in this channel!`,
          approveemoji: `833101995723194437`,
          denyemoji: `833101993668771842`,
        }
    });
    var approveemoji = client.settings.get(message.guild.id, `suggest.approveemoji`);
    var approveemoji = client.settings.get(message.guild.id, `suggest.approveemoji`);
    var denyemoji = client.settings.get(message.guild.id, `suggest.denyemoji`);
    var approvetext = client.settings.get(message.guild.id, `suggest.approvemsg`);
    var denytext = client.settings.get(message.guild.id, `suggest.denymsg`);
    var maybetext = client.settings.get(message.guild.id, `suggest.maybemsg`);
    var footertext = client.settings.get(message.guild.id, `suggest.footertext`);
    var statustext = client.settings.get(message.guild.id, `suggest.statustext`)
    var prefix = client.settings.get(message.guild.id, `prefix`)
    var feedbackchannel = client.settings.get(message.guild.id, `suggest.channel`);
    if(!feedbackchannel) return;
    if (message.channel.id === feedbackchannel) {
      var es = client.settings.get(message.guild.id, `embed`)
      var url = ``;
      var imagename = `Unknown`;
      message.delete();
      var embed = new MessageEmbed()
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setAuthor(message.author.tag, message.member.user.displayAvatarURL({ dynamic: true }), "https://discord.gg/FQGXbypRf8")
      .setFooter(footertext, "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/light-bulb_1f4a1.png").setThumbnail(es.thumb ? es.footericon : `https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png`)
      .addField(`Status`, statustext)
      if(message.content) embed.setDescription(message.content)

      if (message.attachments.size > 0) 
        if (message.attachments.every(attachIsImage)) {
          const attachment = new MessageAttachment(url, imagename)
          embed.attachFiles(attachment)
          embed.setImage(`attachment://${imagename}`)
        }
      function attachIsImage(msgAttach) {
        url = msgAttach.url;
        imagename = msgAttach.name || `Unknown`;
        return url.indexOf(`png`, url.length - `png`.length /*or 3*/ ) !== -1 ||
          url.indexOf(`jpeg`, url.length - `jpeg`.length /*or 3*/ ) !== -1 ||
          url.indexOf(`gif`, url.length - `gif`.length /*or 3*/ ) !== -1 ||
          url.indexOf(`jpg`, url.length - `jpg`.length /*or 3*/ ) !== -1;
      }
      message.channel.send(embed).then(message => {
        message.react(approveemoji);
        message.react(denyemoji)
      })
    }

    function attachIsImage(msgAttach) {
      url = msgAttach.url;
      imagename = msgAttach.name || `Unknown`;
      return url.indexOf(`png`, url.length - `png`.length /*or 3*/ ) !== -1 ||
        url.indexOf(`jpeg`, url.length - `jpeg`.length /*or 3*/ ) !== -1 ||
        url.indexOf(`gif`, url.length - `gif`.length /*or 3*/ ) !== -1 ||
        url.indexOf(`jpg`, url.length - `jpg`.length /*or 3*/ ) !== -1;
    }
  })
}
