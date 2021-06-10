"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_js_1 = require("./token.js");
var LMD;
(function (LMD) {
    class TokenOperator extends token_js_1.default {
        constructor(symbol) {
            super();
            this._symbol = symbol;
        }
        get symbol() { return this._symbol; }
        set symbol(value) { this._symbol = value; }
        isOperator() {
            return true;
        }
    }
    LMD.TokenOperator = TokenOperator;
})(LMD || (LMD = {}));
exports.default = LMD.TokenOperator;
