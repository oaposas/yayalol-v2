"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = require("discord.js");
const EventHandler_1 = __importDefault(require("./bot/EventHandler"));
const TicTacToeBot_1 = __importDefault(require("./bot/TicTacToeBot"));
const localize_1 = __importDefault(require("./config/localize"));
class TicTacToe {
    constructor(config, client) {
        this.config = config !== null && config !== void 0 ? config : {};
        this.eventHandler = new EventHandler_1.default();
        this.bot = new TicTacToeBot_1.default(this.config, this.eventHandler);
        if (this.config.language) {
            localize_1.default.setLanguage(this.config.language);
        }
        if (client) {
            this.attach(client);
        }
    }
    login(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginToken = token !== null && token !== void 0 ? token : this.config.token;
            if (!loginToken) {
                throw new Error('Bot token needed to start Discord client.');
            }
            else if (!this.config.command) {
                throw new Error('Game command needed to start Discord client.');
            }
            const client = new discord_js_1.Client();
            this.bot.attachToClient(client);
            yield client.login(loginToken);
        });
    }
    attach(client) {
        this.bot.attachToClient(client);
    }
    handleMessage(message) {
        this.bot.handleMessage(message);
    }
    on(eventName, listener) {
        this.eventHandler.registerListener(eventName, listener);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.login();
        });
    }
}
module.exports = TicTacToe;
