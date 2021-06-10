import { Module } from "../module";
import { DiscordAccess } from "../../discord/discord-access";

export default class ModuleBotSettings extends Module
{
    /**
     * Constructor
     */
    constructor(discordAccess: DiscordAccess)
    {
        super("BotSettings", discordAccess);

        this.jsFiles.push("bot-settings/admin/test.client.js");
    }
}