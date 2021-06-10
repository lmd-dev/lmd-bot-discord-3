"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseMongo = void 0;
const database_1 = require("./database");
const MongoDB = require("mongodb");
class DatabaseMongo extends database_1.default {
    constructor(host, port, dbName, user, password) {
        super(host, port, dbName, user, password);
        this._mongoClient = null;
        this._dbLink = null;
    }
    get mongoClient() { return this._mongoClient; }
    set mongoClient(value) { this._mongoClient = value; }
    get dbLink() { return this._dbLink; }
    set dbLink(value) { this._dbLink = value; }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.dbLink) {
                const uri = `mongodb://${this.host}:${this.port}/`;
                this.mongoClient = yield MongoDB.connect(uri, { useUnifiedTopology: true });
                this.dbLink = this.mongoClient.db(this.dbName);
            }
        });
    }
    disconnect() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.mongoClient) === null || _a === void 0 ? void 0 : _a.close();
        });
    }
    createTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getTable(tableName);
        });
    }
    getTable(tableName) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            return (_b = yield ((_a = this.dbLink) === null || _a === void 0 ? void 0 : _a.collection(tableName))) !== null && _b !== void 0 ? _b : null;
        });
    }
    dropTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield this.getTable(tableName);
            yield (table === null || table === void 0 ? void 0 : table.deleteMany({}));
        });
    }
    insert(tableName, item) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield this.getTable(tableName);
            const result = yield (table === null || table === void 0 ? void 0 : table.insertOne(item));
            return (_a = result === null || result === void 0 ? void 0 : result.insertedId) !== null && _a !== void 0 ? _a : null;
        });
    }
    update(tableName, query, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const table = yield this.getTable(tableName);
                yield (table === null || table === void 0 ? void 0 : table.updateOne(query, { $set: value }));
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    find(tableName, filters) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield ((_a = this.dbLink) === null || _a === void 0 ? void 0 : _a.collection(tableName));
            return (_b = table === null || table === void 0 ? void 0 : table.find(filters).toArray()) !== null && _b !== void 0 ? _b : [];
        });
    }
}
exports.DatabaseMongo = DatabaseMongo;
