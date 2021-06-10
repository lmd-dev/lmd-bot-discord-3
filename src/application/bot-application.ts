import { DiscordAccess } from "../discord/discord-access";
import { ModulesManager } from "../modules/modules-manager";
import { CommandsManager } from "../commands/commands-manager";
import * as Discord from "discord.js";
import { Settings } from "./settings";
import { DataAccess } from "../dao/data-access";
import { WebServer } from "../webserver/core/webserver";
import { dirname } from "path";
import { BotWebServer } from "../webserver/bot-webserver";

class BotApplication
{
    //Application settings
    private _settings: Settings;
    private get settings(): Settings { return this._settings; }

    //Discord access
    private _discordAccess: DiscordAccess;
    private get discordAccess(): DiscordAccess { return this._discordAccess; }

    //Commands manager
    private _commandsManager: CommandsManager;
    public get commandsManager(): CommandsManager { return this._commandsManager; }

    //Modules manager
    private _modulesManager: ModulesManager;
    private get modulesManager(): ModulesManager { return this._modulesManager; }

    private _webServer : WebServer;
    public get webServer() : WebServer {return this._webServer; }

    /**
     * Constructor
     */
    constructor()
    {
        this._settings = new Settings();
        this._discordAccess = new DiscordAccess();
        this._commandsManager = new CommandsManager();
        this._modulesManager = new ModulesManager(this.discordAccess);
        this._webServer = new BotWebServer(this._modulesManager);

        this.initialize();
    }

    /**
     * Initialize application
     */
    private async initialize()
    {
        await this.loadSettings();

        await this.initializeDiscordAccess();
        await this.initializeWebServer();

        await this.commandsManager.loadCommands();
        await this.modulesManager.loadModules();

        this.webServer.start();
    }

    /**
     * Initialize discord access settings
     */
    private async initializeDiscordAccess()
    {
        this.discordAccess.addListener('ready', () => { console.log("Discord access ready") });
        this.discordAccess.addListener('message', (message: Discord.Message) => { this.processMessage(message); });
        await this.discordAccess.start(this.settings.discordToken);
    }

    private async initializeWebServer()
    {
                
    }

    /**
     * Loads application settings
     */
    private async loadSettings()
    {
        const dao = await DataAccess.getInstance("settings", Settings);
        const settings = await dao.findOne({});

        if (settings)
            this._settings = settings;
    }

    /**
     * Updates application settings
     */
    private async saveSettings()
    {
        const dao = await DataAccess.getInstance("settings", Settings);
        await dao.update(this.settings);
    }

    /**
     * Processes a message sended from discord
     * @param message
     */
    private processMessage(message: Discord.Message)
    {
        if (message.deleted === false && message.author.bot === false && message.content.charAt(0) === '!')
            this.processCommand(message);
    }

    /**
     * Processes a message containing a command sended from discord
     * @param message
     */
    private processCommand(message: Discord.Message)
    {
        const items = message.content.match(/"([^"]*)"|([^! ]+)/g);
                
        if (items && items.length >= 1)
        {
            const [commandName, ...params] = items;
            const command = this._commandsManager.find(commandName);

            if(command)
                this.modulesManager.executeCommand(command, message, params);
        }
    }
}

export default BotApplication;