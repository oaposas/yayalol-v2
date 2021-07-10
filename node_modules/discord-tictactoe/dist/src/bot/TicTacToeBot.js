"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameChannel_1 = __importDefault(require("./channel/GameChannel"));
const GameCommand_1 = __importDefault(require("./GameCommand"));
class TicTacToeBot {
    constructor(configuration, eventHandler) {
        this._configuration = configuration;
        this._eventHandler = eventHandler;
        this._channels = [];
        this.command = new GameCommand_1.default(this, configuration.command, configuration.requestCooldownTime, configuration.allowedRoleIds);
    }
    get configuration() {
        return this._configuration;
    }
    get eventHandler() {
        return this._eventHandler;
    }
    attachToClient(client) {
        client.on('message', this.command.handle.bind(this.command));
    }
    handleMessage(message) {
        this.command.run(message);
    }
    getorCreateGameChannel(channel) {
        const found = this._channels.find(gameChannel => gameChannel.channel === channel);
        if (found) {
            return found;
        }
        else if (TicTacToeBot.hasPermissionsInChannel(channel)) {
            const instance = new GameChannel_1.default(this, channel);
            this._channels.push(instance);
            return instance;
        }
        else {
            return null;
        }
    }
    static hasPermissionsInChannel(channel) {
        var _a, _b, _c;
        return (_c = (_b = (_a = channel.guild.me) === null || _a === void 0 ? void 0 : _a.permissionsIn(channel)) === null || _b === void 0 ? void 0 : _b.has(TicTacToeBot.PERM_LIST)) !== null && _c !== void 0 ? _c : false;
    }
}
exports.default = TicTacToeBot;
TicTacToeBot.PERM_LIST = [
    'ADD_REACTIONS',
    'MANAGE_MESSAGES',
    'READ_MESSAGE_HISTORY',
    'SEND_MESSAGES',
    'VIEW_CHANNEL'
];
