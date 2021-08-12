import { WebServer, WebServerOptions } from "lmd-webserver/dist/webserver";
import { ModulesManager } from "./../modules/modules-manager";
import { Login } from "./routers/login.router";
import { CSS } from "./routers/css.router";
import { Root } from "./routers/root.router";
import { API } from "./routers/api.router";

export class BotWebServer extends WebServer
{

    constructor()
    {
        super(null);
    }

    initialize(options: WebServerOptions, modules: ModulesManager)
    {

        super.setOptions(options);

        this.routers.addRouter('/login', new Login());
        this.routers.addRouter('/css', new CSS());        
        this.routers.addRouter('/api', new API(modules));        
        this.routers.addRouter('/', new Root());
    }
}