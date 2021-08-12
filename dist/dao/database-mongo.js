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
    /**
     * Constructor
     * @param host Server host of the database
     * @param port Post used by the SGBD
     * @param dbName Name of the database
     * @param user User used for the connection
     * @param password Password of the user
     */
    constructor(host, port, dbName, user, password) {
        super(host, port, dbName, user, password);
        this._mongoClient = null;
        this._dbLink = null;
    }
    get mongoClient() { return this._mongoClient; }
    set mongoClient(value) { this._mongoClient = value; }
    get dbLink() { return this._dbLink; }
    set dbLink(value) { this._dbLink = value; }
    /**
     * Opens a connection to the database
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.dbLink) {
                const uri = `mongodb://${this.host}:${this.port}/`;
                this.mongoClient = yield MongoDB.connect(uri, { useUnifiedTopology: true });
                this.dbLink = this.mongoClient.db(this.dbName);
            }
        });
    }
    /**
     * Disconnects from the database
     */
    disconnect() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.mongoClient) === null || _a === void 0 ? void 0 : _a.close();
        });
    }
    /**
     * Create a new collection
     * @param tableName Name of the collection
     */
    createTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getTable(tableName);
        });
    }
    /**
     * Get a collection from its name
     * @param tableName Name of the collection to return
     * @returns The found collection or null
     */
    getTable(tableName) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            return (_b = yield ((_a = this.dbLink) === null || _a === void 0 ? void 0 : _a.collection(tableName))) !== null && _b !== void 0 ? _b : null;
        });
    }
    /**
     * Deletes all data from a collection
     * @param tableName Name of the collection to drop
     */
    dropTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield this.getTable(tableName);
            yield (table === null || table === void 0 ? void 0 : table.deleteMany({}));
        });
    }
    /**
     * Insterts new data inside a collection
     * @param tableName Name of the collection where add data
     * @param item Data to add
     * @returns The id of the inserted value or null
     */
    insert(tableName, item) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield this.getTable(tableName);
            const result = yield (table === null || table === void 0 ? void 0 : table.insertOne(item));
            return (_a = result === null || result === void 0 ? void 0 : result.insertedId) !== null && _a !== void 0 ? _a : null;
        });
    }
    /**
     * Updates an existing value in a collection
     * @param tableName Collection to update
     * @param query Query to identify the items to update
     * @param value Value to affect to the found items
     */
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
    /**
     * Removes items from a collection
     * @param tableName Collection to update
     * @param query Query to identify items to delete
     */
    remove(tableName, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const table = yield this.getTable(tableName);
                yield (table === null || table === void 0 ? void 0 : table.deleteOne(query));
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    /**
     * Returns items identified by the query
     * @param tableName Name of the collection where search items
     * @param filters Query to identify items
     * @returns An array containing found items
     */
    find(tableName, filters) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield ((_a = this.dbLink) === null || _a === void 0 ? void 0 : _a.collection(tableName));
            return (_b = table === null || table === void 0 ? void 0 : table.find(filters).toArray()) !== null && _b !== void 0 ? _b : [];
        });
    }
}
exports.DatabaseMongo = DatabaseMongo;
