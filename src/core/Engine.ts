import { ENGINE } from '../config';

import { TComplete } from '../typescript/types';
import { IState } from '../typescript/interfaces';

class Engine {
    private readonly _fps: number;
    private readonly _tolerance: number;

    private _running = false;
    private _rafHandle: number | null = null;

    private _accumulatedTime = 0;
    private _currentTime = 0;

    private readonly _timeStep: number;

    private _state = <TComplete<IState>>{};

    public constructor(config: typeof ENGINE) {
        this._fps = config.fps;
        this._tolerance = config.tolerance;

        this._timeStep = 1000 / this._fps - this._tolerance;
    }

    private cycle = (timeStamp: number): void => {
        this._rafHandle = window.requestAnimationFrame((timeStamp): void => {
            this.cycle(timeStamp);
        });

        this._accumulatedTime += timeStamp - this._currentTime;
        this._currentTime = timeStamp;

        let updated = false;

        if (this._accumulatedTime > this._fps) {
            this._accumulatedTime = this._timeStep;
        }

        while (this._accumulatedTime >= this._timeStep) {
            this._state.update(timeStamp);

            updated = true;

            this._accumulatedTime -= this._timeStep;
        }

        if (updated) {
            this._state.render();
        }
    };

    public stop = (): void => {
        if (!this._rafHandle) {
            return;
        }

        this._running = false;

        window.cancelAnimationFrame(this._rafHandle);
        this._rafHandle = null;
    };

    public start = (): void => {
        if (this._rafHandle) {
            return;
        }

        this._running = true;
        this._rafHandle = window.requestAnimationFrame((timeStamp): void => {
            this.cycle(timeStamp);
        });
    };

    public set state(state: TComplete<IState>) {
        this._state = state;
    }

    public get state(): TComplete<IState> {
        return this._state;
    }

    public set running(running: boolean) {
        this._running = running;
    }

    public get running(): boolean {
        return this._running;
    }
}

export default new Engine(ENGINE);
