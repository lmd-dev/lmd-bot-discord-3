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
        this.fromArray(data);
    }
    get id() { return this._id; }
    set id(value) { this._id = value; }
    get discordToken() { return this._discordToken; }
    set discordToken(value) { this._discordToken = value; }
    /**
     * Imports data from JS object
     * @param data
     */
    fromArray(data) {
        var _a, _b;
        this._id = (_a = data === null || data === void 0 ? void 0 : data._id) !== null && _a !== void 0 ? _a : this._id;
        this._discordToken = (_b = data === null || data === void 0 ? void 0 : data.discordToken) !== null && _b !== void 0 ? _b : this._discordToken;
    }
    /**
     * Exports data to JS object
     */
    toArray() {
        return {
            discordToken: this.discordToken
        };
    }
}
exports.Settings = Settings;
