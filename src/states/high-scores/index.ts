import initialize from './initialize';

import Display from '../../core/Display';
import StateManager from '../../core/StateManager';
import ScoreManager from '../../core/ScoreManager';

import { EStates } from '../../typescript/enums';
import { IState } from '../../typescript/interfaces';

export default (function HighScores(
    initializeHighScoresState: typeof initialize,
    display: typeof Display,
    stateManager: typeof StateManager,
    scoreManager: typeof ScoreManager,
): IState {
    const { node, highScoresScoresList, buttons, buttonHandler } = initializeHighScoresState(stateManager.changeState);

    const handlers: Array<(event: Event) => void> = [];

    const activate = (): void => {
        const scores = scoreManager.getHighScores();
        for (const score of scores) {
            const highScoresScoresListItem = document.createElement('li');
            highScoresScoresListItem.textContent = `${score.rank}. `;

            const highScoresScoresListItemSpan = document.createElement('span');
            highScoresScoresListItemSpan.setAttribute('aria-label', `High score number ${score.rank}`);
            highScoresScoresListItemSpan.textContent = score.score.toString();

            highScoresScoresListItem.appendChild(highScoresScoresListItemSpan);

            highScoresScoresList.appendChild(highScoresScoresListItem);
        }

        display.main.appendChild(node);

        display.container.appendChild(display.footer);

        for (const buttonType of Object.keys(buttons)) {
            const key = buttonType as keyof typeof buttons;

            const [button, eventTypes] = Object.values(buttons[key]);

            const handler = buttonHandler.bind(button as HTMLButtonElement);
            handlers.push(handler);

            (eventTypes as string[]).forEach(eventType => {
                (button as HTMLButtonElement).addEventListener(eventType, handler, false);
            });
        }
    };

    const deactivate = (): void => {
        for (const buttonType of Object.keys(buttons)) {
            const key = buttonType as keyof typeof buttons;

            const [button, eventTypes] = Object.values(buttons[key]);

            const handler = handlers.shift()!;

            (eventTypes as string[]).forEach(eventType => {
                (button as HTMLButtonElement).removeEventListener(eventType, handler);
            });
        }

        while (highScoresScoresList.firstChild) {
            highScoresScoresList.removeChild(highScoresScoresList.firstChild);
        }

        display.main.removeChild(node);

        display.container.removeChild(display.footer);
    };

    return {
        name: EStates.HighScores,
        activate,
        deactivate,
    };
})(initialize, Display, StateManager, ScoreManager);
