"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordAccess = exports.DiscordEventType = void 0;
const Discord = require("discord.js");
var DiscordEventType;
(function (DiscordEventType) {
    DiscordEventType["ready"] = "ready";
    DiscordEventType["message"] = "message";
})(DiscordEventType = exports.DiscordEventType || (exports.DiscordEventType = {}));
class DiscordAccess {
    /**
     * Constructor
     */
    constructor() {
        this._client = new Discord.Client();
        this._eventListeners = new Map();
    }
    get client() { return this._client; }
    get eventListeners() { return this._eventListeners; }
    set eventListeners(value) { this._eventListeners = value; }
    /**
     * Starts the bot and connect it with Discord
     */
    start(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.client.on('ready', () => {
                    this.callListeners(DiscordEventType.ready);
                    resolve();
                });
                this.client.on('message', (message) => {
                    this.callListeners(DiscordEventType.message, message);
                });
                this.client.login(token);
            });
        });
    }
    addListener(eventType, callback) {
        let functions = this.eventListeners.get(eventType);
        if (!functions) {
            functions = [];
            this.eventListeners.set(eventType, functions);
        }
        functions.push(callback);
    }
    callListeners(eventType, ...args) {
        const functions = this.eventListeners.get(eventType);
        functions === null || functions === void 0 ? void 0 : functions.forEach((callback) => {
            switch (eventType) {
                case DiscordEventType.ready:
                    callback();
                    break;
                case DiscordEventType.message: callback(args[0]);
            }
        });
    }
    /**
     * Retruns the discord guild matching with the given id
     * @param {} guildId
     */
    findGuild(guildId) {
        let foundGuild = null;
        this.client.guilds.cache.some((guild) => {
            if (guild.id === guildId) {
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
    findRole(roleName, guild) {
        let foundRole = null;
        guild.roles.cache.some((role) => {
            if (role.name.toLowerCase() == roleName.toLowerCase()) {
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
    findChannel(channelId, guild) {
        let foundChannel = null;
        guild.channels.cache.some((channel) => {
            if (channel.id === channelId) {
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
    setUsersRole(guild, role) {
        return __awaiter(this, void 0, void 0, function* () {
            let members = yield guild.members.fetch();
            members.forEach((member) => {
                if (member.user.bot === false)
                    member.roles.add(role);
            });
        });
    }
    writeOnChannel(guildId, channelId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            let sendedMessage = null;
            const guild = this.findGuild(guildId);
            if (guild) {
                const channel = this.findChannel(channelId, guild);
                if (channel && channel instanceof Discord.TextChannel) {
                    sendedMessage = yield channel.send(text);
                }
            }
            return sendedMessage;
        });
    }
    sendFileOnChannel(guildId, channelId, fileURL, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            let sendedMessage = null;
            const guild = this.findGuild(guildId);
            if (guild) {
                const channel = this.findChannel(channelId, guild);
                if (channel && channel instanceof Discord.TextChannel) {
                    sendedMessage = yield channel.send({
                        files: [{
                                attachment: fileURL,
                                name: fileName
                            }]
                    });
                }
            }
            return sendedMessage;
        });
    }
    /**
     * Delete the given message from its discord channel
     * @param message Message to delete
     */
    deleteMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield message.delete();
            }
            catch (error) {
            }
        });
    }
    sendEmbededBlock(guildId, channelId, embedOptions) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function* () {
            let sendedMessage = null;
            const guild = this.findGuild(guildId);
            if (guild) {
                const channel = this.findChannel(channelId, guild);
                if (channel && channel instanceof Discord.TextChannel) {
                    const embedBlock = new Discord.MessageEmbed()
                        .setColor((_a = embedOptions.color) !== null && _a !== void 0 ? _a : "#00ffff")
                        .setTitle((_b = embedOptions.title) !== null && _b !== void 0 ? _b : "")
                        .setURL((_c = embedOptions.linkURL) !== null && _c !== void 0 ? _c : "")
                        .setDescription((_d = embedOptions.description) !== null && _d !== void 0 ? _d : "")
                        .setThumbnail((_e = embedOptions.thumbnailURL) !== null && _e !== void 0 ? _e : "")
                        .setAuthor((_f = embedOptions.author) !== null && _f !== void 0 ? _f : "", embedOptions.authorThumbnailURL, embedOptions.authorLinkURL)
                        .addFields((_g = embedOptions.fields) !== null && _g !== void 0 ? _g : [])
                        .setImage((_h = embedOptions.imageURL) !== null && _h !== void 0 ? _h : "")
                        .setTimestamp(embedOptions.date)
                        .setFooter((_j = embedOptions.footer) !== null && _j !== void 0 ? _j : "", embedOptions.footerThumbnailURL);
                    sendedMessage = yield channel.send(embedBlock);
                }
            }
            return sendedMessage;
        });
    }
}
exports.DiscordAccess = DiscordAccess;
