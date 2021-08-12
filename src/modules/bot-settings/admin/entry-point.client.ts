import { EntryPoint } from "../../../public/js/models/entry-point.js";
import { View } from "../../../public/js/views/view.js";
import { ControllerBotSettings } from "./controller.client.js";
import { ViewBotSettings } from "./view.client.js";

export class BotSettingsEntryPoint implements EntryPoint
{
    private _controller: ControllerBotSettings | null;
    private _view: ViewBotSettings;

    constructor()
    {
        this._controller = new ControllerBotSettings();
        this._view = new ViewBotSettings(this._controller);

        this._controller.loadSettings();
    }

    initView(view: View)
    {
        this._view.initView(view);
    }
}