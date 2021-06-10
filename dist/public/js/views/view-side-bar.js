export class ViewSideBar {
    constructor(controllerModules) {
        this.controllerModules = controllerModules;
        this.controllerModules.addObserver(this);
    }
    notify() {
        this.displayModules();
    }
    displayModules() {
        const list = document.querySelector("aside");
        if (list) {
            list.innerHTML = "";
            this.controllerModules.modules.forEach((module) => {
                const item = document.createElement("div");
                item.innerHTML = module.name;
                list.appendChild(item);
            });
        }
    }
}
