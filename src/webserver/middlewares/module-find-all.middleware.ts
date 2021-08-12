import { Request, Response, NextFunction } from "express";
import { Module } from "../../modules/module";
import { ModulesManager } from "../../modules/modules-manager";
import { Middleware } from "lmd-webserver/dist/middlewares/middleware";

export class ModuleFindAll extends Middleware
{
    private modules: ModulesManager;

    constructor(modules: ModulesManager)
    {
        super((req: Request, res: Response, next: NextFunction) => { this.process(req, res, next) });

        this.modules = modules;
    }

    process(req: Request, res: Response, next: NextFunction)
    {
        const data = { modules: new Array<any>() };

        this.modules.modules.forEach((module: Module, key: string) =>
        {
            if (module.hasBackOffice)
            {
                data.modules.push({
                    name: module.name,
                    entryPointClassName: module.entryPointClassName,
                    entryPointFileName: module.entryPointFileName
                });
            }
        });

        res.json(data);
    }
}