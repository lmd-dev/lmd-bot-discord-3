"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBBot = void 0;
const database_mongo_1 = require("./database-mongo");
class DBBot extends database_mongo_1.DatabaseMongo {
    constructor() {
        super("localhost", 27017, "lmd-discord-bot", "", "");
    }
    static get instance() {
        if (!DBBot._instance)
            DBBot._instance = new DBBot();
        return DBBot._instance;
    }
    ;
}
exports.DBBot = DBBot;
DBBot._instance = null;
