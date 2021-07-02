import { ControllerModules } from "../controllers/controller-modules.js";
import { Observer } from "../pattern/observer.js";
import { View } from "./view.js";

export class ViewContainer implements Observer
{
    //Controller responsible for modules
    private _controllerModules: ControllerModules;

    private _container: View;

    /**
     * Constructor
     * @param controllerModules Controller responsible for modules
     */
    constructor(controllerModules: ControllerModules)
    {
        this._controllerModules = controllerModules;
        this._controllerModules.addObserver(this);

        this._container = new View(document.querySelector("content"));
    }

    notify()
    {

    }
}