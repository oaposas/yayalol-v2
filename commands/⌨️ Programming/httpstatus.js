//Here the command starts
const config = require("../../botconfig/config.json")
var ee = require("../../botconfig/embed.json")
const fetch = require("node-fetch");
const { STATUS_CODES } = require("http");
const { MessageEmbed } = require(`discord.js`);
module.exports = {
	//definition
	name: "httpstatus", //the name of the command 
	category: "⌨️ Programming", //the category this will be listed at, for the help cmd
	aliases: [""], //every parameter can be an alias
	cooldown: 4, //this will set it to a 4 second cooldown
	usage: "httpstatus <status>", //this is for the help command for EACH cmd
  	description: "Show httpstatus with a meme.", //the description of the command

	//running the command with the parameters: client, message, args, user, text, prefix
  	run: async (client, message, args, user, text, prefix) => {
		let es = client.settings.get(message.guild.id, "embed")
		try {
			const status = args[0];
			if (!repo)
				return message.channel.send({embed: new MessageEmbed()
					.setColor(es.wrongcolor)
					.setFooter(es.footertext, es.footericon)
					.setTitle(`<:no:833101993668771842> You didn't provide a Status`)
					.setDescription(`Usage: \`${prefix}httpstatus <status>\``)
				});
			// 599 isn't standard i think, not in Node.js but it's on http.cat so let's handle it.
			if(status !== "599" && !STATUS_CODES[status]) return message.channel.send("Baka! That's an invalid http status code.");
			return message.channel.send({embed: new MessageEmbed
			  .setTitle("HTTP Cat")
			  .setImage(`https://http.cat/${status}.jpg`)
			  .setDescription(status === "599" ? "Network Connect Timeout Error" : STATUS_CODES[status])
			  .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))});
		} catch (e) {
			console.log(String(e.stack).bgRed)
			return message.channel.send(new MessageEmbed()
			  .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
			  .setTitle(`<:no:833101993668771842> An error occurred`)
			  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
			);
		  }
	
	}
}
//-CODED-BY-TOMATO#6966-//