import Display from './Display';
import Engine from './Engine';
import StateManager from './StateManager';
import Controller from './Controller';
import AssetLoader from './AssetLoader';
import AudioManager from './AudioManager';
import ScoreManager from './ScoreManager';
import SettingsManager from './SettingsManager';

import { ASSETS } from '../config';

import { IState } from '../typescript/interfaces';

class Game {
    private readonly _display: typeof Display;
    private readonly _engine: typeof Engine;
    private readonly _stateManager: typeof StateManager;
    private readonly _controller: typeof Controller;
    private readonly _assetLoader: typeof AssetLoader;
    private readonly _audioManager: typeof AudioManager;
    private readonly _scoreManager: typeof ScoreManager;
    private readonly _settingsManager: typeof SettingsManager;

    public constructor(
        display: typeof Display,
        engine: typeof Engine,
        stateManager: typeof StateManager,
        controller: typeof Controller,
        assetLoader: typeof AssetLoader,
        audioManager: typeof AudioManager,
        scoreManager: typeof ScoreManager,
        settingsManager: typeof SettingsManager,
    ) {
        this._display = display;
        this._engine = engine;
        this._stateManager = stateManager;
        this._controller = controller;
        this._assetLoader = assetLoader;
        this._audioManager = audioManager;
        this._scoreManager = scoreManager;
        this._settingsManager = settingsManager;
    }

    public initialize = async (
        assets: typeof ASSETS,
        loadingScreen: HTMLDivElement,
        ...states: IState[]
    ): Promise<void> => {
        if (!window.CanvasRenderingContext2D) {
            throw new Error('Your browser doesn\'t support canvas\' 2D rendering context!');
        }
        this._display.initialize();

        await this._assetLoader.initialize(assets);

        this._settingsManager.initialize();

        const audioAssets = this._assetLoader.audio;
        this._audioManager.initialize(audioAssets, this._settingsManager.getMuted);

        this._scoreManager.initialize();

        this._stateManager.initialize(this._engine, this._controller, states);

        document.body.removeChild(loadingScreen);
    };

    public get display(): typeof Display {
        return this._display;
    }

    public get stateManager(): typeof StateManager {
        return this._stateManager;
    }
}

export default new Game(
    Display,
    Engine,
    StateManager,
    Controller,
    AssetLoader,
    AudioManager,
    ScoreManager,
    SettingsManager,
);
