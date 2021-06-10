"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YTChannelWatcher = void 0;
class YTChannelWatcher {
    /**
     * Constructor
     * @param data Initialization data
     */
    constructor(data = null) {
        this._id = "";
        this._youtubeChannelId = "";
        this._discordServerId = "";
        this._discordChannelId = "";
        this._publishedAfter = new Date();
        this.fromArray(data);
    }
    get id() { return this._id; }
    set id(value) { this._id = value; }
    get youtubeChannelId() { return this._youtubeChannelId; }
    set youtubeChannelId(value) { this._youtubeChannelId = value; }
    get discordServerId() { return this._discordServerId; }
    set discordServerId(value) { this._discordServerId = value; }
    get discordChannelId() { return this._discordChannelId; }
    set discordChannelId(value) { this._discordChannelId = value; }
    get publishedAfter() { return this._publishedAfter; }
    set publishedAfter(value) { this._publishedAfter = value; }
    /**
     * Imports data from JS object
     * @param data
     */
    fromArray(data) {
        var _a, _b, _c, _d;
        this._id = (_a = data === null || data === void 0 ? void 0 : data._id) !== null && _a !== void 0 ? _a : this._id;
        this._youtubeChannelId = (_b = data === null || data === void 0 ? void 0 : data.youtubeChannelId) !== null && _b !== void 0 ? _b : this._youtubeChannelId;
        this._discordServerId = (_c = data === null || data === void 0 ? void 0 : data.discordServerId) !== null && _c !== void 0 ? _c : this._discordServerId;
        this._discordChannelId = (_d = data === null || data === void 0 ? void 0 : data.discordChannelId) !== null && _d !== void 0 ? _d : this._discordChannelId;
        if (data === null || data === void 0 ? void 0 : data.publishedAfter)
            this._publishedAfter = new Date(data.publishedAfter);
    }
    /**
     * Exports data to JS object
     */
    toArray() {
        return {
            youtubeChannelId: this.youtubeChannelId,
            discordServerId: this.discordServerId,
            discordChannelId: this.discordChannelId,
            publishedAfter: this.publishedAfter.getTime()
        };
    }
}
exports.YTChannelWatcher = YTChannelWatcher;
