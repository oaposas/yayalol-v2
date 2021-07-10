const Enmap = require("enmap");
module.exports = client => {

    //Each Database gets a own file and folder which is pretty handy!

    client.economy = new Enmap({
        name: "economy",
        dataDir: "./databases/economy"
    })
    client.tiktok = new Enmap({
        name: "youtube_log",
        dataDir: "./social_log/youtubelog"
    })
    client.youtube_log = new Enmap({
        name: "youtube_log",
        dataDir: "./social_log/youtubelog"
    })
    client.premium = new Enmap({
        name: "premium",
        dataDir: "./databases/premium"
    })
    client.stats = new Enmap({
        name: "stats",
        dataDir: "./databases/stats"
    })
    client.settings = new Enmap({
        name: "settings",
        dataDir: "./databases/settings"
    })
    client.jtcsettings = new Enmap({
        name: "settings",
        dataDir: "./databases/jtc1"
    })
    client.jtcsettings2 = new Enmap({
        name: "settings2",
        dataDir: "./databases/jtc2"
    });
    client.jtcsettings3 = new Enmap({
        name: "settings3",
        dataDir: "./databases/jtc3"
    });
    client.jointocreatemap = new Enmap({
        name: "settings",
        dataDir: "./databases/jointocreatemap"
    });
    client.setups = new Enmap({
        name: "setups",
        dataDir: "./databases/setups",
    })
    client.queuesaves = new Enmap({
        name: "queuesaves",
        dataDir: "./databases/queuesaves",
        ensureProps: false
    })
    client.modActions = new Enmap({
        name: 'actions',
        dataDir: "./databases/warns"
    });
    client.userProfiles = new Enmap({
        name: 'userProfiles',
        dataDir: "./databases/warns"
    });
    client.apply = new Enmap({
        name: "apply",
        dataDir: "./databases/apply"
    })
    client.apply2 = new Enmap({
        name: "apply2",
        dataDir: "./databases/apply2"
    })
    client.apply3 = new Enmap({
        name: "apply3",
        dataDir: "./databases/apply3"
    })
    client.apply4 = new Enmap({
        name: "apply4",
        dataDir: "./databases/apply4"
    })
    client.apply5 = new Enmap({
        name: "apply5",
        dataDir: "./databases/apply5"
    })
    client.points = new Enmap({
        name: "points",
        dataDir: "./databases/ranking"
    });
    client.voicepoints = new Enmap({
        name: "voicepoints",
        dataDir: "./databases/ranking"
    });
    client.reactionrole = new Enmap({
        name: "reactionrole",
        dataDir: "./databases/reactionrole"
    });
    client.roster = new Enmap({
        name: "roster",
        dataDir: "./databases/roster"
    });
    client.roster2 = new Enmap({
        name: "roster2",
        dataDir: "./databases/roster"
    });
    client.roster3 = new Enmap({
        name: "roster3",
        dataDir: "./databases/roster"
    });
    client.social_log = new Enmap({
        name: "social_log",
        dataDir: "./databases/social_log"
    });
    client.blacklist = new Enmap({
        name: "blacklist",
        dataDir: "./databases/blacklist"
    })
    client.customcommands = new Enmap({
        name: "custom commands",
        dataDir: "./databases/customcommands"
    })
    client.keyword = new Enmap({
        name: "keyword",
        dataDir: "./databases/keyword"
    })
}