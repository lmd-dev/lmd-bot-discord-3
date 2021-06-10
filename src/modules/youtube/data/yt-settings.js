export class YTSettings {
    /**
     * Constructor
     * @param data Initialization data
     */
    constructor(data = null) {
        this._id = "";
        this._apiKey = "";
        this.fromArray(data);
    }
    get id() { return this._id; }
    set id(value) { this._id = value; }
    get apiKey() { return this._apiKey; }
    set apiKey(value) { this._apiKey = value; }
    /**
     * Imports data from JS object
     * @param data
     */
    fromArray(data) {
        var _a, _b;
        this._id = (_a = data === null || data === void 0 ? void 0 : data._id) !== null && _a !== void 0 ? _a : this._id;
        this._apiKey = (_b = data === null || data === void 0 ? void 0 : data.apiKey) !== null && _b !== void 0 ? _b : this._apiKey;
    }
    /**
     * Exports data to JS object
     */
    toArray() {
        return {
            apiKey: this.apiKey
        };
    }
}
