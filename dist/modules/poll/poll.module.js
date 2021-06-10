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
class ModulePoll extends module_1.Module {
    constructor(discordAccess) {
        super("poll", discordAccess);
        this._letters = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"];
        this.addAction(new module_action_1.ModuleAction({ name: "Créer un sondage", callback: this.sendPoll.bind(this) }));
    }
    sendPoll(message, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.discordAccess.deleteMessage(message);
            if (parameters.length >= 3 && parameters.length <= 21) {
                const [question, ...responses] = parameters;
                let options = "";
                let letter = 97;
                for (const response of responses) {
                    options += `:regional_indicator_${String.fromCharCode(letter)}: ${response.replace(/"/g, "")}\n`;
                    ++letter;
                }
                if (message.guild) {
                    const sendedMessage = yield this.discordAccess.sendEmbededBlock(message.guild.id, message.channel.id, {
                        author: "Sondage",
                        title: question.replace(/"/g, ""),
                        description: options,
                        date: new Date()
                    });
                    for (let iReact = 97; iReact < letter; ++iReact) {
                        yield (sendedMessage === null || sendedMessage === void 0 ? void 0 : sendedMessage.react(this._letters[iReact - 97]));
                    }
                }
            }
        });
    }
}
exports.default = ModulePoll;
