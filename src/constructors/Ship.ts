import Vector2D from './Vector2D';
import Triangle from './Triangle';
import Laser from './Laser';
import CircleCollider from './CircleCollider';

import { SHIP, GAME } from '../config';

import { degreesToRadians } from '../utils';

export default class Ship extends Triangle {
    private readonly _rotationSpeed = SHIP.rotationalSpeed;

    private readonly _velocity = new Vector2D();

    private readonly _friction = new Vector2D(SHIP.friction, SHIP.friction);

    private readonly _boostForceMultiplier = new Vector2D(SHIP.boostForceMultiplier, SHIP.boostForceMultiplier);

    private _lasers: Laser[] = [];

    private _isShooting = false;

    private readonly _collider: CircleCollider;

    public constructor() {
        super(
            SHIP.initialX,
            SHIP.initialY,
            SHIP.initialAngle,
            SHIP.radius,
            SHIP.lineWidth,
            SHIP.lineColor,
            SHIP.backgroundColor,
        );

        this._collider = new CircleCollider(this._position, this._radius);
    }

    public shoot = (): void => {
        if (this._isShooting) {
            return;
        }

        this._isShooting = true;

        this._lasers = [...this._lasers, new Laser(this._position.x, this._position.y, this._angle)];
    };

    public boost = (): void => {
        const boostForceX = Math.cos(degreesToRadians(this._angle) - Math.PI / 2);
        const boostForceY = Math.sin(degreesToRadians(this._angle) - Math.PI / 2);

        const boostForce = new Vector2D(boostForceX, boostForceY);
        boostForce.multiply(this._boostForceMultiplier);

        this._velocity.add(boostForce);
    };

    public rotateLeft = (): void => {
        this._angle -= this._rotationSpeed;
    };

    public rotateRight = (): void => {
        this._angle += this._rotationSpeed;
    };

    private wrapAroundEdges = (): void => {
        if (this._position.x > GAME.width + this._radius) {
            this._position.x = -this._radius;
        } else if (this._position.x < -this._radius) {
            this._position.x = GAME.width + this._radius;
        }

        if (this._position.y > GAME.height + this._radius) {
            this._position.y = -this._radius;
        } else if (this._position.y < -this._radius) {
            this._position.y = GAME.height + this._radius;
        }
    };

    public update = (): void => {
        this._position.add(this._velocity);

        this._velocity.multiply(this._friction);

        this.wrapAroundEdges();
    };

    public reset = (): void => {
        this._position.x = SHIP.initialX;
        this._position.y = SHIP.initialY;

        this._velocity.x = 0;
        this._velocity.y = 0;

        this._angle = SHIP.initialAngle;

        this._lasers = [];

        this._isShooting = false;
    };

    public get collider(): CircleCollider {
        return this._collider;
    }

    public get lasers(): Laser[] {
        return this._lasers;
    }

    public set isShooting(isShooting) {
        this._isShooting = isShooting;
    }

    public get isShooting(): boolean {
        return this._isShooting;
    }
}
