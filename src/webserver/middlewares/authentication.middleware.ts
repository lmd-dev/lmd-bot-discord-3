import { Request, Response, NextFunction } from "express";
import { Middleware } from "lmd-webserver/dist/middlewares/middleware";

export class Authentication extends Middleware
{
    constructor()
    {
        super((req: Request, res: Response, next: NextFunction)=> { this.authenticate(req, res, next)});
    }

    authenticate(req: Request, res: Response, next: NextFunction)
    {
        let accessGranted = ((<any>req)?.session)?.connected ?? false;

        if(accessGranted)
            next();
        else
            res.redirect("/login");
    }
}