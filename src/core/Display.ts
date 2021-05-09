import { DISPLAY } from '../config';

class Display {
    private readonly _canvas = document.createElement('canvas');
    private readonly _context: CanvasRenderingContext2D;

    private readonly _gameWidth: number;
    private readonly _gameHeight: number;

    private readonly _container = document.createElement('div');
    private readonly _main = document.createElement('main');
    private readonly _footer = document.createElement('footer');

    private readonly _hud = document.createElement('section');
    private readonly _scoreDisplay = document.createElement('span');
    private readonly _pauseButton = document.createElement('button');

    private readonly _mobileControls = document.createElement('section');
    private readonly _mobileControlLeft = document.createElement('button');
    private readonly _mobileControlRight = document.createElement('button');
    private readonly _mobileControlBoost = document.createElement('button');
    private readonly _mobileControlShoot = document.createElement('button');

    public constructor(config: typeof DISPLAY) {
        if (!this._canvas) {
            throw new Error('There was an error creating the canvas element!');
        }
        if (!this._canvas.getContext || !this._canvas.getContext('2d')) {
            throw new Error('There was an error getting canvas\' context!');
        }

        this._context = this._canvas.getContext('2d', { alpha: false })!;

        this._gameWidth = config.width;
        this._gameHeight = config.height;
    }

    public initialize = (): void => {
        this._canvas.width = this._gameWidth;
        this._canvas.height = this._gameHeight;

        this.createContainer();
        this.createHUD();
        this.createMobileControls();

        document.body.appendChild(this._container);
    };

    private createContainer = (): void => {
        this._main.setAttribute('role', 'main');

        const footerCredits = document.createElement('p');
        footerCredits.classList.add('l-footer__credits');

        const footerCreditsSmall = document.createElement('small');
        footerCreditsSmall.innerHTML = '&copy; 2021 | ';

        const footerCreditsLink = document.createElement('a');
        footerCreditsLink.href = 'https://github.com/BloodyBogan';
        footerCreditsLink.textContent = 'Michal Kaštan';

        footerCreditsSmall.appendChild(footerCreditsLink);
        footerCredits.appendChild(footerCreditsSmall);

        this._footer.classList.add('l-footer');
        this._footer.appendChild(footerCredits);

        this._container.classList.add('l-container');
        this._container.appendChild(this._main);
    };

    private createHUD = (): void => {
        const score = document.createElement('p');
        score.setAttribute('aria-live', 'polite');
        score.classList.add('b-play__hud-score');
        score.textContent = 'Score: ';

        this._scoreDisplay.textContent = '0';

        this._pauseButton.classList.add('b-play__hud-pause');
        this._pauseButton.textContent = '||';

        score.appendChild(this._scoreDisplay);

        this._hud.classList.add('b-play__hud');
        this._hud.appendChild(score);
        this._hud.appendChild(this._pauseButton);
    };

    private createMobileControls = (): void => {
        const topRow = document.createElement('div');
        topRow.classList.add('b-mobile-controls__row');

        const bottomRow = document.createElement('div');
        bottomRow.classList.add('b-mobile-controls__row');

        this._mobileControlLeft.className = 'mobile-control left';
        this._mobileControlLeft.textContent = '<';

        this._mobileControlRight.className = 'mobile-control right';
        this._mobileControlRight.textContent = '>';

        this._mobileControlBoost.className = 'mobile-control boost';
        this._mobileControlBoost.innerHTML = '&uarr;';

        this._mobileControlShoot.className = 'mobile-control shoot';
        this._mobileControlShoot.textContent = 'X';

        topRow.appendChild(this._mobileControlLeft);
        topRow.appendChild(this._mobileControlBoost);

        bottomRow.appendChild(this._mobileControlRight);
        bottomRow.appendChild(this._mobileControlShoot);

        this._mobileControls.classList.add('b-mobile-controls');
        this._mobileControls.appendChild(topRow);
        this._mobileControls.appendChild(bottomRow);
    };

    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public get context(): CanvasRenderingContext2D {
        return this._context;
    }

    public get container(): HTMLDivElement {
        return this._container;
    }

    public get main(): HTMLElement {
        return this._main;
    }

    public get footer(): HTMLElement {
        return this._footer;
    }

    public get hud(): HTMLElement {
        return this._hud;
    }

    public get scoreDisplay(): HTMLSpanElement {
        return this._scoreDisplay;
    }

    public get pauseButton(): HTMLButtonElement {
        return this._pauseButton;
    }

    public get mobileControls(): HTMLElement {
        return this._mobileControls;
    }

    public get mobileControlsLeft(): HTMLButtonElement {
        return this._mobileControlLeft;
    }

    public get mobileControlsRight(): HTMLButtonElement {
        return this._mobileControlRight;
    }

    public get mobileControlsBoost(): HTMLButtonElement {
        return this._mobileControlBoost;
    }

    public get mobileControlsShoot(): HTMLButtonElement {
        return this._mobileControlShoot;
    }
}

export default new Display(DISPLAY);
