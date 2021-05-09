export default class Input {
    private _active = false;
    private _state = false;

    public set active(active: boolean) {
        this._active = active;
    }

    public get active(): boolean {
        return this._active;
    }

    public set state(state: boolean) {
        this._state = state;
    }

    public get state(): boolean {
        return this._state;
    }
}
