import createMarkup from './createMarkup';

import StateManager from '../../core/StateManager';
import ScoreManager from '../../core/ScoreManager';

import { EStates } from '../../typescript/enums';
import { TClassMethod } from '../../typescript/types';

const initialize = (
    changeState: TClassMethod<typeof StateManager, 'changeState'>,
    updateHighScores: TClassMethod<typeof ScoreManager, 'updateHighScores'>,
    resetScore: TClassMethod<typeof ScoreManager, 'resetScore'>,
) => {
    const { endGame, endGameScoreDisplay, restartButton, quitGameButton } = createMarkup();

    const restartButtonCallback = () => {
        updateHighScores();

        changeState(EStates.Play);
    };

    const quitGameButtonCallback = () => {
        updateHighScores();
        resetScore();

        changeState(EStates.MainMenu);
    };

    function buttonHandler(this: HTMLLabelElement | HTMLButtonElement, callback: () => void, event: Event): void {
        event.stopPropagation();
        event.preventDefault();

        this.focus();

        callback();
    }

    return {
        node: endGame,
        scoreDisplay: endGameScoreDisplay,
        buttons: {
            restart: {
                restartButton,
                eventTypes: ['click', 'touchstart'],
                callback: restartButtonCallback,
            },
            quitGame: {
                quitGameButton,
                eventTypes: ['click', 'touchstart'],
                callback: quitGameButtonCallback,
            },
        },
        buttonHandler,
    };
};

export default initialize;
