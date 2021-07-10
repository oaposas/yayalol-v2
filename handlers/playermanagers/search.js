var {
  MessageEmbed
} = require("discord.js")
var ee = require("../../botconfig/embed.json")
var config = require("../../botconfig/config.json")
var {
  format,
  delay,
  arrayMove
} = require("../functions")

//function for searching songs
async function search(client, message, args, type) {
  var search = args.join(" ");
  try {
    var res;
    var player = client.manager.players.get(message.guild.id);
    if(!player)
      player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: config.settings.selfDeaf,
      });
    let state = player.state;
    if (state !== "CONNECTED") { 
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      player.stop();
    }
    try {
      // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
      res = await client.manager.search({
        query: search,
        source: type.split(":")[1]
      }, message.author);
      // Check the load type as this command is not that advanced for basics
      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED") throw {
        message: "Playlists are not supported with this command. Use   ?playlist  "
      };
    } catch (e) {
      console.log(String(e.stack).red)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`<:no:833101993668771842> There was an error while searching:`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }


    var max = 10,
      collected, filter = (r, u) => u.id === message.author.id;
    if (res.tracks.length < max) max = res.tracks.length;
    track = res.tracks[0]

    var results = res.tracks
      .slice(0, max)
      .map((track, index) => `**${++index})** [\`${String(track.title).substr(0, 60).split("[").join("{").split("]").join("}")}\`](${track.uri}) - \`${format(track.duration).split(" | ")[0]}\``)
      .join('\n');

    let toreact = await message.channel.send(new MessageEmbed()
      .setTitle(`Search result for: 🔎 **\`${search}`.substr(0, 256 - 3) + "`**")
      .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      .setDescription(results)
      .setFooter(`Search-Request by: ${track.requester.tag}`, track.requester.displayAvatarURL({
        dynamic: true
      }))
    )
    const emojiarray = ["❌", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]
    for(let i = 0; i < emojiarray.length; i++){
      try{
        if(i == max+1) break;
        toreact.react(emojiarray[i])
      }catch{}
    }

    try {
      collected = await toreact.awaitReactions(filter, {
        max: 1,
        time: 30e3,
        errors: ['time']
      });
    } catch (e) {
      if (!player.queue.current) player.destroy();
      toreact.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
      return message.channel.send(new MessageEmbed()
        .setTitle("<:no:833101993668771842> You didn't provide a selection")
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
      );
    }
    var first = collected.first().emoji.name;
    if (first=== '❌') {
      if (!player.queue.current) player.destroy();
      toreact.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle('<:no:833101993668771842> Cancelled selection.')
      );
    }
    const emojis = {
      "1️⃣": "1",
      "2️⃣": "2",
      "3️⃣": "3",
      "4️⃣": "4",
      "5️⃣": "5",
      "6️⃣": "6",
      "7️⃣": "7",
      "8️⃣": "8",
      "9️⃣": "9",
      "🔟": "10",
    }
    toreact.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
    var index = Number(emojis[first]) - 1;
    if (index < 0 || index > max - 1)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`<:no:833101993668771842> The number you provided too small or too big (1-${max}).`)
      );
    track = res.tracks[index];
    if (!res.tracks[0])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(String("<:no:833101993668771842> Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
        .setDescription(`Please retry!`)
      );
    if (player.state !== "CONNECTED") {
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      //add track
      player.queue.add(track);
      //set the variables
      //play track
      player.play();
      player.pause(false);
    } 
    else if(!player.queue || !player.queue.current){
      //add track
      player.queue.add(track);
      //play track
      player.play();
      player.pause(false);
    }
    else {
      player.queue.add(track);
      var embed3 = new MessageEmbed()
        .setTitle(`Added to Queue 🩸 **\`${track.title}`.substr(0, 256 - 3) + "`**")
        .setURL(track.uri)
        .setColor(ee.color)
        .setThumbnail(track.displayThumbnail(1))
        .addField("⌛ Duration: ", `\`${track.isStream ? "LIVE STREAM" : format(track.duration)}\``, true)
        .addField("💯 Song By: ", `\`${track.author}\``, true)
        .addField("🔂 Queue length: ", `\`${player.queue.length} Songs\``, true)
        .setFooter(`Requested by: ${track.requester.tag}`, track.requester.displayAvatarURL({
          dynamic: true
        }))
      return message.channel.send(embed3).then(msg => {
          if(msg) msg.delete({
            timeout: 4000
          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
      });
    }

  } catch (e) {
    console.log(String(e.stack).red)
    message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(String("<:no:833101993668771842> Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
    )
  }
}

module.exports = search;
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
