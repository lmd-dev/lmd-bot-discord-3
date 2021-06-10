import { ControllerModules } from "../controllers/controller-modules.js";
import { ViewSideBar } from "../views/view-side-bar.js";

class ClientApp
{
    private controllerModules: ControllerModules;
    private viewSideBar: ViewSideBar;

    constructor()
    {
        this.controllerModules = new ControllerModules();
        this.viewSideBar = new ViewSideBar(this.controllerModules);
    }
}

window.addEventListener("load", () => { const app = new ClientApp(); });