export interface ModuleActionData
{
    name: string;
    description?: string;
    callback: Function;
}

export class ModuleAction
{
    //Name of the action
    private _name: string;
    public get name(): string { return this._name; }

    //Description of the action
    private _description: string;
    public get description(): string { return this._description; }

    //Associated callback
    private _callback:  Function | null;
    public get callback():  Function | null { return this._callback; }

    /**
     * Constructor
     * @param {} data 
     */
    constructor(data: ModuleActionData)
    {
        this._name = data.name;        
        this._description = data.description ?? "";
        this._callback = data.callback;
    }
}