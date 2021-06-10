import { Command } from "./command";
import { DataAccess } from "../dao/data-access";

export class CommandsManager
{
    private _commands: Map<string, Command>;
    public get commands(): Map<string, Command> { return this._commands; }

    /**
     * Constructor
     */
    constructor()
    {
        this._commands = new Map<string, Command>();
    }

    /**
     * Loads commands from the storage
     */
    async loadCommands()
    {
        const dao = await DataAccess.getInstance("command", Command);
        const commands = await dao.findAll();

        commands.forEach((command) =>
        {
            this._commands.set(command.name, command);
        });
    }

    /**
     * Adds a command to the collection
     * @param command : Command to add
     */
    async addCommand(command: Command)
    {
        const dao = await DataAccess.getInstance("command", Command);
        if (await dao.insert(command))
        {
            this._commands.set(command.name, command);
        }
    }

    /**
     * Returns the command with the given name 
     * @param commandName
     */
    find(commandName: string)
    {
        return this._commands.get(commandName);
    }
}