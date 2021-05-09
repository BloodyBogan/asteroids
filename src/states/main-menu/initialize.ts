import createMarkup from './createMarkup';

import StateManager from '../../core/StateManager';

import { EStates } from '../../typescript/enums';
import { TClassMethod } from '../../typescript/types';

const initialize = (changeState: TClassMethod<typeof StateManager, 'changeState'>) => {
    const { node, playButton, highScoresButton, settingsButton, helpButton } = createMarkup();

    function buttonHandler(this: HTMLButtonElement, stateName: EStates, event: Event): void {
        event.stopPropagation();
        event.preventDefault();

        this.focus();

        changeState(stateName);
    }

    return {
        node,
        buttons: {
            play: {
                playButton,
                eventTypes: ['click', 'touchstart'],
                stateName: EStates.Play,
            },
            highScores: {
                highScoresButton,
                eventTypes: ['click', 'touchstart'],
                stateName: EStates.HighScores,
            },
            settings: {
                settingsButton,
                eventTypes: ['click', 'touchstart'],
                stateName: EStates.Settings,
            },
            help: {
                helpButton,
                eventTypes: ['click', 'touchstart'],
                stateName: EStates.Help,
            },
        },
        buttonHandler,
    };
};

export default initialize;
