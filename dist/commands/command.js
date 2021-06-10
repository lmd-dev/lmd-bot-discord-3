"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    /**
     * Constructor
     * @param {*} data Initializing data
     */
    constructor(data = null) {
        this._id = "";
        this._name = "";
        this._moduleName = "";
        this._actionName = "";
        this.fromArray(data);
    }
    get id() { return this._id; }
    set id(value) { this._id = value; }
    get name() { return this._name; }
    set name(value) { this._name = value.replace(/[\W]/, ""); }
    get moduleName() { return this._moduleName; }
    set moduleName(value) { this._moduleName = value; }
    get actionName() { return this._actionName; }
    set actionName(value) { this._actionName = value; }
    /**
     * Imports data from JS object
     * @param {*} data
     */
    fromArray(data) {
        var _a, _b, _c, _d;
        this._id = (_a = data === null || data === void 0 ? void 0 : data._id) !== null && _a !== void 0 ? _a : this._id;
        this._name = (_b = data === null || data === void 0 ? void 0 : data.name) !== null && _b !== void 0 ? _b : this._name;
        this._moduleName = (_c = data === null || data === void 0 ? void 0 : data.moduleName) !== null && _c !== void 0 ? _c : this._moduleName;
        this._actionName = (_d = data === null || data === void 0 ? void 0 : data.actionName) !== null && _d !== void 0 ? _d : this._actionName;
    }
    /**
     * Exports data to JS Object
     */
    toArray() {
        return {
            name: this._name,
            moduleName: this._moduleName,
            actionName: this._actionName,
        };
    }
}
exports.Command = Command;
