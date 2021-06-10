import Discord = require('discord.js');
import { DiscordEmbedOptions } from './discord-embed-options';

export class DiscordAccess
{
    //Link with discord
    private _client: Discord.Client;
    private get client(): Discord.Client { return this._client; }

    //Event listeners collection
    private _eventListeners: Map<string, Function[]>;
    private get eventListeners(): Map<string, Function[]> { return this._eventListeners; }
    private set eventListeners(value: Map<string, Function[]>) { this._eventListeners = value; }

    /**
     * Constructor
     */
    constructor()
    {
        this._client = new Discord.Client();

        this._eventListeners = new Map<string, Function[]>();
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
                this.callListeners('ready');

                resolve();
            });

            this.client.on('message', (message: Discord.Message) =>
            {
                this.callListeners("message", message);
            });

            this.client.login(token);
        });
    }

    addListener(eventType: string, callback: Function)
    {
        let functions = this.eventListeners.get(eventType);

        if (!functions)
        {
            functions = [];
            this.eventListeners.set(eventType, functions);
        }

        functions.push(callback);
    }

    private callListeners(eventType: string, ...args: any[])
    {
        const functions = this.eventListeners.get(eventType);

        functions?.forEach((callback) =>
        {
            switch (eventType)
            {
                case "ready": callback(); break;
                case "message": callback(args[0]);
            }
        });
    }

    /**
     * Retruns the discord guild matching with the given id
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




