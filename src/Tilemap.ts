import { CANVAS_WIDTH, CANVAS_HEIGHT, CanvasRenderer } from './CanvasRenderer'
import { Sprite } from './Sprite';
import { Tile } from './Tile';

export class Tilemap {

    _canvas: CanvasRenderer;
    _offsetX: number;
    _offsetY: number;
    gridState: Tile[][][];

    constructor(canvas: CanvasRenderer, gridState?: Tile[][][]) {
        this._canvas = canvas;
        this.gridState = gridState || [[[]]];

        const [offsetX, offsetY] = this.findOriginOffset();
        this._offsetX = offsetX;
        this._offsetY = offsetY;
    }

    findBoundingBox() {
        let maxX = 0;
        let maxY = 0;
        let maxZ = this.gridState.length;

        this.gridState.forEach((yRow) => {
            maxY = Math.max(maxY, yRow.length);
            yRow.forEach((xRow) => {
                maxX = Math.max(maxX, xRow.length);
            });
        });
        return [maxZ, maxY, maxX];
    }
    findBoundingRect() {
        const [maxZ, maxY, maxX] = this.findBoundingBox();
        return [16 * (maxX + maxY), 8 * (maxX + maxY) + (16 * maxZ)];
    }

    findOriginOffset() {
        const [maxZ, maxY, maxX] = this.findBoundingBox();
        const offsetX = 8 * (maxX - maxY) - 16;
        const offsetY = 8 * maxZ - (4 * (maxX + maxY)) - 16;
        return [offsetX, offsetY];
    }

    draw() {
        for (let z = 0; z < this.gridState.length; z++) {
            for (let y = 0; y < this.gridState[z].length; y++) {
                for (let x = 0; x < this.gridState[z][y].length; x++) {
                    const tile = this.gridState[z][y][x];
                    if (tile instanceof Tile) {
                        this.drawSpriteAt(tile.getSprite(), x, y, z);
                    }
                }
            }
        }
    }

    drawSpriteAt(sprite: Sprite, x: number, y: number, z: number) {
        const { img, crop } = sprite;
        this._canvas.drawSprite(
            img,                                                            // Get spritesheet
            crop.x, crop.y, crop.w, crop.h,                                 // Crop sprite
            (CANVAS_WIDTH / 2) + this._offsetX + (y - x) * 16,              // TODO: Center the grid beforehand
            (CANVAS_HEIGHT / 2) + this._offsetY + (y + x) * 8 - (z) * 16,   // 
            crop.w, crop.h,                                                 // Keep sprite size
            sprite.flipX                                                    // Sprites can be flipped
        )
    }

    drawBoundingRect() {
        const [width, height] = this.findBoundingRect();
        this._canvas.drawRect((CANVAS_WIDTH - width) / 2, (CANVAS_HEIGHT - height) / 2, width, height);
    }

}