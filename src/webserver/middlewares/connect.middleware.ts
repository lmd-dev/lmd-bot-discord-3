import { Request, Response, NextFunction } from "express";
import { Middleware } from "../core/middlewares/middleware";

export class Connect extends Middleware
{
    constructor()
    {
        super((req: Request, res: Response, next: NextFunction)=> { this.connect(req, res, next)});
    }

    connect(req: Request, res: Response, next: NextFunction)
    {
        let connected = true;

        connected = req.body?.lmd_bot_user === "lmd" && req.body?.lmd_bot_password === "lmd";

        if(connected)
        {
            (<any>req.session).connected = true;
            
            res.redirect("/");
        }
        else
            next();
    }
}