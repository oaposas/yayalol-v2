"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDiscordName = void 0;
const discord_js_1 = require("discord.js");
const formatDiscordName = (name) => discord_js_1.Util.removeMentions(name.replace(/`/g, ''));
exports.formatDiscordName = formatDiscordName;
