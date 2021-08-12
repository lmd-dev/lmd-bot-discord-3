"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
class Module {
    /**
     * Constructor
     * @param name Name of the module
     */
    constructor(options) {
        var _a, _b, _c, _d;
        //name: string, directoryName: string, discordAccess: DiscordAccess, entryPointClassName: string | null = null, entryPointFileName: string | null = null) {
        this._name = options.name;
        this._directoryName = options.directoryName;
        this._entryPointClassName = (_a = options.entryPointClassName) !== null && _a !== void 0 ? _a : null;
        this._entryPointFileName = (_b = options.entryPointFileName) !== null && _b !== void 0 ? _b : null;
        this._discordAccess = options.discordAccess;
        this._twitchAccess = options.twitchAccess;
        this._webServer = (_c = options.webServer) !== null && _c !== void 0 ? _c : null;
        this._hasBackOffice = (_d = options.hasBackOffice) !== null && _d !== void 0 ? _d : false;
        this._discordActions = new Map();
        this._twitchActions = new Map();
        this._disabled = false;
    }
    get discordAccess() { return this._discordAccess; }
    get twitchAccess() { return this._twitchAccess; }
    get webServer() { return this._webServer; }
    get name() { return this._name; }
    get directoryName() { return this._directoryName; }
    ;
    get entryPointClassName() { return this._entryPointClassName; }
    get entryPointFileName() { return this._entryPointFileName; }
    get discordActions() { return this._discordActions; }
    get twitchActions() { return this._twitchActions; }
    get disabled() { return this._disabled; }
    set disabled(value) { this._disabled = value; }
    get hasBackOffice() { return this._hasBackOffice; }
    set hasBackOffice(value) { this._hasBackOffice = value; }
    /**
     * Adds an action
     */
    addDiscordAction(action) {
        this._discordActions.set(action.name, action);
    }
    /**
     * Adds an action
     */
    addTwitchAction(action) {
        this._twitchActions.set(action.name, action);
    }
    /**
     * Execute an action of the module
     * @param actionName Name of the action to execute
     * @param message Discord massage containing the command
     * @param parameters Parameters contained in the message
     */
    executeDiscordCommand(actionName, message, parameters) {
        const action = this._discordActions.get(actionName);
        if (action && action.callback)
            action.callback(message, parameters);
    }
    /**
     * Execute an action of the module
     * @param actionName Name of the action to execute
     * @param message Discord massage containing the command
     * @param parameters Parameters contained in the message
     */
    executeTwitchCommand(actionName, channel, userstate, message, self, parameters) {
        const action = this._twitchActions.get(actionName);
        if (action && action.callback)
            action.callback(channel, userstate, message, self);
    }
}
exports.Module = Module;
