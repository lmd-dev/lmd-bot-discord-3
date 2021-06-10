"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middlewares = void 0;
const static_middleware_1 = require("./static.middleware");
class Middlewares {
    constructor(origin) {
        this._origin = origin;
        this._middlewares = [];
    }
    get origin() { return this._origin; }
    get middlewares() { return this._middlewares; }
    setMiddlewares(...middlewares) {
        this._middlewares = middlewares;
    }
    addMiddlewares(...middlewares) {
        Array.prototype.push.apply(this._middlewares, middlewares);
    }
    /**
     * Adds path to static files (css, js, ...)
     * @param path folder path to static files
     */
    addStaticPath(path) {
        this.addMiddlewares(new static_middleware_1.StaticMiddleware(path));
    }
    connect() {
        for (const middleware of this.middlewares) {
            this._origin.use(middleware.callback);
        }
    }
}
exports.Middlewares = Middlewares;
