import initialize from './initialize';

import Display from '../../core/Display';
import StateManager from '../../core/StateManager';
import Controller from '../../core/Controller';
import AudioManager from '../../core/AudioManager';
import ScoreManager from '../../core/ScoreManager';
import SettingsManager from '../../core/SettingsManager';

import Asteroid from '../../constructors/Asteroid';

import { GAME, ASTEROID } from '../../config';

import { EStates, EKeyNames, EAudioNames } from '../../typescript/enums';
import { TComplete } from '../../typescript/types';
import { IState } from '../../typescript/interfaces';

export default (function Play(
    initializePlayState: typeof initialize,
    display: typeof Display,
    stateManager: typeof StateManager,
    controller: typeof Controller,
    audioManager: typeof AudioManager,
    scoreManager: typeof ScoreManager,
    settingsManager: typeof SettingsManager,
): TComplete<IState> {
    const {
        node,
        canvasContainer,
        ship,
        asteroids,
        buttons,
        mobileControls,
        buttonHandler,
        mobileControlsHandler,
    } = initializePlayState(
        display.pauseButton,
        display.mobileControlsRight,
        display.mobileControlsLeft,
        display.mobileControlsBoost,
        display.mobileControlsShoot,
        stateManager.changeState,
        controller.setKey,
    );

    let firstGame = true;

    let lastTimeStamp = 0;

    const handlers: Array<(event: Event) => void> = [];

    const reset = (_ship: typeof ship, _asteroids: typeof asteroids) => {
        _ship.reset();

        _asteroids.splice(0, _asteroids.length);
        for (let i = 0; i < GAME.initialNumberOfAsteroids; i++) {
            _asteroids.push(new Asteroid());
        }

        scoreManager.resetScore();
    };

    const activate = (): void => {
        if (stateManager.getPreviousState() !== EStates.Pause) {
            lastTimeStamp = 0;
        }

        node.appendChild(display.hud);

        canvasContainer.appendChild(display.canvas);

        display.main.appendChild(node);

        if (settingsManager.getShowMobileControls()) {
            display.main.appendChild(display.mobileControls);

            for (const mobileControlType of Object.keys(mobileControls)) {
                const key = mobileControlType as keyof typeof mobileControls;

                const [button, eventTypes, keyName] = Object.values(mobileControls[key]);

                const handler = mobileControlsHandler.bind(button as HTMLButtonElement, keyName as EKeyNames);
                handlers.push(handler);

                (eventTypes as string[]).forEach(eventType => {
                    (button as HTMLButtonElement).addEventListener(eventType, handler, false);
                });
            }
        }

        display.container.classList.add('l-container--play');

        controller.activate();

        for (const buttonType of Object.keys(buttons)) {
            const key = buttonType as keyof typeof buttons;

            const [button, eventTypes] = Object.values(buttons[key]);

            const handler = buttonHandler.bind(button as HTMLButtonElement);
            handlers.push(handler);

            (eventTypes as string[]).forEach(eventType => {
                (button as HTMLButtonElement).addEventListener(eventType, handler, false);
            });
        }

        if (!firstGame && stateManager.getPreviousState() !== EStates.Pause) {
            reset(ship, asteroids);
        }
    };

    const deactivate = (): void => {
        firstGame = false;

        if (display.main.contains(display.mobileControls)) {
            for (const mobileControlType of Object.keys(mobileControls)) {
                const key = mobileControlType as keyof typeof mobileControls;

                const [button, eventTypes, _] = Object.values(mobileControls[key]);

                const handler = handlers.shift()!;

                (eventTypes as string[]).forEach(eventType => {
                    (button as HTMLButtonElement).removeEventListener(eventType, handler);
                });
            }

            display.main.removeChild(display.mobileControls);
        }

        for (const buttonType of Object.keys(buttons)) {
            const key = buttonType as keyof typeof buttons;

            const [button, eventTypes] = Object.values(buttons[key]);

            const handler = handlers.shift()!;

            (eventTypes as string[]).forEach(eventType => {
                (button as HTMLButtonElement).removeEventListener(eventType, handler);
            });
        }

        controller.deactivate();

        node.removeChild(display.hud);

        canvasContainer.removeChild(display.canvas);

        if (display.main.contains(node)) {
            display.main.removeChild(node);
        }

        display.container.classList.remove('l-container--play');
    };

    const update = (timeStamp: number): void => {
        if (controller.getKey(EKeyNames.P)) {
            stateManager.changeState(EStates.Pause);
        }

        if (ship.isShooting && !controller.getKey(EKeyNames.SPACE)) {
            ship.isShooting = false;
        }

        if (controller.getKey(EKeyNames.LEFT)) {
            ship.rotateLeft();
        } else if (controller.getKey(EKeyNames.RIGHT)) {
            ship.rotateRight();
        }

        if (controller.getKey(EKeyNames.UP)) {
            ship.boost();

            if (!audioManager.isPlaying(EAudioNames.BOOST)) {
                audioManager.play(EAudioNames.BOOST);
            }
        }

        if (!ship.isShooting && controller.getKey(EKeyNames.SPACE)) {
            ship.shoot();

            audioManager.play(EAudioNames.LASER);
        }

        if (timeStamp >= lastTimeStamp + 5000) {
            const maxNumberOfAsteroidsToAdd = Math.floor(scoreManager.getScore() / 1000);

            const numberOfAsteroidsToAdd = Math.floor(Math.random() * maxNumberOfAsteroidsToAdd);

            for (let i = 0; i <= numberOfAsteroidsToAdd; i++) {
                asteroids.push(new Asteroid());
            }

            lastTimeStamp = timeStamp;
        }

        for (let i = ship.lasers.length - 1; i >= 0; i--) {
            ship.lasers[i].update();

            if (ship.lasers[i].offScreen()) {
                ship.lasers.splice(i, 1);

                continue;
            }

            for (let j = asteroids.length - 1; j >= 0; j--) {
                if (asteroids[j].collider.collidesWithRectangle(ship.lasers[i])) {
                    if (asteroids[j].radius > ASTEROID.removalRadiusThreshold) {
                        const [newAsteroid1, newAsteroid2] = asteroids[j].split();

                        asteroids.push(newAsteroid1, newAsteroid2);
                    }

                    const scoreMultiplier = ASTEROID.removalRadiusThreshold / asteroids[j].radius;
                    scoreManager.increaseScore(true, scoreMultiplier);

                    asteroids.splice(j, 1);
                    ship.lasers.splice(i, 1);

                    audioManager.play(EAudioNames.ASTEROID);

                    break;
                }
            }
        }

        ship.update();

        for (let i = asteroids.length - 1; i >= 0; i--) {
            asteroids[i].update();

            if (asteroids[i].collider.collidesWithCircle(ship.collider)) {
                audioManager.play(EAudioNames.DEATH);

                stateManager.changeState(EStates.EndGame);
            }
        }

        scoreManager.increaseScore();
    };

    const render = (): void => {
        display.context.fillStyle = GAME.backgroundColor;
        display.context.fillRect(0, 0, GAME.width, GAME.height);

        for (let i = ship.lasers.length - 1; i >= 0; i--) {
            ship.lasers[i].draw(display.context);
        }

        ship.draw(display.context);

        for (let i = asteroids.length - 1; i >= 0; i--) {
            asteroids[i].draw(display.context);
        }

        display.scoreDisplay.textContent = scoreManager.getScore().toString();
    };

    return {
        name: EStates.Play,
        activate,
        deactivate,
        update,
        render,
    };
})(initialize, Display, StateManager, Controller, AudioManager, ScoreManager, SettingsManager);
