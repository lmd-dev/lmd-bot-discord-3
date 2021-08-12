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
exports.ModuleFile = void 0;
const fs = require('fs/promises');
const path = require('path');
const middleware_1 = require("lmd-webserver/dist/middlewares/middleware");
class ModuleFile extends middleware_1.Middleware {
    constructor(modulesManager) {
        super((req, res, next) => { this.process(req, res, next); });
        this._modulesManager = modulesManager;
    }
    process(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { moduleName, fileName } = req.params;
            const moduleDirectory = (_a = this._modulesManager.modules.get(moduleName)) === null || _a === void 0 ? void 0 : _a.directoryName;
            const appDir = path.dirname((_b = require === null || require === void 0 ? void 0 : require.main) === null || _b === void 0 ? void 0 : _b.filename);
            if (appDir) {
                const content = yield fs.readFile(path.join(appDir, "modules", moduleDirectory, "admin", fileName), 'utf8');
                res.set('Content-Type', 'application/javascript');
                res.send(content);
            }
            else {
                next();
            }
        });
    }
}
exports.ModuleFile = ModuleFile;
