import { Module } from "../module";
import { ModuleAction } from "../module-action";
import * as Discord from "discord.js";
import { DiscordAccess } from "../../discord/discord-access";
import ExpressionComputer from "lmd-expression";
import { TwitchAccess } from "../../twitch/twitch-access";
import { WebServer } from "lmd-webserver/dist/webserver";

export default class ModuleExpression extends Module
{
    /**
     * Constructor
     */
    constructor(discordAccess: DiscordAccess, twitchAccess: TwitchAccess, webServer: WebServer)
    {
        super({
            name: "Expression", 
            directoryName: "expression", 
            discordAccess: discordAccess,
            twitchAccess: twitchAccess
        });

        this.addDiscordAction(new ModuleAction({ name: "Calculer", callback: (message: Discord.Message, parameters: string[]) => { this.computeExpression(message, parameters); } }));
    }

    /**
     * Replaces the message of the command by the result of the expression 
     * @param message
     * @param parameters
     */
    async computeExpression(message: Discord.Message, parameters: string[])
    {
        await this.discordAccess.deleteMessage(message);

        if (parameters.length)
        {
            try
            {
                let [expression] = parameters;

                expression = expression.replace(/"/g, "");

                const computer = new ExpressionComputer();
                const result = computer.compute(expression);

                if (message && message.guild)
                {
                    await this.discordAccess.writeOnChannel(
                        message.guild.id,
                        message.channel.id,
                        `${expression} = ${result}`
                    );
                }
            }
            catch (error)
            {
                console.log(error);
            }
        }
        
    }
}