import { Observer } from "./observer";

export class Notifier
{
    private _observers: Observer[];

    constructor()
    {
        this._observers = [];
    }

    addObserver(observer: Observer)
    {
        this._observers.push(observer);
    }

    notify()
    {
        this._observers.forEach((observer) => { observer.notify(); });
    }
    
}