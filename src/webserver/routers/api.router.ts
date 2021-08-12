import { Router } from "lmd-webserver/dist/routers/router";
import { Authentication } from "../middlewares/authentication.middleware";
import { ModulesManager }from "../../modules/modules-manager";
import { ModuleFindAll }from "../middlewares/module-find-all.middleware";
import { ModuleFile } from "../middlewares/module-file.middleware";
import { ModuleData } from "../middlewares/module-data.middleware";

export class API extends Router
{
    private modules: ModulesManager;

    constructor(modules: ModulesManager)
    {
        super();

        this.modules = modules;

        this.middlewares.addMiddlewares(new Authentication());
        this.routers.addRoute('get', '/modules', new ModuleFindAll(this.modules));
        this.routers.addRoute('get', '/module-file/:moduleName/:fileName', new ModuleFile(this.modules));
        this.routers.addRoute('get', '/module-data/all/:collectionName', new ModuleData(this.modules));
        this.routers.addRoute('get', '/module-data/:collectionName', new ModuleData(this.modules));
        this.routers.addRoute('all', '/module-data/:collectionName', new ModuleData(this.modules));
    }
}