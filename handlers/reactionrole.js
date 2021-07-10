module.exports = (client) => {
    
     client.on("messageReactionAdd", async (reaction, user) => {
        try {
            const {
                message
            } = reaction;
            if (user.bot || !message.guild) return;
            if (message.partial) await message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            client.reactionrole.ensure(reaction.message.guild.id, {
                reactionroles: []
            });
            const reactionsetup = client.reactionrole.get(reaction.message.guild.id, "reactionroles");
            if(!reactionsetup || reactionsetup == undefined || reactionsetup == null) return;
            for (let k = 0; k < reactionsetup.length; k++) {
                if (reaction.message.id === reactionsetup[k].MESSAGE_ID) {
                    let messagereaction = await reaction.message.guild.members.fetch(user.id);
                    let rr = reactionsetup[k].Parameters;
                    let currrole;
                    for (let j = 0; j < rr.length; j++) {
                        if (reaction.emoji.id == rr[j].Emoji) {
                            try {
                                currrole = rr[j].Role;
                                await messagereaction.roles.add(rr[j].Role);
                            } catch (error) {
                                reaction.message.channel.send(error.message, {
                                    code: "js"
                                }).then(msg=>{
                                    msg.delete({timeout: 3000}).catch()
                                }).catch(()=>{})
                            }
                        }
                        else if (reaction.emoji.name == rr[j].Emoji) {
                            try {
                                currrole = rr[j].Role;
                                await messagereaction.roles.add(rr[j].Role);
                            } catch (error) {
                                reaction.message.channel.send(error.message, {
                                    code: "js"
                                }).then(msg=>{
                                    msg.delete({timeout: 3000}).catch()
                                }).catch(()=>{})
                            }
                        } else {
                            continue;
                        }
                    }

                    if (reactionsetup[k].remove_others) {
                        let rr2 = reactionsetup[k].Parameters;
                        //REMOVE REACTIONS
                        let oldreact = reaction;
                        await reaction.message.fetch();
                        const userReactions = reaction.message.reactions.cache;
                        try {
                            for (const reaction of userReactions.values()) {
                                if (reaction.users.cache.has(user.id) && oldreact.emoji.name != reaction.emoji.name) {
                                    reaction.users.remove(user.id);
                                }
                            }
                        } catch {}
                        //REMOVE THE ROLE
                        for (let z = 0; z < rr2.length; z++) {
                            try {
                                if (rr2[z].Role != currrole) {
                                    if (messagereaction.roles.cache.has(rr2[z].Role)) {
                                        await messagereaction.roles.remove(rr2[z].Role)
                                    }
                                }
                            } catch (error) {
                                reaction.message.channel.send(error.message, {
                                    code: "js"
                                }).then(msg=>{
                                    msg.delete({timeout: 3000}).catch()
                                }).catch(()=>{})
                            }
                        }
                    }
                }
                else {
                    continue;
                }
            }
        } catch (e) {
            console.log(e)
        }
    })

    //REMOVING ROLES
    client.on("messageReactionRemove", async (reaction, user) => {
        try {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            client.reactionrole.ensure(reaction.message.guild.id, {
                reactionroles: []
            });
            const reactionsetup = client.reactionrole.get(reaction.message.guild.id, "reactionroles");

            for (let k = 0; k < reactionsetup.length; k++) {
                if (reaction.message.id === reactionsetup[k].MESSAGE_ID) {
                    let messagereaction = await reaction.message.guild.members.fetch(user.id);
                    let rr = reactionsetup[k].Parameters;
                    for (let j = 0; j < rr.length; j++) {
                        if (reaction.emoji.id === rr[j].Emoji) {
                            try {
                                await messagereaction.roles.remove(rr[j].Role);
                            } catch (error) {
                                reaction.message.channel.send(error.message, {
                                    code: "js"
                                }).then(msg=>{
                                    msg.delete({timeout: 3000}).catch()
                                }).catch(()=>{})
                            }
                        }
                        else if (reaction.emoji.name === rr[j].Emoji) {
                            try {
                                await messagereaction.roles.remove(rr[j].Role);
                            } catch (error) {
                                reaction.message.channel.send(error.message, {
                                    code: "js"
                                }).then(msg=>{
                                    msg.delete({timeout: 3000}).catch()
                                }).catch(()=>{})
                            }
                        }
                        else {
                            continue;
                        }
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    })
}