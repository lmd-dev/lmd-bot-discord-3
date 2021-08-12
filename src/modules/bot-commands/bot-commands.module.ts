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
            name: "Commandes", 
            directoryName: "bot-commands", 
            discordAccess: discordAccess, 
            twitchAccess: twitchAccess, 
            entryPointClassName: "BotCommandsEntryPoint", 
            entryPointFileName: "entry-point.client.js",
            hasBackOffice: true
        });
    }
}