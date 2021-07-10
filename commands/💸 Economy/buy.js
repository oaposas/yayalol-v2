const { MessageEmbed } = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "buy",
  category: "💸 Economy",
  aliases: ["buyitem"],
  description: "Shows the Store",
  usage: "buy [Item]",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if (!client.settings.get(message.guild.id, "ECONOMY")) {
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
        .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
      );
    }
    try {
      //command
      var user = message.author;
      //if the user is a bot, then return
      if (user.bot) return message.reply("<:no:833101993668771842> **A Discord Bot can not have Economy!**")
      //ensure the economy data
      ensure_economy_user(client, message.guild.id, user.id)
      //get the latest data
      var data = client.economy.get(`${message.guild.id}-${user.id}`)
      //set some variables
      var items = 0, itemsvalue = 0;
      //Loop through all items
      for (const itemarray in data.items) {
        items += data.items[`${itemarray}`];
        var prize = 0;
        switch (itemarray.toLowerCase()) {
          case "yacht": prize = 75000; break;
          case "lamborghini": prize = 50000; break;
          case "car": prize = 6400; break;
          case "motorbike": prize = 1500; break;
          case "bicycle": prize = 500; break;

          case "nike": prize = 300; break;
          case "tshirt": prize = 60; break;

          case "mansion": prize = 45000; break;
          case "house": prize = 8000; break;
          case "dirthut": prize = 150; break;

          case "pensil": prize = 20; break;
          case "pen": prize = 10; break;
          case "condom": prize = 30; break;
          case "bottle": prize = 50; break;

          case "fish": prize = 1000; break;
          case "hamster": prize = 1500; break;
          case "dog": prize = 2000; break;
          case "cat": prize = 2000; break;
        }
        itemsvalue += prize * data.items[`${itemarray}`];
      }
      //function for yes or no, if its buyable!
      const p2b = (costs) => (Number(costs) > Number(data.balance)) ? "<:no:833101993668771842>" : "<a:yes:833101995723194437>";
      //return some message!
      if (!args[0])
        return message.reply(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(user.tag + " | ❌ .. Unable to buy | ✅ ... Possible to buy", user.displayAvatarURL({ dynamic: true }))
          .setTitle(`**🧸 | Available Items to be bought**`)
          .setDescription(`👛 You have (\`${data.balance} 💸\`) in your Pocket \n\n🧸 **You have \`${items} Items\` with a value of: \`${itemsvalue} 💸\`**\n\n**__How to buy an Item?__**\n> \`${prefix}buy <ITEMNAME> <AMOUNT>\``)
.addField("✏️ Useables", ">>> " + 
`✏️ **\`Pensil [10 💸]\`** | ${p2b(10)}
🖊️ **\`Pen [20 💸]\`** | ${p2b(20)}
🟪 **\`Condom [30 💸]\`** | ${p2b(30)}
🍼 **\`Bottle [50 💸]\`** | ${p2b(50)}`
)
.addField("👕 Clothes", ">>> " + 
`👟 **\`Nike Shoe [300 💸]\`** | ${p2b(300)}
👕 **\`T-Shirt [60 💸]\`** | ${p2b(60)}`
)
.addField("🐕 Animals", ">>> " + 
`🐟\`Fish [1000 💸]\`** | ${p2b(1000)}
🐹 **\`Hamster [1500 💸]\`** | ${p2b(1500)}
🐕 **\`Dog [2000 💸]\`** | ${p2b(2000)}
😺 **\`Cat [2000 💸]\`** | ${p2b(2000)}`
)
.addField("🚗 Means of Transport", ">>> " + 
`🛥️\`Yacht [75000 💸]\`** | ${p2b(75000)}
🏎️ **\`Lamborghini [50000 💸]\`** | ${p2b(50000)}
🚗 **\`Car [6400 💸]\`** | ${p2b(6400)}
🏍️ **\`Motorbike [1500 💸]\`** | ${p2b(1500)}
🚲 **\`Bicycle [500 💸]\`** | ${p2b(500)}`
)
.addField("🏠 Livingarea", ">>> " + 
`🏘️ **\`Mansion [45000 💸]\`** | ${p2b(45000)}
🏠 **\`House [8000 💸]\`** | ${p2b(8000)}
🟫 **\`Dirthut [150 💸]\`** | ${p2b(150)}`
));
      let amountofbuy = Number(args[1]) || 1;
      if (amountofbuy == 0)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({ dynamic: true }))
          .setTitle(`<:no:833101993668771842> You cannot buy 0 Items`)
          .setDescription(`Usage: \`${prefix}buy <Item> <Amount>\`\n\n\Example: \`${prefix}pay Car 2\``)
        );
      var prize = 0;
      switch (args[0].toLowerCase()) {
        case "yacht": prize = 75000; break;
        case "lamborghini": prize = 50000; break;
        case "car": prize = 6400; break;
        case "motorbike": prize = 1500; break;
        case "bicycle": prize = 500; break;

        case "nike": prize = 300; break;
        case "tshirt": prize = 60; break;

        case "mansion": prize = 45000; break;
        case "house": prize = 8000; break;
        case "dirthut": prize = 150; break;

        case "pensil": prize = 20; break;
        case "pen": prize = 10; break;
        case "condom": prize = 30; break;
        case "bottle": prize = 50; break;

        case "fish": prize = 1000; break;
        case "hamster": prize = 1500; break;
        case "dog": prize = 2000; break;
        case "cat": prize = 2000; break;
        default: prize = false; break;
      }
      if (!prize)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag + " | ❌ .. Unable to buy | ✅ ... Possible to buy", user.displayAvatarURL({ dynamic: true }))
          .setTitle(`<:no:833101993668771842> This Item seems to not exist! Those Items are available:`)
          .setDescription(`👛 You have (\`${data.balance} 💸\`) in your Pocket \n\n🧸 **You have \`${items} Items\` with a value of: \`${itemsvalue} 💸\`**\n\n**__How to buy an Item?__**\n> \`${prefix}buy <ITEMNAME> <AMOUNT>\``)
