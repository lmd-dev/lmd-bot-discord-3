"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LMD;
(function (LMD) {
    class ExpressionTreeNode {
        constructor(token, leftChild = null, rightChild = null) {
            this._token = token;
            this._leftChild = leftChild;
            this._rightChild = rightChild;
        }
        get token() { return this._token; }
        get leftChild() { return this._leftChild; }
        set leftChild(value) { this._leftChild = value; }
        get rightChild() { return this._rightChild; }
        set rightChild(value) { this._rightChild = value; }
    }
    LMD.ExpressionTreeNode = ExpressionTreeNode;
})(LMD || (LMD = {}));
exports.default = LMD.ExpressionTreeNode;
