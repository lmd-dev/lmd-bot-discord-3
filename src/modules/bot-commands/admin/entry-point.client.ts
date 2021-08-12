import { EntryPoint } from "../../../public/js/models/entry-point.js";
import { View } from "../../../public/js/views/view.js";
import { ControllerBotCommands } from "./controller.client.js";
import { ViewBotCommands } from "./view.client.js";

export class BotCommandsEntryPoint implements EntryPoint
{
    //Constroller of the backoffice
    private _controller: ControllerBotCommands | null;

    //View of the backoffice
    private _view: ViewBotCommands;

    /**
     * Constructor
     */
    constructor()
    {
        this._controller = new ControllerBotCommands();
        this._view = new ViewBotCommands(this._controller);
    }

    /**
     * Set the parent view of the view
     * @param view 
     */
    initView(view: View)
    {
        this._view.initView(view);
    }
}