import { Request, Response, NextFunction } from "express";
import { DataAccess } from "../../dao/data-access";
import { Module } from "../../modules/module";
import { ModulesManager } from "../../modules/modules-manager";
import { Middleware } from "lmd-webserver/dist/middlewares/middleware";

export class ModuleData extends Middleware
{
    private _modulesManager: ModulesManager;

    constructor(modulesManager: ModulesManager)
    {
        super((req: Request, res: Response, next: NextFunction) => { this.process(req, res, next) });

        this._modulesManager = modulesManager;
    }

    async process(req: Request, res: Response, next: NextFunction)
    {
        if (req.method.toLowerCase() === "get")
        {
            if (req.url.match(new RegExp("/all/" + req.params.collectionName + "$")))
                this.sendAllData(req, res, next);
            else
                this.sendData(req, res, next);
        }
        else if (req.method.toLowerCase() === "post")
        {
            this.insertData(req, res, next);
        }
        else if (req.method.toLowerCase() === "put")
        {
            this.updateData(req, res, next);
        }
        else if (req.method.toLowerCase() === "delete")
        {
            this.removeData(req, res, next);
        }
    }

    private async sendData(req: Request, res: Response, next: NextFunction)
    {
        const { collectionName } = req.params;

        const dao = await DataAccess.getInstance(collectionName);
        const data = await dao.findOne({})

        if (data)
        {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        }
        else
        {
            next();
        }
    }

    private async sendAllData(req: Request, res: Response, next: NextFunction)
    {
        const { collectionName } = req.params;

        const dao = await DataAccess.getInstance(collectionName);
        const data = await dao.findAll({})

        if (data)
        {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        }
        else
        {
            next();
        }
    }

    private async insertData(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const { collectionName } = req.params;
            const { data } = req.body;

            console.log(data);
            
            const dao = await DataAccess.getInstance(collectionName);
            await dao.insert(data);

            res.json(data);
        }
        catch (e)
        {
            console.log(e);
            res.sendStatus(500);
        }
    }

    private async updateData(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const { collectionName } = req.params;
            const { data } = req.body;
            
            const dao = await DataAccess.getInstance(collectionName);
            await dao.update(data);

            res.sendStatus(200);
        }
        catch (e)
        {
            console.log(e);
            res.sendStatus(500);
        }
    }

    private async removeData(req: Request, res: Response, next: NextFunction)
    {
        try
        {
            const { collectionName } = req.params;
            const { data } = req.body;

            const dao = await DataAccess.getInstance(collectionName);
            await dao.remove(data);

            res.sendStatus(200);
        }
        catch (e)
        {
            console.log(e);
            res.sendStatus(500);
        }
    }
}