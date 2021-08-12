"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleFindAll = void 0;
const middleware_1 = require("lmd-webserver/dist/middlewares/middleware");
class ModuleFindAll extends middleware_1.Middleware {
    constructor(modules) {
        super((req, res, next) => { this.process(req, res, next); });
        this.modules = modules;
    }
    process(req, res, next) {
        const data = { modules: new Array() };
        this.modules.modules.forEach((module, key) => {
            if (module.hasBackOffice) {
                data.modules.push({
                    name: module.name,
                    entryPointClassName: module.entryPointClassName,
                    entryPointFileName: module.entryPointFileName
                });
            }
        });
        res.json(data);
    }
}
exports.ModuleFindAll = ModuleFindAll;
