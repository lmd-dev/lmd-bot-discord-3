import { Module } from "../module";
import { DiscordAccess } from "../../discord/discord-access";
import { TwitchAccess } from "../../twitch/twitch-access";
import { WebServer } from "lmd-webserver/dist/webserver";
export default class ModuleBotSettings extends Module
{
    /**
     * Constructor
     */
    constructor(discordAccess: DiscordAccess, twitchAccess: TwitchAccess, webServer: WebServer)
    {
        super({
            name: "Paramètres", 
            directoryName: "bot-settings", 
            discordAccess: discordAccess, 
            twitchAccess: twitchAccess, 
            entryPointClassName: "BotSettingsEntryPoint", 
            entryPointFileName: "entry-point.client.js",
            hasBackOffice: true
        });
    }
}