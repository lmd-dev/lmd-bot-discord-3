"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_operator_js_1 = require("./token-operator.js");
var LMD;
(function (LMD) {
    class TokenDivision extends token_operator_js_1.default {
        constructor() {
            super("/");
        }
        isPriorityOperator() {
            return true;
        }
        compute(firstOperand, secondOperand) {
            if (secondOperand === 0)
                throw "TokenDivision::compute - Division by zero";
            return firstOperand / secondOperand;
        }
    }
    LMD.TokenDivision = TokenDivision;
})(LMD || (LMD = {}));
exports.default = LMD.TokenDivision;
