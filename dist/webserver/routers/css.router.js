"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSS = void 0;
const router_1 = require("../core/routers/router");
class CSS extends router_1.Router {
    constructor() {
        super();
        this.middlewares.addStaticPath(`${__dirname}/../../public/css`);
    }
}
exports.CSS = CSS;
