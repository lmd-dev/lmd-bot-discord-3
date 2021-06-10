"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LMD;
(function (LMD) {
    let LexerStep;
    (function (LexerStep) {
        LexerStep[LexerStep["WaitingForNumber"] = 0] = "WaitingForNumber";
        LexerStep[LexerStep["WaitingForOperator"] = 1] = "WaitingForOperator";
        LexerStep[LexerStep["ContinueNumber"] = 2] = "ContinueNumber";
        LexerStep[LexerStep["ContinueDecimalNumber"] = 3] = "ContinueDecimalNumber";
    })(LexerStep = LMD.LexerStep || (LMD.LexerStep = {}));
})(LMD || (LMD = {}));
exports.default = LMD.LexerStep;
