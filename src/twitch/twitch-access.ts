import * as TMI from "tmi.js";

export enum TwitchEventType
{
    ready = "ready",
    message = "message"
}

export class TwitchAccess
{
    private _client: TMI.Client | null;

    //Event listeners collection
    private _eventListeners: Map<TwitchEventType, Function[]>;
    private get eventListeners(): Map<TwitchEventType, Function[]> { return this._eventListeners; }
    private set eventListeners(value: Map<TwitchEventType, Function[]>) { this._eventListeners = value; }

    constructor()
    {
        this._client = null;
        this._eventListeners = new Map<TwitchEventType, Function[]>();
    }

    /**
     * Starts the bot and connect it with Twitch
     */
    async start(username: string, token: string, ...channels: string[]): Promise<void>
    {
        return new Promise((resolve, reject) =>
        {
            const tmiOptions = {
                identity: {
                    username: username,
                    password: token
                },
                channels: channels
            };

            this._client = new TMI.Client(tmiOptions);

            this._client.on("connected", (address, port) => { 
                this.callListeners(TwitchEventType.ready, address, port); 
                resolve();
            });
            
            this._client.on("message", (channel, userstate, message, self) => { 
                this.callListeners(TwitchEventType.message, channel, userstate, message, self); 
            });

            this._client.connect();
        });
    }

    addListener(eventType: TwitchEventType, callback: Function)
    {
        let functions = this.eventListeners.get(eventType);

        if (!functions)
        {
            functions = [];
            this.eventListeners.set(eventType, functions);
        }

        functions.push(callback);
    }

    private callListeners(eventType: TwitchEventType, ...args: any[])
    {
        const functions = this.eventListeners.get(eventType);

        functions?.forEach((callback) =>
        {
            switch (eventType)
            {
                case TwitchEventType.ready: callback(); break;
                case TwitchEventType.message: callback(args[0], args[1], args[2], args[3]); break;
            }
        });
    }

    public say(channel: string, message: string)
    {
        this._client?.say(channel, message);
    }
}