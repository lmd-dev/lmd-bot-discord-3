"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotWebServer = void 0;
const webserver_1 = require("./core/webserver");
const login_router_1 = require("./routers/login.router");
const css_router_1 = require("./routers/css.router");
const root_router_1 = require("./routers/root.router");
const api_router_1 = require("./routers/api.router");
class BotWebServer extends webserver_1.WebServer {
    constructor(modules) {
        super({ http: { port: 80, enable: true }, sessions: { enable: true, passPhrase: "lmd-bot" } });
        this.routers.addRouter('/login', new login_router_1.Login());
        this.routers.addRouter('/css', new css_router_1.CSS());
        this.routers.addRouter('/api', new api_router_1.API(modules));
        this.routers.addRouter('/', new root_router_1.Root());
    }
}
exports.BotWebServer = BotWebServer;