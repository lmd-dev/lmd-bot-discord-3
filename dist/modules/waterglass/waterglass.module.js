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
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("../module");
const module_action_1 = require("../module-action");
class ModuleWaterGlass extends module_1.Module {
    /**
     * Constructor
     */
    constructor(discordAccess) {
        super("WaterGlass", discordAccess);
        this.addAction(new module_action_1.ModuleAction({ name: "Servir un verre", callback: (message, parameters) => { this.displayWaterGlass(message, parameters); } }));
    }
    /**
     * Replaces the message of the command by the picture of a glass of water
     * @param message
     * @param parameters
     */
    displayWaterGlass(message, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.discordAccess.deleteMessage(message);
            if (message && message.guild) {
                const sendedMessage = yield this.discordAccess.sendFileOnChannel(message.guild.id, message.channel.id, __dirname + '/assets/img/verredeau.png', 'verredeau.png');
            }
        });
    }
}
exports.default = ModuleWaterGlass;
