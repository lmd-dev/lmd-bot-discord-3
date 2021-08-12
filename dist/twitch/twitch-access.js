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
exports.TwitchAccess = exports.TwitchEventType = void 0;
const TMI = require("tmi.js");
var TwitchEventType;
(function (TwitchEventType) {
    TwitchEventType["ready"] = "ready";
    TwitchEventType["message"] = "message";
})(TwitchEventType = exports.TwitchEventType || (exports.TwitchEventType = {}));
class TwitchAccess {
    constructor() {
        this._client = null;
        this._eventListeners = new Map();
    }
    get eventListeners() { return this._eventListeners; }
    set eventListeners(value) { this._eventListeners = value; }
    /**
     * Starts the bot and connect it with Twitch
     */
    start(username, token, ...channels) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const tmiOptions = {
                    identity: {
                        username: username,
                        password: token
                    },
                    channels: channels
                };
                this._client = new TMI.Client(tmiOptions);
                this._client.on("connected", (address, port) => {
                    this.callListeners(TwitchEventType.ready, address, port);
                    resolve();
                });
                this._client.on("message", (channel, userstate, message, self) => {
                    this.callListeners(TwitchEventType.message, channel, userstate, message, self);
                });
                this._client.connect();
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
                case TwitchEventType.ready:
                    callback();
                    break;
                case TwitchEventType.message:
                    callback(args[0], args[1], args[2], args[3]);
                    break;
            }
        });
    }
    say(channel, message) {
        var _a;
        (_a = this._client) === null || _a === void 0 ? void 0 : _a.say(channel, message);
    }
}
exports.TwitchAccess = TwitchAccess;
