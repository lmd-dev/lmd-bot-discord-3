"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCommand = void 0;
class GameCommand {
    constructor() {
        this._enabled = true;
    }
    process(channel, context, message) {
        if (this._enabled) {
            this._enabled = false;
            const items = message.split(" ");
            if (items.length === 1) {
                //this._bot.emit("box");
            }
            else if (items.length === 3) {
                //this._bot.emit("box", { x: parseInt(items[1]), y: parseInt(items[2]) });
            }
            setTimeout(() => { this._enabled = true; }, 500);
        }
    }
}
exports.GameCommand = GameCommand;
