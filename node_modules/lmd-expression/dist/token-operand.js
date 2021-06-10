"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_js_1 = require("./token.js");
var LMD;
(function (LMD) {
    class TokenOperand extends token_js_1.default {
        constructor(value) {
            super();
            if (value.indexOf('.') !== -1)
                this._value = parseFloat(value);
            else
                this._value = parseInt(value);
        }
        get value() { return this._value; }
        set value(value) { this._value = value; }
        isOperand() {
            return true;
        }
        compute(firstOperand = null, secondOperand = null) {
            return this.value;
        }
    }
    LMD.TokenOperand = TokenOperand;
})(LMD || (LMD = {}));
exports.default = LMD.TokenOperand;
