"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const middleware_1 = require("lmd-webserver/dist/middlewares/middleware");
class Authentication extends middleware_1.Middleware {
    constructor() {
        super((req, res, next) => { this.authenticate(req, res, next); });
    }
    authenticate(req, res, next) {
        var _a, _b, _c;
        let accessGranted = (_c = (_b = ((_a = req) === null || _a === void 0 ? void 0 : _a.session)) === null || _b === void 0 ? void 0 : _b.connected) !== null && _c !== void 0 ? _c : false;
        if (accessGranted)
            next();
        else
            res.redirect("/login");
    }
}
exports.Authentication = Authentication;
