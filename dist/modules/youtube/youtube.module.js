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
const Youtube = require("lmd-youtube");
const module_1 = require("../module");
const yt_channel_watcher_1 = require("./data/yt-channel-watcher");
const yt_settings_1 = require("./data/yt-settings");
const data_access_1 = require("../../dao/data-access");
class ModuleYoutube extends module_1.Module {
    /**
     * Constructor
     */
    constructor(discordAccess, twitchAccess, webServer) {
        super({
            name: "YouTube",
            directoryName: "youtube",
            discordAccess: discordAccess,
            twitchAccess: twitchAccess
        });
        this._settings = new yt_settings_1.YTSettings();
        this._channelWatchers = [];
        this._refreshTimer = null;
        this.initialize();
    }
    get channelWatchers() { return this._channelWatchers; }
    get settings() { return this._settings; }
    get refreshTimer() { return this._refreshTimer; }
    /**
     * Initialize data
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            yield this.loadWatchers();
            this.refreshYoutubeVideos();
        });
    }
    /**
     * Adds a watcher to the collection and save it on the storage
     * @param watcher
     */
    addWatcher(watcher) {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = yield data_access_1.DataAccess.getInstance("youtube-channel-watcher", yt_channel_watcher_1.YTChannelWatcher);
            if (yield dao.insert(watcher)) {
                this.channelWatchers.push(watcher);
            }
        });
    }
    /**
     * Loads watchers from the storage
     */
    loadWatchers() {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = yield data_access_1.DataAccess.getInstance("youtube-channel-watcher", yt_channel_watcher_1.YTChannelWatcher);
            this._channelWatchers = yield dao.findAll();
        });
    }
    /**
     * Updates watchers on the storage
     */
    updateWatchers() {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = yield data_access_1.DataAccess.getInstance("youtube-channel-watcher", yt_channel_watcher_1.YTChannelWatcher);
            for (const watcher of this._channelWatchers) {
                yield dao.update(watcher);
            }
        });
    }
    /**
     * Loads module settings
     */
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = yield data_access_1.DataAccess.getInstance("youtube-settings", yt_settings_1.YTSettings);
            const settings = yield dao.findOne({});
            if (settings)
                this._settings = settings;
        });
    }
    /**
     * Updates module settings
     */
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = yield data_access_1.DataAccess.getInstance("youtube-settings", yt_settings_1.YTSettings);
            yield dao.update(this.settings);
        });
    }
    /**
     * Refresh Youtube videos published on LMD Channel
     */
    refreshYoutubeVideos() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const watcher of this.channelWatchers) {
                yield this.watchYoutubeChannel(watcher);
            }
            yield this.updateWatchers();
            //Retry in one hour
            this._refreshTimer = setTimeout(() => { this.refreshYoutubeVideos(); }, 3600000);
        });
    }
    /**
     * Processes a watcher
     * @param watcher
     */
    watchYoutubeChannel(watcher) {
        return __awaiter(this, void 0, void 0, function* () {
            const youtube = Youtube.getInstance(this.settings.apiKey);
            const channels = yield youtube.channels.list({ id: watcher.youtubeChannelId, part: "snippet" });
            if (channels.length === 0)
                return;
            const [channel] = channels;
            //Searches for latest videos (published after the last bot update)
            const videos = yield channel.searchVideos({ part: "snippet", order: "date", publishedAfter: watcher.publishedAfter });
            for (const video of videos.reverse()) {
                //If video wad published after the last known publication date (not equal)
                if (video.publishedAt > watcher.publishedAfter) {
                    watcher.publishedAfter = video.publishedAt;
                    //Publishes video link on discord channel
                    this.discordAccess.writeOnChannel(watcher.discordServerId, watcher.discordChannelId, `${video.title} https://youtu.be/${video.id}`);
                }
            }
        });
    }
}
exports.default = ModuleYoutube;
