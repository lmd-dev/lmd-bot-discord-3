import { Router } from "lmd-webserver/dist/routers/router";
import { Authentication } from "../middlewares/authentication.middleware";
import { UpdatePathFile } from "../middlewares/update-path-file.middleware";

export class Root extends Router
{
    constructor()
    {
        super();

        this.middlewares.addMiddlewares(new Authentication());
        this.middlewares.addMiddlewares(new UpdatePathFile());
        this.middlewares.addStaticPath(__dirname + "/../../public");
    }
}