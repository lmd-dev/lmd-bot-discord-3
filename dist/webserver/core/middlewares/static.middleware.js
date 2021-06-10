"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticMiddleware = void 0;
const middleware_1 = require("./middleware");
const Express = require("express");
class StaticMiddleware extends middleware_1.Middleware {
    constructor(path) {
        super((req, res, next) => {
            Express.static(path)(req, res, next);
        });
    }
}
exports.StaticMiddleware = StaticMiddleware;
