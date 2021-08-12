import * as TMI from "tmi.js";

export interface ChatBotCommand
{
    process(channel: string, context: TMI.Userstate, message: string): void;
}