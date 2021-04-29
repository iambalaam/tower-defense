import { Sprite } from "./Sprite";
import { GroundTile, Tile } from "./Tile";

const SPRITE_SIZE = 32;

export function cutOutGroundTiles(spriteSheet: ImageBitmap) {
    const block = new Tile(new Sprite(spriteSheet, { x: 0, y: 0, w: SPRITE_SIZE, h: SPRITE_SIZE }));
    const halfBlock = new Tile(new Sprite(spriteSheet, { x: 32, y: 0, w: SPRITE_SIZE, h: SPRITE_SIZE }));

    const lowSlopeN = new Sprite(spriteSheet, { x: 96, y: 0, w: SPRITE_SIZE, h: SPRITE_SIZE });
    const lowSlopeE = new Sprite(spriteSheet, { x: 96, y: 0, w: SPRITE_SIZE, h: SPRITE_SIZE }, true);
    const lowSlopeS = new Sprite(spriteSheet, { x: 96, y: 32, w: SPRITE_SIZE, h: SPRITE_SIZE });
    const lowSlopeW = new Sprite(spriteSheet, { x: 96, y: 32, w: SPRITE_SIZE, h: SPRITE_SIZE }, true);
    const lowSlope = new GroundTile('n', { n: lowSlopeN, e: lowSlopeE, s: lowSlopeS, w: lowSlopeW });

    const highSlopeN = new Sprite(spriteSheet, { x: 64, y: 0, w: SPRITE_SIZE, h: SPRITE_SIZE });
    const highSlopeE = new Sprite(spriteSheet, { x: 64, y: 0, w: SPRITE_SIZE, h: SPRITE_SIZE }, true);
    const highSlopeS = new Sprite(spriteSheet, { x: 64, y: 32, w: SPRITE_SIZE, h: SPRITE_SIZE });
    const highSlopeW = new Sprite(spriteSheet, { x: 64, y: 32, w: SPRITE_SIZE, h: SPRITE_SIZE }, true);
    const highSlope = new GroundTile('n', { n: highSlopeN, e: highSlopeE, s: highSlopeS, w: highSlopeW });

    return { block, halfBlock, lowSlope, highSlope };
}