import { Module } from "./module";
import { Command } from "./../commands/command";
import * as Discord from "discord.js";
import { DiscordAccess } from "../discord/discord-access";
import * as fs from "fs/promises";
import { Dirent } from "fs";
import { F_OK } from "constants";

export class ModulesManager 
{
    private _parentBot: DiscordAccess;
    public get parentBot(): DiscordAccess { return this._parentBot; }

    private _modules: Map<string, Module>;
    public get modules(): Map<string, Module> { return this._modules; }
    public set modules(value: Map<string, Module>) { this._modules = value; }
    /**
     * Constructor
     */
    constructor(parentBot: DiscordAccess)
    {
        this._parentBot = parentBot;
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

            const module: Module = new modulePackage(this.parentBot);
            this._modules.set(module.name, module);
        }
        catch (error)
        {
            console.error(`${moduleName} is not a valid module.`);
        }
    }

    executeCommand(command: Command, message: Discord.Message, parameters: string[])
    {
        const module = this._modules.get(command.moduleName);
        module?.execute(command.actionName, message, parameters);
    }
}