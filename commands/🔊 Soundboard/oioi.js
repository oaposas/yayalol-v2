const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const path = require('path');
const checkifalreadyplaying = new Discord.Collection();
module.exports = {
    name: "oioi",
    description: "Plays a soundeffect",
	category: "🔊 Soundboard",
	cooldown: 5,
	usage: "oioi",
	run: async (client, message, args, cmduser, text, prefix) => {
	  let es = client.settings.get(message.guild.id, "embed")
	  if(!client.settings.get(message.guild.id, "SOUNDBOARD")){
		return message.channel.send(new MessageEmbed()
		  .setColor(es.wrongcolor)
		  .setFooter(es.footertext, es.footericon)
		  .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
		  .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
		);
	  }
	  const channel = message.member.voice.channel;
	  const botchannel = message.guild.me.voice.channel;
	  if(!channel) 
		  return message.channel.send(new MessageEmbed()
		  .setColor(es.wrongcolor)
		  .setFooter(es.footertext, es.footericon)
		  .setTitle(`<:no:833101993668771842> You need to join a voice channel`)
		  );
	  if(botchannel)
		  return message.channel.send(new MessageEmbed()
		  .setColor(es.wrongcolor)
		  .setFooter(es.footertext, es.footericon)
		  .setTitle(`<:no:833101993668771842> I am already connected in \`${botchannel.name}\``)
	  );
	  const e = await message.react('🎙️').catch(()=>{})
	channel.join().then(async connection => {
		const dispatcher = connection.play(path.join(__dirname + '/audio/oioi.mp3'));

		dispatcher.on('speaking', speaking => {
			if(!speaking) {
        channel.leave();
        e.remove()
            }
		});
	}).catch(err => console.log(err));
}
}