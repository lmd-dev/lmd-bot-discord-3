export interface SettingsData
{
    _id?: string;
    discordToken: string;
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

    /**
     * Constructor
     * @param data
     */
    constructor(data: SettingsData | null = null)
    {
        this._id = "";
        this._discordToken = "";

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
    }

    /**
     * Exports data to JS object
     */
    toArray(): SettingsData
    {
        return {
            discordToken: this.discordToken
        };
    }
}