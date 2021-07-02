import { ModuleAction } from "./module-action";
import * as Discord from "discord.js";
import { DiscordAccess } from "../discord/discord-access";

export class Module 
{
    //Discord access
    private readonly _discordAccess: DiscordAccess;
    public get discordAccess(): DiscordAccess { return this._discordAccess; }

    //Name of the module
    private _name: string;
    public get name(): string { return this._name; }

    //Name of the entry point class of the module (client side)
    private _entryPointName: string | null;
    public get entryPointName(): string | null { return this._entryPointName; }

    //Available actions
    private readonly _actions: Map<string, ModuleAction>;
    public get actions(): Map<string, ModuleAction> { return this._actions; }

    //Is the module disabled
    private _disabled: boolean;
    public get disabled(): boolean { return this._disabled; }
    public set disabled(value: boolean) { this._disabled = value; }

    private readonly _jsFiles: string[];
    public get jsFiles(): string[] { return this._jsFiles; };
    

    /**
     * Constructor
     * @param name Name of the module 
     */
    constructor(name: string, discordAccess: DiscordAccess, entryPointName: string | null = null) {
        this._name = name;
        this._entryPointName = entryPointName;
        this._discordAccess = discordAccess;
        this._actions = new Map();
        this._disabled = false;
        this._jsFiles = [];
    }

    /**
     * Adds an action
     */
    addAction(action: ModuleAction) 
    {
        this._actions.set(action.name, action);
    }

    /**
     * Execute an action of the module
     * @param actionName Name of the action to execute
     * @param message Discord massage containing the command
     * @param parameters Parameters contained in the message
     */
    execute(actionName: string, message: Discord.Message, parameters: string[])
    {
        const action = this._actions.get(actionName);

        if(action && action.callback)
            action.callback(message, parameters);
    }
}