import { Module } from "../module";
import { DiscordAccess } from "../../discord/discord-access";
import { TwitchAccess } from "../../twitch/twitch-access";
import { ModuleAction } from "../module-action";
import * as TMI from "tmi.js";
import { WebServer } from "lmd-webserver/dist/webserver";

export default class ModuleTWSpeaker extends Module
{
    private _channel: string;

    /**
     * Constructor
     */
    constructor(discordAccess: DiscordAccess, twitchAccess: TwitchAccess, webServer: WebServer)
    {
        super({
            name: "TWSpeaker",
            directoryName: "tw-speaker",
            discordAccess: discordAccess,
            twitchAccess: twitchAccess,
            webServer: webServer
        });

        this._channel = "";

        this.addTwitchAction(new ModuleAction({
            name: "Regarde le chat !",
            callback: (channel: string, userstate: TMI.Userstate, message: string, self: boolean) =>
            {
                this.askToLookAtChat();
            }
        }));

        this.addTwitchAction(new ModuleAction({
            name: "Change de scène OBS !",
            callback: (channel: string, userstate: TMI.Userstate, message: string, self: boolean) =>
            {
                this.askToChangeScene();
            }
        }));
    }

    private askToLookAtChat()
    {
        this.webServer?.websockets?.emit("lookatchat");
    }

    private askToChangeScene()
    {
        this.webServer?.websockets?.emit("changescene");
    }
}