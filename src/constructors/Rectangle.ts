import Vector2D from './Vector2D';

import { GAME } from '../config';

export default class Rectangle {
    public readonly _position: Vector2D;

    public readonly _width: number;
    public readonly _height: number;

    private readonly _backgroundColor: string;

    protected constructor(x: number, y: number, width: number, height: number, backgroundColor: string) {
        this._position = new Vector2D(x, y);

        this._width = width;
        this._height = height;

        this._backgroundColor = backgroundColor;
    }

    public draw = (context: CanvasRenderingContext2D): void => {
        context.save();

        context.translate(this._position.x, this._position.y);

        context.fillStyle = this._backgroundColor;
        context.fillRect(0, 0, this._width, this._height);

        context.restore();
    };

    public offScreen = (): boolean =>
        this._position.x < -this._width ||
        this._position.x > GAME.width ||
        this._position.y < -this._height ||
        this._position.y > GAME.height;

    public get x(): number {
        return this._position.x;
    }

    public get y(): number {
        return this._position.y;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }
}
