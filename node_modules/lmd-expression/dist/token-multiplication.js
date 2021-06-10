"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_operator_js_1 = require("./token-operator.js");
var LMD;
(function (LMD) {
    class TokenMultiplication extends token_operator_js_1.default {
        constructor() {
            super("*");
        }
        isPriorityOperator() {
            return true;
        }
        compute(firstOperand, secondOperand) {
            return firstOperand * secondOperand;
        }
    }
    LMD.TokenMultiplication = TokenMultiplication;
})(LMD || (LMD = {}));
exports.default = LMD.TokenMultiplication;
