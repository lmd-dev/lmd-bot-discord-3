"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
const router_1 = require("../core/routers/router");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const module_find_all_middleware_1 = require("../middlewares/module-find-all.middleware");
const module_file_middleware_1 = require("../middlewares/module-file.middleware");
class API extends router_1.Router {
    constructor(modules) {
        super();
        this.modules = modules;
        this.middlewares.addMiddlewares(new authentication_middleware_1.Authentication());
        this.routers.addRoute('get', '/modules', new module_find_all_middleware_1.ModuleFindAll(this.modules));
        this.routers.addRoute('get', '/module-file', new module_file_middleware_1.ModuleFile());
    }
}
exports.API = API;
