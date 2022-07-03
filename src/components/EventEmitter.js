export class EventEmitter {
    constructor() {
        this._listeners = {};
    }
    on(type, listener) {
        if (!this._listeners[type]) {
            this._listeners[type] = [];
        }
        this._listeners[type].push(listener);
    }
    off(type, listener) {
        if (!this._listeners[type]) {
            return;
        }
        if (listener === undefined) {
            this._listeners[type] = [];
            return;
        }
        this._listeners[type] = this._listeners[type].filter(fn => fn !== listener);
    }
    _emit(type, ...args) {
        if (!this._listeners[type]) {
            return;
        }
        this._listeners[type].forEach(listener => listener(...args));
    }
}