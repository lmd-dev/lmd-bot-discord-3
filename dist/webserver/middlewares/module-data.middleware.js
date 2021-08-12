"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleData = void 0;
const data_access_1 = require("../../dao/data-access");
const middleware_1 = require("lmd-webserver/dist/middlewares/middleware");
class ModuleData extends middleware_1.Middleware {
    constructor(modulesManager) {
        super((req, res, next) => { this.process(req, res, next); });
        this._modulesManager = modulesManager;
    }
    process(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.method.toLowerCase() === "get") {
                if (req.url.match(new RegExp("/all/" + req.params.collectionName + "$")))
                    this.sendAllData(req, res, next);
                else
                    this.sendData(req, res, next);
            }
            else if (req.method.toLowerCase() === "post") {
                this.insertData(req, res, next);
            }
            else if (req.method.toLowerCase() === "put") {
                this.updateData(req, res, next);
            }
            else if (req.method.toLowerCase() === "delete") {
                this.removeData(req, res, next);
            }
        });
    }
    sendData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { collectionName } = req.params;
            const dao = yield data_access_1.DataAccess.getInstance(collectionName);
            const data = yield dao.findOne({});
            if (data) {
                res.set('Content-Type', 'application/json');
                res.send(JSON.stringify(data));
            }
            else {
                next();
            }
        });
    }
    sendAllData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { collectionName } = req.params;
            const dao = yield data_access_1.DataAccess.getInstance(collectionName);
            const data = yield dao.findAll({});
            if (data) {
                res.set('Content-Type', 'application/json');
                res.send(JSON.stringify(data));
            }
            else {
                next();
            }
        });
    }
    insertData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { collectionName } = req.params;
                const { data } = req.body;
                console.log(data);
                const dao = yield data_access_1.DataAccess.getInstance(collectionName);
                yield dao.insert(data);
                res.json(data);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    updateData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { collectionName } = req.params;
                const { data } = req.body;
                const dao = yield data_access_1.DataAccess.getInstance(collectionName);
                yield dao.update(data);
                res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
    removeData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { collectionName } = req.params;
                const { data } = req.body;
                const dao = yield data_access_1.DataAccess.getInstance(collectionName);
                yield dao.remove(data);
                res.sendStatus(200);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        });
    }
}
exports.ModuleData = ModuleData;
