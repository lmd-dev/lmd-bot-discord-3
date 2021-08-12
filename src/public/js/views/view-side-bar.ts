import { ControllerModules } from "../controllers/controller-modules";
import { Observer } from "../pattern/observer";

export class ViewSideBar implements Observer
{
    private _controllerModules: ControllerModules;

    constructor(controllerModules: ControllerModules)
    {
        this._controllerModules = controllerModules;
        this._controllerModules.addObserver(this);
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

            this._controllerModules.modules.forEach((module) => {
                const item = document.createElement("div");
                item.innerHTML = module.name;

                if(module === this._controllerModules.selectedModule)
                    item.classList.add("active");
                    
                item.addEventListener("click", () => { this._controllerModules.selectModule(module); })
                list.appendChild(item);
            });
        }
    }
}