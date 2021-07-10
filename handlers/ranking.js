const config = require("../botconfig/config.json")
const canvacord = require("canvacord");
const Discord = require("discord.js");
const Canvas = require("canvas");
Canvas.registerFont('Genta.ttf', {
  family: 'Genta'
})
Canvas.registerFont("UbuntuMono.ttf", {
    family: "UbuntuMono"
})
const { GetUser } = require("./functions")

module.exports = function (client) {
    //log that the module is loaded
    client.on("message", async (message) => {
     try{

        if (message.author.bot || !message.guild) return;

        client.setups.ensure(message.guild.id,  {
            ranking: {
                enabled: true,
                backgroundimage: "null",
            }
        });
        client.settings.ensure(message.guild.id, {
            embed: {
            "color": ee.color,
            "thumb": true,
            "wrongcolor": ee.wrongcolor,
            "footertext": client.guilds.cache.get(message.guild.id) ? client.guilds.cache.get(message.guild.id).name : ee.footertext,
            "footericon": client.guilds.cache.get(message.guild.id) ? client.guilds.cache.get(message.guild.id).iconURL({
              dynamic: true
            }) : ee.footericon,
          }
        })
        let guildsettings = client.settings.get(message.guild.id);
        const prefix = guildsettings.prefix
        const embedcolor = guildsettings.embed.color || "#fffff9";
        
        let ranking = client.setups.get(message.guild.id, "ranking");

        if(!ranking.enabled) return;
        const key = `${message.guild.id}-${message.author.id}`;

        function databasing(rankuser) {
            //if(rankuser && rankuser.bot) return console.log("GOTTA IGNORE BOT")
            client.points.ensure(rankuser ? `${message.guild.id}-${rankuser.id}` : `${message.guild.id}-${message.author.id}`, {
                user: rankuser ? rankuser.id : message.author.id,
                usertag: rankuser ? rankuser.tag : message.author.tag,
                xpcounter: 1,
                guild: message.guild.id,
                points: 0,
                neededpoints: 400,
                level: 1,
                oldmessage: "",
            });
            client.points.set(rankuser ? `${message.guild.id}-${rankuser.id}` : `${message.guild.id}-${message.author.id}`, rankuser ? rankuser.tag : message.author.tag, `usertag`); //set the usertag with EVERY message, if he has nitro his tag might change ;)
            client.points.ensure(message.guild.id, {setglobalxpcounter: 1}); 
            client.points.ensure(message.guild.id, {
                channel: false,
                disabled: false
            })

            }
        databasing(message.author);

     
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();


       
        if (message.content.startsWith(prefix)) {

            switch (command) {
                case `rank`:
                    let user = await GetUser(message, args[0])
                    rank(user);
                    break;
                    /////////////////////////////////
                case `leaderboard`:
                case `lb`:
                case `top`:
                    if(args[0]){
                        if(args[0].toLowerCase() === "all"){
                            leaderboard();
                        } else{
                            newleaderboard();
                        }
                    } else
                    newleaderboard();
                    break;
                    /////////////////////////////////
                case `setxpcounter`: 
                if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")
                    setxpcounter();
                break; 
                    /////////////////////////////////
                case `setglobalxpcounter`: 
                if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")
                    setglobalxpcounter();
                break; 
                    /////////////////////////////////
                case `addpoints`:
                    if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")
                    addpoints();
                    break;
                    /////////////////////////////////
                case `setpoints`:
                    if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

                    setpoints();
                    break;
                    /////////////////////////////////
                case `removepoints`:
                    if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

                    removepoints();
                    break;
                    /////////////////////////////////
                case `addlevel`:
                    if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

                    addlevel();
                    break;
                    /////////////////////////////////
                case `setlevel`:
                    if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

                    setlevel();
                    break;
                    /////////////////////////////////
                case `removelevel`:
                    if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

                    removelevel();
                    break;
                    /////////////////////////////////
                case `resetranking`:
                    if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

                    resetranking();
                    break;
                    /////////////////////////////////
                case `registerall`:
                    if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

                    registerall();
                    break;
                    /////////////////////////////////
                case `addrandomall`:
                    if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

                    addrandomall();
                    break;
                    /////////////////////////////////
                case `resetrankingall`:
                    if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

                    resetrankingall()
                    break;
                    /////////////////////////////////
                case `levelhelp`:
                case `rankinghelp`:
                case `levelinghelp`:
                case `rankhelp`:
                    levelinghelp();
                    break;
                    /////////////////////////////////
                default:
                    //message.reply(`UNKNOWN COMMAND! Try: \`${prefix}levelinghelp\``)
                    break;
            }
            return;
        }


        function anti_double_messages() {
            const oldmessage = client.points.get(key, `oldmessage`);
            if (oldmessage.toLowerCase() === message.content.toLowerCase().replace(/\s+/g, '')) {
                return;
            }
            client.points.set(key, message.content.toLowerCase().replace(/\s+/g, ''), `oldmessage`); //setting the new old message
        }
        anti_double_messages();

        function Giving_Ranking_Points(thekey, maxnumber) {
            if(!thekey && message.author.bot) return;
            let setglobalxpcounter = client.points.get(message.guild.id, "setglobalxpcounter")
            if (!maxnumber) maxnumber = 5;
            var randomnum = ( Math.floor(Math.random() * Number(maxnumber)) + 1 ) * setglobalxpcounter;
            randomnum *= Number(client.points.get(key, `xpcounter`));
            randomnum = Number(Math.floor(randomnum));

            const curPoints = client.points.get(thekey ? thekey : key, `points`);
            const neededPoints = client.points.get(thekey ? thekey : key, `neededpoints`);
            let leftpoints = neededPoints - curPoints;

            let toaddpoints = randomnum;
            addingpoints(toaddpoints, leftpoints);

            function addingpoints(toaddpoints, leftpoints) {
                if (toaddpoints >= leftpoints) {
                    client.points.set(thekey ? thekey : key, 0, `points`); //set points to 0
                    client.points.inc(thekey ? thekey : key, `level`); //add 1 to level
                    //HARDING UP!
                    const newLevel = client.points.get(thekey ? thekey : key, `level`); //get current NEW level
                    if (newLevel % 4 === 0) client.points.math(thekey ? thekey : key, `+`, 100, `neededpoints`)

                    const newneededPoints = client.points.get(thekey ? thekey : key, `neededpoints`); //get NEW needed Points
                    const newPoints = client.points.get(thekey ? thekey : key, `points`); //get current NEW points

                    addingpoints(toaddpoints - leftpoints, newneededPoints); //Ofc there is still points left to add so... lets do it!
                    LEVELUP() 
                } else {
                    client.points.math(thekey ? thekey : key, `+`, Number(toaddpoints), `points`)
                }
            }
        }
        Giving_Ranking_Points();

                
        async function LEVELUP() {
            const newLevel = client.points.get(key, `level`); //get current NEW level
            const newPoints = client.points.get(key, `points`); //get current NEW points
            const newneededPoints = client.points.get(key, `neededpoints`);
            //send ping and embed message
            if(client.points.get(message.guild.id, "disabled")) return;

            const filtered = client.points.filter(p => p.guild === message.guild.id).array();
            const sorted = filtered.sort((a, b) => b.level - a.level || b.points - a.points);
            const top10 = sorted.splice(0, message.guild.memberCount);

            let i = 0;
            //count server rank sometimes an error comes
            for (const data of top10) {
                try {
                    i++;
                    if (data.user === message.author.id) break; //if its the right one then break it ;)
                } catch {
                    i = `X`;
                    break;
                }
            }

            const canvas = Canvas.createCanvas(1802, 430);
            
            const ctx = canvas.getContext('2d');
            ctx.font = '100px UbuntuMono';
            ctx.fillStyle = "#2697FF";


            const bgimg = await Canvas.loadImage("./assets/levelup.png");
            ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);


            //USERNAME
            var text = `${message.author.username}`.trim();
            if (text.length > 15) text = text.substr(0, 11) + ".."
            text += ` leveled up!`
            await canvacord.Util.renderEmoji(ctx, text, 475, 150);
            ctx.font = '80px UbuntuMono';
            await canvacord.Util.renderEmoji(ctx, `New Level: ${newLevel}`, 475, 290);
            await canvacord.Util.renderEmoji(ctx, ` New Rank: #${i}`, 475, 380);
            

            //AVATAR
            ctx.beginPath();
            ctx.arc(345/2 + 83.5, 345/2 + 36, 345/2, 0, Math.PI * 2, true); 
            ctx.closePath();
            ctx.clip();
            const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ dynamic: false, format: 'png', size: 512 }));
            ctx.drawImage(avatar, 83.5, 36, 345, 345);

            //get it as a discord attachment
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ranking-image.png');

            if(!client.points.get(message.guild.id, "channel")) return message.channel.send(message.author, attachment);
            try{
                let channel = message.guild.channels.cache.get(client.points.get(message.guild.id, "channel"))
                channel.send(message.author, attachment);

            }catch (e){ console.log(e)
                message.channel.send(message.author, attachment);
            }
        }

        async function rank(the_rankuser) {
            /**
             * GET the Rank User
             * @info you can tag him
             */
            try {
                let rankuser = the_rankuser || message.author;
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");

                let tempmessage = await message.channel.send(`Getting the Rank-Data of: **${rankuser.tag}** ...`)
                // if(rankuser.bot) return message.reply("NO BOTS!");
                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);
                //do some databasing
                const filtered = client.points.filter(p => p.guild === message.guild.id).array();
                const sorted = filtered.sort((a, b) => b.level - a.level || b.points - a.points);
                const top10 = sorted.splice(0, message.guild.memberCount);
                let i = 0;
                //count server rank sometimes an error comes
                for (const data of top10) {
                    try {
                        i++;
                        if (data.user === rankuser.id) break; //if its the right one then break it ;)
                    } catch {
                        i = `X`;
                        break;
                    }
                }
                let j = 0;
                //count server rank sometimes an error comes
                   
                let curpoints = Number(client.points.get(key, `points`).toFixed(2));
                let curnextlevel = Number(client.points.get(key, `neededpoints`).toFixed(2));
                if (client.points.get(key, `level`) === undefined) i = `No Rank`;

               
                var xp_data = {
                    avatar: rankuser.displayAvatarURL({ dynamic: false, format: 'png', size: 512 }),
                    text: {
                        cur_level: Number(client.points.get(key, `level`)),
                        rank: Number(i),
                        current: Number(curpoints.toFixed(2)),
                        needed: Number(curnextlevel.toFixed(2)),
                        percent: Number(curpoints.toFixed(2)) / Number(curnextlevel.toFixed(2)) * 100,
                    },
                }










                const canvas = Canvas.createCanvas(1772, 900);
                
                const ctx = canvas.getContext('2d');
                ctx.font = '150px UbuntuMono';
                ctx.fillStyle = "#2697FF";


                const bgimg = await Canvas.loadImage("./assets/rankcard.png");
                ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);


                //USERNAME
                var text = `${rankuser.username}`.trim();
                if (text.length > 15) text = text.substr(0, 11) + ".."
                await canvacord.Util.renderEmoji(ctx, text, 645, 300);

                //Discrimnator
                var text = `#${rankuser.discriminator}`.trim();
                await canvacord.Util.renderEmoji(ctx, text, 645, 475);

                ctx.font = '100px UbuntuMono';
                ctx.fillStyle = "#6caae7"
                    
                //CHAT TEXT: 
                var text4 = `Level ${xp_data.text.cur_level}`.trim();
                await canvacord.Util.renderEmoji(ctx, text4, 255, 715);
                var text5 = `Rank #${xp_data.text.rank}`.trim();
                await canvacord.Util.renderEmoji(ctx, text5, 1230, 715);


                ctx.font = '50px UbuntuMono';
                ctx.fillStyle = "#9b9b9b"
                ctx.textAlign = "right"
              
                //CHAT TEXT: 
                var text7 = `${shortenLargeNumber(String(xp_data.text.current), 3)}/${shortenLargeNumber(String(xp_data.text.needed), 2)}`
                await canvacord.Util.renderEmoji(ctx, text7, 1625, 840);


                
                ctx.fillStyle = "#2186e7"



                //progressbar TEXT
                var diagonal = 0;
                if(xp_data.text.percent > 0) diagonal += 1;
                if(xp_data.text.percent > 1) diagonal += 1;
                if(xp_data.text.percent > 2) diagonal += 1;
                if(xp_data.text.percent > 3) diagonal += 1;
                if(xp_data.text.percent > 4) diagonal += 1;
                if(xp_data.text.percent > 5) diagonal += 1;
                if(xp_data.text.percent > 6) diagonal += 1;
                if(xp_data.text.percent > 7) diagonal += 1;
                if(xp_data.text.percent > 8) diagonal += 1;
                if(xp_data.text.percent > 9) diagonal += 1;
                if(xp_data.text.percent > 10) diagonal += 1;
                if(xp_data.text.percent > 11) diagonal += 1;
                if(xp_data.text.percent > 12) diagonal += 1;
                if(xp_data.text.percent > 13) diagonal += 1;
                if(xp_data.text.percent > 14) diagonal += 1;
                if(xp_data.text.percent > 15) diagonal += 1;

                if(xp_data.text.percent > 84) diagonal -= 1;
                if(xp_data.text.percent > 85) diagonal -= 1;
                if(xp_data.text.percent > 86) diagonal -= 1;
                if(xp_data.text.percent > 87) diagonal -= 1;
                if(xp_data.text.percent > 88) diagonal -= 1;
                if(xp_data.text.percent > 89) diagonal -= 1;
                if(xp_data.text.percent > 90) diagonal -= 1;
                if(xp_data.text.percent > 91) diagonal -= 1;
                if(xp_data.text.percent > 92) diagonal -= 1;
                if(xp_data.text.percent > 93) diagonal -= 1;
                if(xp_data.text.percent > 94) diagonal -= 1;
                if(xp_data.text.percent > 95) diagonal -= 1;
                if(xp_data.text.percent > 96) diagonal -= 1;
                if(xp_data.text.percent > 97) diagonal -= 1;
                if(xp_data.text.percent > 98) diagonal -= 1;
                if(xp_data.text.percent > 99) diagonal -= 1;
                var bar_text_length = 1465;
                var bar_text_height = 40;
                ctx.save()
                ctx.beginPath();
                ctx.moveTo(163.5, 757 );
                ctx.lineTo(163.5 + bar_text_length * xp_data.text.percent / 100, 757);
                ctx.lineTo(163.5 + bar_text_length * xp_data.text.percent / 100 - diagonal, 757 + bar_text_height);
                ctx.lineTo(163.5, 757 + bar_text_height);
                ctx.closePath();
                ctx.fill();
                ctx.restore();


                //AVATAR
                ctx.beginPath();
                ctx.arc(470/2 + 130, 470/2 + 92, 470/2, 0, Math.PI * 2, true); 
                ctx.closePath();
                ctx.clip();
                const avatar = await Canvas.loadImage(xp_data.avatar);
                ctx.drawImage(avatar, 130, 92, 470, 470);

                //get it as a discord attachment
                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ranking-image.png');
                tempmessage.delete().catch(e=>console.log(e))
                message.channel.send( `Rank of: **${rankuser.tag}**`, attachment).catch(e=>console.log("ranking: " + e));
                return;
                    
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red)
                message.reply("PLEASE ADD A RANKUSER!");
            }
        }

        function leaderboardembed() {
            const filtered = client.points.filter(p => p.guild === message.guild.id).array();
            let orilent;
            const sorted = filtered.sort((a, b) => b.level - a.level || b.points - a.points);
            let embeds = [];
            let j = 0;
            let maxnum = sorted.length;
            orilent = sorted.length;
            if(isNaN(maxnum)) {
                console.log("maximum_leaderboard NOT A NUMBER")
                maxnum = 50;}
            if (maxnum > sorted.length) 
                maxnum = sorted.length + (25 - Number(String(sorted.length/25).slice(2)));
            if(maxnum < 25) maxnum = 25;

            //do some databasing
            var userrank = 0;
            const filtered1 = client.points.filter(p => p.guild === message.guild.id).array();
            const sorted1 = filtered1.sort((a, b) => b.level - a.level || b.points - a.points);
            const top101 = sorted1.splice(0, message.guild.memberCount);
            for (const data of top101) {
                try {
                    userrank++;
                    if (data.user === message.author.id) break; //if its the right one then break it ;)
                } catch {
                    userrank = `X`;
                    break;
                }
            }


            for (let i = 25; i <= maxnum; i += 25) {
                const top = sorted.splice(0, 25);
                const embed = new Discord.MessageEmbed()
                    .setTitle(`\`${message.guild.name}\` | Leaderboard | ${i<orilent?i:orilent} / ${orilent}`)
                    .setTimestamp()
                    .setColor(embedcolor);
                var string = "";
                for (const data of top) {
                    j++;
                    try {
                        if(j == 1) 
                        string += `:first_place: **${data.usertag}**: \`Level: ${data.level} | Points: ${shortenLargeNumber(data.points, 2)}\`\n`;
                        else if(j == 2)
                        string += `:second_place: **${data.usertag}**: \`Level: ${data.level} | Points: ${shortenLargeNumber(data.points, 2)}\`\n`;
                        else if(j == 3)
                        string += `:third_place: **${data.usertag}**: \`Level: ${data.level} | Points: ${shortenLargeNumber(data.points, 2)}\`\n`;
                        else
                        string += `\`${j}\`. **${data.usertag}**: \`Level: ${data.level} | Points: ${shortenLargeNumber(data.points, 2)}\`\n`;

                    } catch {

                    }
                }
                embed.setDescription(string.substr(0, 2048))
                embed.setFooter(`Your Rank: #${userrank}`)
                embeds.push(embed);
            }
            return embeds;
        }
        async function leaderboard() {
            let currentPage = 0;
            const embeds = leaderboardembed();
            if(embeds.length == 1){
                return message.channel.send(embeds[0]).catch(e=>console.log("ranking: " + e))
            }
            const lbembed = await message.channel.send(
                `**Current Page - ${currentPage + 1}/${embeds.length}**`,
                embeds[currentPage]
            ).catch(e=>console.log("ranking: " + e));

            try {
                await lbembed.react("⏪");
                await lbembed.react("⏹");
                await lbembed.react("⏩");
            } catch (error) {
                console.error(error);
            }

            const filter = (reaction, user) => ["⏪", "⏹", "⏩"].includes(reaction.emoji.name) && message.author.id === user.id;
            const collector = lbembed.createReactionCollector(filter, {
                time: 60000
            });

            collector.on("collect", async (reaction, user) => {
                try {
                    if (reaction.emoji.name === "⏩") {
                        if (currentPage < embeds.length - 1) {
                            currentPage++;
                            queueEmbed.edit({content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
                        }
                    } else if (reaction.emoji.name === "⏪") {
                        if (currentPage !== 0) {
                            --currentPage;
                            queueEmbed.edit({content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
                        }
                    } else {
                        collector.stop();
                        reaction.message.reactions.removeAll();
                    }
                    await reaction.users.remove(message.author.id);
                } catch (error) {
                    console.error(error);
                }
            });
        }

        async function newleaderboard() {
            let tempmessage = await message.channel.send(`Getting the Leaderboard-Data of: **${message.guild.name}** ...`)
            const filtered = client.points.filter(p => p.guild === message.guild.id).array();
            const sorted = filtered.sort((a, b) => b.level - a.level || b.points - a.points);
            let embeds = [];
            let j = 0;
            let maxnum = 10;

            //do some databasing
            var userrank = 0;
            const filtered1 = client.points.filter(p => p.guild === message.guild.id).array();
            const sorted1 = filtered1.sort((a, b) => b.level - a.level || b.points - a.points);
            const top101 = sorted1.splice(0, message.guild.memberCount);

            for (const data of top101) {
                try {
                    userrank++;
                    if (data.user === message.author.id) break; //if its the right one then break it ;)
                } catch {
                    userrank = `X`;
                    break;
                }
            }
            var array_usernames = [];
            var array_tag = [];
            var array_textlevel = [];
            var array_avatar = [];
            for (let i = 10; i <= maxnum; i += 10) {
                const top = sorted.splice(0, 10);
                for (const data of top) {
                    try {
                        var user = await client.users.fetch(data.user)
                        array_usernames.push(user.username)
                        array_tag.push(user.discriminator)
                        array_textlevel.push(data.level || 1)
                        array_avatar.push(user.displayAvatarURL({size: 512, format: "png"}))      
                    } catch (e){
                        console.log(e)
                        array_usernames.push("UNKNOWN")
                        array_textlevel.push("X")
                    }
                }
            }

        
            var canvas = Canvas.createCanvas(830, 1030);
            var oldcanvas = false;
            var ctx = canvas.getContext('2d');
            ctx.font = '75px UbuntuMono';
            ctx.fillStyle = "#2697FF";


            var bgimg = await Canvas.loadImage("./assets/first_leaderboard.png");
            ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);
            array_usernames = array_usernames.slice(0, 10);
            new Promise(async (res, rej)=>{
                for(let i = 0; i < array_usernames.length; i++){
                    try{
                        var canvas = Canvas.createCanvas(830, 1030);
                        var ctx = canvas.getContext('2d');
                        ctx.font = '75px UbuntuMono';
                        ctx.fillStyle = "#2697FF";
                        var bgimg = await Canvas.loadImage(oldcanvas == false ? "./assets/first_leaderboard.png": oldcanvas.toBuffer());
                        ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);

                        //USERNAME
                        var text = `${array_usernames[i]}`.trim();
                        if (text.length > 10) text = text.substr(0, 8) + ".."
                        canvacord.Util.renderEmoji(ctx, text, 435, 85 + i * 100);
        
                        ctx.font = '40px UbuntuMono';
                        ctx.fillStyle = "#6caae7"
                        //CHAT TEXT: 
                        var text4 = `LVL ${array_textlevel[i]}`.trim();
                        canvacord.Util.renderEmoji(ctx, text4, 275, 100 + i * 100 - 22.5);
        
                        ctx.font = '15px UbuntuMono';
                        ctx.fillStyle = "#7F7F7F"
                        canvacord.Util.renderEmoji(ctx, "#"+array_tag[i], 440, 100 + i * 100);
                            //CHAT TEXT: 
                            //var text7 = `${shortenLargeNumber(String(xp_data.text.current), 3)}/${shortenLargeNumber(String(xp_data.text.needed), 2)}`
                            //canvacord.Util.renderEmoji(ctx, text7, 1625, 840);
                        //AVATAR
                        ctx.beginPath();
                        ctx.arc(80/2 + 30, 80/2 + 25 + i * 100, 80/2, 0, Math.PI * 2, true); 
                        ctx.closePath();
                        ctx.clip();
                        const avatar = await Canvas.loadImage(array_avatar[i]);
                        ctx.drawImage(avatar, 30, 25 + i * 100, 80, 80);
                        oldcanvas = canvas;
                        if(i == array_usernames.length - 1) res(true)
                    }catch{
                        if(i == array_usernames.length - 1) res(true)
                    }
                }
                await res(true)
            }).then(()=>{
                const attachment = new Discord.MessageAttachment(oldcanvas.toBuffer(), 'ranking-image.png');
                tempmessage.delete().catch(e=>console.log(e))
                message.channel.send( `Top 10 Leaderboard of **${message.guild.name}**\nType: \`leaderboard all\` to see all Ranks\n*Rank is counted for the CHAT RANK*`, attachment).catch(e=>console.log("ranking: " + e));
            })
       }

        function setxpcounter(){
            try {
            /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
                // if(rankuser.bot) return message.reply("NO BOTS!");
                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);
                if (!args[1]) return message.reply("PLEASE ADD POINTS TO ADD! Usage: `setxpcounter @USER 2`");
                if(Number(args[1]) > 100) return message.reply("You cant set more then 100")
                client.points.set(key, Number(args[1]), `xpcounter`); //set points to 0
                const embed = new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`Successfully set XP COUNTER to \`${args[1]}x\` for: \`${rankuser.tag}\``)
                message.reply(embed);
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red)
                message.reply("PLEASE ADD A RANKUSER!");
            }
        }
        
        function setglobalxpcounter(){
            try {
                if (!args[0]) return message.reply("PLEASE ADD POINTS TO ADD! Usage: `setglobalxpcounter 2`");
                if(Number(args[1]) > 100) return message.reply("You cant set more then 100")
                client.points.set(message.guild.id, Number(args[0]), `setglobalxpcounter`); //set points to 0
                const embed = new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`Successfully set GLOBAL XP COUNTER to \`${args[0]}x\` for: \`${message.guild.name}\``)
                message.reply(embed);
            } catch {
            }
        }
        function addpoints(amount) {
            try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
                // if(rankuser.bot) return message.reply("NO BOTS!");
                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);

                const curPoints = client.points.get(key, `points`);
                const neededPoints = client.points.get(key, `neededpoints`);
                let leftpoints = neededPoints - curPoints;
                if (!args[1] && !amount) return message.reply("PLEASE ADD POINTS TO ADD! Usage: `addpoints @USER 100`");
                if(Number(args[1]) > 10000 || Number(args[1]) < -10000) return message.reply("You cant add more then 10000")
                if (!amount) amount = Number(args[1]);
                if (amount < 0) removepoints(amount);
                let toaddpoints = amount;
                addingpoints(toaddpoints, leftpoints);

                function addingpoints(toaddpoints, leftpoints) {
                    if (toaddpoints >= leftpoints) {
                        client.points.set(key, 0, `points`); //set points to 0
                        client.points.inc(key, `level`); //add 1 to level
                        //HARDING UP!
                        const newLevel = client.points.get(key, `level`); //get current NEW level
                        if (newLevel % 4 === 0) client.points.math(key, `+`, 100, `neededpoints`)

                        const newneededPoints = client.points.get(key, `neededpoints`); //get NEW needed Points
                        const newPoints = client.points.get(key, `points`); //get current NEW points

                        //THE INFORMATION EMBED 
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
                                dynamic: true
                            }))
                            .setDescription(`You've leveled up to Level: **\`${newLevel}\`**! (Points: \`${newPoints + toaddpoints - leftpoints}\` / \`${newneededPoints}\`) `)
                            .setColor(embedcolor);
                        //send ping and embed message only IF the adding will be completed!
                        if (toaddpoints - leftpoints < newneededPoints)
                            message.channel.send(rankuser, embed).catch(e=>console.log("ranking: " + e));

                        addingpoints(toaddpoints - leftpoints, newneededPoints); //Ofc there is still points left to add so... lets do it!
                    } else {
                        client.points.math(key, `+`, Number(toaddpoints), `points`)
                    }
                }


                const embed = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(`Successfully added \`${toaddpoints} Points\` to: \`${rankuser.tag}\``)
                message.reply(embed);
                rank(rankuser); //also sending the rankcard
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red)
                message.reply("PLEASE ADD A RANKUSER!");
            }
        }

        function setpoints() {
            try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
                // if(rankuser.bot) return message.reply("NO BOTS!");
                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);

                let toaddpoints = Number(args[1]);
                if (!args[1]) return message.reply("PLEASE ADD POINTS TO SET! Usage: `addpoints @USER 100`");
                if(Number(args[1]) > 10000) return message.reply("You cant set more then 10000")
                if (Number(args[1]) < 0) args[1] = 0;
                const neededPoints = client.points.get(key, `neededpoints`);
                addingpoints(toaddpoints, neededPoints);

                function addingpoints(toaddpoints, neededPoints) {
                    if (toaddpoints >= neededPoints) {
                        client.points.set(key, 0, `points`); //set points to 0
                        client.points.inc(key, `level`); //add 1 to level
                        //HARDING UP!
                        const newLevel = client.points.get(key, `level`); //get current NEW level
                        if (newLevel % 4 === 0) client.points.math(key, `+`, 100, `neededpoints`)

                        const newneededPoints = client.points.get(key, `neededpoints`); //get NEW needed Points
                        const newPoints = client.points.get(key, `points`); //get current NEW points

                        //THE INFORMATION EMBED 
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
                                dynamic: true
                            }))
                            .setDescription(`You've leveled up to Level: **\`${newLevel}\`**! (Points: \`${newPoints}\` / \`${newneededPoints}\`) `)
                            .setColor(embedcolor);
                        //send ping and embed message
                        message.channel.send(rankuser, embed).catch(e=>console.log("ranking: " + e));

                        addingpoints(toaddpoints - neededPoints, newneededPoints); //Ofc there is still points left to add so... lets do it!
                    } else {
                        client.points.set(key, Number(toaddpoints), `points`)
                    }
                }

                const embed = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(`Successfully set \`${toaddpoints} Points\` to: \`${rankuser.tag}\``)
                message.channel.send(embed).catch(e=>console.log("ranking: " + e));
                rank(rankuser); //also sending the rankcard
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red)
                message.reply("PLEASE ADD A RANKUSER!");
            }
        }

        function removepoints(amount) {
            try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
                // if(rankuser.bot) return message.reply("NO BOTS!");
                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);

                const curPoints = client.points.get(key, `points`);
                const neededPoints = client.points.get(key, `neededpoints`);

                if (!args[1] && !amount) return message.reply("PLEASE ADD POINTS TO REMOVE! Usage: `addpoints @USER 100`");
                if (!amount) amount = Number(args[1]);
                if(Number(args[1]) > 10000 || Number(args[1]) < -10000) return message.reply("You cant remove more then 10000")
                if (amount < 0) addpoints(amount);
                
                removingpoints(amount, curPoints);

                function removingpoints(amount, curPoints) {
                    if (amount > curPoints) {
                        let removedpoints = amount - curPoints - 1;
                        client.points.set(key, neededPoints - 1, `points`); //set points to 0
                        if (client.points.get(key, `level`) == 1) return message.reply("ALREADY AT 0 POINTS");
                        client.points.dec(key, `level`); //remove 1 from level
                        //HARDING UP!
                        const newLevel = client.points.get(key, `level`); //get current NEW level
                        if ((newLevel + 1) % 4 === 0) { //if old level was divideable by 4 set neededpoints && points -100
                            client.points.math(key, `-`, 100, `points`)
                            client.points.math(key, `-`, 100, `neededpoints`)
                        }

                        const newneededPoints = client.points.get(key, `neededpoints`); //get NEW needed Points
                        const newPoints = client.points.get(key, `points`); //get current NEW points

                        //THE INFORMATION EMBED 
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
                                dynamic: true
                            }))
                            .setDescription(`You've leveled down to Level: **\`${newLevel}\`**! (Points: \`${newPoints - amount + removedpoints}\` / \`${newneededPoints}\`) `)
                            .setColor(embedcolor);
                        //send ping and embed message only IF the removing will be completed!
                        if (amount - removedpoints < neededPoints)
                            message.channel.send(rankuser, embed).catch(e=>console.log("ranking: " + e));

                        removingpoints(amount - removedpoints, newneededPoints); //Ofc there is still points left to add so... lets do it!
                    } else {
                        client.points.math(key, `-`, Number(amount), `points`)
                    }
                }

                const embed = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(`Successfully removed \`${amount} Points\` from: \`${rankuser.tag}\``)
                message.reply(embed);
                rank(rankuser); //also sending the rankcard
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red)
                message.reply("PLEASE ADD A RANKUSER!");
            }
        }

        function addlevel() {
            try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
                // if(rankuser.bot) return message.reply("NO BOTS!");

                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);
                let newLevel = client.points.get(key, `level`);
                if (!args[1]) return message.reply("Please add the amount of Levels you want to add to! Usage: addlevel @User 4");
                if(Number(args[1]) > 10000) return message.reply("You cant add more then 10000")
                if (Number(args[1]) < 0) args[1] = 0;
                for (let i = 0; i < Number(args[1]); i++) {
                    client.points.set(key, 0, `points`); //set points to 0
                    client.points.inc(key, `level`); //add 1 to level
                    //HARDING UP!
                    newLevel = client.points.get(key, `level`); //get current NEW level
                    if (newLevel % 4 === 0) client.points.math(key, `+`, 100, `neededpoints`)
                }
                const newneededPoints = client.points.get(key, `neededpoints`); //get NEW needed Points
                const newPoints = client.points.get(key, `points`); //get current NEW points

                //THE INFORMATION EMBED 
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`You've leveled up to Level: **\`${newLevel}\`**! (Points: \`${newPoints}\` / \`${newneededPoints}\`) `)
                    .setColor(embedcolor);
                message.channel.send(rankuser, embed).catch(e=>console.log("ranking: " + e));
                rank(rankuser); //also sending the rankcard
                const sssembed = new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`Successfully added ${args[1]} Levels to: \`${rankuser.tag}\``)
                message.reply(sssembed);
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red)
                message.reply("PLEASE ADD A RANKUSER!");
            }
        }

        function setlevel() {
            try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
                // if(rankuser.bot) return message.reply("NO BOTS!");

                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);

                if (!args[1]) return message.reply("Please add the amount of Levels you want to set to! Usage: setlevel @User 3");
                if (Number(args[1]) < 1) args[1] = 1;
                
                if(Number(args[1]) > 10000) return message.reply("You cant set more then 10000")

                client.points.set(key, Number(args[1]), `level`); //set level to the wanted level
                client.points.set(key, 0, `points`); //set the points to 0

                let newLevel = client.points.get(key, `level`); //set level to the wanted level
                let counter = Number(newLevel) / 4;

                client.points.set(key, 400, `neededpoints`) //set neededpoints to 0 for beeing sure
                //add 100 for each divideable 4
                for (let i = 0; i < Math.floor(counter); i++) {
                    client.points.math(key, `+`, 100, `neededpoints`)
                }
                const newneededPoints = client.points.get(key, `neededpoints`); //get NEW needed Points

                const newPoints = client.points.get(key, `points`); //get current NEW points
                //THE INFORMATION EMBED 
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`You've leveled up to Level: **\`${newLevel}\`**! (Points: \`${newPoints}\` / \`${newneededPoints}\`) `)
                    .setColor(embedcolor);
                message.channel.send(rankuser, embed).catch(e=>console.log("ranking: " + e));
                rank(rankuser); //also sending the rankcard
                const sssembed = new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`Successfully set \`${rankuser.tag}\` to Level: ${args[1]}`)
                message.reply(sssembed);
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red)
                message.reply("PLEASE ADD A RANKUSER!");
            }
        }

        function removelevel() {
            try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
                // if(rankuser.bot) return message.reply("NO BOTS!");

                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);
                let newLevel = client.points.get(key, `level`);
                if (!args[1]) return message.reply("Please add the amount of Levels you want to remove to! Usage: removelevel @User 4");
                if (Number(args[1]) < 0) args[1] = 0;
                for (let i = 0; i < Number(args[1]); i++) {
                    client.points.set(key, 0, `points`); //set points to 0
                    client.points.dec(key, `level`); //add 1 to level
                    //HARDING UP!
                    newLevel = client.points.get(key, `level`); //get current NEW level
                    if(newLevel < 1) client.points.set(key, 1 ,`level`); //if smaller then 1 set to 1
                }
                snewLevel = client.points.get(key, `level`); //get current NEW level
                let counter = Number(snewLevel) / 4;

                client.points.set(key, 400, `neededpoints`) //set neededpoints to 0 for beeing sure
                //add 100 for each divideable 4
                for (let i = 0; i < Math.floor(counter); i++) {
                    client.points.math(key, `+`, 100, `neededpoints`)
                }
                const newneededPoints = client.points.get(key, `neededpoints`); //get NEW needed Points
                const newPoints = client.points.get(key, `points`); //get current NEW points

                //THE INFORMATION EMBED 
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`You've leveled down to Level: **\`${newLevel}\`**! (Points: \`${newPoints}\` / \`${newneededPoints}\`) `)
                    .setColor(embedcolor);
                message.channel.send(rankuser, embed).catch(e=>console.log("ranking: " + e));
                rank(rankuser); //also sending the rankcard
                const sssembed = new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`Successfully removed \`${args[0]}\` Levels from:  \`${rankuser.tag}\``)
                message.reply(sssembed);
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red)
                message.reply("PLEASE ADD A RANKUSER!");
            }
        }

        function resetranking() {
            try {
                /**
                 * GET the Rank User
                 * @info you can tag him
                 */
                if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
                let rankuser = message.mentions.users.first();
                if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
                // if(rankuser.bot) return message.reply("NO BOTS!");
                
                //Call the databasing function!
                const key = `${message.guild.id}-${rankuser.id}`;
                databasing(rankuser);

                client.points.set(key, 1, `level`); //set level to 0
                client.points.set(key, 0, `points`); //set the points to 0
                client.points.set(key, 400, `neededpoints`) //set neededpoints to 0 for beeing sure
                client.points.set(key, "", `oldmessage`); //set old message to 0

                //THE INFORMATION EMBED 
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`You've been resetted to Level: **\`1\`**! (Points: \`0\` / \`400\`) `)
                    .setColor(embedcolor);
                message.channel.send(rankuser, embed).catch(e=>console.log("ranking: " + e));
                rank(rankuser); //also sending the rankcard
                const sssembed = new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`Successfully resetted ranking from:  \`${rankuser.tag}\``)
                message.reply(sssembed);
            } catch (error) {
                console.log("RANKING:".underline.red + " :: " + error.stack.toString().red)
                message.reply("PLEASE ADD A RANKUSER!");
            }
        }

        function registerall() {
            let allmembers = message.guild.members.cache.keyArray();
            for (let i = 0; i < allmembers.length; i++) {
                //Call the databasing function!
                let rankuser = message.guild.members.cache.get(allmembers[i]).user;
                databasing(rankuser);
            }
            const embed = new Discord.MessageEmbed()
            .setColor(embedcolor)
            .setDescription(`Successfully registered everyone`)
            message.reply(embed);
        }

        function resetrankingall() {
            let allmembers = message.guild.members.cache.keyArray();
            for (let i = 0; i < allmembers.length; i++) {
                let rankuser = message.guild.members.cache.get(allmembers[i]).user;
                const key = `${message.guild.id}-${rankuser.id}`;
                client.points.set(key, 1, `level`); //set level to 0
                client.points.set(key, 0, `points`); //set the points to 0
                client.points.set(key, 400, `neededpoints`) //set neededpoints to 0 for beeing sure
                client.points.set(key, "", `oldmessage`); //set old message to 0
            }
            const embed = new Discord.MessageEmbed()
            .setColor(embedcolor)
            .setDescription(`Successfully resetted everyone`)
            message.reply(embed);
        }

        function addrandomall() {
            let maxnum = 5;
            if (args[0]) maxnum = Number(args[0]);
            if(args[0] && Number(maxnum) > 10000) return message.reply("You cant add more then 10000")
            let allmembers = message.guild.members.cache.filter(member=> !member.user.bot).keyArray();
            for (let i = 0; i < allmembers.length; i++) {
                //Call the databasing function!
                let rankuser = message.guild.members.cache.get(allmembers[i]).user;
                databasing(rankuser);
                if(rankuser.bot) continue;
                Giving_Ranking_Points(`${message.guild.id}-${rankuser.id}`, maxnum);
                Giving_Ranking_Points(`${message.guild.id}-${message.author.id}`, maxnum);
            }
            const embed = new Discord.MessageEmbed()
            .setColor(embedcolor)
            .setDescription(`Successfully added ${args[0]} Points to  everyone`)
            message.reply(embed);
        }

        function levelinghelp() {
            const embed = new Discord.MessageEmbed()
                .setTitle(`\`${message.guild.name}\` | Ranking Commands`)
                .setDescription(`> **HELP:**  \`${prefix}levelinghelp\``)
                .setColor(embedcolor)
                .addFields([{
                        name: "`rank [@User]`",
                        value: ">>> *Shows the Rank of a User*",
                        inline: true
                    },
                    {
                        name: "`leaderboard`",
                        value: ">>> *Shows the Top 10 Leaderboard*",
                        inline: true
                    },
                    {
                        name: "`setxpcounter <@USER> <AMOUNT>`",
                        value: ">>> *Changes the amount of how much to count, x1, x2, x3, ...*",
                        inline: true
                    },

                    {
                        name: "`addpoints <@User> <Amount`",
                        value: ">>> *Add a specific amount of Points to a User*",
                        inline: true
                    },
                    {
                        name: "`setpoints <@User> <Amount`",
                        value: ">>> *Set a specific amount of Points to a User*",
                        inline: true
                    },
                    {
                        name: "`removepoints <@User> <Amount`",
                        value: ">>> *Remove a specific amount of Points to a User*",
                        inline: true
                    },

                    {
                        name: "`addlevel <@User> <Amount`",
                        value: ">>> *Add a specific amount of Levels to a User*",
                        inline: true
                    },
                    {
                        name: "`setlevel <@User> <Amount`",
                        value: ">>> *Set a specific amount of Levels to a User*",
                        inline: true
                    },
                    {
                        name: "`removelevel <@User> <Amount`",
                        value: ">>> *Remove a specific amount of Levels to a User*",
                        inline: true
                    },

                    {
                        name: "`resetranking <@User>`",
                        value: ">>> *Resets the ranking of a User*",
                        inline: true
                    },
                    {
                        name: "`setglobalxpcounter <AMOUNT>`",
                        value: ">>> *Sets the global xp counter for this guild, standard 1*",
                        inline: true
                    },
                    {
                        name: "\u200b",
                        value: "\u200b",
                        inline: true
                    },

                    {
                        name: "`registerall`",
                        value: ">>> *Register everyone in the Server to the Database*",
                        inline: true
                    },
                    {
                        name: "`resetrankingall`",
                        value: ">>> *Reset ranking of everyone in this Server*",
                        inline: true
                    },
                    {
                        name: "`addrandomall`",
                        value: ">>> *Add a random amount of Points to everyone*",
                        inline: true
                    }
                ])
            message.channel.send(embed).catch(e=>console.log("ranking: " + e))
        }

    }catch(e){console.log("ranking: " + e)}
    })



}
//Coded by Tomato#6966!
function shortenLargeNumber(num, digits) {
    var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
        decimal;

    for(var i=units.length-1; i>=0; i--) {
        decimal = Math.pow(1000, i+1);

        if(num <= -decimal || num >= decimal) {
            return +(num / decimal).toFixed(digits) + units[i];
        }
    }

    return num;
}