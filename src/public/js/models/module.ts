import { View } from "../views/view";
import { EntryPoint } from "./entry-point";

export interface ModuleData
{
    name: string;
    entryPointName: string;
    jsFiles: string[];
}

export class Module
{
    /**
     * Name of the module
     */
    private readonly _name: string;
    public get name(): string { return this._name; };

    /**
     * Attached JS files
     */
    private readonly _jsFiles: string[];
    
    /**
     * Constructor
     * @param data Data of the module 
     */
    constructor(data: ModuleData)
    {
        this._name = data?.name;

        this._jsFiles = [];
        this._jsFiles.push(...data.jsFiles);

        this.loadJS();
    }

    async loadJS()
    {
        this._jsFiles.forEach(async (fileName) => {
            await import(`/api/module-file/?filename=${fileName}`);
        });
    }
}