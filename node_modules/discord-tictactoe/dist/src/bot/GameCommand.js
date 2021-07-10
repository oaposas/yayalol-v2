"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localize_1 = __importDefault(require("../config/localize"));
class GameCommand {
    constructor(bot, trigger, cooldown = 0, allowedRoleIds = []) {
        this.bot = bot;
        this.trigger = trigger;
        this.cooldown = cooldown;
        this.allowedRoleIds = allowedRoleIds;
        this.memberCooldownEndTimes = new Map();
    }
    handle(message) {
        if (this.trigger &&
            !message.author.bot &&
            message.channel.isText() &&
            message.content.startsWith(this.trigger)) {
            this.run(message);
        }
    }
    run(message) {
        var _a;
        const channel = this.bot.getorCreateGameChannel(message.channel);
        const mentionned = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        if (channel == null) {
            const name = message.channel.name;
            console.error(`Cannot operate because of a lack of permissions in the channel #${name}`);
            return;
        }
        if (channel.gameRunning ||
            this.isRefusedDueToRoles(message.member) ||
            this.isRefusedDueToCooldown(message.author)) {
            return;
        }
        if (mentionned) {
            if (GameCommand.isUserReadyToPlay(mentionned, message)) {
                channel.sendDuelRequest(message, mentionned).catch(console.error);
            }
            else {
                message.reply(localize_1.default.__('duel.unknown-user')).catch(console.error);
            }
        }
        else {
            channel.createGame(message.member).catch(console.error);
        }
    }
    isRefusedDueToRoles(member) {
        return (member != null &&
            this.allowedRoleIds.length > 0 &&
            !member.permissions.has('ADMINISTRATOR') &&
            !member.roles.cache.some(role => this.allowedRoleIds.includes(role.id)));
    }
    isRefusedDueToCooldown(author) {
        var _a;
        if (this.cooldown > 0) {
            if (((_a = this.memberCooldownEndTimes.get(author.id)) !== null && _a !== void 0 ? _a : 0) > Date.now()) {
                return true;
            }
            else {
                this.memberCooldownEndTimes.set(author.id, Date.now() + this.cooldown * 1000);
            }
        }
        return false;
    }
    static isUserReadyToPlay(invited, invitation) {
        return (invited &&
            !invited.user.bot &&
            invitation.member !== invited &&
            invited.permissionsIn(invitation.channel).has('VIEW_CHANNEL'));
    }
}
exports.default = GameCommand;
