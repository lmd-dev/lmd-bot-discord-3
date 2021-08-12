export interface BotSettingsData
{
    id?: string,
    discordToken: string;
    twitchUsername: string;
    twitchToken: string;
    twitchChannels: string[];
    webserverPort: number;
}

export const DEFAULT_BOT_SETTINGS_DATA: BotSettingsData = {
    discordToken: "",
    twitchUsername: "",
    twitchToken: "",
    twitchChannels: [],
    webserverPort: 80
}