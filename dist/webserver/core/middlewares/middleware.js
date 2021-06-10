"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
class Middleware {
    constructor(callback) {
        this._callback = callback;
    }
    get callback() { return this._callback; }
}
exports.Middleware = Middleware;
