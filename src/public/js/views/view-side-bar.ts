import { ControllerModules } from "../controllers/controller-modules";
import { Observer } from "../pattern/observer";

export class ViewSideBar implements Observer
{
    private controllerModules: ControllerModules;

    constructor(controllerModules: ControllerModules)
    {
        this.controllerModules = controllerModules;
        this.controllerModules.addObserver(this);
    }

    notify()
    {
        this.displayModules();
    }

    displayModules()
    {
        const list  = document.querySelector("aside");

        if(list)
        {
            list.innerHTML = "";

            this.controllerModules.modules.forEach((module) => {
                const item = document.createElement("div");
                item.innerHTML = module.name;

                list.appendChild(item);
            });
        }
    }
}