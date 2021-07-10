//import the config.json file
const config = require("../botconfig/config.json")
var ee = require(`../botconfig/embed.json`);
var emoji = require(`../botconfig/emojis.json`);
var {
    MessageEmbed, MessageAttachment
} = require(`discord.js`);
const { databasing } = require("./functions")
module.exports = client => {
  
    client.on("message", async message => {
        try{
            if (!message.guild || !message.channel || message.author.bot) return;
            client.settings.ensure(message.guild.id, {
                counter: "no",
                counternum: 0,
                counterauthor: ""
            });
            let counter = client.settings.get(message.guild.id, "counter");
            let counterauthor = client.settings.get(message.guild.id, "counterauthor");
            let counternum = client.settings.get(message.guild.id, "counternum");
            if(!counter || counter == "no") return;
            if(message.channel.id == counter){
              if (!message.author.bot && message.author.id === counterauthor) {
                message.delete().catch(e=> console.log("counter: " + e));
                message.reply("Please wait for **your** turn").then(m => m.delete({timeout: 3000}).catch(e=>console.log("counter: " + e)));
                return;
              }
              
              if (!message.author.bot && isNaN(message.content) || !message.author.bot && !message.content) {
                message.delete().catch(e=> console.log("counter: " + e));
                message.reply("Messages in this channel must be a **number**").then(m => m.delete({timeout: 3000}).catch(e=>console.log("counter: " + e)));
                return;
              }
              if (!message.author.bot && parseInt(message.content) !== counternum + 1) {
                message.delete().catch(e=> console.log("counter: " + e));
                message.reply(`Next number must be \`${counternum + 1}\``).then(m => m.delete({timeout: 3000}).catch(e=>console.log("counter: " + e)));
                return;
              }
              try{
                if((counternum+1) % 100 === 0){
                message.channel.setTopic(`Current number-Range: **${counternum+1} - ${counternum+100}**`).catch(e=>console.log("counter: " + e))}
              }catch (e){
                console.log("counter: " + e)
              }
              if((counternum+1) % 5 === 0)
                message.react("833101995723194437")
              client.settings.set(message.guild.id, counternum + 1, "counternum");
              client.settings.set(message.guild.id, message.author.id , "counterauthor");
            }
        }catch{}
    })

}