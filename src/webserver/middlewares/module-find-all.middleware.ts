import { Request, Response, NextFunction } from "express";
import { Module } from "../../modules/module";
import { ModulesManager } from "../../modules/modules-manager";
import { Middleware } from "../core/middlewares/middleware";

export class ModuleFindAll extends Middleware
{
    private modules: ModulesManager;

    constructor(modules: ModulesManager)
    {
        super((req: Request, res: Response, next: NextFunction)=> { this.process(req, res, next)});

        this.modules = modules;
    }

    process(req: Request, res: Response, next: NextFunction)
    {
        const data = { modules: new Array<any>() };

        this.modules.modules.forEach((value: Module, key: string) => {

            data.modules.push({
                name: value.name,
                jsFiles: value.jsFiles
            });
        });

        res.json(data);
    }
}