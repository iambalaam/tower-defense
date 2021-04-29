import { Sprite } from './Sprite';

export class Tile {
    constructor(public s: Sprite) { };
    getSprite(): Sprite {
        return this.s;
    }
}

// here positive Y will be N and positive X will be E
export type Direction = keyof Direction2Sprite;
export interface Direction2Sprite { n: Sprite, e: Sprite, s: Sprite, w: Sprite };
export class GroundTile extends Tile {
    constructor(public dir: Direction, public map: Direction2Sprite) {
        super(map.n);
    }
    getSprite(): Sprite {
        return this.map[this.dir];
    }
}