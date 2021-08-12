import { Module } from "../module";
import { DiscordAccess } from "../../discord/discord-access";
import * as Discord from "discord.js"
import { ModuleAction } from "../module-action";
import { TwitchAccess } from "../../twitch/twitch-access";

export default class ModulePoll extends Module
{
    private _letters: string[] = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"];

    constructor(discordAccess: DiscordAccess, twitchAccess: TwitchAccess)
    {
       super({
           name: "poll", 
           directoryName:"poll",
           discordAccess:discordAccess,
           twitchAccess: twitchAccess
       }); 

       this.addDiscordAction(new ModuleAction({name: "Créer un sondage", callback: this.sendPoll.bind(this)}));
    }

    async sendPoll(message: Discord.Message, parameters: string[])
    {
        await this.discordAccess.deleteMessage(message);
        
        if(parameters.length >= 3 && parameters.length <= 21)
        {
            const [question, ...responses] = parameters;

            let options = "";

            let letter = 97;
            for(const response of responses)
            {
                options += `:regional_indicator_${String.fromCharCode(letter)}: ${response.replace(/"/g, "")}\n`;
                ++letter;
            }

            if(message.guild)
            {
                const sendedMessage = await this.discordAccess.sendEmbededBlock(
                    message.guild.id, 
                    message.channel.id, 
                    {
                        author: "Sondage",
                        title: question.replace(/"/g, ""),
                        description: options,
                        date: new Date()
                    }
                );

                for(let iReact = 97; iReact < letter; ++iReact)
                {
                    await sendedMessage?.react(this._letters[iReact - 97]);
                }
            }
        }
    }
}