.addField("✏️ Useables", ">>> " + 
`✏️ **\`Pensil [10 💸]\`** | ${p2b(10)}
🖊️ **\`Pen [20 💸]\`** | ${p2b(20)}
🟪 **\`Condom [30 💸]\`** | ${p2b(30)}
🍼 **\`Bottle [50 💸]\`** | ${p2b(50)}`
)
.addField("👕 Clothes", ">>> " + 
`👟 **\`Nike Shoe [300 💸]\`** | ${p2b(300)}
👕 **\`T-Shirt [60 💸]\`** | ${p2b(60)}`
)
.addField("🐕 Animals", ">>> " + 
`🐟\`Fish [1000 💸]\`** | ${p2b(1000)}
🐹 **\`Hamster [1500 💸]\`** | ${p2b(1500)}
🐕 **\`Dog [2000 💸]\`** | ${p2b(2000)}
😺 **\`Cat [2000 💸]\`** | ${p2b(2000)}`
)
.addField("🚗 Means of Transport", ">>> " + 
`🛥️\`Yacht [75000 💸]\`** | ${p2b(75000)}
🏎️ **\`Lamborghini [50000 💸]\`** | ${p2b(50000)}
🚗 **\`Car [6400 💸]\`** | ${p2b(6400)}
🏍️ **\`Motorbike [1500 💸]\`** | ${p2b(1500)}
🚲 **\`Bicycle [500 💸]\`** | ${p2b(500)}`
)
.addField("🏠 Livingarea", ">>> " + 
`🏘️ **\`Mansion [45000 💸]\`** | ${p2b(45000)}
🏠 **\`House [8000 💸]\`** | ${p2b(8000)}
🟫 **\`Dirthut [150 💸]\`** | ${p2b(150)}`
));
      var endprize = prize * amountofbuy;
      if (endprize > data.balance)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({ dynamic: true }))
          .setTitle(`<:no:833101993668771842> You can't buy **${nFormatter(amountofbuy)} ${args[0]}** because it costs more Money (\`${nFormatter(endprize)} 💸\`) then you have in your **👛 Pocket (\`${nFormatter(data.balance)} 💸\`)**`)
          .setDescription(`👛 You have (\`${data.balance} 💸\`) in your Pocket \n\nTry to reduce the Amount or Get some Money by working, begging, or from your Bank!`)
        );
      client.economy.math(`${message.guild.id}-${user.id}`, "+", amountofbuy, `items.${args[0].toLowerCase()}`)
      client.economy.math(`${message.guild.id}-${user.id}`, "-", endprize, `balance`)
      data = client.economy.get(`${message.guild.id}-${user.id}`)

      return message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setTitle(`<a:yes:833101995723194437> **Successfully bought ${nFormatter(amountofbuy)} ${args[0]} for \`${nFormatter(endprize)} 💸\`**`)
        .setDescription(`👛 You have (\`${nFormatter(data.balance)} 💸\`) in your Pocket \n\n🧸 **You have \`${nFormatter(items)} Items\` with a value of: \`${nFormatter(itemsvalue)} 💸\`**\n\n**To see your Items, type:**\n\`${prefix}items\``)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
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
