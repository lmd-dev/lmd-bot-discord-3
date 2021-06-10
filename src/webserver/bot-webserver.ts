import { ModulesManager } from "./../modules/modules-manager";
import { WebServer } from "./core/webserver";
import { Login } from "./routers/login.router";
import { CSS } from "./routers/css.router";
import { Root } from "./routers/root.router";
import { API } from "./routers/api.router";

export class BotWebServer extends WebServer
{
    constructor(modules: ModulesManager)
    {
        super({http: {port: 80, enable: true}, sessions: { enable: true, passPhrase: "lmd-bot" }});

        this.routers.addRouter('/login', new Login());
        this.routers.addRouter('/css', new CSS());
        this.routers.addRouter('/api', new API(modules));
        this.routers.addRouter('/', new Root());
    }
}