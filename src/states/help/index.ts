import initialize from './initialize';

import Display from '../../core/Display';
import StateManager from '../../core/StateManager';

import { EStates } from '../../typescript/enums';
import { IState } from '../../typescript/interfaces';

export default (function Help(
    initializeHelpState: typeof initialize,
    display: typeof Display,
    stateManager: typeof StateManager,
): IState {
    const { node, buttons, buttonHandler } = initializeHelpState(stateManager.changeState);

    const handlers: Array<(event: Event) => void> = [];

    const activate = (): void => {
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

        display.main.removeChild(node);

        display.container.removeChild(display.footer);
    };

    return {
        name: EStates.Help,
        activate,
        deactivate,
    };
})(initialize, Display, StateManager);
