import initialize from './initialize';

import Display from '../../core/Display';
import StateManager from '../../core/StateManager';
import AudioManager from '../../core/AudioManager';
import ScoreManager from '../../core/ScoreManager';
import SettingsManager from '../../core/SettingsManager';

import { EStates } from '../../typescript/enums';
import { IState } from '../../typescript/interfaces';

export default (function Settings(
    initializeSettingsState: typeof initialize,
    display: typeof Display,
    stateManager: typeof StateManager,
    audioManager: typeof AudioManager,
    scoreManager: typeof ScoreManager,
    settingsManager: typeof SettingsManager,
): IState {
    const { node, checkboxes, buttons, buttonHandler } = initializeSettingsState(
        stateManager.changeState,
        audioManager.mute,
        audioManager.unmute,
        scoreManager.resetHighScores,
        settingsManager.setShowMobileControls,
        settingsManager.setMuted,
    );

    const handlers: Array<(event: Event) => void> = [];

    const activate = (): void => {
        checkboxes.mobileControls.checked = settingsManager.getShowMobileControls();
        checkboxes.mute.checked = settingsManager.getMuted();

        display.main.appendChild(node);

        display.container.appendChild(display.footer);

        for (const buttonType of Object.keys(buttons)) {
            const key = buttonType as keyof typeof buttons;

            const [button, _elementType, eventTypes, callback] = Object.values(buttons[key]);
            const elementType: HTMLLabelElement | HTMLButtonElement = _elementType;

            const handler = buttonHandler.bind(button as typeof elementType, callback as () => void);
            handlers.push(handler);

            (eventTypes as string[]).forEach(eventType => {
                (button as typeof elementType).addEventListener(eventType, handler, false);
            });
        }
    };

    const deactivate = (): void => {
        for (const buttonType of Object.keys(buttons)) {
            const key = buttonType as keyof typeof buttons;

            const [button, _elementType, eventTypes, _] = Object.values(buttons[key]);
            const elementType: HTMLLabelElement | HTMLButtonElement = _elementType;

            const handler = handlers.shift()!;

            (eventTypes as string[]).forEach(eventType => {
                (button as typeof elementType).removeEventListener(eventType, handler);
            });
        }

        display.main.removeChild(node);

        display.container.removeChild(display.footer);
    };

    return {
        name: EStates.Settings,
        activate,
        deactivate,
    };
})(initialize, Display, StateManager, AudioManager, ScoreManager, SettingsManager);
