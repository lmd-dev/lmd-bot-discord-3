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
exports.DataAccess = void 0;
const db_bot_1 = require("./db-bot");
class DataAccess {
    /**
     * Constructor
     */
    constructor(tableName, type) {
        this._db = null;
        this._tableName = tableName;
        this._objectType = type;
    }
    get db() { return this._db; }
    get tableName() { return this._tableName; }
    get objectType() { return this._objectType; }
    /**
     * Returns an initialized instance of the data access
     * @param tableName Name of the table to use
     * @param type Type of object to process
     */
    static getInstance(tableName, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new DataAccess(tableName, type);
            yield instance.initialize();
            return instance;
        });
    }
    /**
     * Initialize DB connexion
     */
    initialize() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._db) {
                this._db = db_bot_1.DBBot.instance;
                yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.connect());
            }
            return this;
        });
    }
    /**
     * Returns all items matching with the query
     * @param query
     */
    findAll(query = {}) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.find(this.tableName, query));
            return (_b = items === null || items === void 0 ? void 0 : items.map((item) => { return new this.objectType(item); })) !== null && _b !== void 0 ? _b : [];
        });
    }
    /**
     * Returns the first item matching with the query
     * @param query
     */
    findOne(query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.findAll(query);
            return ((items && items.length) ? items[0] : null);
        });
    }
    /**
     * Insert an item of type T in the dataaccess table
     * @param item
     */
    insert(item) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const insertedId = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.insert(this.tableName, item.toArray()));
            if (insertedId) {
                item.id = insertedId;
                return true;
            }
            return false;
        });
    }
    /**
     * Updates an item value
     * @param item
     */
    update(item) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (item.id === "")
                yield this.insert(item);
            else
                yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.update(this.tableName, { _id: item.id }, item.toArray()));
        });
    }
}
exports.DataAccess = DataAccess;
