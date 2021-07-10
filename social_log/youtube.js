// ************* IMPORT MODULES *************  //
const Parser = require("rss-parser");
const CronJob = require('cron').CronJob;
// ************ IMPORT FILE DATA ************* //
const parser = new Parser();
const ytsr = require('youtube-ext');
const { databasing, delay } = require('../handlers/functions');

module.exports = client => {

    client.Jobyoutube = new CronJob('0 */7 * * * *', async function(){
        await delay(4 * 60 * 1000)
        check(client); 
    }, null, true, 'America/Los_Angeles');
    
    client.on("ready", () => {
        client.Jobyoutube.start(); //start the JOB
    });

    async function getLastVideo(client, youtubeChannelName, rssURL){
        console.log(`[${youtubeChannelName}]  | Getting videos...`.italic.brightRed);
        let content = await parser.parseURL(rssURL);
        console.log(`[${youtubeChannelName}]  | ${content.items.length} videos found`.italic.brightRed);
        let tLastVideos = content.items.sort((a, b) => {
            let aPubDate = new Date(a.pubDate || 0).getTime();
            let bPubDate = new Date(b.pubDate || 0).getTime();
            return bPubDate - aPubDate;
        });
        console.log(`[${youtubeChannelName}]  | The last video is "${tLastVideos[0] ? tLastVideos[0].title : "err"}"`.italic.brightRed);
        return tLastVideos[0];
    }


    async function checkVideos(client, youtubeChannelName, rssURL, youtuber){
        console.log(`[${youtubeChannelName}] | Get the last video..`.italic.brightRed);
        let lastVideo = await getLastVideo(client, youtubeChannelName, rssURL);
        // If there isn't any video in the youtube channel, return
        if(!lastVideo) return console.log(String("[ERR] | No video found for "+lastVideo).italic.brightRed);
        // If the date of the last uploaded video is older than the date of the bot starts, return 
        //if(new Date(lastVideo.pubDate).getTime() < startAt) return console.log(`[${youtubeChannelName}] | Last video was uploaded before the bot starts`);
        let lastSavedVideo = client.youtube_log.get(youtuber, "oldvid")
        let alrsentvideos = client.youtube_log.get(youtuber, "alrsent")
        // If the last video is the same as the last saved, return
        if(lastSavedVideo && (lastSavedVideo === lastVideo.id || lastSavedVideo.includes(lastVideo.id))) return console.log(`[${youtubeChannelName}] | Last video is the same as the last saved`.italic.brightRed);
        if(alrsentvideos && (alrsentvideos.includes(lastVideo.id))) return console.log(`[${youtubeChannelName}] | Last video already got sent!`.italic.brightRed);
        return lastVideo;
    }

    function getYoutubeChannelIdFromURL(client, url) {
        let id = null;
        url = url.replace(/(>|<)/gi, "").split(/(\/channel\/|\/user\/)/);
        if(url[2]) {
            id = url[2].split(/[^0-9a-z_-]/i)[0];
        }
        return id;
    }

    async function getYoutubeChannelInfos(client, name){
        console.log(`[${name}] | Resolving channel infos...`.italic.brightRed);
        let channel = null;
        /* Try to search by ID */
        let id = getYoutubeChannelIdFromURL(client, name);
        if(id){
            //channel = await ytsr.channelInfo(id);
        }
        if(!channel){
            /* Try to search by name */
            channel = await ytsr.channelInfo(name);
        }
        console.log(`[X] | Current Channel: ${channel.name ? channel.name : "err"}`.italic.brightRed);
        return channel;
    }

    async function check(client){
        console.log("Checking Youtubes...".italic.brightRed)
        client.guilds.cache.map(guild => guild.id).forEach(guildid => {
            try{
                client.social_log.ensure(guildid, {
                    youtube: {
                        channels: [],
                        dc_channel: ""
                    },
                })
                for(const yt of client.social_log.get(guildid, "youtube.channels")){
                    client.youtube_log.ensure(yt, {
                        oldvid: "",
                        alrsent: [],
                        message: "**{videoAuthorName}** uploaded \`{videoTitle}\`!\n**Watch it:** {videoURL}"
                    })
                }
                client.social_log.get(guildid, "youtube.channels").forEach(async (youtuber) => {
                    console.log(`[${youtuber}] | Start checking...`.italic.brightRed);
                    let channelInfos = await getYoutubeChannelInfos(client, youtuber);
                    if(!channelInfos) return console.log(String("[ERR] | Invalid youtuber provided: " + youtuber).italic.brightRed);
                   
                    let video = await checkVideos(client, channelInfos.name, "https://www.youtube.com/feeds/videos.xml?channel_id="+channelInfos.id, youtuber);
                    if(!video) return console.log(`[${channelInfos.name}] | No notification`.italic.brightRed);
                   
                    let channel = await client.channels.fetch(client.social_log.get(guildid, "youtube.dc_channel")).catch(e=>{return;})
                    if(!channel) return console.log("[ERR] | DC-Channel not found".italic.brightRed);
                    
                    channel.send(
                        client.youtube_log.get(youtuber, "message")
                        .replace("{videoURL}", video.link)
                        .replace("{videoAuthorName}", video.author)
                        .replace("{videoTitle}", video.title)
                        .replace("{videoPubDate}", formatDate(client, new Date(video.pubDate)))
                        .replace("{url}", video.link)
                        .replace("{author}", video.author)
                        .replace("{title}", video.title)
                        .replace("{date}", formatDate(client, new Date(video.pubDate)))
                    );
                    client.youtube_log.set(youtuber, video.id, "oldvid")
                    client.youtube_log.push(youtuber, video.id, "alrsent")
                    console.log("Notification sent !".italic.brightRed);
                });        
            }catch (e){
                console.log(String(e).grey)
            }
        })
    }

    function formatDate(client, date) {
        let monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        let day = date.getDate(), month = date.getMonth(), year = date.getFullYear();
        return `${day} ${monthNames[parseInt(month, 10)]} ${year}`;
    }
}
