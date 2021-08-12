import { EntryPoint } from "../../../public/js/models/entry-point.js";
import { View } from "../../../public/js/views/view.js";
import { ControllerBotCommands } from "./controller.client.js";
import { ViewBotCommands } from "./view.client.js";

export class BotCommandsEntryPoint implements EntryPoint
{
    private _controller: ControllerBotCommands | null;
    private _view: ViewBotCommands;

    constructor()
    {
        this._controller = new ControllerBotCommands();
        this._view = new ViewBotCommands(this._controller);
    }

    initView(view: View)
    {
        this._view.initView(view);
    }
}