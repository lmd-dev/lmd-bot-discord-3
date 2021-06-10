import { Router } from "../core/routers/router";
import { Connect } from "../middlewares/connect.middleware";

export class CSS extends Router
{
    constructor()
    {
        super();
        this.middlewares.addStaticPath(`${__dirname}/../../public/css`);
    }
}