"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const middleware_1 = require("../core/middlewares/middleware");
class Authentication extends middleware_1.Middleware {
    constructor() {
        super((req, res, next) => { this.authenticate(req, res, next); });
    }
    authenticate(req, res, next) {
        var _a, _b;
        let accessGranted = (_b = (_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.connected) !== null && _b !== void 0 ? _b : false;
        console.log(accessGranted ? "Access granted" : "Access refused");
        if (accessGranted)
            next();
        else
            res.redirect("/login");
    }
}
exports.Authentication = Authentication;
