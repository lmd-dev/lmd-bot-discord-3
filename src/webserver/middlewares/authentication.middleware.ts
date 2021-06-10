import { Request, Response, NextFunction } from "express";
import { Middleware } from "../core/middlewares/middleware";

export class Authentication extends Middleware
{
    constructor()
    {
        super((req: Request, res: Response, next: NextFunction)=> { this.authenticate(req, res, next)});
    }

    authenticate(req: Request, res: Response, next: NextFunction)
    {
        let accessGranted = (<any>req?.session)?.connected ?? false;

        console.log(accessGranted ? "Access granted" : "Access refused");

        if(accessGranted)
            next();
        else
            res.redirect("/login");
    }
}