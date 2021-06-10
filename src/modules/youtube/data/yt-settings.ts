export interface YTSettingsData
{
    _id?: string;
    apiKey: string;
}

export class YTSettings
{
    //Id of the settings reccord
    private _id: string;
    public get id(): string { return this._id; }
    public set id(value: string) { this._id = value; }

    //Youtube API Key
    private _apiKey: string;
    public get apiKey(): string { return this._apiKey; }
    public set apiKey(value: string) { this._apiKey = value; }

    /**
     * Constructor
     * @param data Initialization data
     */
    constructor(data: YTSettingsData | null = null)
    {
        this._id = "";
        this._apiKey = "";

        this.fromArray(data);
    }

    /**
     * Imports data from JS object
     * @param data
     */
    fromArray(data: YTSettingsData | null)
    {
        this._id = data?._id ?? this._id;
        this._apiKey = data?.apiKey ?? this._apiKey;
    }

    /**
     * Exports data to JS object
     */
    toArray(): YTSettingsData
    {
        return {
            apiKey: this.apiKey
        };
    }
}