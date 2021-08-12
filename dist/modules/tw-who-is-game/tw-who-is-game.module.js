"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("../module");
const module_action_1 = require("../module-action");
class ModuleTWSpeaker extends module_1.Module {
    /**
     * Constructor
     */
    constructor(discordAccess, twitchAccess, webServer) {
        super({
            name: "TW Who Is Game",
            directoryName: "tw-who-is-game",
            discordAccess: discordAccess,
            twitchAccess: twitchAccess,
            webServer: webServer
        });
        this._channel = "";
        this.addTwitchAction(new module_action_1.ModuleAction({
            name: "Afficher le jeu",
            callback: (channel, userstate, message, self) => {
                this.displayGame();
            }
        }));
        this.addTwitchAction(new module_action_1.ModuleAction({
            name: "Afficher les règles",
            callback: (channel, userstate, message, self) => {
                this.displayRules(channel);
            }
        }));
        this.addTwitchAction(new module_action_1.ModuleAction({
            name: "Révéler une case",
            callback: (channel, userstate, message, self) => {
                this.revealABox(channel, userstate, message);
            }
        }));
    }
    displayGame() {
        var _a, _b;
        (_b = (_a = this.webServer) === null || _a === void 0 ? void 0 : _a.websockets) === null || _b === void 0 ? void 0 : _b.emit("box");
    }
    displayRules(channel) {
        this.twitchAccess.say(channel, "'!boxshow' permet d'afficher l'état du jeu | '!box [ligne] [colonne]' révèle une case : '!box A 2'. Vous ne pouvez révéler qu'une seule case par live et par personne. *** Choisissez judicieusement ***");
    }
    revealABox(channel, userstate, message) {
        var _a, _b;
        const regexResults = message.match(/^!box +(?<row>[A-Z]) *(?<col>[1-9])/);
        if (regexResults && regexResults.groups) {
            const x = parseInt(regexResults.groups.col) - 1;
            const y = regexResults.groups.row.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
            (_b = (_a = this.webServer) === null || _a === void 0 ? void 0 : _a.websockets) === null || _b === void 0 ? void 0 : _b.emit("box", [{ x: x, y: y }]);
        }
        else {
            this.twitchAccess.say(channel, `@${userstate.username}: syntaxe incorrecte`);
            this.twitchAccess.say(channel, `!boxrules`);
        }
    }
}
exports.default = ModuleTWSpeaker;
