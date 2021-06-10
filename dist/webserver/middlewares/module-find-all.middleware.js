"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleFindAll = void 0;
const middleware_1 = require("../core/middlewares/middleware");
class ModuleFindAll extends middleware_1.Middleware {
    constructor(modules) {
        super((req, res, next) => { this.process(req, res, next); });
        this.modules = modules;
    }
    process(req, res, next) {
        const data = { modules: new Array() };
        this.modules.modules.forEach((value, key) => {
            data.modules.push({
                name: value.name,
                jsFiles: value.jsFiles
            });
        });
        res.json(data);
    }
}
exports.ModuleFindAll = ModuleFindAll;
