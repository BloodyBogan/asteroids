import Vector2D from './Vector2D';

import { degreesToRadians } from '../utils';

export default class Triangle {
    protected readonly _position: Vector2D;

    protected _angle: number;

    protected readonly _radius: number;

    private readonly _lineWidth: number;

    private readonly _lineColor: string;
    private readonly _backgroundColor: string;

    protected constructor(
        x: number,
        y: number,
        angle: number,
        radius: number,
        lineWidth: number,
        lineColor: string,
        backgroundColor: string,
    ) {
        this._position = new Vector2D(x, y);

        this._angle = angle;

        this._radius = radius;

        this._lineWidth = lineWidth;

        this._lineColor = lineColor;
        this._backgroundColor = backgroundColor;
    }

    public draw = (context: CanvasRenderingContext2D): void => {
        context.save();

        context.translate(this._position.x, this._position.y);
        context.rotate(degreesToRadians(this._angle));

        context.lineWidth = this._lineWidth;

        context.fillStyle = this._backgroundColor;
        context.strokeStyle = this._lineColor;

        context.beginPath();
        context.moveTo(0, -this._radius);
        context.lineTo(-this._radius, this._radius);
        context.lineTo(this._radius, this._radius);
        context.closePath();

        context.fill();
        context.stroke();

        context.restore();
    };
}
