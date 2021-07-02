export class ViewSideBar {
    constructor(controllerModules) {
        this._controllerModules = controllerModules;
        this._controllerModules.addObserver(this);
    }
    notify() {
        this.displayModules();
    }
    displayModules() {
        const list = document.querySelector("aside");
        if (list) {
            list.innerHTML = "";
            this._controllerModules.modules.forEach((module) => {
                const item = document.createElement("div");
                item.innerHTML = module.name;
                item.addEventListener("click", () => { this._controllerModules.selectModule(module); });
                list.appendChild(item);
            });
        }
    }
}
