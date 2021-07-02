import { ControllerModules } from "../controllers/controller-modules.js";
import { ViewContainer } from "../views/view-container.js";
import { ViewSideBar } from "../views/view-side-bar.js";
import { View } from "../views/view.js";

class ClientApp
{
    private _controllerModules: ControllerModules;
    private _viewSideBar: ViewSideBar;
    private _viewContainer: ViewContainer;

    constructor()
    {
        this._controllerModules = new ControllerModules();
        this._viewSideBar = new ViewSideBar(this._controllerModules);
        this._viewContainer = new ViewContainer(this._controllerModules);
    }
}

window.addEventListener("load", () => { const app = new ClientApp(); });