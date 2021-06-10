"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleAction = void 0;
class ModuleAction {
    /**
     * Constructor
     * @param {} data
     */
    constructor(data) {
        var _a;
        this._name = data.name;
        this._description = (_a = data.description) !== null && _a !== void 0 ? _a : "";
        this._callback = data.callback;
    }
    get name() { return this._name; }
    get description() { return this._description; }
    get callback() { return this._callback; }
}
exports.ModuleAction = ModuleAction;
