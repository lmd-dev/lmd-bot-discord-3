import { Module, ModuleData } from "../models/module.js";
import { Notifier } from "../pattern/notifier.js";

export class ControllerModules extends Notifier
{
    //List of loaded modules
    private readonly _modules: Module[];
    public get modules(): Module[] { return this._modules; };

    //Selected module
    private _selectedModule : Module | null;
    public get selectedModule() : Module | null {return this._selectedModule; }
    
    

    /**
     * Constructor
     */
    constructor()
    {
        super();

        this._modules = [];
        this._selectedModule = null;

        this.loadModules();
    } 
    
    async loadModules()
    {
        const res = await fetch("/api/modules", { method: "get"});
        const json = await res.json();
        
        this.modules.length = 0;
        json.modules.forEach((module: ModuleData) => { 
            this.modules.push(new Module(module));
        });

        this.notify();
    }

    async selectModule(module: Module)
    {
        this._selectedModule = module;

        this.notify();
    }
}