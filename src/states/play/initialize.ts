import createMarkup from './createMarkup';

import StateManager from '../../core/StateManager';
import Controller from '../../core/Controller';

import Ship from '../../constructors/Ship';
import Asteroid from '../../constructors/Asteroid';

import { GAME } from '../../config';

import { EStates, EKeyNames } from '../../typescript/enums';
import { TClassMethod } from '../../typescript/types';

const initialize = (
    pauseButton: HTMLButtonElement,
    mobileControlsRight: HTMLButtonElement,
    mobileControlsLeft: HTMLButtonElement,
    mobileControlsBoost: HTMLButtonElement,
    mobileControlsShoot: HTMLButtonElement,
    changeState: TClassMethod<typeof StateManager, 'changeState'>,
    setKey: TClassMethod<typeof Controller, 'setKey'>,
) => {
    const { play, playCanvasContainer } = createMarkup();

    const ship = new Ship();

    let asteroids: Asteroid[] = [];
    for (let i = 0; i < GAME.initialNumberOfAsteroids; i++) {
        asteroids = [...asteroids, new Asteroid()];
    }

    function buttonHandler(this: HTMLButtonElement, event: Event): void {
        event.stopPropagation();
        event.preventDefault();

        this.focus();

        changeState(EStates.Pause);
    }

    function mobileControlsHandler(this: HTMLButtonElement, keyName: EKeyNames, event: Event) {
        event.stopPropagation();
        event.preventDefault();

        this.focus();

        const state = ['mousedown', 'touchstart'].includes(event.type);

        setKey(keyName, state);
    }

    return {
        node: play,
        canvasContainer: playCanvasContainer,
        ship,
        asteroids,
        buttons: {
            pause: {
                button: pauseButton,
                eventTypes: ['click', 'touchstart'],
            },
        },
        mobileControls: {
            right: {
                button: mobileControlsRight,
                eventTypes: ['mousedown', 'mouseup', 'mouseout', 'touchstart', 'touchend', 'touchcancel'],
                keyName: EKeyNames.RIGHT,
            },
            left: {
                button: mobileControlsLeft,
                eventTypes: ['mousedown', 'mouseup', 'mouseout', 'touchstart', 'touchend', 'touchcancel'],
                keyName: EKeyNames.LEFT,
            },
            boost: {
                button: mobileControlsBoost,
                eventTypes: ['mousedown', 'mouseup', 'mouseout', 'touchstart', 'touchend', 'touchcancel'],
                keyName: EKeyNames.UP,
            },
            shoot: {
                button: mobileControlsShoot,
                eventTypes: ['mousedown', 'mouseup', 'mouseout', 'touchstart', 'touchend', 'touchcancel'],
                keyName: EKeyNames.SPACE,
            },
        },
        buttonHandler,
        mobileControlsHandler,
    };
};

export default initialize;
