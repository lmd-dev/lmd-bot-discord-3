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
exports.CommandsManager = void 0;
const command_1 = require("./command");
const data_access_1 = require("../dao/data-access");
class CommandsManager {
    /**
     * Constructor
     */
    constructor() {
        this._commands = new Map();
    }
    get commands() { return this._commands; }
    /**
     * Loads commands from the storage
     */
    loadCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = yield data_access_1.DataAccess.getInstance("command", command_1.Command);
            const commands = yield dao.findAll();
            commands.forEach((command) => {
                this._commands.set(command.name, command);
            });
        });
    }
    /**
     * Adds a command to the collection
     * @param command : Command to add
     */
    addCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = yield data_access_1.DataAccess.getInstance("command", command_1.Command);
            if (yield dao.insert(command)) {
                this._commands.set(command.name, command);
            }
        });
    }
    /**
     * Returns the command with the given name
     * @param commandName
     */
    find(commandName) {
        return this._commands.get(commandName);
    }
}
exports.CommandsManager = CommandsManager;
