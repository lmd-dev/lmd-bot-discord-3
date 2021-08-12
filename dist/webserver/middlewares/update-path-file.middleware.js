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
exports.UpdatePathFile = void 0;
const middleware_1 = require("lmd-webserver/dist/middlewares/middleware");
class UpdatePathFile extends middleware_1.Middleware {
    constructor() {
        super((req, res, next) => { this.process(req, res, next); });
    }
    process(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.url.indexOf("/public") === 0)
                req.url = req.url.replace("/public", "");
            next();
        });
    }
}
exports.UpdatePathFile = UpdatePathFile;
