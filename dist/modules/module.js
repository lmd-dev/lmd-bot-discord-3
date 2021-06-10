"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
class Module {
    /**
     * Constructor
     * @param name Name of the module
     */
    constructor(name, discordAccess) {
        this._name = name;
        this._discordAccess = discordAccess;
        this._actions = new Map();
        this._disabled = false;
        this._jsFiles = [];
    }
    get discordAccess() { return this._discordAccess; }
    get name() { return this._name; }
    get actions() { return this._actions; }
    get disabled() { return this._disabled; }
    set disabled(value) { this._disabled = value; }
    get jsFiles() { return this._jsFiles; }
    ;
    /**
     * Adds an action
     */
    addAction(action) {
        this._actions.set(action.name, action);
    }
    /**
     * Execute an action of the module
     * @param actionName Name of the action to execute
     * @param message Discord massage containing the command
     * @param parameters Parameters contained in the message
     */
    execute(actionName, message, parameters) {
        const action = this._actions.get(actionName);
        if (action && action.callback)
            action.callback(message, parameters);
    }
}
exports.Module = Module;
