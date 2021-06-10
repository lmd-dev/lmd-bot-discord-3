export interface YTChannelWatcherData
{
    _id?: string;
    youtubeChannelId: string;
    discordServerId: string;
    discordChannelId: string;
    publishedAfter: number;
}

export class YTChannelWatcher
{
    //ID of the watcher
    private _id: string;
    public get id(): string { return this._id; }
    public set id(value: string) { this._id = value; }

    //Id of the youtube channel to watch
    private _youtubeChannelId: string;
    public get youtubeChannelId(): string { return this._youtubeChannelId; }
    public set youtubeChannelId(value: string) { this._youtubeChannelId = value; }

    //Id of the discord guild to emit message
    private _discordServerId: string;
    public get discordServerId(): string { return this._discordServerId; }
    public set discordServerId(value: string) { this._discordServerId = value; }

    //Id of the discord channel to emit message
    private _discordChannelId: string;
    public get discordChannelId(): string { return this._discordChannelId; }
    public set discordChannelId(value: string) { this._discordChannelId = value; }

    //Minimum publication date of videos to display
    private _publishedAfter: Date;
    public get publishedAfter(): Date { return this._publishedAfter; }
    public set publishedAfter(value: Date) { this._publishedAfter = value; }

    /**
     * Constructor 
     * @param data Initialization data
     */
    constructor(data: YTChannelWatcherData | null = null)
    {
        this._id = "";
        this._youtubeChannelId = "";
        this._discordServerId = "";
        this._discordChannelId = "";
        this._publishedAfter = new Date();

        this.fromArray(data);
    }

    /**
     * Imports data from JS object
     * @param data
     */
    fromArray(data: YTChannelWatcherData | null)
    {
        this._id = data?._id ?? this._id;
        this._youtubeChannelId = data?.youtubeChannelId ?? this._youtubeChannelId;
        this._discordServerId = data?.discordServerId ?? this._discordServerId;
        this._discordChannelId = data?.discordChannelId ?? this._discordChannelId;

        if (data?.publishedAfter)
            this._publishedAfter = new Date(data.publishedAfter);
    }

    /**
     * Exports data to JS object
     */
    toArray(): YTChannelWatcherData
    {
        return {
            youtubeChannelId: this.youtubeChannelId,
            discordServerId: this.discordServerId,
            discordChannelId: this.discordChannelId,
            publishedAfter: this.publishedAfter.getTime()
        };
    }
}