import { ControllerBotCommands } from "./controller.client.js";
import { ViewBotCommands } from "./view.client.js";
export class BotCommandsEntryPoint {
    constructor() {
        this._controller = new ControllerBotCommands();
        this._view = new ViewBotCommands(this._controller);
    }
    initView(view) {
        this._view.initView(view);
    }
}
