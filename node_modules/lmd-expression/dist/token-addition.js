"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_operator_js_1 = require("./token-operator.js");
var LMD;
(function (LMD) {
    class TokenAddition extends token_operator_js_1.default {
        constructor() {
            super("+");
        }
        compute(firstOperand, secondOperand) {
            return firstOperand + secondOperand;
        }
    }
    LMD.TokenAddition = TokenAddition;
})(LMD || (LMD = {}));
exports.default = LMD.TokenAddition;
