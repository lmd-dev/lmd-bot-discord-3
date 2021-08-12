import { View } from "../views/view";
import { EntryPoint } from "./entry-point";

export interface ModuleData
{
    name: string;
    entryPointClassName: string;
    entryPointFileName: string;
}

export class Module
{
    /**
     * Name of the module
     */
    private readonly _name: string;
    public get name(): string { return this._name; };
    
    private readonly _entryPointFileName: string | null;

    private readonly _entryPointClassName: string | null;

    private _entryPoint: EntryPoint | null;
    
    /**
     * Constructor
     * @param data Data of the module 
     */
    constructor(data: ModuleData)
    {
        this._name = data?.name;
        this._entryPointFileName = data?.entryPointFileName ?? null;
        this._entryPointClassName = data?.entryPointClassName ?? null;

        this._entryPoint = null;

        this.loadJS();
    }

    async loadJS()
    {
        if(this._entryPointFileName && this._entryPointClassName)
        {
            const module = await import(`/api/module-file/${this.name}/${this._entryPointFileName}`);
            this._entryPoint = new module[this._entryPointClassName]();
        }
    }

    initView(view: View)
    {
        this._entryPoint?.initView(view);
    }
}