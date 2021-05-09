export default class Vector2D {
    private _x: number;
    private _y: number;

    public constructor(x?: number, y?: number) {
        this._x = x ?? 0;
        this._y = y ?? 0;
    }

    public random2D = (): this => {
        const theta = Math.random() * Math.PI * 2;

        this._x = Math.cos(theta);
        this._y = Math.sin(theta);

        return this;
    };

    public fromAngle = (angle: number): this => {
        this._x = Math.cos(angle);
        this._y = Math.sin(angle);

        return this;
    };

    public add = (vector: this): void => {
        this._x += vector.x;
        this._y += vector.y;
    };

    public multiply = (vector: this): void => {
        this._x *= vector.x;
        this._y *= vector.y;
    };

    public set x(newX: number) {
        this._x = newX;
    }

    public get x(): number {
        return this._x;
    }

    public set y(newY: number) {
        this._y = newY;
    }

    public get y(): number {
        return this._y;
    }
}
