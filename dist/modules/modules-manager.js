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
exports.ModulesManager = void 0;
const fs = require("fs/promises");
const constants_1 = require("constants");
class ModulesManager {
    /**
     * Constructor
     */
    constructor(discordAccess, twitchAccess, webServer) {
        this._discordAccess = discordAccess;
        this._twitchAccess = twitchAccess;
        this._webServer = webServer;
        this._modules = new Map();
    }
    get discordAccess() { return this._discordAccess; }
    get twitchAccess() { return this._twitchAccess; }
    get webServer() { return this._webServer; }
    get modules() { return this._modules; }
    set modules(value) { this._modules = value; }
    /**
     * Load existing modules
     */
    loadModules() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield fs.readdir(`${__dirname}`, { withFileTypes: true });
            for (const item of items) {
                if (item.isDirectory())
                    this.loadModule(item);
            }
        });
    }
    loadModule(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name: moduleName } = item;
            const folder = `${__dirname}/${moduleName}`;
            const path = `${folder}/${moduleName}.module.js`;
            try {
                yield fs.access(path, constants_1.F_OK);
                const { default: modulePackage } = yield Promise.resolve().then(() => require(path));
                const module = new modulePackage(this.discordAccess, this.twitchAccess, this.webServer);
                this._modules.set(module.name, module);
            }
            catch (error) {
                console.error(`${moduleName} is not a valid module.`);
            }
        });
    }
    executeDiscordCommand(command, message, parameters) {
        const module = this._modules.get(command.moduleName);
        module === null || module === void 0 ? void 0 : module.executeDiscordCommand(command.actionName, message, parameters);
    }
    executeTwitchCommand(command, channel, userstate, message, self, parameters) {
        const module = this._modules.get(command.moduleName);
        module === null || module === void 0 ? void 0 : module.executeTwitchCommand(command.actionName, channel, userstate, message, self, parameters);
    }
}
exports.ModulesManager = ModulesManager;
