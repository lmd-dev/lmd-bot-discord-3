import Youtube = require('lmd-youtube');
import { Module } from "../module";
import { YTChannelWatcher } from "./data/yt-channel-watcher";
import { YTSettings } from "./data/yt-settings";
import { DataAccess } from "../../dao/data-access";
import { DiscordAccess } from "../../discord/discord-access";

export default class ModuleYoutube extends Module
{
    //Youtube channels to survey
    private _channelWatchers: YTChannelWatcher[];
    public get channelWatchers(): YTChannelWatcher[] { return this._channelWatchers; }

    //Youtube module settings
    private _settings: YTSettings;
    public get settings(): YTSettings { return this._settings; }

    //Timer used to watch videos
    private _refreshTimer: NodeJS.Timeout | null;
    public get refreshTimer(): NodeJS.Timeout | null { return this._refreshTimer; }

    /**
     * Constructor
     */
    constructor(discordAccess: DiscordAccess)
    {
        super("YouTube", discordAccess);

        this._settings = new YTSettings();
        this._channelWatchers = [];
        this._refreshTimer = null;

        this.initialize();
    }

    /**
     * Initialize data
     */
    async initialize()
    {
        await this.loadSettings();
        await this.loadWatchers();

        this.refreshYoutubeVideos();
    }

    /**
     * Adds a watcher to the collection and save it on the storage
     * @param watcher
     */
    async addWatcher(watcher: YTChannelWatcher)
    {
        const dao = await DataAccess.getInstance("youtube-channel-watcher", YTChannelWatcher);

        if (await dao.insert(watcher))
        {
            this.channelWatchers.push(watcher);
        }
    }

    /**
     * Loads watchers from the storage
     */
    private async loadWatchers()
    {
        const dao = await DataAccess.getInstance("youtube-channel-watcher", YTChannelWatcher);
        this._channelWatchers = await dao.findAll();
    }

    /**
     * Updates watchers on the storage
     */
    private async updateWatchers()
    {
        const dao = await DataAccess.getInstance("youtube-channel-watcher", YTChannelWatcher);
        for (const watcher of this._channelWatchers)
        {
            await dao.update(watcher);
        }
    }

    /**
     * Loads module settings
     */
    private async loadSettings()
    {
        const dao = await DataAccess.getInstance("youtube-settings", YTSettings);
        const settings = await dao.findOne({});

        if(settings)
            this._settings = settings;
    }

    /**
     * Updates module settings
     */
    private async saveSettings()
    {
        const dao = await DataAccess.getInstance("youtube-settings", YTSettings);
        await dao.update(this.settings);
    }

    /**
     * Refresh Youtube videos published on LMD Channel
     */
    private async refreshYoutubeVideos()
    {
        for (const watcher of this.channelWatchers)
        {
            await this.watchYoutubeChannel(watcher);
        }

        await this.updateWatchers();

        //Retry in one hour
        this._refreshTimer = setTimeout(() => { this.refreshYoutubeVideos() }, 3600000);
    }

    /**
     * Processes a watcher
     * @param watcher
     */
    private async watchYoutubeChannel(watcher: YTChannelWatcher)
    {
        const youtube = Youtube.getInstance(this.settings.apiKey);
        const channels = await youtube.channels.list({ id: watcher.youtubeChannelId, part: "snippet" });
        if (channels.length === 0)
            return;

        const [channel] = channels;

        //Searches for latest videos (published after the last bot update)
        const videos = await channel.searchVideos({ part: "snippet", order: "date", publishedAfter: watcher.publishedAfter });

        for(const video of videos.reverse())
        {
            //If video wad published after the last known publication date (not equal)
            if (video.publishedAt > watcher.publishedAfter)
            {
                watcher.publishedAfter = video.publishedAt;

                //Publishes video link on discord channel
                this.discordAccess.writeOnChannel(
                    watcher.discordServerId,
                    watcher.discordChannelId,
                    `${video.title} https://youtu.be/${video.id}`
                );
            }
        }
    }
}