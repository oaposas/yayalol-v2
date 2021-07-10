const weather = require("weather-js");
const {
    Client,
    Collection,
    MessageEmbed
} = require(`discord.js`);
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const path = require("path");
module.exports = {
    name: path.parse(__filename).name,
    category: "🕹️ Fun",
    useage: `${path.parse(__filename).name}<C/F><Location>`,
    description: "*Image cmd in the style:* " + path.parse(__filename).name,
    run: async (client, message, args, cmduser, text, prefix) => {
        let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "FUN")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
        let degree;
        if (!args[0]) return message.channel.send(`Wrong Format try:\`${config.prefix}weather<C/F><Location>\``);
        if (args[0].toLowerCase() === "c" || args[0].toLowerCase() === "f") {
            degree = args[0].toUpperCase();
        } else {
            return message.channel.send("Enter a valid degree type (C | F).");
        }
        if (!args[1]) return message.channel.send("Enter a location to search for.");
        weather.find({
            search: args[1],
            degreeType: degree
        }, function (e, result) {
            if (e) return console.log(String(e.stack).red);
            try {
                let embed = new MessageEmbed()
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setFooter(es.footertext, es.footericon)
                    .setTitle(`Weather`)
                    .setThumbnail(result[0].current.imageUrl)
                    .setDescription(`Showing weather data for ${result[0].location.name}`)
                    .addField("**Temp:**", `${result[0].current.temperature}°${result[0].location.degreetype}`, true)
                    .addField("**Weather:**", `${result[0].current.skytext}`, true)
                    .addField("**Day:**", `${result[0].current.shortday}`, true)
                    .addField("**Feels like:**", `${result[0].current.feelslike}°${result[0].location.degreetype}`, true)
                    .addField("**Humidity:**", `${result[0].current.humidity}%`, true)
                    .addField("**Wind:**", `${result[0].current.winddisplay}`, true);
                message.channel.send(embed);
            } catch (e) {
                console.log(String(e.stack).bgRed)
                return message.channel.send(new MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                    .setTitle(`<:no:833101993668771842> An error occurred`)
                    .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                );
            }
        });
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
