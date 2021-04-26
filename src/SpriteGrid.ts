import { CANVAS_WIDTH, CANVAS_HEIGHT, CanvasRenderer } from './CanvasRenderer'
import { Sprite } from './Sprite';

export class SpriteGrid {

    _canvas: CanvasRenderer;
    gridState: Sprite[][][];

    constructor(canvas: CanvasRenderer, gridState?: Sprite[][][]) {
        this._canvas = canvas;
        this.gridState = gridState || [[[]]];
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
            this.gridState[z][y][x].img,                        // Get sprite
            0, 0, 32, 32,                                   // TODO: Cut sprite from spritesheet
            (CANVAS_WIDTH / 2) + (y - x) * 16,              // TODO: Center the grid beforehand
            (CANVAS_HEIGHT / 2) + (y + x) * 8 - (z) * 16,   // 
            32, 32                                          // Keep sprite size
        )
    }

}