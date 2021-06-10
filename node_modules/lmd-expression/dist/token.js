"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LMD;
(function (LMD) {
    class Token {
        isOperand() { return false; }
        isOperator() { return false; }
        isPriorityOperator() { return false; }
    }
    LMD.Token = Token;
})(LMD || (LMD = {}));
exports.default = LMD.Token;
