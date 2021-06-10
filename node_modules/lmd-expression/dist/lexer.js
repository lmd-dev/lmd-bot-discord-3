"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_step_js_1 = require("./lexer-step.js");
const token_factory_js_1 = require("./token-factory.js");
var LMD;
(function (LMD) {
    class Lexer {
        constructor(decimalSeparator = Lexer.getDecimalSeparator()) {
            this._startNumber = /^[0-9+-]/;
            this._continueNumber = /^[0-9]/;
            this._operators = /^[\+\-*/]/;
            this._state = null;
            this._tokens = [];
            this.decimalSeparator = decimalSeparator;
        }
        get tokens() { return this._tokens; }
        get state() { return this._state; }
        set state(value) { this._state = value; }
        get currentOperand() { return this._currentOperand; }
        set currentOperand(value) { this._currentOperand = value; }
        get currentOperator() { return this._currentOperator; }
        set currentOperator(value) { this._currentOperator = value; }
        get decimalSeparator() { return this._decimalSeparator; }
        set decimalSeparator(value) { this._decimalSeparator = value; }
        Tokenize(expression) {
            this._tokens.length = 0;
            this.currentOperand = "";
            this.currentOperator = "";
            this.state = +lexer_step_js_1.default.WaitingForNumber;
            expression = expression.replace(/ /g, "");
            for (const character of expression) {
                if (this.state === lexer_step_js_1.default.WaitingForNumber) {
                    this.processWaitingForNumber(character);
                }
                else if (this.state === lexer_step_js_1.default.ContinueNumber) {
                    this.processContinueNumber(character);
                }
                else if (this.state === lexer_step_js_1.default.ContinueDecimalNumber) {
                    this.processContinueDecimalNumber(character);
                }
                else if (this.state === lexer_step_js_1.default.WaitingForOperator) {
                    this.processWaitingForOperator(character);
                }
            }
            if ((this.state === lexer_step_js_1.default.ContinueNumber || this.state === lexer_step_js_1.default.ContinueDecimalNumber) && this.currentOperand !== "")
                this.createOperand();
        }
        processWaitingForNumber(character) {
            if (this._startNumber.test(character)) {
                if (this.currentOperand !== "")
                    this.createOperand();
                else if (this.currentOperator !== "")
                    this.createOperator();
                this.currentOperand = character;
                this.state = lexer_step_js_1.default.ContinueNumber;
            }
            else
                throw `${character} can't start a number`;
        }
        processContinueNumber(character) {
            if (this._continueNumber.test(character)) {
                this.currentOperand += character;
            }
            else if (character === this.decimalSeparator) {
                this.currentOperand += character;
                this.state = lexer_step_js_1.default.ContinueDecimalNumber;
            }
            else if (this._operators.test(character)) {
                this.createOperand();
                this.currentOperator = character;
                this.state = lexer_step_js_1.default.WaitingForNumber;
            }
            else
                throw `${character} can't continue a number`;
        }
        processContinueDecimalNumber(character) {
            if (this._continueNumber.test(character)) {
                this.currentOperand += character;
            }
            else if (this._operators.test(character)) {
                this.createOperand();
                this.currentOperator = character;
                this.state = lexer_step_js_1.default.WaitingForNumber;
            }
            else
                throw `${character} can't continue a decimal number`;
        }
        processWaitingForOperator(character) {
            if (this._operators.test(character)) {
                this.currentOperator = character;
                this.state = lexer_step_js_1.default.WaitingForNumber;
            }
            else
                throw `${character} is not an operator`;
        }
        createOperand() {
            this.tokens.push(token_factory_js_1.default.createOperand(this.currentOperand));
            this._currentOperand = "";
        }
        createOperator() {
            this.tokens.push(token_factory_js_1.default.createOperator(this.currentOperator));
            this._currentOperator = "";
        }
        static getDecimalSeparator() {
            const numberWithDecimalSeparator = 1.1;
            return numberWithDecimalSeparator
                .toLocaleString()
                .substring(1, 2);
        }
    }
    LMD.Lexer = Lexer;
})(LMD || (LMD = {}));
exports.default = LMD.Lexer;
