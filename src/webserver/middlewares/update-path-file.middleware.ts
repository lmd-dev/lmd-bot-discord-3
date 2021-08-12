import { Request, Response, NextFunction } from "express";
import { Middleware } from "lmd-webserver/dist/middlewares/middleware";

export class UpdatePathFile extends Middleware
{
    constructor()
    {
        super((req: Request, res: Response, next: NextFunction)=> { this.process(req, res, next)});
    }

    async process(req: Request, res: Response, next: NextFunction)
    {
        if(req.url.indexOf("/public") === 0)
            req.url = req.url.replace("/public", "");
            
        next();
    }
}