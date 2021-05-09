import Vector2D from './Vector2D';
import CircleCollider from './CircleCollider';

import { GAME, ASTEROID } from '../config';

import { getRandomNumber, mapRangeToRange } from '../utils';

export default class Asteroid {
    private readonly _position: Vector2D;

    private readonly _velocity = new Vector2D().random2D();

    private readonly _numberOfVertices: number;

    private readonly _radius: number;
    private readonly _maxRadius: number;
    private readonly _radiusOffset: number[] = [];

    private readonly _lineWidth: number;

    private readonly _lineColor: string;

    private readonly _collider: CircleCollider;

    public constructor(position?: Vector2D, radius?: number) {
        if (position) {
            this._position = new Vector2D(position.x, position.y);
        } else {
            const x =
                Math.random() >= 0.5
                    ? getRandomNumber(0, ASTEROID.maxDistanceFromEdge)
                    : getRandomNumber(GAME.width - ASTEROID.maxDistanceFromEdge, GAME.width);
            const y =
                Math.random() >= 0.5
                    ? getRandomNumber(0, ASTEROID.maxDistanceFromEdge)
                    : getRandomNumber(GAME.height - ASTEROID.maxDistanceFromEdge, GAME.height);

            this._position = new Vector2D(x, y);
        }

        this._numberOfVertices = getRandomNumber(ASTEROID.vertices.min, ASTEROID.vertices.max);

        if (radius) {
            this._radius = radius * ASTEROID.splitRate;
        } else {
            this._radius = getRandomNumber(ASTEROID.radius.min, ASTEROID.radius.max);
        }
        for (let i = 0; i < this._numberOfVertices; i++) {
            this._radiusOffset = [...this._radiusOffset, getRandomNumber(-this._radius * 0.5, this._radius * 0.5)];
        }
        const maxRadiusOffset = Math.max(...this._radiusOffset);
        this._maxRadius = this._radius + maxRadiusOffset;

        this._lineWidth = ASTEROID.lineWidth;

        this._lineColor = ASTEROID.lineColor;

        this._collider = new CircleCollider(this._position, this._maxRadius);
    }

    public split = (): Asteroid[] => [
        new Asteroid(this._position, this._radius),
        new Asteroid(this._position, this._radius),
    ];

    public update = (): void => {
        this._position.add(this._velocity);

        this.wrapAroundEdges();
    };

    public draw = (context: CanvasRenderingContext2D): void => {
        context.save();

        context.translate(this._position.x, this._position.y);

        context.lineWidth = this._lineWidth;

        context.strokeStyle = this._lineColor;

        context.beginPath();

        for (let i = 0; i < this._numberOfVertices; i++) {
            const angle = mapRangeToRange(i, 0, this._numberOfVertices, 0, Math.PI * 2);

            const r = this._radius + this._radiusOffset[i];

            const x = r * Math.cos(angle);
            const y = r * Math.sin(angle);

            if (i === 0) {
                context.moveTo(x, y);

                continue;
            }

            context.lineTo(x, y);
        }

        context.closePath();

        context.stroke();

        context.restore();
    };

    private wrapAroundEdges = () => {
        if (this._position.x > GAME.width + this._maxRadius) {
            this._position.x = -this._maxRadius;
        } else if (this._position.x < -this._maxRadius) {
            this._position.x = GAME.width + this._maxRadius;
        }

        if (this._position.y > GAME.height + this._maxRadius) {
            this._position.y = -this._maxRadius;
        } else if (this._position.y < -this._maxRadius) {
            this._position.y = GAME.height + this._maxRadius;
        }
    };

    public get collider(): CircleCollider {
        return this._collider;
    }

    public get radius(): number {
        return this._radius;
    }
}
