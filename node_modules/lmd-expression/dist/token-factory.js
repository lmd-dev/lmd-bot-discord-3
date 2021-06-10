"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_addition_js_1 = require("./token-addition.js");
const token_division_js_1 = require("./token-division.js");
const token_multiplication_js_1 = require("./token-multiplication.js");
const token_operand_js_1 = require("./token-operand.js");
const token_substraction_js_1 = require("./token-substraction.js");
var LMD;
(function (LMD) {
    class TokenFactory {
        static createOperand(value) {
            return new token_operand_js_1.default(value);
        }
        static createOperator(value) {
            let token = null;
            switch (value) {
                case "*":
                    token = new token_multiplication_js_1.default();
                    break;
                case "/":
                    token = new token_division_js_1.default();
                    break;
                case "-":
                    token = new token_substraction_js_1.default();
                    break;
                case "+":
                    token = new token_addition_js_1.default();
                    break;
                default:
                    throw `TokenFactory::createOperator - Unknown operator '${value}`;
            }
            return token;
        }
    }
    LMD.TokenFactory = TokenFactory;
})(LMD || (LMD = {}));
exports.default = LMD.TokenFactory;
