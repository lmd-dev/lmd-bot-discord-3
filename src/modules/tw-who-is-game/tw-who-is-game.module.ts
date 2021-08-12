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
            name: "TW Who Is Game",
            directoryName: "tw-who-is-game",
            discordAccess: discordAccess,
            twitchAccess: twitchAccess,
            webServer: webServer
        });

        this._channel = "";

        this.addTwitchAction(new ModuleAction({
            name: "Afficher le jeu",
            callback: (channel: string, userstate: TMI.Userstate, message: string, self: boolean) =>
            {
                this.displayGame();
            }
        }));

        this.addTwitchAction(new ModuleAction({
            name: "Afficher les règles",
            callback: (channel: string, userstate: TMI.Userstate, message: string, self: boolean) =>
            {
                this.displayRules(channel);
            }
        }));

        this.addTwitchAction(new ModuleAction({
            name: "Révéler une case",
            callback: (channel: string, userstate: TMI.ChatUserstate, message: string, self: boolean) =>
            {
                this.revealABox(channel, userstate, message);
            }
        }));
    }

    private displayGame()
    {
        this.webServer?.websockets?.emit("box");
    }

    private displayRules(channel: string)
    {
        this.twitchAccess.say(channel, "'!boxshow' permet d'afficher l'état du jeu | '!box [ligne] [colonne]' révèle une case : '!box A 2'. Vous ne pouvez révéler qu'une seule case par live et par personne. *** Choisissez judicieusement ***");
    }

    private revealABox(channel: string, userstate: TMI.ChatUserstate, message: string)
    {
        const regexResults = message.match(/^!box +(?<row>[A-Z]) *(?<col>[1-9])/);

        if(regexResults && regexResults.groups)
        {
            const x = parseInt(regexResults.groups.col) - 1;
            const y = regexResults.groups.row.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
            
            this.webServer?.websockets?.emit("box", [{ x: x, y: y}]);
        }
        else
        {
            this.twitchAccess.say(channel, `@${userstate.username}: syntaxe incorrecte`);
            this.twitchAccess.say(channel, `!boxrules`);
        }
    }
}