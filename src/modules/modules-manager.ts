import { Module } from "./module";
import { Command } from "./../commands/command";
import * as Discord from "discord.js";
import * as TMI from "tmi.js";
import { DiscordAccess } from "../discord/discord-access";
import * as fs from "fs/promises";
import { Dirent } from "fs";
import { F_OK } from "constants";
import { TwitchAccess } from "../twitch/twitch-access";
import { WebServer } from "lmd-webserver/dist/webserver";

export class ModulesManager 
{
    private _discordAccess: DiscordAccess;
    public get discordAccess(): DiscordAccess { return this._discordAccess; }

    private _twitchAccess: TwitchAccess;
    public get twitchAccess(): TwitchAccess { return this._twitchAccess; }

    private _webServer : WebServer;
    public get webServer() : WebServer {return this._webServer; }

    private _modules: Map<string, Module>;
    public get modules(): Map<string, Module> { return this._modules; }
    public set modules(value: Map<string, Module>) { this._modules = value; }
    /**
     * Constructor
     */
    constructor(discordAccess: DiscordAccess, twitchAccess: TwitchAccess, webServer: WebServer)
    {
        this._discordAccess = discordAccess;
        this._twitchAccess = twitchAccess;
        this._webServer = webServer;

        this._modules = new Map<string, Module>();
    }

    /**
     * Load existing modules
     */
    async loadModules()
    {
        const items = await fs.readdir(`${__dirname}`, { withFileTypes: true });

        for (const item of items)
        {
            if (item.isDirectory())
                this.loadModule(item);
        }
    }

    async loadModule(item: Dirent)
    {
        const { name: moduleName } = item;
        const folder = `${__dirname}/${moduleName}`;
        const path = `${folder}/${moduleName}.module.js`;

        try
        {
            await fs.access(path, F_OK);

            const { default: modulePackage } = await import(path);

            const module: Module = new modulePackage(this.discordAccess, this.twitchAccess, this.webServer);
            this._modules.set(module.name, module);
        }
        catch (error)
        {
            console.error(`${moduleName} is not a valid module.`);
        }
    }

    executeDiscordCommand(command: Command, message: Discord.Message, parameters: string[])
    {
        const module = this._modules.get(command.moduleName);
        module?.executeDiscordCommand(command.actionName, message, parameters);
    }

    executeTwitchCommand(command: Command, channel: string, userstate: TMI.ChatUserstate, message: string, self: boolean, parameters: string[])
    {
        const module = this._modules.get(command.moduleName);
        module?.executeTwitchCommand(command.actionName, channel, userstate, message, self, parameters);
    }
}