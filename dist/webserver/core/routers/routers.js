"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routers = void 0;
class Routers {
    constructor(origin) {
        this._origin = origin;
    }
    get origin() { return this._origin; }
    /**
     * Adds route to the server
     * @param method HTTP Method to access to this route
     * @param path relative path from server root
     * @param middleware Middleware(s) to call
     */
    addRoute(method, path, ...middlewares) {
        this.origin[method](path, middlewares.map((middleware) => { return middleware.callback; }));
    }
    /**
     * Adds router as child to the server
     * @param path relative path from server root
     * @param router Child router
     */
    addRouter(path, router) {
        router.connect(path, this.origin);
    }
}
exports.Routers = Routers;
