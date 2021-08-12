"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connect = void 0;
const middleware_1 = require("lmd-webserver/dist/middlewares/middleware");
class Connect extends middleware_1.Middleware {
    constructor() {
        super((req, res, next) => { this.connect(req, res, next); });
    }
    connect(req, res, next) {
        var _a, _b;
        let connected = true;
        connected = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.lmd_bot_user) === "lmd" && ((_b = req.body) === null || _b === void 0 ? void 0 : _b.lmd_bot_password) === "lmd";
        if (connected) {
            req.session.connected = true;
            res.redirect("/");
        }
        else
            next();
    }
}
exports.Connect = Connect;
