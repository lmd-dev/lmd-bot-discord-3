"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const Express = require("express");
const middlewares_1 = require("../middlewares/middlewares");
const routers_1 = require("./routers");
class Router {
    /**
     * Constructor
     */
    constructor() {
        this._origin = Express.Router();
        this._routers = new routers_1.Routers(this.origin);
        this._middlewares = new middlewares_1.Middlewares(this.origin);
    }
    get origin() { return this._origin; }
    get routers() { return this._routers; }
    get middlewares() { return this._middlewares; }
    connect(path, parent) {
        this.middlewares.connect();
        parent.use(path, this.origin);
    }
}
exports.Router = Router;
