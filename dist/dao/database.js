"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
class Database {
    /**
     * Constructor
     * @param host Server host of the database
     * @param port Post used by the SGBD
     * @param dbName Name of the database
     * @param user User used for the connection
     * @param password Password of the user
     */
    constructor(host, port, dbName, user, password) {
        this._host = host;
        this._port = port;
        this._dbName = dbName;
        this._user = user;
        this._password = password;
    }
    get host() { return this._host; }
    get port() { return this._port; }
    get dbName() { return this._dbName; }
    get user() { return this._user; }
    get password() { return this._password; }
}
exports.Database = Database;
exports.default = Database;
