import * as TMI from "tmi.js";
import { ChatBotCommand } from "./chat-bot-command";

export class GameCommand implements ChatBotCommand
{
    private _enabled : boolean;

    constructor()
    {
        this._enabled = true;
    }

    process(channel: string, context: TMI.Userstate, message: string)
    {
        if(this._enabled)
        {
            this._enabled = false;

            const items = message.split(" ");
            if(items.length === 1)
            {
                //this._bot.emit("box");
            }
            else if(items.length === 3)
            {
                //this._bot.emit("box", { x: parseInt(items[1]), y: parseInt(items[2]) });
            }

            setTimeout(() => {this._enabled = true }, 500);
        }
    }
}