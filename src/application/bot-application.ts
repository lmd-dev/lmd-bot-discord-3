import { DiscordAccess, DiscordEventType } from "../discord/discord-access";
import { ModulesManager } from "../modules/modules-manager";
import { CommandsManager } from "../commands/commands-manager";
import * as Discord from "discord.js";
import * as TMI from "tmi.js";
import { Settings } from "./settings";
import { DataAccess } from "../dao/data-access";
import { BotWebServer } from "../webserver/bot-webserver";
import { TwitchAccess, TwitchEventType } from "../twitch/twitch-access";

/**
 * This is Michelle ! :-)
 */
class BotApplication
{
    //Application settings
    private _settings: Settings;
    private get settings(): Settings { return this._settings; }

    //Discord access
    private _discordAccess: DiscordAccess;
    private get discordAccess(): DiscordAccess { return this._discordAccess; }

    //Twitch access
    private _twitchAccess: TwitchAccess;
    private get twitchAccess(): TwitchAccess { return this._twitchAccess; }

    //Webserver used for the backoffice and to give an access to websockets to modules
    private _webServer: BotWebServer;
    public get webServer(): BotWebServer { return this._webServer; }

    //Commands manager
    private _commandsManager: CommandsManager;
    public get commandsManager(): CommandsManager { return this._commandsManager; }

    //Modules manager
    private _modulesManager: ModulesManager;
    private get modulesManager(): ModulesManager { return this._modulesManager; }

    /**
     * Constructor
     */
    constructor()
    {
        this._settings = new Settings();
        this._discordAccess = new DiscordAccess();
        this._twitchAccess = new TwitchAccess();
        this._commandsManager = new CommandsManager();
        this._webServer = new BotWebServer();
        this._modulesManager = new ModulesManager(this.discordAccess, this.twitchAccess, this.webServer);

        this.initialize();
    }

    /**
     * Initialize application
     */
    private async initialize()
    {
        await this.loadSettings();

        await this.initializeDiscordAccess();
        await this.initializeTwitchAccess();
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
        this.discordAccess.addListener(DiscordEventType.ready, () => { console.log("Discord access ready") });
        this.discordAccess.addListener(DiscordEventType.message, (message: Discord.Message) => { this.processDiscordMessage(message); });
        await this.discordAccess.start(this.settings.discordToken);
    }

    /**
     * Initialize twitch access settings
     */
    private async initializeTwitchAccess()
    {
        this.twitchAccess.addListener(TwitchEventType.ready, () => { console.log("Twitch access ready") });
        this.twitchAccess.addListener(TwitchEventType.message, (channel: string, userstate: TMI.ChatUserstate, message: string, self: boolean) => { this.processTwitchMessage(channel, userstate, message, self); });
        await this.twitchAccess.start(this.settings.twitchUsername, this.settings.twitchToken, ...this.settings.twitchChannels);
    }

    /**
     * Initialize the webserver settings
     */
    private async initializeWebServer()
    {
        this.webServer.initialize({
                http: {
                    port: this.settings.webserverPort ?? 80,
                    enable: true
                },
                sessions: {
                    enable: true,
                    passPhrase: "lmd-bot"
                },
                websockets: {
                    enable: true,
                    options: {
                        cors: {
                            origin: "*",
                            methods: ["GET", "POST"]
                        }
                    }
                }
            },
            this.modulesManager
        );
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
     * Processes a message sended from discord
     * @param message
     */
    private processDiscordMessage(message: Discord.Message)
    {
        if (message.deleted === false && message.author.bot === false && message.content.charAt(0) === '!')
            this.processDiscordCommand(message);
    }

    /**
     * Processes a message sended from twitch
     * @param message
     */
    private processTwitchMessage(channel: string, userstate: TMI.ChatUserstate, message: string, self: boolean)
    {
        this.processTwitchCommand(channel, userstate, message, self);
    }

    /**
     * Processes a message containing a command sended from discord
     * @param message
     */
    private processDiscordCommand(message: Discord.Message)
    {
        const items = message.content.match(/"([^"]*)"|([^! ]+)/g);

        if (items && items.length >= 1)
        {
            const [commandName, ...params] = items;
            const command = this._commandsManager.find(commandName);

            if (command)
                this.modulesManager.executeDiscordCommand(command, message, params);
        }
    }

    /**
     * Processes a message containing a command sended from twitch
     * @param message
     */
    private processTwitchCommand(channel: string, userstate: TMI.ChatUserstate, message: string, self: boolean)
    {
        let command = this._commandsManager.find(userstate["custom-reward-id"]);

        if (!command)
        {
            const items = message.match(/"([^"]*)"|([^! ]+)/g);

            if (items && items.length >= 1)
            {
                const [commandName, ...params] = items;
                command = this._commandsManager.find(commandName);

                if (command)
                    this.modulesManager.executeTwitchCommand(command, channel, userstate, message, self, params);
            }
        }
        else
            this.modulesManager.executeTwitchCommand(command, channel, userstate, message, self, []);
    }
}

export default BotApplication;