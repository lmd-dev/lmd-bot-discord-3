import * as Express from "express";
import { Middlewares } from "../middlewares/middlewares";
import { Routers } from "./routers";
export class Router {
    /**
     * Constructor
     */
    constructor() {
        this._origin = Express.Router();
        this._routers = new Routers(this.origin);
        this._middlewares = new Middlewares(this.origin);
    }
    get origin() { return this._origin; }
    get routers() { return this._routers; }
    get middlewares() { return this._middlewares; }
    connect(path, parent) {
        this.middlewares.connect();
        parent.use(path, this.origin);
    }
}
