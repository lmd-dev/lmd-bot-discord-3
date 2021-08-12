import { Observer } from "../../../public/js/pattern/observer.js";
import { View } from "../../../public/js/views/view.js";
import { CommandData } from "./bot-command.client.js";
import { ControllerBotCommands } from "./controller.client.js";

export class ViewBotCommands implements Observer
{
    //Controller of the backoffice
    private _controller: ControllerBotCommands;

    //Parent of the view
    private _view: View | null;

    /**
     * Constructor
     * @param controller Controller of the backoffice 
     */
    constructor(controller: ControllerBotCommands)
    {
        this._controller = controller;
        this._controller.addObserver(this);

        this._view = null;
    }

    /**
     * Sets the parent of the view
     * @param view 
     */
    initView(view: View)
    {
        this._view = view;
        this.notify();
    }

    /**
     * Notify the view of any changes
     */
    notify()
    {
        this.displayBackOffice();
    }

    /**
     * Creates HTML item for the backoffice
     */
    displayBackOffice()
    {
        this._view?.clear();

        this._view?.appendTabs({
            tabs: [
                {
                    tabName: "Commandes",
                    displayMethod: (view) => { this.displayCommands(view); }
                }
            ]
        });

        this.initEvents();
    }

    /**
     * Displays the list of the commands
     * @param view 
     */
    displayCommands(view: View)
    {
        const selectedCommand = this._controller.selectedCommand;
        
        let html = `
            <div class="flex-row">
                <p class="field">
                    <label>Commande</label>
                    <input type="text" id="txt-bot-commands-name" value="${selectedCommand?.name ?? ""}">
                </p>
                <p class="field">
                    <label>Module</label>
                    <input type="text" id="txt-bot-commands-module" value="${selectedCommand?.moduleName ?? ""}">
                </p>
                <p class="field">
                    <label>Action</label>
                    <input type="text" id="txt-bot-commands-action" value="${selectedCommand?.actionName ?? ""}">
                </p>
                <p class="flex-row valign-bottom">
                    <button id="btn-bot-commands-add">Ajouter</button>
                    <button id="btn-bot-commands-update" class="${selectedCommand ? "" : "hidden"}">Modifier</button>
                    <button id="btn-bot-commands-remove" class="${selectedCommand ? "" : "hidden"}">Supprimer</button>
                </p>
            </div>
            <table>
                <tr>
                    <th>Commande</th><th>Module</th><th>Action</th>
                </tr>
        `

        this._controller.commands.forEach((command) => {
            html += `
                <tr data-id="${command.id ?? ""}">
                    <td>${command.name}</td>
                    <td>${command.moduleName}</td>
                    <td>${command.actionName}</td>
                </tr>
            `
        });

        html += "</table>";

        view!.innerHTML = html;

        this.initEvents();
    }

    /**
     * Initialize events of the view
     */
    initEvents()
    {
        document.getElementById("btn-bot-commands-add")?.addEventListener("click", () => { 
            this._controller.addCommand(this.getData());
        });

        document.getElementById("btn-bot-commands-update")?.addEventListener("click", () => { 
            this._controller.updateCommand(this.getData());
        });

        document.getElementById("btn-bot-commands-remove")?.addEventListener("click", () => { 
            this._controller.removeCommand();
        });

        document.querySelectorAll(".bot-command").forEach((row) => {
            row.addEventListener("click", (event) => { this._controller.selectCommand((event.currentTarget as HTMLElement).dataset["id"] ?? ""); })
        });
    }

    /**
     * Returns the data of the edited command
     * @returns 
     */
    getData(): CommandData
    {
        return {
            name: (document.getElementById("txt-bot-commands-name") as HTMLInputElement).value,
            moduleName: (document.getElementById("txt-bot-commands-module") as HTMLInputElement).value,
            actionName: (document.getElementById("txt-bot-commands-action") as HTMLInputElement).value
        }
    }
}