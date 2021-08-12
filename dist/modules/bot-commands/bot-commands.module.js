"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("../module");
class ModuleBotSettings extends module_1.Module {
    /**
     * Constructor
     */
    constructor(discordAccess, twitchAccess, webServer) {
        super({
            name: "Commandes",
            directoryName: "bot-commands",
            discordAccess: discordAccess,
            twitchAccess: twitchAccess,
            entryPointClassName: "BotCommandsEntryPoint",
            entryPointFileName: "entry-point.client.js",
            hasBackOffice: true
        });
    }
}
exports.default = ModuleBotSettings;
