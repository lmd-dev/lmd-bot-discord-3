import Discord = require('discord.js');
import { DiscordEmbedOptions } from './discord-embed-options';

export enum DiscordEventName
{
    ready = "ready",
    message = "message"
}
export class DiscordAccess
{
    //Link with discord
    private _client: Discord.Client;
    private get client(): Discord.Client { return this._client; }

    //Event listeners collection
    private _eventListeners: Map<DiscordEventName, Function[]>;
    private get eventListeners(): Map<DiscordEventName, Function[]> { return this._eventListeners; }
    private set eventListeners(value: Map<DiscordEventName, Function[]>) { this._eventListeners = value; }

    /**
     * Constructor
     */
    constructor()
    {
        this._client = new Discord.Client();

        this._eventListeners = new Map<DiscordEventName, Function[]>();
    }

    /**
     * Starts the bot and connect it with Discord
     */
    async start(token: string): Promise<void>
    {
        return new Promise((resolve, reject) =>
        {
            this.client.on('ready', () =>
            {
                this.callListeners(DiscordEventName.ready);

                resolve();
            });

            this.client.on('message', (message: Discord.Message) =>
            {
                this.callListeners(DiscordEventName.message, message);
            });

            this.client.login(token);
        });
    }

    /**
     * Adds a listener on the given event name
     * @param eventType 
     * @param callback 
     */
    addListener(eventName: DiscordEventName, callback: Function)
    {
        let functions = this.eventListeners.get(eventName);

        if (!functions)
        {
            functions = [];
            this.eventListeners.set(eventName, functions);
        }

        functions.push(callback);
    }

    /**
     * Calls all listeners on an event name when this event is produced 
     * @param eventName Name of the event 
     * @param args Parameters given with the event
     */
    private callListeners(eventName: DiscordEventName, ...args: any[])
    {
        const functions = this.eventListeners.get(eventName);

        functions?.forEach((callback) =>
        {
            switch (eventName)
            {
                case DiscordEventName.ready: callback(); break;
                case DiscordEventName.message: callback(args[0]);
            }
        });
    }

    /**
     * Returns the discord guild matching with the given id
     * @param {} guildId 
     */
    findGuild(guildId: string): Discord.Guild | null
    {
        let foundGuild = null;

        this.client.guilds.cache.some((guild: Discord.Guild) =>
        {
            if (guild.id === guildId)
            {
                foundGuild = guild;
                return true;
            }

            return false;
        });

        return foundGuild;
    }

    /**
     * Returns the discord role from the given name on the given guild
     * @param {*} roleName 
     * @param {*} guild 
     */
    findRole(roleName: string, guild: Discord.Guild): Discord.Role | null
    {
        let foundRole = null;

        guild.roles.cache.some((role) =>
        {
            if (role.name.toLowerCase() == roleName.toLowerCase())
            {
                foundRole = role;
                return true;
            }

            return false;
        });

        return foundRole;
    }

    /**
     * Returns the discord channel from the given channel name and guild
     * @param {*} channelName 
     * @param {*} guild 
     */
    findChannel(channelId: string, guild: Discord.Guild): Discord.GuildChannel | null
    {
        let foundChannel = null;

        guild.channels.cache.some((channel) =>
        {
            if (channel.id === channelId)
            {
                foundChannel = channel;
                return true;
            }

            return false;
        });

        return foundChannel;
    }

    /**
     * Defines the role of the members of a guild
     * @param {*} guild 
     * @param {*} role 
     */
    async setUsersRole(guild: Discord.Guild, role: Discord.Role)
    {
        let members = await guild.members.fetch();
        members.forEach((member) =>
        {
            if (member.user.bot === false)
                member.roles.add(role);
        });
    }

    /**
     * Sends a message on a channel
     * @param guildId Id of the discord server
     * @param channelId Id of the channel
     * @param text Message to send
     * @returns 
     */
    async writeOnChannel(guildId: string, channelId: string, text: string): Promise<Discord.Message | null>
    {
        let sendedMessage = null;
        const guild = this.findGuild(guildId);

        if (guild)
        {
            const channel = this.findChannel(channelId, guild);

            if (channel && channel instanceof Discord.TextChannel)
            {
                sendedMessage = await channel.send(text);
            }
        }

        return sendedMessage;
    }

    /**
     * Sends a file on a discord channel
     * @param guildId Discord server
     * @param channelId Id of the channel where send the file
     * @param fileURL URL of the file to send
     * @param fileName Name of the file to send
     * @returns 
     */
    async sendFileOnChannel(guildId: string, channelId: string, fileURL: string, fileName: string): Promise<Discord.Message | null>
    {
        let sendedMessage = null;
        const guild = this.findGuild(guildId);

        if (guild)
        {
            const channel = this.findChannel(channelId, guild);

            if (channel && channel instanceof Discord.TextChannel)
            {
                sendedMessage = await channel.send({
                    files: [{
                        attachment: fileURL,
                        name: fileName
                    }]
                });
            }
        }

        return sendedMessage;
    }

    /**
     * Delete the given message from its discord channel
     * @param message Message to delete
     */
    async deleteMessage(message: Discord.Message)
    {
        try
        {
            await message.delete();
        }
        catch (error)
        {
        }
    }

    /**
     * Sends an embed block on a discord channel
     * @param guildId Id of the server
     * @param channelId Id of the channel
     * @param embedOptions Options of the embed block
     * @returns 
     */
    async sendEmbededBlock(guildId: string, channelId: string, embedOptions: DiscordEmbedOptions): Promise<Discord.Message | null>
    {
        let sendedMessage = null;
        const guild = this.findGuild(guildId);

        if (guild)
        {
            const channel = this.findChannel(channelId, guild);

            if (channel && channel instanceof Discord.TextChannel)
            {
                const embedBlock = new Discord.MessageEmbed()
                    .setColor(embedOptions.color ?? "#00ffff")
                    .setTitle(embedOptions.title ?? "")
                    .setURL(embedOptions.linkURL ?? "")
                    .setDescription(embedOptions.description ?? "")
                    .setThumbnail(embedOptions.thumbnailURL ?? "")
                    .setAuthor(embedOptions.author ?? "", embedOptions.authorThumbnailURL, embedOptions.authorLinkURL)
                    .addFields(embedOptions.fields ?? [])
                    .setImage(embedOptions.imageURL ?? "")
                    .setTimestamp(embedOptions.date)
                    .setFooter(embedOptions.footer ?? "", embedOptions.footerThumbnailURL);

                sendedMessage = await channel.send(embedBlock);
            }
        }

        return sendedMessage;
    }
}




