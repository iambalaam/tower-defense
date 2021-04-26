import { CANVAS_WIDTH, CANVAS_HEIGHT, CanvasRenderer } from './CanvasRenderer'
import { Sprite } from './Sprite';

const SPRITE_SIZE = 32;

export class SpriteGrid {

    _canvas: CanvasRenderer;
    _offsetX: number;
    _offsetY: number;
    gridState: Sprite[][][];

    constructor(canvas: CanvasRenderer, gridState?: Sprite[][][]) {
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
        return [16 * (maxX + maxY), 8 * Math.max(maxX, maxY) + (16 * maxZ) + 8];
    }

    findOriginOffset() {
        const [maxZ, maxY, maxX] = this.findBoundingBox();
        const offsetX = 8 * (maxX - maxY) - 16;
        const offsetY = 8 * maxZ - (4 * Math.max(maxX, maxY)) - 20;
        return [offsetX, offsetY];
    }

    draw() {
        for (let z = 0; z < this.gridState.length; z++) {
            for (let y = 0; y < this.gridState[z].length; y++) {
                for (let x = 0; x < this.gridState[z][y].length; x++) {
                    const sprite = this.gridState[z][y][x];
                    if (sprite) {
                        this.drawAt(x, y, z);
                    }
                }
            }
        }
    }

    drawAt(x: number, y: number, z: number) {
        this._canvas.drawSprite(
            this.gridState[z][y][x].img,                                    // Get sprite
            0, 0, 32, 32,                                                   // TODO: Cut sprite from spritesheet
            (CANVAS_WIDTH / 2) + this._offsetX + (y - x) * 16,              // TODO: Center the grid beforehand
            (CANVAS_HEIGHT / 2) + this._offsetY + (y + x) * 8 - (z) * 16,   // 
            32, 32                                                          // Keep sprite size
        )
    }

    drawBoundingRect() {
        const [width, height] = this.findBoundingRect();
        this._canvas.drawRect((CANVAS_WIDTH - width) / 2, (CANVAS_HEIGHT - height) / 2, width, height);
    }

}