import { Module } from "../models/module.js";
import { Notifier } from "../pattern/notifier.js";
export class ControllerModules extends Notifier {
    /**
     * Constructor
     */
    constructor() {
        super();
        this._modules = [];
        this._selectedModule = null;
        this.loadModules();
    }
    get modules() { return this._modules; }
    ;
    get selectedModule() { return this._selectedModule; }
    async loadModules() {
        const res = await fetch("/api/modules", { method: "get" });
        const json = await res.json();
        this.modules.length = 0;
        json.modules.forEach((module) => {
            this.modules.push(new Module(module));
        });
        this.notify();
    }
    async selectModule(module) {
        this._selectedModule = module;
        this.notify();
    }
}
