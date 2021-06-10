"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expression_tree_js_1 = require("./expression-tree.js");
const lexer_js_1 = require("./lexer.js");
var LMD;
(function (LMD) {
    class ExpressionComputer {
        constructor() {
            this._lexer = new lexer_js_1.default();
            this._expressionTree = new expression_tree_js_1.default();
        }
        get lexer() { return this._lexer; }
        get expressionTree() { return this._expressionTree; }
        compute(expression) {
            this.lexer.Tokenize(expression);
            this.expressionTree.build(this.lexer.tokens);
            return this.expressionTree.compute(this.expressionTree.root);
        }
    }
    LMD.ExpressionComputer = ExpressionComputer;
})(LMD || (LMD = {}));
exports.default = LMD.ExpressionComputer;
