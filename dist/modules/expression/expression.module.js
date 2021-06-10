"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("../module");
const module_action_1 = require("../module-action");
const lmd_expression_1 = require("lmd-expression");
class ModuleExpression extends module_1.Module {
    /**
     * Constructor
     */
    constructor(discordAccess) {
        super("Expression", discordAccess);
        this.addAction(new module_action_1.ModuleAction({ name: "Calculer", callback: (message, parameters) => { this.computeExpression(message, parameters); } }));
    }
    /**
     * Replaces the message of the command by the result of the expression
     * @param message
     * @param parameters
     */
    computeExpression(message, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.discordAccess.deleteMessage(message);
            if (parameters.length) {
                try {
                    let [expression] = parameters;
                    expression = expression.replace(/"/g, "");
                    const computer = new lmd_expression_1.default();
                    const result = computer.compute(expression);
                    if (message && message.guild) {
                        yield this.discordAccess.writeOnChannel(message.guild.id, message.channel.id, `${expression} = ${result}`);
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    }
}
exports.default = ModuleExpression;
