const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json")
const ms = require("ms");
const {
    databasing
} = require("../../handlers/functions");
module.exports = {
    name: "giveaway",
    aliases: ["g"],
    category: "🚫 Administration",
    description: "Giveaway manager",
    usage: "giveaway <start/end/reroll/edit/delete/list>",
    run: async (client, message, args, cmduser, text, prefix) => {
        let es = client.settings.get(message.guild.id, "embed")
        let adminroles = client.settings.get(message.guild.id, "adminroles")
        let cmdroles = client.settings.get(message.guild.id, "cmdadminroles.giveaway")
        var cmdrole = []
        if (cmdroles.length > 0) {
            for (const r of cmdroles) {
                if (message.guild.roles.cache.get(r)) {
                    cmdrole.push(` | <@&${r}>`)
                } else if (message.guild.members.cache.get(r)) {
                    cmdrole.push(` | <@${r}>`)
                } else {
                    console.log("F")
                    console.log(r)
                    client.settings.remove(message.guild.id, r, `cmdadminroles.giveaway`)
                }
            }
        }
        if ((message.member.roles.cache.array() && !message.member.roles.cache.some(r => cmdroles.includes(r.id))) && !cmdroles.includes(message.author.id) && (message.member.roles.cache.array() && !message.member.roles.cache.some(r => adminroles.includes(r.id))) && !Array(message.guild.owner.id, config.ownerid).includes(message.author.id) && !message.member.hasPermission("ADMINISTRATOR"))
            return message.channel.send(new MessageEmbed()
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon)
                .setTitle(`You are not allowed to run this Command`)
                .setDescription(`${adminroles.length > 0 ? "You need one of those Roles: " + adminroles.map(role => `<@&${role}>`).join(" | ") + cmdrole.join("")  : `No Admin Roles Setupped yet! Do it with: \`${prefix}setup-admin\``}`)
            );
        if (!args[0]) return message.reply({embed: new Discord.MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle("PLEASE USE A VALID PARAMETER!")
            .setDescription(`\`${prefix}giveaway start\` -- *Starts a giveaway (follow the Steps)*\n\n\`${prefix}giveaway end <Giveaway_Id>\` -- *Ends a Giveaway*\n\n\`${prefix}giveaway edit <Giveaway_Id> <PRIZE>\` -- *Edits a Giveaway's Prize*\n\n\`${prefix}giveaway reroll <Giveaway_Id>\` -- *Rerolls an ended Giveaway*\n\n\`${prefix}giveaway list <server/all>\` -- *Lists all global / Server based Giveaways*`)
        }).catch(e => console.log(e.stack.toString().red))
        var originalowner = message.author.id
        if (args[0].toLowerCase() === "start") {
            const filter = m => {
                return m.author.id == originalowner;
            };

            let giveawayChannel;
            await message.channel.send({
                embed: new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
                .setTitle("In Which Cannel should the Giveaway start?")
                .setDescription(`*Ping it with: \`#Channel\`*`)
            })
            console.log("WAIT FOR COLLECTION")
            try{
                var collected = await message.channel.awaitMessages(m=>m.author.id == originalowner, { max: 1, time: 60e3, errors: ['time'] })
                var channel = collected.first().mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first() || message.guild.channels.cache.get(collected.first().content);
                if(!channel) throw "nomention"
                giveawayChannel = channel;
            }catch (error){
                console.log(error)
                if(error = "nomention") 
                    return message.reply({embed: new Discord.MessageEmbed()
                        .setColor(es.wrongcolor)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle("You did not mention a valid Channel!")
                        .setDescription(`*Cancelled*`)
                    })
                return message.reply({embed: new Discord.MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                    .setTitle("Your Time Ran out!")
                    .setDescription(`*Cancelled*`)
                })
            }


            let giveawayDuration;
            await message.channel.send({
                embed: new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
                .setTitle("For how long should the Giveaway last?")
                .setDescription(`**Example:**\n> \`23h + 30m + 27s\``)
            })
            try{
                var collected = await message.channel.awaitMessages(m=>m.author.id == originalowner, { max: 1, time: 60e3, errors: ['time'] })
                gargs = collected.first().content.split("+");
                giveawayDuration = 0;
                for(const a of gargs){
                    giveawayDuration += ms(a.split(" ").join(""))
                }
                if(!giveawayDuration || isNaN(giveawayDuration)) throw "notime";
            }catch (error){
                console.log(error)
                if(error = "notime") 
                    return message.reply({embed: new Discord.MessageEmbed()
                        .setColor(es.wrongcolor)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle("You did not enter a valid time Format")
                        .setDescription(`*Cancelled*\n**Example:**\n> \`23h 30m 27s\``)
                    })
                return message.reply({embed: new Discord.MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                    .setTitle("Your Time Ran out!")
                    .setDescription(`*Cancelled*`)
                })
            }


            let giveawayNumberWinners;
            await message.channel.send({
                embed: new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
                .setTitle("How Many Winners should the Giveaway have?")
                .setDescription(`**Example:**\n> \`2\``)
            })
            try{
                var collected = await message.channel.awaitMessages(m=>m.author.id == originalowner, { max: 1, time: 60e3, errors: ['time'] })
                giveawayNumberWinners = collected.first().content;
                if(!giveawayNumberWinners || isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) throw "nowinners";
            }catch (error){
                console.log(error)
                if(error = "nowinners") 
                    return message.reply({embed: new Discord.MessageEmbed()
                        .setColor(es.wrongcolor)
                        .setFooter(es.footertext, es.footericon)
                        .setTitle("You did not enter a valid Winners Count")
                        .setDescription(`*Cancelled*\n**Example:**\n> \`2\``)
                    })
                return message.reply({embed: new Discord.MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                    .setTitle("Your Time Ran out!")
                    .setDescription(`*Cancelled*`)
                })
            }

            
            let giveawayPrize;
            await message.channel.send({
                embed: new Discord.MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
                .setTitle("What should be the Giveaway Prize?")
                .setDescription(`**Example:**\n> \`1 x Nitro\``)
            })
            try{
                var collected = await message.channel.awaitMessages(m=>m.author.id == originalowner, { max: 1, time: 60e3, errors: ['time'] })
                giveawayPrize = collected.first().content;
            }catch (error){
                console.log(error)
                return message.reply({embed: new Discord.MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                    .setTitle("Your Time Ran out!")
                    .setDescription(`*Cancelled*`)
                })
            }
            client.giveawaysManager.start(giveawayChannel, {
                time: giveawayDuration,
                prize: `<a:Gift:853993605868683285> ${giveawayPrize} <a:Gift:853993605868683285>`,
                winnerCount: giveawayNumberWinners,
                hostedBy: message.author,
                embedColorEnd: es.wrongcolor,
                embedColor: es.color,
                messages: {
                    giveaway: '🎉 **A GIVEAWAY Started** 🎉',
                    giveawayEnded: '🎉 **The GIVEAWAY Ended** 🎉',
                    timeRemaining: 'Time remaining: **{duration}**!',
                    inviteToParticipate: '*React with 🎉 to participate!*',
                    winMessage: ':tada: **Congratulations,** {winners} :tada:\n\n> You won **{prize}**!\n\n**Jump to it:**\n> {messageURL}',
                    embedFooter: 'Ends at: ',
                    noWinner: 'Giveaway cancelled, no valid participations.',
                    hostedBy: 'Hosted by: {user}',
                    winners: giveawayNumberWinners == 1 ? 'Winner' : "Winners",
                    before_winners: "<:arrow:832598861813776394>",
                    endedAt: 'Ended at',
                    units: {
                        seconds: 'Seconds',
                        minutes: 'Minutes',
                        hours: 'Hours',
                        days: 'Days',
                        pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                    }
                }
            });

            message.reply(`<a:yes:833101995723194437> **Started the Giveaway in:** ${giveawayChannel}!`);
            // And the giveaway has started!
        } else if (args[0].toLowerCase() === "end") {
            args.shift();
            if (!args[0]) {
                return message.channel.send(`<:no:833101993668771842> You have to specify a valid message ID! Usage: \`${prefix}giveaway end <ID>\``);
            }
            let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
                client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

            if (!giveaway) {
                return message.channel.send('Unable to find a giveaway for `' + args.join(' ') + '`.');
            }

            client.giveawaysManager.edit(giveaway.messageID, {
                    setEndTimestamp: Date.now()
                })
                .then(() => {
                    message.channel.send('Giveaway will end in less than ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' seconds...');
                })
                .catch((e) => {
                    if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)) {
                        message.channel.send('This giveaway is already ended!');
                    } else {
                        console.error(e);
                        message.channel.send('An error occured...');
                    }
                });
        } else if (args[0].toLowerCase() === "reroll") {
            args.shift();
            if (!args[0]) {
                return message.channel.send(`<:no:833101993668771842> You have to specify a valid message ID! Usage: \`${prefix}giveaway edit <ID>\``);
            }
            let giveaway =
                client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
                client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
            if (!giveaway) {
                return message.channel.send('Unable to find a giveaway for `' + args.join(' ') + '`.');
            }
            client.giveawaysManager.reroll(giveaway.messageID, { winnerCount: !isNan(args[1]) ? Number(args[1]) : 1})
                .then(() => {
                    message.channel.send('<a:yes:833101995723194437> **Giveaway rerolled!**');
                })
                .catch((e) => {
                    if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)) {
                        message.channel.send('<:no:833101993668771842> **This giveaway is not ended!**');
                    } else {
                        console.error(e);
                        message.channel.send('<:no:833101993668771842> **An error occured...**```' + String(e.message).substr(0, 1900) + "```");
                    }
                });


        } else if (args[0].toLowerCase() === "edit") {
            args.shift();
            let messageID = args[0];
            if (!messageID) {
                return message.channel.send(`<:no:833101993668771842> **You have to specify a valid messageID! Usage: \`${prefix}giveaway edit <ID> <PRIZE>\`**`);
            }
            let giveawayPrize = args.slice(1).join(' ');
            if (!giveawayPrize) {
                return message.channel.send(`<:no:833101993668771842> **You have to specify a valid prize! Usage: \`${prefix}giveaway edit <ID> <PRIZE>\`**`);
            }
            client.giveawaysManager.edit(messageID, {
                newWinnerCount: 3,
                newPrize: giveawayPrize,
                addTime: 5000
            }).then(() => {
                // here, we can calculate the time after which we are sure that the lib will update the giveaway
                const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
                message.channel.send('<a:yes:833101995723194437> <a:yes:833101995723194437> Success! Giveaway will updated in less than ' + numberOfSecondsMax + ' seconds.**');
            }).catch((err) => {
                message.channel.send('<:no:833101993668771842> **No giveaway found for ' + messageID + ', please check and try again**');
            });
        } else if (args[0].toLowerCase() === "delete") {
            args.shift();
            let messageID = args[0];
            if (!messageID) {
                return message.channel.send(`<:no:833101993668771842> Y**ou have to specify a valid messageID! Usage: \`${prefix}giveaway delete <ID>\`**`);
            }
            client.giveawaysManager.delete(messageID).then(() => {
                    message.channel.send('<a:yes:833101995723194437> **Success! Giveaway deleted!**');
                })
                .catch((err) => {
                    message.channel.send('<:no:833101993668771842> **No giveaway found for ' + messageID + ', please check and try again**');
                });
        } else if (args[0].toLowerCase() === "list") {
            args.shift();
            if (!args[0]) return message.reply(`<:no:833101993668771842> **You did not enter a valid Parameter! Usage: \`${prefix}giveaway list <all/server>\`**`)
            if (args[0].toLowerCase() === "server") {
                let onServer = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id && !g.ended);
                let embed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("All not ended Giveaways!")
                buffer = "";
                for (let i = 0; i < onServer.length; i++) {
                    let invite = await client.guilds.cache.get(onServer[i].guildID).channels.cache.first().createInvite();
                    let CH = await client.guilds.cache.get(onServer.guildID).messages.fetch(onServer.messageID);
                    buffer += `**>>** Prize: \`${onServer[i].prize}\` | Duration: \`${ms(new Date() - onServer[0].startAt)}\`\n | [\`JUMP TO IT\`](https://discord.com/channels/${onServer.guildID}/${onServer.channelID}/${onServer.messageID})\n`
                }
                embed.setDescription(buffer ? buffer : "No Giveaways")
                message.channel.send(embed)
            } else {
                let allGiveaways = client.giveawaysManager.giveaways.filter((g) => !g.ended); // [ {Giveaway}, {Giveaway} ]

                let embed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setTitle("All GLOBALLY not ended Giveaways!")
                buffer = "";
                for (let i = 0; i < allGiveaways.length; i++) {
                    try{
                    let invite = await client.guilds.cache.get(allGiveaways[i].guildID).channels.cache.first().createInvite();
                    buffer += `**>>** Guild: [\`${client.guilds.cache.get(allGiveaways[i].guildID).name}\`](${invite}) | Prize: \`${allGiveaways[i].prize}\` | Duration: \`${ms(new Date() - allGiveaways[i].startAt)}\` | [\`JUMP TO IT\`](https://discord.com/channels/${allGiveaways[i].guildID}/${allGiveaways[i].channelID}/${allGiveaways[i].messageID})\n\n`
                }catch{}
                }
                embed.setDescription(buffer ? buffer : "No Giveaways")
                message.channel.send(embed)
            }

        } else {
            return message.reply({embed: new Discord.MessageEmbed()
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon)
                .setTitle("PLEASE USE A VALID PARAMETER!")
                .setDescription(`\`${prefix}giveaway start\` -- *Starts a giveaway (follow the Steps)*\n\n\`${prefix}giveaway end <Giveaway_Id>\` -- *Ends a Giveaway*\n\n\`${prefix}giveaway edit <Giveaway_Id> <PRIZE>\` -- *Edits a Giveaway's Prize*\n\n\`${prefix}giveaway reroll <Giveaway_Id>\` -- *Rerolls an ended Giveaway*\n\n\`${prefix}giveaway list <server/all>\` -- *Lists all global / Server based Giveaways*`)
            }).catch(e => console.log(e.stack.toString().red))
        }

        if(client.settings.get(message.guild.id, `adminlog`) != "no"){
            try{
              var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
              if(!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
              channel.send(new MessageEmbed()
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
                .setAuthor(`${require("path").parse(__filename).name} | ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
                .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
                .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
                .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
                .setTimestamp().setFooter("ID: " + message.author.id)
              )
            }catch (e){
              console.log(e)
            }
          } 
    }
}

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}