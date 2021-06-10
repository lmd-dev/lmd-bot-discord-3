"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebServer = void 0;
const Express = require("express");
const middlewares_1 = require("./middlewares/middlewares");
const routers_1 = require("./routers/routers");
const http = require("http");
const https = require("https");
const Session = require("express-session");
class WebServer {
    /**
     * Constructor
     * @param port Number of the port to listen
     */
    constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        this._httpPort = (_b = (_a = options.http) === null || _a === void 0 ? void 0 : _a.port) !== null && _b !== void 0 ? _b : 80;
        this._enableHttp = (_d = (_c = options.http) === null || _c === void 0 ? void 0 : _c.enable) !== null && _d !== void 0 ? _d : false;
        this._httpsPort = (_f = (_e = options.https) === null || _e === void 0 ? void 0 : _e.port) !== null && _f !== void 0 ? _f : 443;
        this._enableHttps = (_h = (_g = options.https) === null || _g === void 0 ? void 0 : _g.enable) !== null && _h !== void 0 ? _h : false;
        this._privateKey = (_k = (_j = options.https) === null || _j === void 0 ? void 0 : _j.privateKey) !== null && _k !== void 0 ? _k : "";
        this._certificate = (_m = (_l = options.https) === null || _l === void 0 ? void 0 : _l.certificate) !== null && _m !== void 0 ? _m : "";
        this._enableSessions = (_p = (_o = options.sessions) === null || _o === void 0 ? void 0 : _o.enable) !== null && _p !== void 0 ? _p : false;
        this._sessionPassPhrase = (_r = (_q = options.sessions) === null || _q === void 0 ? void 0 : _q.passPhrase) !== null && _r !== void 0 ? _r : "";
        this._server = Express();
        this._routers = new routers_1.Routers(this._server);
        this._middlewares = new middlewares_1.Middlewares(this._server);
        this.activateBodyParsing();
        this.activateSessions();
    }
    get httpPort() { return this._httpPort; }
    get enableHttp() { return this._enableHttp; }
    get httpsPort() { return this._httpsPort; }
    get enableHttps() { return this._enableHttps; }
    get privateKey() { return this._privateKey; }
    get certificate() { return this._certificate; }
    get enableSessions() { return this._enableSessions; }
    get sessionPassPhrase() { return this._sessionPassPhrase; }
    get server() { return this._server; }
    get routers() { return this._routers; }
    get middlewares() { return this._middlewares; }
    /**
     * Starts the web server
     */
    start() {
        this.middlewares.connect();
        this.startHttp();
        this.startHttps();
    }
    activateBodyParsing() {
        this._server.use(Express.json());
        this._server.use(Express.urlencoded({ extended: true }));
    }
    activateSessions() {
        if (this.enableSessions) {
            this._server.use(Session({
                secret: this.sessionPassPhrase,
                resave: false,
                saveUninitialized: true,
                cookie: { secure: this.enableHttps }
            }));
        }
    }
    startHttp() {
        if (this._enableHttp) {
            const httpServer = http.createServer(this.server);
            httpServer.listen(this.httpPort);
        }
    }
    startHttps() {
        if (this._enableHttps) {
            const httpsServer = https.createServer({ key: this.privateKey, cert: this.certificate }, this.server);
            httpsServer.listen(this.httpsPort);
        }
    }
}
exports.WebServer = WebServer;
