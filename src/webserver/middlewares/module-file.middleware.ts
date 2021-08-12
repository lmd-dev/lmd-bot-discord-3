const fs = require('fs/promises');
const path = require('path');

import { Request, Response, NextFunction } from "express";
import { Module } from "../../modules/module";
import { ModulesManager } from "../../modules/modules-manager";
import { Middleware } from "lmd-webserver/dist/middlewares/middleware";

export class ModuleFile extends Middleware
{
    private _modulesManager: ModulesManager;

    constructor(modulesManager: ModulesManager)
    {
        super((req: Request, res: Response, next: NextFunction)=> { this.process(req, res, next)});

        this._modulesManager = modulesManager;
    }

    async process(req: Request, res: Response, next: NextFunction)
    {
        const { moduleName, fileName } = req.params;

        const moduleDirectory = this._modulesManager.modules.get(moduleName)?.directoryName;

        const appDir = path.dirname(require?.main?.filename);
        
        if(appDir)
        {
            const content = await fs.readFile(path.join(appDir, "modules", moduleDirectory, "admin", fileName), 'utf8');
            
            res.set('Content-Type', 'application/javascript');
            res.send(content);
        }
        else
        {
            next();
        }
    }
}