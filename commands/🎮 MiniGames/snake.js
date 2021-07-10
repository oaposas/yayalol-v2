
const Discord = require('discord.js');

const {
    MessageEmbed,
    MessageAttachment
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const fetch = require("node-fetch");

const WIDTH = 15;
const HEIGHT = 15;
const gameBoard = [];
const apple = { x: 1, y: 1 };
let serverid;
let message;
let curplayer;
let eatable = [
    "🍏",
    "🍐",
    "🍊",
    "🍋",
    "🍌",
    "🍇",
    "🍒",
    "🍍",
    "🥪",
    "🌯",
    "🍆",
    "🍔",
    "🧄",
    "🥑",
    "🌭",
    "🥫",
    "🍑"
];
let randomemoji;
class SnakeGame {
    constructor() {
        this.snake = [{ x: 5, y: 5 }];
        this.snakeLength = 1;
        this.score = 0;
        this.gameEmbed = null;
        this.inGame = false;
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                gameBoard[y * WIDTH + x] = "➕";
            }
        }
    }   

    gameBoardToString() {
        let str = ""
        
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                if (x == apple.x && y == apple.y) {
                    
                    str += randomemoji;
                    continue;
                }

                let flag = true;
                for (let s = 0; s < this.snake.length; s++) {
                    if (x == this.snake[s].x && y == this.snake[s].y) {
                        str += "🟥";
                        flag = false;
                    }
                }

                if (flag)
                    str += gameBoard[y * WIDTH + x];
            }
            str += "\n";
        }
        return str;
    }

    isLocInSnake(pos) {
        return this.snake.find(sPos => sPos.x == pos.x && sPos.y == pos.y);
    };

    newAppleLoc() {
        let newApplePos = { x: 0, y: 0 };
        do {
            newApplePos = { x: parseInt(Math.random() * WIDTH), y: parseInt(Math.random() * HEIGHT) };
        } while (this.isLocInSnake(newApplePos))
        randomemoji = eatable[Math.floor(Math.random() * eatable.length)];
        apple.x = newApplePos.x;
        apple.y = newApplePos.y;
    }

    newGame(msg) {
        if (this.inGame)
            return;
            message = msg;
        this.inGame = true;
        this.score = 0;
        this.client = msg.client;
        this.snakeLength = 1;
        this.snake = [{ x: 5, y: 5 }];
        this.newAppleLoc();
        serverid = msg.guild.id;
        curplayer = msg.author.id;
        const temEmbed = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setDescription("Preparing Game...")
        .setAuthor('Snake Minigame', "https://imgur.com/1ioYOA0.png", "https://discord.gg/FQGXbypRf8")
        .setTimestamp();

        const embed = new Discord.MessageEmbed()
            .setColor("#2f3136")
            .setAuthor('Snake Minigame', "https://imgur.com/1ioYOA0.png", "https://discord.gg/FQGXbypRf8")
            .setDescription(this.gameBoardToString())


        msg.channel.send(temEmbed).then(async emsg => {
            this.gameEmbed = await emsg;
            await this.gameEmbed.react('⬅️');
            await this.gameEmbed.react('➡️');
            await this.gameEmbed.react('⬆️');
            await this.gameEmbed.react('⬇️');
            await this.gameEmbed.edit(embed);
            await this.waitForReaction();
        });
    }

    step() {
        if (apple.x == this.snake[0].x && apple.y == this.snake[0].y) {
            this.score += 1;
            this.snakeLength++;
            this.newAppleLoc();
        }

        const editEmbed = new Discord.MessageEmbed()
            .setColor("#2f3136")
            .setAuthor('Snake Minigame', "https://imgur.com/1ioYOA0.png", "https://discord.gg/FQGXbypRf8")
            .setDescription(this.gameBoardToString())

        this.gameEmbed.edit(editEmbed);

        this.waitForReaction();
    }

    gameOver() {
        this.inGame = false;
        if(!this.score || this.score === undefined ) this.score = 0;
        var client = this.client;
        client.stats.ensure(serverid, {
            "snake": {
                "highscore": 0,
                "by": "unknown"
            } 
        })
        client.stats.ensure("snake_global", {
            "highscore": 0,
            "by": "unknown"
        })
        let serverhighscore = client.stats.get(serverid, "snake"); 
       
        if((!serverhighscore || !serverhighscore.highscore) || this.score > serverhighscore.highscore){
            serverhighscore = this.score;
            client.stats.set(serverid, this.score, "snake.highscore")
            client.stats.set(serverid, curplayer, "snake.by")
        } 

        let gobalhighscore = client.stats.get("snake_global"); 
    
        if(!(!gobalhighscore || !gobalhighscore.highscore) || this.score > gobalhighscore.highscore){
            gobalhighscore = this.score;
            client.stats.set("snake_global", this.score, "highscore")
            client.stats.set("snake_global", curplayer, "by")
        } 

        const editEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setAuthor('Snake Minigame', "https://imgur.com/1ioYOA0.png", "https://discord.gg/FQGXbypRf8")
            .addField("__GAME OVER!__", "**SCORE:**\n `" + this.score+"`")
            .addField("Serverhighscore:", "`" + serverhighscore.highscore + "`\nby: <@" + serverhighscore.by + ">")
            .addField("Globalscore:", "`" + gobalhighscore.highscore + "`\nby: <@" + gobalhighscore.by + ">")
            
        this.gameEmbed.edit(editEmbed);
        this.gameEmbed.reactions.removeAll()
    }

    filter(reaction, user) {
        return ['⬅️', '➡️', '⬇️', '⬆️'].includes(reaction.emoji.name) && user.id == curplayer;
    }

    waitForReaction() {
        this.gameEmbed.awaitReactions((reaction, user) => this.filter(reaction, user), { max: 1, time: 30000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();

                const snakeHead = this.snake[0];
                const nextPos = { x: snakeHead.x, y: snakeHead.y };
                if (reaction.emoji.name === '⬅️') {
                    let nextX = snakeHead.x - 1;
                    if (nextX < 0)
                        nextX = WIDTH - 1;
                        nextPos.x = nextX;
                }
                else if (reaction.emoji.name === '⬆️') {
                    let nextY = snakeHead.y - 1;
                    if (nextY < 0)
                        nextY = HEIGHT - 1;
                    nextPos.y = nextY;
                }
                else if (reaction.emoji.name === '⬇️') {
                    let nextY = snakeHead.y + 1;
                    if (nextY >= HEIGHT)
                        nextY = 0;
                    nextPos.y = nextY;
                }
                else if (reaction.emoji.name === '➡️') {
                    let nextX = snakeHead.x + 1;
                    if (nextX >= WIDTH)
                        nextX = 0;
                    nextPos.x = nextX;
                }

                reaction.users.remove(reaction.users.cache.filter(user => user.id !== this.gameEmbed.author.id).first().id).then(() => {
                    if (this.isLocInSnake(nextPos)) {
                        this.gameOver();
                    }
                    else {
                        this.snake.unshift(nextPos);
                        if (this.snake.length > this.snakeLength)
                            this.snake.pop();

                        this.step();
                    }
    }).catch(Error =>{
        this.gameOver();
        message.channel.send("I dont have permission to remove Reactions");
    })
      

                 
                       
                       
                    
            })
            .catch(collected => {
                this.gameOver();
            });
    }
}



  module.exports = {
    name: "snake",
    aliases: [""],
    category: "🎮 MiniGames",
    description: "Allows you to play a Game of Snake",
    usage: "snake --> Play the Game",
    run: async (client, message, args, cmduser, text, prefix) => {
        let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "MINIGAMES")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
        const { Snake } = require('weky');
        new Snake({
            message: message,
            embed: {
            title: 'Snake', //embed title
            color: "#2f3136", //embed color
            gameOverTitle: "Game Over", //game over embed title
            },
            emojis: {
            empty: '⬛', //zone emoji
            snakeBody: '♿', //snake
            food: '🍔', //food emoji
            //control
            up: '⬆️', 
            right: '⬅️',
            down: '⬇️',
            left: '➡️',
            },
            }).start()
        return
        new SnakeGame(client).newGame(message);
    }
  }