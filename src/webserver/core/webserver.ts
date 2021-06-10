import * as Express from "express";
import { Middlewares } from "./middlewares/middlewares";
import { Routers } from "./routers/routers";
import * as http from "http";
import * as https from "https";
import * as Session from "express-session";

export interface WebServerOptions
{
    http?: {
        port?: number;
        enable?: boolean;
    },
    https?: {
        port?: number;
        enable?: boolean;
        privateKey?: string;
        certificate?: string;
    },
    sessions?: {
        enable?: boolean;
        passPhrase?: string;
    }
}

export class WebServer
{
    private readonly _httpPort: number;
    public get httpPort(): number { return this._httpPort; }

    private _enableHttp: boolean;
    public get enableHttp(): boolean { return this._enableHttp; }

    private readonly _httpsPort: number;
    public get httpsPort(): number { return this._httpsPort; }

    private readonly _enableHttps: boolean;
    public get enableHttps(): boolean { return this._enableHttps; }

    private _privateKey: string;
    public get privateKey(): string { return this._privateKey; }

    private _certificate: string;
    public get certificate(): string { return this._certificate; }

    private _enableSessions: boolean;
    public get enableSessions(): boolean { return this._enableSessions; }

    private _sessionPassPhrase: string;
    public get sessionPassPhrase(): string { return this._sessionPassPhrase; }

    private _server: Express.Application;
    public get server(): Express.Application { return this._server; }

    private _routers: Routers;
    public get routers(): Routers { return this._routers; }

    private _middlewares: Middlewares;
    public get middlewares(): Middlewares { return this._middlewares; }

    /**
     * Constructor
     * @param port Number of the port to listen 
     */
    constructor(options: WebServerOptions)
    {
        this._httpPort = options.http?.port ?? 80;
        this._enableHttp = options.http?.enable ?? false;

        this._httpsPort = options.https?.port ?? 443;
        this._enableHttps = options.https?.enable ?? false;
        this._privateKey = options.https?.privateKey ?? "";
        this._certificate = options.https?.certificate ?? "";

        this._enableSessions = options.sessions?.enable ?? false;
        this._sessionPassPhrase = options.sessions?.passPhrase ?? "";

        this._server = Express();
        this._routers = new Routers(this._server);
        this._middlewares = new Middlewares(this._server);
        
        this.activateBodyParsing();
        this.activateSessions();
    }

    /**
     * Starts the web server
     */
    start()
    {
        this.middlewares.connect();

        this.startHttp();
        this.startHttps();
    }

    activateBodyParsing()
    {
        this._server.use(Express.json())
        this._server.use(Express.urlencoded({ extended: true }))
    }

    activateSessions()
    {
        if (this.enableSessions)
        {
            this._server.use(Session({
                secret: this.sessionPassPhrase,
                resave: false,
                saveUninitialized: true,
                cookie: { secure: this.enableHttps }
            }));
        }
    }

    startHttp()
    {
        if (this._enableHttp)
        {
            const httpServer = http.createServer(this.server);
            httpServer.listen(this.httpPort);
        }
    }

    startHttps()
    {
        if (this._enableHttps)
        {
            const httpsServer = https.createServer({ key: this.privateKey, cert: this.certificate }, this.server);
            httpsServer.listen(this.httpsPort);
        }
    }
}