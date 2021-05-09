import Input from '../constructors/Input';

import { KEYS } from '../config';

import { EKeyNames } from '../typescript/enums';
import { TWritable, TKeys } from '../typescript/types';

class Controller {
    private readonly _keys = <TWritable<TKeys>>{};

    private readonly _allowedKeys: number[] = [];

    private _gamePaused = false;
    private _pPressed = false;

    public constructor(keys: typeof KEYS) {
        for (const key of Object.values(keys)) {
            this._keys[key.name] = {
                name: key.name,
                input: new Input(),
                keyCode: key.keyCode,
            };

            this._allowedKeys = [...this._allowedKeys, key.keyCode];
        }
    }

    public activate = (): void => {
        window.addEventListener('keydown', this.keyDownUp);
        window.addEventListener('keyup', this.keyDownUp);
    };

    public deactivate = (): void => {
        this.resetKeys();

        window.removeEventListener('keydown', this.keyDownUp);
        window.removeEventListener('keyup', this.keyDownUp);
    };

    private keyDownUp = (event: KeyboardEvent): void => {
        const keyCode = event.keyCode;

        if (keyCode !== this._keys.TAB.keyCode && keyCode !== this._keys.ENTER.keyCode) {
            event.preventDefault();
        }

        if (!this._allowedKeys.includes(keyCode) || (this._gamePaused && keyCode !== this._keys.P.keyCode)) {
            return;
        }

        const state = event.type === 'keydown';

        const { UP, RIGHT, LEFT, SPACE, P } = this._keys;

        switch (keyCode) {
        case UP.keyCode:
            this.trigger(UP.input, state);
            break;
        case RIGHT.keyCode:
            this.trigger(RIGHT.input, state);
            break;
        case LEFT.keyCode:
            this.trigger(LEFT.input, state);
            break;
        case SPACE.keyCode:
            this.trigger(SPACE.input, state);
            break;
        case P.keyCode:
            this.trigger(P.input, state);

            if (this._gamePaused && this._pPressed === false && state === true) {
                const gameResumedEvent = new CustomEvent('gameResumed');

                window.dispatchEvent(gameResumedEvent);
            }

            this._pPressed = state;
        }
    };

    private resetKeys = (): void => {
        for (const _key of Object.keys(this._keys)) {
            const key = _key as EKeyNames;

            this.trigger(this._keys[key].input, false);
            this.setKey(key, false);
        }
    };

    private trigger = (input: Input, state: boolean): void => {
        if (input.state !== state) {
            input.active = input.state = state;
        }
    };

    public setKey = (keyName: EKeyNames, active: boolean): void => {
        this._keys[keyName].input.active = active;
    };

    public getKey = (keyName: EKeyNames): boolean => this._keys[keyName].input.active;

    public set gamePaused(gamePaused: boolean) {
        this._gamePaused = gamePaused;
    }

    public get gamePaused(): boolean {
        return this._gamePaused;
    }
}

export default new Controller(KEYS);
