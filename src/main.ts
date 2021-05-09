import Asteroids from './core/Game';

import { ASSETS } from './config';

import MainMenuState from './states/main-menu';
import HighScoresState from './states/high-scores';
import SettingsState from './states/settings';
import HelpState from './states/help';
import PlayState from './states/play';
import PauseState from './states/pause';
import EndGameState from './states/end-game';

const loadingScreen: HTMLDivElement = (window as any).loadingScreen;

window.onload = async (): Promise<void> => {
    try {
        await Asteroids.initialize(
            ASSETS,
            loadingScreen,
            MainMenuState,
            HighScoresState,
            SettingsState,
            HelpState,
            PlayState,
            PauseState,
            EndGameState,
        );

        window.focus();
    } catch (err) {
        setTimeout(() => {
            throw err;
        });
    }
};

window.onerror = (): void => {
    const errorMessageDisplay = document.createElement('h1');
    errorMessageDisplay.textContent = 'Oops! There was an error 💥';

    if (document.body.contains(loadingScreen)) {
        document.body.removeChild(loadingScreen);
    }

    if (Asteroids?.stateManager?.initialized) {
        Asteroids.stateManager.stop();
    }

    if (Asteroids?.display?.container && document.body.contains(Asteroids.display.container)) {
        document.body.removeChild(Asteroids.display.container);
    }

    document.body.appendChild(errorMessageDisplay);
};
