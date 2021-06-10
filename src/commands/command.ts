export interface CommandData
{
    _id?: string;
    name: string;
    moduleName: string;
    actionName: string;
}

export class Command
{
    //Id of the command
    private _id: string;
    public get id(): string { return this._id; }
    public set id(value: string) { this._id = value; }

    //Name of the command
    private _name: string;
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value.replace(/[\W]/, ""); }

    //Name of the module giving access to the require action
    private _moduleName: string;
    public get moduleName(): string { return this._moduleName; }
    public set moduleName(value: string) { this._moduleName = value; }

    //NAme of the action to execute
    private _actionName: string;
    public get actionName(): string { return this._actionName; }
    public set actionName(value: string) { this._actionName = value; }

    /**
     * Constructor
     * @param {*} data Initializing data
     */
    constructor(data: CommandData | null = null)
    {
        this._id = "";
        this._name = "";
        this._moduleName = "";
        this._actionName = "";

        this.fromArray(data);
    }

    /**
     * Imports data from JS object
     * @param {*} data 
     */
    fromArray(data: CommandData | null)
    {
        this._id = data?._id ?? this._id;
        this._name = data?.name ?? this._name;
        this._moduleName = data?.moduleName ?? this._moduleName;
        this._actionName = data?.actionName ?? this._actionName;
    }

    /**
     * Exports data to JS Object
     */
    toArray(): CommandData
    {
        return {
            name: this._name,
            moduleName: this._moduleName,
            actionName: this._actionName,
        };
    }
}