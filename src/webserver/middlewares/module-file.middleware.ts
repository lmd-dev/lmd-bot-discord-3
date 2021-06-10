const fs = require('fs/promises');
const path = require('path');

import { Request, Response, NextFunction } from "express";
import { Module } from "../../modules/module";
import { ModulesManager } from "../../modules/modules-manager";
import { Middleware } from "../core/middlewares/middleware";

export class ModuleFile extends Middleware
{

    constructor()
    {
        super((req: Request, res: Response, next: NextFunction)=> { this.process(req, res, next)});
    }

    async process(req: Request, res: Response, next: NextFunction)
    {
        const fileName = req.query?.filename;

        const appDir = path.dirname(require?.main?.filename);
        console.log(`${appDir}/modules/${fileName}`);

        const content = await fs.readFile(path.join(appDir, "modules", fileName), 'utf8');
        
        console.log(content);

        res.set('Content-Type', 'application/javascript');
        res.send(content);
    }
}