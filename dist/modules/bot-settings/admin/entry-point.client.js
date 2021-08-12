import { ControllerBotSettings } from "./controller.client.js";
import { ViewBotSettings } from "./view.client.js";
export class BotSettingsEntryPoint {
    constructor() {
        this._controller = new ControllerBotSettings();
        this._view = new ViewBotSettings(this._controller);
        this._controller.loadSettings();
    }
    initView(view) {
        this._view.initView(view);
    }
}
