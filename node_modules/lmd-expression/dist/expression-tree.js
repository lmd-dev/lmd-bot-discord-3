"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expression_tree_node_js_1 = require("./expression-tree-node.js");
var LMD;
(function (LMD) {
    class ExpressionTree {
        get root() { return this._root; }
        set root(value) { this._root = value; }
        get currentNode() { return this._currentNode; }
        set currentNode(value) { this._currentNode = value; }
        build(tokens) {
            this.root = null;
            this.currentNode = null;
            this.addTokensToNode(tokens);
        }
        addTokensToNode(tokens) {
            if (tokens.length === 0)
                return;
            const token = tokens.shift();
            if (token.isOperand()) {
                const newNode = new expression_tree_node_js_1.default(token);
                if (this.currentNode === null) {
                    this.currentNode = newNode;
                    this.root = newNode;
                }
                else if (this.currentNode.leftChild === null)
                    this.currentNode.leftChild = newNode;
                else if (this.currentNode.rightChild === null)
                    this.currentNode.rightChild = newNode;
                else
                    throw "ExpressTree::addTokensToTree - Can't add child to tree";
            }
            else if (token.isOperator()) {
                if (token.isPriorityOperator()) {
                    if (this.currentNode.rightChild) {
                        const newTree = new expression_tree_node_js_1.default(token, this.currentNode.rightChild);
                        this.currentNode.rightChild = newTree;
                        this.currentNode = newTree;
                    }
                    else {
                        const newTree = new expression_tree_node_js_1.default(token, this.currentNode);
                        this.currentNode = newTree;
                        this.root = newTree;
                    }
                }
                else {
                    const newTree = new expression_tree_node_js_1.default(token, this.root);
                    this.currentNode = newTree;
                    this.root = newTree;
                }
            }
            this.addTokensToNode(tokens);
        }
        compute(node) {
            let result = 0;
            if (node) {
                const { leftChild, rightChild, token } = node;
                if (token.isOperand()) {
                    result = token.compute();
                }
                else {
                    let leftValue = leftChild ? this.compute(leftChild) : 0;
                    let rightValue = rightChild ? this.compute(rightChild) : 0;
                    result = token.compute(leftValue, rightValue);
                }
            }
            return result;
        }
    }
    LMD.ExpressionTree = ExpressionTree;
})(LMD || (LMD = {}));
exports.default = LMD.ExpressionTree;
