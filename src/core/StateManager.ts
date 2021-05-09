import Engine from './Engine';
import Controller from './Controller';

import { EStates } from '../typescript/enums';
import { TComplete } from '../typescript/types';
import { IState, IStates } from '../typescript/interfaces';

class StateManager {
    private readonly _states = <IStates>{};

    private _currentState = <IState>{};

    private readonly _initialState = EStates.MainMenu;
    private _previousState = this._initialState;

    private _engineHandle: typeof Engine | null = null;
    private _controllerHandle: typeof Controller | null = null;

    private _initialized = false;

    public initialize = (engineHandle: typeof Engine, controllerHandle: typeof Controller, states: IState[]): void => {
        this._engineHandle = engineHandle;
        this._controllerHandle = controllerHandle;

        for (const state of states) {
            this._states[state.name] = state;
        }

        this._currentState = this._states[this._initialState];
        this._currentState.activate();

        if (this._currentState.update && this._currentState.render) {
            this._controllerHandle.gamePaused = false;

            this._engineHandle.state = this._currentState as TComplete<IState>;
            this._engineHandle.start();
        }

        this._initialized = true;
    };

    public changeState = (stateName: EStates): void => {
        if (!this._engineHandle || !this._controllerHandle) {
            throw new Error('Engine handle not available!');
        }

        if (this._currentState.update && this._currentState.render) {
            this._engineHandle.stop();
        }
        this._currentState.deactivate();

        this._previousState = this._currentState.name;

        this._currentState = this._states[stateName];

        this._currentState.activate();
        if (this._currentState.update && this._currentState.render) {
            this._engineHandle.state = this._currentState as TComplete<IState>;
            this._engineHandle.start();

            this._controllerHandle.gamePaused = false;
        }
    };

    public stop = (): void => {
        if (!this._engineHandle || !this._controllerHandle) {
            throw new Error('Engine handle not available!');
        }

        if (this._currentState.update && this._currentState.render) {
            this._engineHandle.stop();
        }
        this._currentState.deactivate();
    };

    public getPreviousState = (): EStates => this._previousState;

    public get initialized(): boolean {
        return this._initialized;
    }
}

export default new StateManager();
