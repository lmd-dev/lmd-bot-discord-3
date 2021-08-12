import { ModuleAction } from "./module-action";
import * as Discord from "discord.js";
import * as TMI from "tmi.js";
import { DiscordAccess } from "../discord/discord-access";
import { TwitchAccess } from "../twitch/twitch-access";
import { WebServer } from "lmd-webserver/dist/webserver";

export interface ModuleOptions
{
    name: string;
    directoryName: string;
    discordAccess: DiscordAccess;
    twitchAccess: TwitchAccess;
    webServer?: WebServer;
    entryPointClassName?: string;
    entryPointFileName?: string;
    hasBackOffice?: boolean;
}
export class Module 
{
    //Discord access
    private readonly _discordAccess: DiscordAccess;
    public get discordAccess(): DiscordAccess { return this._discordAccess; }

    private readonly _twitchAccess : TwitchAccess;
    public get twitchAccess() : TwitchAccess {return this._twitchAccess; }

    private readonly _webServer : WebServer |null;
    public get webServer() : WebServer | null {return this._webServer; }

    //Name of the module
    private _name: string;
    public get name(): string { return this._name; }

    //Name of the module directory
    private readonly _directoryName: string;
    public get directoryName(): string { return this._directoryName; };
    
    //Name of the entry point class of the module (client side)
    private readonly _entryPointClassName: string | null;
    public get entryPointClassName(): string | null { return this._entryPointClassName; }

    //Name of the file containing the entry point class
    private readonly _entryPointFileName: string | null;
    public get entryPointFileName(): string | null {return this._entryPointFileName; }

    //Available discord actions
    private readonly _discordActions: Map<string, ModuleAction>;
    public get discordActions(): Map<string, ModuleAction> { return this._discordActions; }

    //Available discord actions
    private readonly _twitchActions: Map<string, ModuleAction>;
    public get twitchActions(): Map<string, ModuleAction> { return this._twitchActions; }

    //Is the module disabled
    private _disabled: boolean;
    public get disabled(): boolean { return this._disabled; }
    public set disabled(value: boolean) { this._disabled = value; }

    private _hasBackOffice : boolean;
    public get hasBackOffice() : boolean {return this._hasBackOffice; }
    public set hasBackOffice(value : boolean) { this._hasBackOffice = value; }

    /**
     * Constructor
     * @param name Name of the module 
     */
    constructor(options: ModuleOptions)
    {
        //name: string, directoryName: string, discordAccess: DiscordAccess, entryPointClassName: string | null = null, entryPointFileName: string | null = null) {
        this._name = options.name;
        this._directoryName = options.directoryName;
        this._entryPointClassName = options.entryPointClassName ?? null;
        this._entryPointFileName = options.entryPointFileName ?? null;
        this._discordAccess = options.discordAccess;
        this._twitchAccess = options.twitchAccess;
        this._webServer = options.webServer ?? null;
        this._hasBackOffice = options.hasBackOffice ?? false;
        this._discordActions = new Map();
        this._twitchActions = new Map();
        this._disabled = false;
    }

    /**
     * Adds an action
     */
    addDiscordAction(action: ModuleAction) 
    {
        this._discordActions.set(action.name, action);
    }

    /**
     * Adds an action
     */
    addTwitchAction(action: ModuleAction) 
    {
        this._twitchActions.set(action.name, action);
    }

    /**
     * Execute an action of the module
     * @param actionName Name of the action to execute
     * @param message Discord massage containing the command
     * @param parameters Parameters contained in the message
     */
    executeDiscordCommand(actionName: string, message: Discord.Message, parameters: string[])
    {
        const action = this._discordActions.get(actionName);

        if(action && action.callback)
            action.callback(message, parameters);
    }

    /**
     * Execute an action of the module
     * @param actionName Name of the action to execute
     * @param message Discord massage containing the command
     * @param parameters Parameters contained in the message
     */
    executeTwitchCommand(actionName: string, channel: string, userstate: TMI.ChatUserstate, message: string, self: boolean, parameters: string[])
    {
        const action = this._twitchActions.get(actionName);

        if(action && action.callback)
            action.callback(channel, userstate, message, self);
    }
}