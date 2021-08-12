"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("../module");
const module_action_1 = require("../module-action");
class ModuleTWSpeaker extends module_1.Module {
    /**
     * Constructor
     */
    constructor(discordAccess, twitchAccess, webServer) {
        super({
            name: "TWSpeaker",
            directoryName: "tw-speaker",
            discordAccess: discordAccess,
            twitchAccess: twitchAccess,
            webServer: webServer
        });
        this._channel = "";
        this.addTwitchAction(new module_action_1.ModuleAction({
            name: "Regarde le chat !",
            callback: (channel, userstate, message, self) => {
                this.askToLookAtChat();
            }
        }));
        this.addTwitchAction(new module_action_1.ModuleAction({
            name: "Change de scène OBS !",
            callback: (channel, userstate, message, self) => {
                this.askToChangeScene();
            }
        }));
    }
    askToLookAtChat() {
        var _a, _b;
        (_b = (_a = this.webServer) === null || _a === void 0 ? void 0 : _a.websockets) === null || _b === void 0 ? void 0 : _b.emit("lookatchat");
    }
    askToChangeScene() {
        var _a, _b;
        (_b = (_a = this.webServer) === null || _a === void 0 ? void 0 : _a.websockets) === null || _b === void 0 ? void 0 : _b.emit("changescene");
    }
}
exports.default = ModuleTWSpeaker;
