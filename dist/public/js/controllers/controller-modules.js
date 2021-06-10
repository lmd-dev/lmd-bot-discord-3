import { Module } from "../models/module.js";
import { Notifier } from "../pattern/notifier.js";
export class ControllerModules extends Notifier {
    constructor() {
        super();
        this._modules = [];
        this.loadModules();
    }
    get modules() { return this._modules; }
    ;
    async loadModules() {
        const res = await fetch("/api/modules", { method: "get" });
        const json = await res.json();
        this.modules.length = 0;
        json.modules.forEach((module) => {
            this.modules.push(new Module(module));
        });
        console.log(this.modules);
        this.notify();
    }
}
