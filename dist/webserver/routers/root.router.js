"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const router_1 = require("../core/routers/router");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
class Root extends router_1.Router {
    constructor() {
        super();
        this.middlewares.addMiddlewares(new authentication_middleware_1.Authentication());
        this.middlewares.addStaticPath(__dirname + "/../../public");
    }
}
exports.Root = Root;
