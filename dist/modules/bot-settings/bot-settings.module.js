"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("../module");
class ModuleBotSettings extends module_1.Module {
    /**
     * Constructor
     */
    constructor(discordAccess) {
        super("BotSettings", discordAccess);
        this.jsFiles.push("bot-settings/admin/test.client.js");
    }
}
exports.default = ModuleBotSettings;
