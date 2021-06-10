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
const discord_access_1 = require("../discord/discord-access");
const modules_manager_1 = require("../modules/modules-manager");
const commands_manager_1 = require("../commands/commands-manager");
const settings_1 = require("./settings");
const data_access_1 = require("../dao/data-access");
const bot_webserver_1 = require("../webserver/bot-webserver");
class BotApplication {
    /**
     * Constructor
     */
    constructor() {
        this._settings = new settings_1.Settings();
        this._discordAccess = new discord_access_1.DiscordAccess();
        this._commandsManager = new commands_manager_1.CommandsManager();
        this._modulesManager = new modules_manager_1.ModulesManager(this.discordAccess);
        this._webServer = new bot_webserver_1.BotWebServer(this._modulesManager);
        this.initialize();
    }
    get settings() { return this._settings; }
    get discordAccess() { return this._discordAccess; }
    get commandsManager() { return this._commandsManager; }
    get modulesManager() { return this._modulesManager; }
    get webServer() { return this._webServer; }
    /**
     * Initialize application
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            yield this.initializeDiscordAccess();
            yield this.initializeWebServer();
            yield this.commandsManager.loadCommands();
            yield this.modulesManager.loadModules();
            this.webServer.start();
        });
    }
    /**
     * Initialize discord access settings
     */
    initializeDiscordAccess() {
        return __awaiter(this, void 0, void 0, function* () {
            this.discordAccess.addListener('ready', () => { console.log("Discord access ready"); });
            this.discordAccess.addListener('message', (message) => { this.processMessage(message); });
            yield this.discordAccess.start(this.settings.discordToken);
        });
    }
    initializeWebServer() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    /**
     * Loads application settings
     */
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = yield data_access_1.DataAccess.getInstance("settings", settings_1.Settings);
            const settings = yield dao.findOne({});
            if (settings)
                this._settings = settings;
        });
    }
    /**
     * Updates application settings
     */
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = yield data_access_1.DataAccess.getInstance("settings", settings_1.Settings);
            yield dao.update(this.settings);
        });
    }
    /**
     * Processes a message sended from discord
     * @param message
     */
    processMessage(message) {
        if (message.deleted === false && message.author.bot === false && message.content.charAt(0) === '!')
            this.processCommand(message);
    }
    /**
     * Processes a message containing a command sended from discord
     * @param message
     */
    processCommand(message) {
        const items = message.content.match(/"([^"]*)"|([^! ]+)/g);
        if (items && items.length >= 1) {
            const [commandName, ...params] = items;
            const command = this._commandsManager.find(commandName);
            if (command)
                this.modulesManager.executeCommand(command, message, params);
        }
    }
}
exports.default = BotApplication;
