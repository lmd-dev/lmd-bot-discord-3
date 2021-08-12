import { Notifier } from "../../../public/js/pattern/notifier.js";
import { DEFAULT_BOT_SETTINGS_DATA } from "./bot-settings.js";
export class ControllerBotSettings extends Notifier {
    constructor() {
        super();
        this._settings = DEFAULT_BOT_SETTINGS_DATA;
    }
    get settings() { return this._settings; }
    set settings(value) { this._settings = value; }
    async loadSettings() {
        const response = await fetch("/api/module-data/settings");
        if (response.status === 200) {
            this._settings = await response.json();
            this.notify();
        }
        else {
            const error = await response.text();
            console.error(error);
        }
    }
    async save(data) {
        data.id = this.settings.id;
        console.log(data);
        const response = await fetch("/api/module-data/settings", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "update",
                data: data
            })
        });
        if (response.status === 200) {
            this._settings = data;
            console.log(this._settings);
        }
        else {
            const error = response.text();
            console.error(error);
        }
    }
}
