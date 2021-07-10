var CronJob = require('cron').CronJob;
const { delay } = require("../handlers/functions")
module.exports = function (client, options) {
    
  //Loop through every setupped guild every 10 Minutes and call membercount
  client.Jobmembercount = new CronJob('30 */10 * * * *', async function() {
    //get all guilds which are setupped
    var guilds = client.setups.filter(v => v?.membercount?.enabled && (v?.membercount?.channel1?.length == 18 || v?.membercount?.channel2?.length == 18 || v?.membercount?.channel3?.length == 18)).keyArray();
    console.log(JSON.stringify(guilds).italic.yellow + " MEMBERCOUNTER ALL GUILDS")
    //Loop through all guilds and send a random auto-generated-nsfw setup
    for(const guildid of guilds){
        memberCount(guildid)
        await delay(1000);
    }
  }, null, true, 'America/Los_Angeles');

  client.on("ready", () => {
    client.Jobmembercount.start();
  })


  async function memberCount(guildid){
    //ensure the database
    client.setups.ensure(guildid,  {
      enabled: false,
      channel1: "no",
      message1: "🗣 Members: {member}",
      channel2: "no",
      message2: "🗣 Bots: {bot}",
      channel3: "",
      message3: "🗣 All Users: {user}"
    },"membercount");
    //get the Guild
    var guild = client.guilds.cache.get(guildid)
    //if no guild, return
    if(!guild) return;
    //get all guilds
    await guild.members.fetch();
    //get the settings 
    let set = client.setups.get(guild.id, "membercount");
    //If no settings found, or defined on "no" return
    if(!set || !set.enabled) return
    if(set.channel1.length == 18) Channel1();
    if(set.channel1.length == 18) await delay(1000 * 60 * 2)
    if(set.channel2.length == 18) Channel2();
    if(set.channel2.length == 18) await delay(1000 * 60 * 2)
    if(set.channel3.length == 18) Channel3();
    async function Channel1(){
      console.log(`MemberCount - Channel1 - ${guild.name}`.italic.yellow)
      //define a variable for the channel
      var channel;
      //try to fetch the channel if no channel found throw error and return
      try{
          channel = await client.channels.fetch(set.channel1)
          if(!channel || channel == null || channel == undefined || !channel.name || channel.name == null || channel.name == undefined) throw "Channel not found"
      
          channel.setName(String(set.message1)
            .replace(/{user}/i, guild.memberCount)
            .replace(/{member}/i, guild.members.cache.filter(member => !member.user.bot).size)
            .replace(/{bot}/i, guild.members.cache.filter(member => member.user.bot).size)
            .replace(/{users}/i, guild.memberCount)
            .replace(/{members}/i, guild.members.cache.filter(member => !member.user.bot).size)
            .replace(/{bots}/i, guild.members.cache.filter(member => member.user.bot).size)
          )
      }catch (e){
      }
    }
    async function Channel2(){
      console.log(`MemberCount - Channel2 - ${guild.name}`.italic.yellow)
      //define a variable for the channel
      var channel;
      //try to fetch the channel if no channel found throw error and return
      try{
          channel = await client.channels.fetch(set.channel2)
          if(!channel || channel == null || channel == undefined || !channel.name || channel.name == null || channel.name == undefined) throw "Channel not found"
      
          channel.setName(String(set.message2)
            .replace(/{user}/i, guild.memberCount)
            .replace(/{member}/i, guild.members.cache.filter(member => !member.user.bot).size)
            .replace(/{bot}/i, guild.members.cache.filter(member => member.user.bot).size)
            .replace(/{users}/i, guild.memberCount)
            .replace(/{members}/i, guild.members.cache.filter(member => !member.user.bot).size)
            .replace(/{bots}/i, guild.members.cache.filter(member => member.user.bot).size)
          )
      }catch (e){
      }
    }
    async function Channel3(){
      console.log(`MemberCount - Channel3 - ${guild.name}`.italic.yellow)
      //define a variable for the channel
      var channel;
      //try to fetch the channel if no channel found throw error and return
      try{
          channel = await client.channels.fetch(set.channel3)
          if(!channel || channel == null || channel == undefined || !channel.name || channel.name == null || channel.name == undefined) throw "Channel not found"
      
          channel.setName(String(set.message3)
            .replace(/{user}/i, guild.memberCount)
            .replace(/{member}/i, guild.members.cache.filter(member => !member.user.bot).size)
            .replace(/{bot}/i, guild.members.cache.filter(member => member.user.bot).size)
            .replace(/{users}/i, guild.memberCount)
            .replace(/{members}/i, guild.members.cache.filter(member => !member.user.bot).size)
            .replace(/{bots}/i, guild.members.cache.filter(member => member.user.bot).size)
          )
      }catch (e){

      }
    }
  }
}
