import initialize from './initialize';

import Display from '../../core/Display';
import StateManager from '../../core/StateManager';
import AudioManager from '../../core/AudioManager';
import ScoreManager from '../../core/ScoreManager';

import { EStates } from '../../typescript/enums';
import { IState } from '../../typescript/interfaces';

export default (function EndGame(
    initializeEndGameState: typeof initialize,
    display: typeof Display,
    stateManager: typeof StateManager,
    audioManager: typeof AudioManager,
    scoreManager: typeof ScoreManager,
): IState {
    const { node, scoreDisplay, buttons, buttonHandler } = initializeEndGameState(
        stateManager.changeState,
        scoreManager.updateHighScores,
        scoreManager.resetScore,
    );

    const handlers: Array<(event: Event) => void> = [];

    const activate = (): void => {
        audioManager.resetCurrentlyPlaying();

        scoreDisplay.textContent = scoreManager.getScore().toString();

        display.main.appendChild(node);

        display.container.appendChild(display.footer);

        for (const buttonType of Object.keys(buttons)) {
            const key = buttonType as keyof typeof buttons;

            const [button, eventTypes, callback] = Object.values(buttons[key]);

            const handler = buttonHandler.bind(button as HTMLButtonElement, callback as () => void);
            handlers.push(handler);

            (eventTypes as string[]).forEach(eventType => {
                (button as HTMLButtonElement).addEventListener(eventType, handler, false);
            });
        }
    };

    const deactivate = (): void => {
        for (const buttonType of Object.keys(buttons)) {
            const key = buttonType as keyof typeof buttons;

            const [button, eventTypes, _] = Object.values(buttons[key]);

            const handler = handlers.shift()!;

            (eventTypes as string[]).forEach(eventType => {
                (button as HTMLButtonElement).removeEventListener(eventType, handler);
            });
        }

        display.main.removeChild(node);

        display.container.removeChild(display.footer);
    };

    return {
        name: EStates.EndGame,
        activate,
        deactivate,
    };
})(initialize, Display, StateManager, AudioManager, ScoreManager);
