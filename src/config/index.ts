import { EKeyNames, EAudioNames } from '../typescript/enums';

export const DISPLAY = {
    width: 640,
    height: 640,
};

export const ENGINE = {
    fps: 60,
    tolerance: 0.01,
};

export const KEYS = {
    UP: {
        name: EKeyNames.UP,
        keyCode: 38,
    },
    RIGHT: {
        name: EKeyNames.RIGHT,
        keyCode: 39,
    },
    LEFT: {
        name: EKeyNames.LEFT,
        keyCode: 37,
    },
    SPACE: {
        name: EKeyNames.SPACE,
        keyCode: 32,
    },
    P: {
        name: EKeyNames.P,
        keyCode: 80,
    },
    TAB: {
        name: EKeyNames.TAB,
        keyCode: 9,
    },
    ENTER: {
        name: EKeyNames.ENTER,
        keyCode: 13,
    },
};

export const ASSETS = (() => {
    const basePath = '../assets/';

    const images = {
        path: basePath + 'images/',
        files: [],
    };

    const audio = {
        path: basePath + 'audio/',
        files: [
            { name: EAudioNames.LASER, fileName: 'laser.mp3' },
            { name: EAudioNames.ASTEROID, fileName: 'asteroid.mp3' },
            { name: EAudioNames.BOOST, fileName: 'boost.mp3' },
            { name: EAudioNames.DEATH, fileName: 'death.mp3' },
        ],
    };

    return {
        images,
        audio,
    };
})();

export const SCORE = {
    increaseAmount: 1 / 60,
    maxBonusAmount: 50,

    numberOfHighScores: 3,

    localStorageKey: 'asteroidsHighScores',
};

export const SETTINGS = {
    localStorageKey: 'asteroidsSettings',
};

export const LOCAL_STORAGE = {
    highScoresName: SCORE.localStorageKey,
    settingsName: SETTINGS.localStorageKey,
};

export const GAME = {
    width: DISPLAY.width,
    height: DISPLAY.height,

    backgroundColor: '#000000',

    initialNumberOfAsteroids: 12,
};

export const SHIP = {
    initialX: GAME.width / 2,
    initialY: GAME.height / 2,
    initialAngle: 0,

    rotationalSpeed: 5,
    friction: 0.99,
    boostForceMultiplier: 0.1,

    radius: 25,

    lineWidth: 2,

    lineColor: '#ffffff',
    backgroundColor: GAME.backgroundColor,
};

export const ASTEROID = {
    radius: {
        min: 15,
        max: 50,

        offset: {
            min: -10,
            max: 15,
        },
    },

    vertices: {
        min: 5,
        max: 15,
    },

    maxDistanceFromEdge: 100,

    splitRate: 0.5,
    removalRadiusThreshold: 20,

    lineWidth: 2,

    lineColor: '#ffffff',
};

export const LASER = {
    width: 2,
    height: 2,

    velocityMultiplier: 10,

    backgroundColor: '#ffffff',
};
