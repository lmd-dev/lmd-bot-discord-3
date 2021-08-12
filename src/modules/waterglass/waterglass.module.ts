import { Module } from "../module";
import { ModuleAction } from "../module-action";
import * as Discord from "discord.js";
import { DiscordAccess } from "../../discord/discord-access";
import { TwitchAccess } from "../../twitch/twitch-access";
import { WebServer } from "lmd-webserver/dist/webserver";

export default class ModuleWaterGlass extends Module
{
    /**
     * Constructor
     */
    constructor(discordAccess: DiscordAccess, twitchAccess: TwitchAccess, webServer: WebServer)
    {
        super({
            name: "WaterGlass", 
            directoryName: "waterglass", 
            discordAccess: discordAccess,
            twitchAccess: twitchAccess
        });

        this.addDiscordAction(new ModuleAction({ name: "Servir un verre", callback: (message: Discord.Message, parameters: string[]) => { this.displayWaterGlass(message, parameters); } }));
    }

    /**
     * Replaces the message of the command by the picture of a glass of water 
     * @param message
     * @param parameters
     */
    async displayWaterGlass(message: Discord.Message, parameters: string[])
    {
        await this.discordAccess.deleteMessage(message);

        if (message && message.guild)
        {
            const sendedMessage = await this.discordAccess.sendFileOnChannel(
                message.guild.id,
                message.channel.id,
                __dirname + '/assets/img/verredeau.png',
                'verredeau.png'
            );
        }
    }
}