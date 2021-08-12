export interface SettingsData
{
    _id?: string;
    discordToken: string;
    twitchUsername: string;
    twitchToken: string;
    twitchChannels: string[];
    webserverPort: number;
}

export class Settings
{
    //Id of the reccord
    private _id: string;
    public get id(): string { return this._id; }
    public set id(value: string) { this._id = value; }

    //Token used for discord connection
    private _discordToken: string;
    public get discordToken(): string { return this._discordToken; }
    public set discordToken(value: string) { this._discordToken = value; }
    
    //Name of the use who survey the Twitch chat
    private _twitchUsername : string;
    public get twitchUsername() : string {return this._twitchUsername; }
    public set twitchUsername(value : string) { this._twitchUsername = value; }
    
    //Token used for the connection to the Twitch chat
    private _twitchToken : string;
    public get twitchToken() : string {return this._twitchToken; }
    public set twitchToken(value : string) { this._twitchToken = value; }
    
    //Twitch channels to survey
    private _twitchChannels : string[];
    public get twitchChannels() : string[] {return this._twitchChannels; }
    public set twitchChannels(value : string[]) { this._twitchChannels = value; }
    
    //Port used by the webserver
    private _webserverPort : number;
    public get webserverPort() : number {return this._webserverPort; }
    public set webserverPort(value : number) { this._webserverPort = value; }
    
    
    /**
     * Constructor
     * @param data
     */
    constructor(data: SettingsData | null = null)
    {
        this._id = "";
        this._discordToken = "";
        this._twitchUsername = "";
        this._twitchToken = "";
        this._twitchChannels = [];
        this._webserverPort = 80;

        this.fromArray(data);
    }

    /**
     * Imports data from JS object
     * @param data
     */
    fromArray(data: SettingsData | null)
    {
        this._id = data?._id ?? this._id;
        this._discordToken = data?.discordToken ?? this._discordToken;
        this._twitchUsername = data?.twitchUsername ?? this._twitchUsername;
        this._twitchToken = data?.twitchToken ?? this._twitchToken;
        this._twitchChannels = data?.twitchChannels ?? this._twitchChannels;
        this._webserverPort = data?.webserverPort ?? this.webserverPort;
    }

    /**
     * Exports data to JS object
     */
    toArray(): SettingsData
    {
        return {
            discordToken: this.discordToken,
            twitchUsername: this.twitchUsername,
            twitchToken: this.twitchToken,
            twitchChannels: this.twitchChannels,
            webserverPort: this.webserverPort
        };
    }
}