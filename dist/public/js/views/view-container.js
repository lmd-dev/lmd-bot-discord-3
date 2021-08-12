import { View } from "./view.js";
export class ViewContainer {
    /**
     * Constructor
     * @param controllerModules Controller responsible for modules
     */
    constructor(controllerModules) {
        this._controllerModules = controllerModules;
        this._controllerModules.addObserver(this);
        this._container = new View(document.querySelector("content"));
    }
    notify() {
        this._controllerModules.selectedModule?.initView(this._container);
    }
}
