"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const router_1 = require("../core/routers/router");
const connect_middleware_1 = require("../middlewares/connect.middleware");
class Login extends router_1.Router {
    constructor() {
        super();
        this.routers.addRoute('post', '/', new connect_middleware_1.Connect());
        this.middlewares.addStaticPath(`${__dirname}/../../public/login`);
    }
}
exports.Login = Login;
