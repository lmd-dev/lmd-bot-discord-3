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
const twitch_access_1 = require("../twitch/twitch-access");
/**
 * This is Michelle ! :-)
 */
class BotApplication {
    /**
     * Constructor
     */
    constructor() {
        this._settings = new settings_1.Settings();
        this._discordAccess = new discord_access_1.DiscordAccess();
        this._twitchAccess = new twitch_access_1.TwitchAccess();
        this._commandsManager = new commands_manager_1.CommandsManager();
        this._webServer = new bot_webserver_1.BotWebServer();
        this._modulesManager = new modules_manager_1.ModulesManager(this.discordAccess, this.twitchAccess, this.webServer);
        this.initialize();
    }
    get settings() { return this._settings; }
    get discordAccess() { return this._discordAccess; }
    get twitchAccess() { return this._twitchAccess; }
    get webServer() { return this._webServer; }
    get commandsManager() { return this._commandsManager; }
    get modulesManager() { return this._modulesManager; }
    /**
     * Initialize application
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            yield this.initializeDiscordAccess();
            yield this.initializeTwitchAccess();
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
            this.discordAccess.addListener(discord_access_1.DiscordEventType.ready, () => { console.log("Discord access ready"); });
            this.discordAccess.addListener(discord_access_1.DiscordEventType.message, (message) => { this.processDiscordMessage(message); });
            yield this.discordAccess.start(this.settings.discordToken);
        });
    }
    /**
     * Initialize twitch access settings
     */
    initializeTwitchAccess() {
        return __awaiter(this, void 0, void 0, function* () {
            this.twitchAccess.addListener(twitch_access_1.TwitchEventType.ready, () => { console.log("Twitch access ready"); });
            this.twitchAccess.addListener(twitch_access_1.TwitchEventType.message, (channel, userstate, message, self) => { this.processTwitchMessage(channel, userstate, message, self); });
            yield this.twitchAccess.start(this.settings.twitchUsername, this.settings.twitchToken, ...this.settings.twitchChannels);
        });
    }
    /**
     * Initialize the webserver settings
     */
    initializeWebServer() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.webServer.initialize({
                http: {
                    port: (_a = this.settings.webserverPort) !== null && _a !== void 0 ? _a : 80,
                    enable: true
                },
                sessions: {
                    enable: true,
                    passPhrase: "lmd-bot"
                },
                websockets: {
                    enable: true,
                    options: {
                        cors: {
                            origin: "*",
                            methods: ["GET", "POST"]
                        }
                    }
                }
            }, this.modulesManager);
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
     * Processes a message sended from discord
     * @param message
     */
    processDiscordMessage(message) {
        if (message.deleted === false && message.author.bot === false && message.content.charAt(0) === '!')
            this.processDiscordCommand(message);
    }
    /**
     * Processes a message sended from twitch
     * @param message
     */
    processTwitchMessage(channel, userstate, message, self) {
        this.processTwitchCommand(channel, userstate, message, self);
    }
    /**
     * Processes a message containing a command sended from discord
     * @param message
     */
    processDiscordCommand(message) {
        const items = message.content.match(/"([^"]*)"|([^! ]+)/g);
        if (items && items.length >= 1) {
            const [commandName, ...params] = items;
            const command = this._commandsManager.find(commandName);
            if (command)
                this.modulesManager.executeDiscordCommand(command, message, params);
        }
    }
    /**
     * Processes a message containing a command sended from twitch
     * @param message
     */
    processTwitchCommand(channel, userstate, message, self) {
        let command = this._commandsManager.find(userstate["custom-reward-id"]);
        if (!command) {
            const items = message.match(/"([^"]*)"|([^! ]+)/g);
            if (items && items.length >= 1) {
                const [commandName, ...params] = items;
                command = this._commandsManager.find(commandName);
                if (command)
                    this.modulesManager.executeTwitchCommand(command, channel, userstate, message, self, params);
            }
        }
        else
            this.modulesManager.executeTwitchCommand(command, channel, userstate, message, self, []);
    }
}
exports.default = BotApplication;
