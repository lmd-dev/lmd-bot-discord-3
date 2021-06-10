"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_operator_js_1 = require("./token-operator.js");
var LMD;
(function (LMD) {
    class TokenSubstraction extends token_operator_js_1.default {
        constructor() {
            super("-");
        }
        compute(firstOperand, secondOperand) {
            return firstOperand - secondOperand;
        }
    }
    LMD.TokenSubstraction = TokenSubstraction;
})(LMD || (LMD = {}));
exports.default = LMD.TokenSubstraction;
