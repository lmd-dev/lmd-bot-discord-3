import { Router } from "lmd-webserver/dist/routers/router";
import { Connect } from "../middlewares/connect.middleware";

export class Login extends Router
{
    constructor()
    {
        super();
        this.routers.addRoute('post', '/', new Connect());
        this.middlewares.addStaticPath(`${__dirname}/../../public/login`);
    }
}