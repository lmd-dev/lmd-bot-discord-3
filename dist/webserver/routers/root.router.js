"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const router_1 = require("lmd-webserver/dist/routers/router");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const update_path_file_middleware_1 = require("../middlewares/update-path-file.middleware");
class Root extends router_1.Router {
    constructor() {
        super();
        this.middlewares.addMiddlewares(new authentication_middleware_1.Authentication());
        this.middlewares.addMiddlewares(new update_path_file_middleware_1.UpdatePathFile());
        this.middlewares.addStaticPath(__dirname + "/../../public");
    }
}
exports.Root = Root;
