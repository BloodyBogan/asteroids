import Rectangle from './Rectangle';
import Vector2D from './Vector2D';

export default class CircleCollider {
    private readonly _position: Vector2D;

    private readonly _radius: number;

    public constructor(position: Vector2D, radius: number) {
        this._position = position;

        this._radius = radius;
    }

    public collidesWithCircle = (circle: this): boolean => {
        const dx = Math.abs(this._position.x - circle.x);
        const dy = Math.abs(this._position.y - circle.y);

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this._radius + circle.radius) {
            return true;
        }

        return false;
    };

    public collidesWithRectangle = (rectangle: Rectangle): boolean => {
        const distX = Math.abs(this._position.x - rectangle.x - rectangle.width / 2);
        const distY = Math.abs(this._position.y - rectangle.y - rectangle.height / 2);

        if (distX > rectangle.width / 2 + this._radius) {
            return false;
        }
        if (distY > rectangle.height / 2 + this._radius) {
            return false;
        }

        if (distX <= rectangle.width / 2) {
            return true;
        }
        if (distY <= rectangle.height / 2) {
            return true;
        }

        const dx = distX - rectangle.width / 2;
        const dy = distY - rectangle.height / 2;

        return dx * dx + dy * dy <= this._radius * this._radius;
    };

    public get x(): number {
        return this._position.x;
    }

    public get y(): number {
        return this._position.y;
    }

    public get radius(): number {
        return this._radius;
    }
}
