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
Object.defineProperty(exports, "__esModule", { value: true });
const GameBoardBuilder_1 = __importDefault(require("./GameBoardBuilder"));
const AI_1 = __importDefault(require("../../tictactoe/AI"));
const Game_1 = __importDefault(require("../../tictactoe/Game"));
class GameBoardMessage {
    constructor(channel, member1, member2, configuration) {
        this.channel = channel;
        this.game = new Game_1.default();
        this._entities = [member1, member2];
        this.reactionsLoaded = false;
        this.configuration = configuration;
    }
    get entities() {
        return this._entities;
    }
    static reactionToMove(reaction) {
        return GameBoardBuilder_1.default.MOVE_REACTIONS.indexOf(reaction);
    }
    attemptNextTurn() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentEntity = this.getEntity(this.game.currentPlayer);
            if (currentEntity instanceof AI_1.default) {
                const result = currentEntity.operate(this.game);
                if (result.move !== undefined) {
                    yield this.playTurn(result.move);
                }
            }
            else {
                this.awaitMove();
            }
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = new GameBoardBuilder_1.default()
                .withTitle(this.entities[0], this.entities[1])
                .withBoard(this.game.boardSize, this.game.board)
                .withEntityPlaying(this.reactionsLoaded ? this.getEntity(this.game.currentPlayer) : undefined);
            if (this.game.finished) {
                builder.withEndingMessage(this.getEntity(this.game.winner));
            }
            if (!this.message) {
                this.message = yield this.channel.channel.send(builder.toString());
                for (const reaction of GameBoardBuilder_1.default.MOVE_REACTIONS) {
                    try {
                        yield this.message.react(reaction);
                    }
                    catch (_a) {
                        yield this.onExpire();
                        return;
                    }
                }
                this.reactionsLoaded = true;
                yield this.update();
            }
            else {
                yield this.message.edit(builder.toString());
            }
        });
    }
    getEntity(index) {
        return index && index > 0 ? this._entities[index - 1] : undefined;
    }
    onMoveSelected(collected) {
        return __awaiter(this, void 0, void 0, function* () {
            const move = GameBoardBuilder_1.default.MOVE_REACTIONS.indexOf(collected.first().emoji.name);
            yield this.playTurn(move);
        });
    }
    playTurn(move) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            this.game.updateBoard(this.game.currentPlayer, move);
            if (this.game.finished) {
                const winner = this.getEntity(this.game.winner);
                if ((_a = this.configuration) === null || _a === void 0 ? void 0 : _a.gameBoardDelete) {
                    yield ((_b = this.message) === null || _b === void 0 ? void 0 : _b.delete());
                    yield this.channel.channel.send(new GameBoardBuilder_1.default().withEndingMessage(winner).toString());
                }
                else {
                    yield ((_d = (_c = this.message) === null || _c === void 0 ? void 0 : _c.reactions) === null || _d === void 0 ? void 0 : _d.removeAll());
                    yield this.update();
                }
                this.channel.endGame(winner);
            }
            else {
                this.game.nextPlayer();
                yield this.update();
                yield this.attemptNextTurn();
            }
        });
    }
    onExpire() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.message && this.message.deletable && !this.message.deleted) {
                yield this.message.delete();
            }
            yield this.channel.expireGame();
        });
    }
    awaitMove() {
        var _a, _b;
        const expireTime = (_b = (_a = this.configuration) === null || _a === void 0 ? void 0 : _a.gameExpireTime) !== null && _b !== void 0 ? _b : 30;
        if (!this.message || this.message.deleted)
            return;
        this.message
            .awaitReactions((reaction, user) => {
            var _a;
            return (user.id === ((_a = this.getEntity(this.game.currentPlayer)) === null || _a === void 0 ? void 0 : _a.id) &&
                this.game.isMoveValid(GameBoardMessage.reactionToMove(reaction.emoji.name)));
        }, { max: 1, time: expireTime * 1000, errors: ['time'] })
            .then(this.onMoveSelected.bind(this))
            .catch(this.onExpire.bind(this));
    }
}
exports.default = GameBoardMessage;
