import createMarkup from './createMarkup';

import StateManager from '../../core/StateManager';
import AudioManager from '../../core/AudioManager';
import ScoreManager from '../../core/ScoreManager';
import SettingsManager from '../../core/SettingsManager';

import { EStates } from '../../typescript/enums';
import { TClassMethod } from '../../typescript/types';

const initialize = (
    changeState: TClassMethod<typeof StateManager, 'changeState'>,
    mute: TClassMethod<typeof AudioManager, 'mute'>,
    unmute: TClassMethod<typeof AudioManager, 'unmute'>,
    updateHighScores: TClassMethod<typeof ScoreManager, 'updateHighScores'>,
    resetScore: TClassMethod<typeof ScoreManager, 'resetScore'>,
    setShowMobileControls: TClassMethod<typeof SettingsManager, 'setShowMobileControls'>,
    setMuted: TClassMethod<typeof SettingsManager, 'setMuted'>,
) => {
    const {
        pause,
        mobileControlsCheckbox,
        mobileControlsCheckboxInput,
        muteCheckbox,
        muteCheckboxInput,
        resumeButton,
        quitGameButton,
    } = createMarkup();

    function mobileControlsCheckboxCallback(this: HTMLSpanElement) {
        const checkbox = this.querySelector('input') as HTMLInputElement;
        const checked = (checkbox.checked = !checkbox.checked);

        setShowMobileControls(checked);
    }

    function muteCheckboxCallback(this: HTMLSpanElement) {
        const checkbox = this.querySelector('input') as HTMLInputElement;
        const checked = (checkbox.checked = !checkbox.checked);

        setMuted(checked);

        if (checked) {
            mute();

            return;
        }

        unmute();
    }

    function resumeButtonCallback() {
        changeState(EStates.Play);
    }

    function quitGameButtonCallback() {
        updateHighScores();
        resetScore();

        changeState(EStates.MainMenu);
    }

    function buttonHandler(this: HTMLLabelElement | HTMLButtonElement, callback: () => void, event: Event): void {
        event.stopPropagation();
        event.preventDefault();

        this.focus();

        callback.bind(this)();
    }

    return {
        node: pause,
        checkboxes: {
            mobileControls: mobileControlsCheckboxInput,
            mute: muteCheckboxInput,
        },
        buttons: {
            mobileControls: {
                mobileControlsCheckbox,
                elementType: HTMLLabelElement,
                eventTypes: ['click', 'touchstart'],
                callback: mobileControlsCheckboxCallback,
            },
            mute: {
                muteCheckbox,
                elementType: HTMLLabelElement,
                eventTypes: ['click', 'touchstart'],
                callback: muteCheckboxCallback,
            },
            resume: {
                resumeButton,
                elementType: HTMLButtonElement,
                eventTypes: ['click', 'touchstart'],
                callback: resumeButtonCallback,
            },
            quitGame: {
                quitGameButton,
                elementType: HTMLButtonElement,
                eventTypes: ['click', 'touchstart'],
                callback: quitGameButtonCallback,
            },
        },
        buttonHandler,
    };
};

export default initialize;
