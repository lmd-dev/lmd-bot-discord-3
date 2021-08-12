"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
class Settings {
    /**
     * Constructor
     * @param data
     */
    constructor(data = null) {
        this._id = "";
        this._discordToken = "";
        this._twitchUsername = "";
        this._twitchToken = "";
        this._twitchChannels = [];
        this._webserverPort = 80;
        this.fromArray(data);
    }
    get id() { return this._id; }
    set id(value) { this._id = value; }
    get discordToken() { return this._discordToken; }
    set discordToken(value) { this._discordToken = value; }
    get twitchUsername() { return this._twitchUsername; }
    set twitchUsername(value) { this._twitchUsername = value; }
    get twitchToken() { return this._twitchToken; }
    set twitchToken(value) { this._twitchToken = value; }
    get twitchChannels() { return this._twitchChannels; }
    set twitchChannels(value) { this._twitchChannels = value; }
    get webserverPort() { return this._webserverPort; }
    set webserverPort(value) { this._webserverPort = value; }
    /**
     * Imports data from JS object
     * @param data
     */
    fromArray(data) {
        var _a, _b, _c, _d, _e, _f;
        this._id = (_a = data === null || data === void 0 ? void 0 : data._id) !== null && _a !== void 0 ? _a : this._id;
        this._discordToken = (_b = data === null || data === void 0 ? void 0 : data.discordToken) !== null && _b !== void 0 ? _b : this._discordToken;
        this._twitchUsername = (_c = data === null || data === void 0 ? void 0 : data.twitchUsername) !== null && _c !== void 0 ? _c : this._twitchUsername;
        this._twitchToken = (_d = data === null || data === void 0 ? void 0 : data.twitchToken) !== null && _d !== void 0 ? _d : this._twitchToken;
        this._twitchChannels = (_e = data === null || data === void 0 ? void 0 : data.twitchChannels) !== null && _e !== void 0 ? _e : this._twitchChannels;
        this._webserverPort = (_f = data === null || data === void 0 ? void 0 : data.webserverPort) !== null && _f !== void 0 ? _f : this.webserverPort;
    }
    /**
     * Exports data to JS object
     */
    toArray() {
        return {
            discordToken: this.discordToken,
            twitchUsername: this.twitchUsername,
            twitchToken: this.twitchToken,
            twitchChannels: this.twitchChannels,
            webserverPort: this.webserverPort
        };
    }
}
exports.Settings = Settings;
