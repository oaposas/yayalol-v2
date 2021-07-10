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

//function for playling song
async function song(client, message, args, type) {
  var search = args.join(" ");

    var res;
    var player = client.manager.players.get(message.guild.id);
    if(!player){
      if(!message.member.voice.channel) throw "NOT IN A VC"
      player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: config.settings.selfDeaf,
      });}
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
      if (type.split(":")[1] === "youtube" || type.split(":")[1] === "soundcloud")
        res = await client.manager.search({
          query: search,
          source: type.split(":")[1]
        }, message.author);
      else {
        res = await client.manager.search(search, message.author);
      }
      // Check the load type as this command is not that advanced for basics
      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED") {
        playlist_()
      } else {
        song_()
      }
    } catch (e) {
      console.log(String(e.stack).red)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`<:no:833101993668771842> There was an error while searching:`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
    if (!res.tracks[0])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(String("<:no:833101993668771842> Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
        .setDescription(`Please retry!`)
      );
    
    async function song_() {
     //if the player is not connected, then connect and create things
    if (player.state !== "CONNECTED") {
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      //connect
      player.connect();
      //add track
      player.queue.add(res.tracks[0]);
      //play track
      player.play();
      player.pause(false);
    }
    else if(!player.queue || !player.queue.current){
      //add track
      player.queue.add(res.tracks[0]);
      //play track
      player.play();
      player.pause(false);
    }
    else {
      //add the latest track
      player.queue.add(res.tracks[0]);
      //send track information
      var playembed = new MessageEmbed()
        .setTitle(`Added to Queue 🩸 **\`${res.tracks[0].title}`.substr(0, 256 - 3) + "`**")
        .setURL(res.tracks[0].uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
        .addField("⌛ Duration: ", `\`${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration)}\``, true)
        .addField("💯 Song By: ", `\`${res.tracks[0].author}\``, true)
        .addField("🔂 Queue length: ", `\`${player.queue.length} Songs\``, true)
        .setFooter(`Requested by: ${res.tracks[0].requester.tag}`, res.tracks[0].requester.displayAvatarURL({
          dynamic: true
        }))
      return message.channel.send(playembed).then(msg => {
        if (msg) msg.delete({
          timeout: 4000
        }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
      });
    }
    }
    //function ffor playist
    async function playlist_() {
      if (!res.tracks[0])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(String("<:no:833101993668771842> Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
        .setDescription(`Please retry!`)
      );
    //if the player is not connected, then connect and create things
    if (player.state !== "CONNECTED") {
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      //add track
      player.queue.add(res.tracks);
      //play track
      player.play();
      player.pause(false);

    }
    else if(!player.queue || !player.queue.current){
      //add track
      player.queue.add(res.tracks);
      //play track
      player.play();
      player.pause(false);

    }
    else {
      //add the tracks
      player.queue.add(res.tracks);

    }
    //send information
    var playlistembed = new MessageEmbed()
        .setTitle(`Added Playlist 🩸 **\`${res.playlist.name}`.substr(0, 256 - 3) + "`**")
        .setURL(res.playlist.uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
        .addField("⌛ Duration: ", `\`${format(res.playlist.duration)}\``, true)
        .addField("🔂 Queue length: ", `\`${player.queue.length} Songs\``, true)
        .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({
          dynamic: true
        }))
      message.channel.send(playlistembed).then(msg => {
        if (msg) msg.delete({
          timeout: 4000
        }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
      });
    }

}

module.exports = song;

/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
