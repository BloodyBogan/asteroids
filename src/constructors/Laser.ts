import Vector2D from './Vector2D';
import Rectangle from './Rectangle';

import { LASER } from '../config';

import { degreesToRadians } from '../utils';

export default class Laser extends Rectangle {
    _velocity: Vector2D;
    _velocityMultiplier = new Vector2D(LASER.velocityMultiplier, LASER.velocityMultiplier);

    constructor(x: number, y: number, angle: number) {
        super(x, y, LASER.width, LASER.height, LASER.backgroundColor);

        this._velocity = new Vector2D().fromAngle(degreesToRadians(angle) - Math.PI / 2);
        this._velocity.multiply(this._velocityMultiplier);
    }

    public update = (): void => {
        this._position.add(this._velocity);
    };
}
