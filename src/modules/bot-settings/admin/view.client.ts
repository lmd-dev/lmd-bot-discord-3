import { Observer } from "../../../public/js/pattern/observer.js";
import { View } from "../../../public/js/views/view.js";
import { BotSettingsData } from "./bot-settings.js";
import { ControllerBotSettings } from "./controller.client.js";

export class ViewBotSettings implements Observer
{
    private _controller: ControllerBotSettings;

    private _view: View | null;

    constructor(controller: ControllerBotSettings)
    {
        this._controller = controller;
        this._controller.addObserver(this);

        this._view = null;
    }

    initView(view: View)
    {
        this._view = view;
        this.notify();
    }

    notify()
    {
        this.displayBackOffice();
    }

    displayBackOffice()
    {
        this._view?.clear();

        this._view?.appendTabs({
            tabs: [
                {
                    tabName: "Paramètres Discord",
                    displayMethod: (view: View) => { this.displayDiscordSettings(view); }
                }, 
                {
                    tabName: "Paramètres Twitch",
                    displayMethod: (view: View) => { this.displayTwitchSettings(view); }
                }, 
                {
                    tabName: "Paramètres Serveur Web",
                    displayMethod: (view: View) => { this.displayWebServerSettings(view); }
                }
            ]
        });

        this.initEvents();
    }

    displayDiscordSettings(view: View)
    {
        view.innerHTML = `
            <p class="field">
                <label>Token Discord</label>
                <input type="password" id="txt-settings-discord-token" value="${this._controller.settings.discordToken ?? ""}">
            </p>
            <p>
                <button class="btn-settings-save">Enregistrer</button>
            </p>
        `;

    }

    displayTwitchSettings(view: View)
    {
        view.innerHTML = `
            <p class="field">
                <label>Utilisateur</label>
                <input type="text" id="txt-settings-twitch-username" value="${this._controller.settings.twitchUsername ?? ""}">
            </p>
            <p class="field">
                <label>Token Twitch</label>
                <input type="password" id="txt-settings-twitch-token" value="${this._controller.settings.twitchToken ?? ""}">
            </p>
            <p class="field">
                <label>Chaines Twitch à suivre (séparées par des virgules)</label>
                <input type="text" id="txt-settings-twitch-channels" value="${this._controller.settings.twitchChannels?.join(", ") ?? ""}">
            </p>
            <p>
                <button class="btn-settings-save">Enregistrer</button>
            </p>
        `;
    }

    displayWebServerSettings(view: View)
    {
        view.innerHTML = `
            <p class="field">
                <label>Port</label>
                <input type="number" id="txt-settings-webserver-port" value="${this._controller.settings.webserverPort ?? 0}">
            </p>
            <p>
                <button class="btn-settings-save">Enregistrer</button>
            </p>
        `;
    }

    initEvents()
    {
        document.querySelectorAll(".btn-settings-save").forEach((button) => {
            button.addEventListener("click", () => { this._controller.save(this.getData()); });
        });
    }

    getData(): BotSettingsData
    {
        return { 
            discordToken: (document.getElementById("txt-settings-discord-token") as HTMLInputElement).value,
            twitchUsername: (document.getElementById("txt-settings-twitch-username") as HTMLInputElement).value,
            twitchToken: (document.getElementById("txt-settings-twitch-token") as HTMLInputElement).value,
            twitchChannels: (document.getElementById("txt-settings-twitch-channels") as HTMLInputElement).value.split(", ").map((channel) => { return channel.trim(); }),
            webserverPort: parseInt((document.getElementById("txt-settings-webserver-port") as HTMLInputElement).value),
        };
    }
}