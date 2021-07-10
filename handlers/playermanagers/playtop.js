
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

module.exports = playtop;
async function playtop(client, message, args, type) {
  const search = args.join(" ");
  let res;
      res = await client.manager.search({
        query: search,
        source: type.split(":")[1]
      }, message.author);
    // Check the load type as this command is not that advanced for basics
    if (res.loadType === "LOAD_FAILED") throw res.exception;
    else if (res.loadType === "PLAYLIST_LOADED") {
      playlist_()
    } else {
      song_()
    }
  async function song_() {
    //if no tracks found return info msg
    if (!res.tracks[0]){
      return message.channel.send(`**<:no:833101993668771842> Found nothing for: \`${search}\`**`);
    }
    //if track is too long return info msg
    if(res.tracks[0].duration > 3 * 60 * 60 * 1000){
      return message.channel.send(`**<:no:833101993668771842> Cannot play a song that's longer than 3 hours**`)
    }
    //create a player if not created
    let player;
    player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: false,
    });
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
    //otherwise
    else {
     //save old tracks on an var
      let oldQueue =[]
      for(const track of player.queue)
        oldQueue.push(track);
      //clear queue
      player.queue.clear();
      //add new tracks
      player.queue.add(res.tracks[0]);
      //now add every old song again
      for (const track of oldQueue)
        player.queue.add(track);
      }
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
  //function ffor playist
  async function playlist_() {
    if (!res.tracks[0]){
      return message.channel.send(`**<:no:833101993668771842> Found nothing for: \`${search}\`**`);
    }
    for(const track of res.tracks)
      if(track.duration > 3 * 60 * 60 * 1000){
        return message.channel.send(`**<:no:833101993668771842> Cannot play a song that's longer than 3 hours --> playlist skipped!**`)
      }
    let player;
    player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: false,
    });
    //if the player is not connected, then connect and create things
    if (state !== "CONNECTED") {
      //add track
      player.queue.add(res.tracks);
      //play track
      player.play();
    }
    else if(!player.queue || !player.queue.current){
      //add track
      player.queue.add(res.tracks);
      //play track
      player.play();
    }else{
      //save old tracks on an var
      let oldQueue =[]
      for(const track of player.queue)
        oldQueue.push(track);
      //clear queue
      player.queue.clear();
      //add new tracks
      player.queue.add(res.tracks);
      //now add every old song again
      for (const track of oldQueue)
        player.queue.add(track);
    }
    var time = 0;
      let playlistembed = new Discord.MessageEmbed()

        .setAuthor(`Playlist added to Queue`, message.author.displayAvatarURL({dynamic:true}), "https://milrato.eu" )
        .setColor(ee.color)
        .setTitle("**"+res.playlist.name+"**")
        .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
          //timing for estimated time creation
          if(player.queue.size > 0) player.queue.map((track) => time += track.duration)
          time += player.queue.current.duration - player.position;
          for(const track of res.tracks)
            time -= track.duration;
  
          playlistembed.addField("Estimated time until playing", time > 10 ? format(time).split(" | ")[0] : "NOW")
          .addField("Position in queue", `${player.queue.length - res.tracks.length + 1 === 0 ? "NOW" : player.queue.length - res.tracks.length + 1}`, true)
          .addField("Enqueued", `\`${res.tracks.length}\``, true)
          setTimeout(()=>{
            //if bot allowed to send embed, do it otherwise pure txt msg
            if(message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS"))
              message.channel.send(playlistembed);
            else
              message.channel.send(`Added: \`${res.tracks[0].title}\` - to the Queue\n**Channel:** ${res.tracks[0].author}\n**Song Duration:** ${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration).split(" | ")[0]}\n**Estimated time until playing:** ${time}\n**Position in queue:** ${player.queue.length}\n${res.tracks[0].uri}`);
          }, 500)
  }
}