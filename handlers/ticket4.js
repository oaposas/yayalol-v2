const ee = require("../botconfig/embed.json")
const {
  MessageEmbed,
} = require(`discord.js`);

module.exports = (client) => {
  let disabled = new MessageEmbed()
    .setColor(ee.wrongcolor)
    .setTitle("Your Owner disabled the Ticket-System! Sorry")
    .setFooter(ee.footertext, ee.footericon).setColor(ee.wrongcolor)
    .setThumbnail(ee.footericon)

  client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;


    client.setups.ensure(reaction.message.guild.id, {
      enabled: false,
      guildid: reaction.message.guild.id,
      messageid: "",
      channelid: "",
      parentid: "",
      message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
      adminroles: []
    }, "ticketsystem4");
    client.setups.ensure("TICKETS", {
      tickets: [],
      tickets2: [],
      tickets3: [],
      tickets4: [],
      tickets5: []
    })

    let ticket = client.setups.get(reaction.message.guild.id, "ticketsystem4");
    if (reaction.message.guild.id === ticket.guildid && reaction.message.id === ticket.messageid) {
      reaction.users.remove(user).catch(e=>console.log(e))
      if (!ticket.enabled) return user.send(disabled).catch(e => console.log(e));

      if (client.setups.get("TICKETS", "tickets4").includes(user.id)) {
        var es = client.settings.get(reaction.message.guild.id, "embed")
        try{
          var channel = reaction.message.guild.channels.cache.get(client.setups.get(user.id, "ticketid4"))
          if(!channel || channel == null || !channel.id || channel.id == null) throw {
            message: "NO TICKET CHANNEL FOUND AKA NO ANTISPAM"
          }
          return user.send(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
          
          .setTitle("Sorry, but you have an already open ticket!")
          .setDescription(`<#${client.setups.get(user.id, "ticketid4")}>`));
        }catch{
          client.setups.remove("TICKETS", user.id, "tickets4")
        }

      }

      let channelname = `ticket-${user.username}`.replace(" ", "-");

      reaction.message.guild.channels.create(channelname.substr(0, 31), {
        topic: `ticket-${user.id}`
      }).then(ch => {
        try{
          var cat = reaction.message.guild.channels.cache.get(ticket.parentid)
          ch.setParent(cat.id)
        }catch{
          if(reaction.message.channel.parent) ch.setParent(reaction.message.channel.parent.id)
        }
        ch.updateOverwrite(reaction.message.guild.roles.everyone, { //disabling all roles
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
        });
        ch.updateOverwrite(reaction.message.guild.id, { //disabling all roles
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
        });
        ch.updateOverwrite(user, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        if (reaction.message.guild.roles.cache.some(r => ticket.adminroles.includes(r.id))) {
          for (let i = 0; i < ticket.adminroles.length; i++) {
            try {
              ch.updateOverwrite(ticket.adminroles[i], { //ticket support role id
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
              });
            } catch (error) {
              console.log(error.stack)
            }
          }
        }
        let es = client.settings.get(reaction.message.guild.id, "embed")


        client.setups.push("TICKETS", user.id, "tickets4");
        client.setups.push("TICKETS", ch.id, "tickets4");
        client.setups.set(user.id, ch.id, "ticketid4");
        client.setups.set(ch.id, {
          user: user.id,
          channel: ch.id,
          guild: reaction.message.guild.id,
          type: "ticket-setup-4",
          state: "open",
          date: Date.now(),
        }, "ticketdata");

        var ticketembed = new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(`To close/manage this ticket type: ${client.settings.get(reaction.message.guild.id, "prefix")}ticket`, es.footericon)
        
        .setAuthor(`Ticket for: ${user.tag}`, user.displayAvatarURL({dynamic: true}), "https://discord.gg/FQGXbypRf8")
        .setDescription(ticket.message.replace("{user}", `${user}`))
        ch.send({content: `<@${user.id}> | ${ticket.adminroles.map(r=>`<@&${r}>`).join(" / ")}`, embed: ticketembed})
        .catch(error => console.log(error))
      })
    }
  })
}
