import { Module, ModuleData } from "../models/module.js";
import { Notifier } from "../pattern/notifier.js";

export class ControllerModules extends Notifier
{
    private readonly _modules: Module[];
    public get modules(): Module[] { return this._modules; };

    constructor()
    {
        super();

        this._modules = [];
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
}