import { Router } from "../core/routers/router";
import { Authentication } from "../middlewares/authentication.middleware";

export class Root extends Router
{
    constructor()
    {
        super();

        this.middlewares.addMiddlewares(new Authentication());
        this.middlewares.addStaticPath(__dirname + "/../../public");
    }
}