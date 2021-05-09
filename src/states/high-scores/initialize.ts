import createMarkup from './createMarkup';

import StateManager from '../../core/StateManager';

import { EStates } from '../../typescript/enums';
import { TClassMethod } from '../../typescript/types';

const initialize = (changeState: TClassMethod<typeof StateManager, 'changeState'>) => {
    const { node, highScoresScoresList, backToMainMenuButton } = createMarkup();

    function buttonHandler(this: HTMLButtonElement, event: Event): void {
        event.stopPropagation();
        event.preventDefault();

        this.focus();

        changeState(EStates.MainMenu);
    }

    return {
        node,
        highScoresScoresList,
        buttons: {
            backToMainMenu: {
                backToMainMenuButton,
                eventTypes: ['click', 'touchstart'],
            },
        },
        buttonHandler,
    };
};

export default initialize;
