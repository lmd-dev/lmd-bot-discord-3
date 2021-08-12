import { Notifier } from "../../../public/js/pattern/notifier.js";
export class ControllerBotCommands extends Notifier {
    constructor() {
        super();
        this._commands = [];
        this._selectedCommand = null;
        this.loadCommands();
    }
    get commands() { return this._commands; }
    get selectedCommand() { return this._selectedCommand; }
    async loadCommands() {
        const response = await fetch("/api/module-data/all/command");
        if (response.status === 200) {
            this._commands = await response.json();
            this.sortCommands();
            this.notify();
        }
    }
    selectCommand(commandId) {
        this._selectedCommand = this._commands.find((command) => { return commandId === command.id; }) ?? null;
        this.notify();
    }
    async addCommand(data) {
        const response = await fetch("/api/module-data/command", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: data })
        });
        if (response.status === 200) {
            const receivedData = await response.json();
            this._commands.push(receivedData);
            this.sortCommands();
            this.notify();
        }
        else {
            const error = await response.text();
            console.error(error);
        }
    }
    async updateCommand(data) {
        if (this.selectedCommand) {
            data.id = this.selectedCommand.id;
            const response = await fetch("/api/module-data/command", {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ data: data })
            });
            if (response.status === 200) {
                this.selectedCommand.name = data.name;
                this.selectedCommand.moduleName = data.moduleName;
                this.selectedCommand.actionName = data.actionName;
                this.sortCommands();
                this.notify();
            }
            else {
                const error = await response.text();
                console.error(error);
            }
        }
    }
    async removeCommand() {
        if (this.selectedCommand) {
            const response = await fetch("/api/module-data/command", {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ data: this.selectedCommand.id })
            });
            if (response.status === 200) {
                const index = this._commands.findIndex((command) => { return command.id === this.selectedCommand?.id; });
                if (index !== -1) {
                    this._commands.splice(index, 1);
                    this._selectedCommand = null;
                    this.notify();
                }
            }
            else {
                const error = await response.text();
                console.error(error);
            }
        }
    }
    sortCommands() {
        this._commands.sort((a, b) => {
            let order = a.moduleName.localeCompare(b.moduleName);
            if (order === 0)
                order = a.name.localeCompare(b.name);
            return order;
        });
    }
}
