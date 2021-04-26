import { CANVAS_WIDTH, CANVAS_HEIGHT, CanvasRenderer } from './CanvasRenderer'

export class SpriteGrid {

    _canvas: CanvasRenderer
    _tmpImg: HTMLImageElement;
    gridState: number[][][];

    constructor(canvas: CanvasRenderer, img: HTMLImageElement, gridState?: number[][][]) {
        this._canvas = canvas;
        this._tmpImg = img;
        this.gridState = gridState || [[[]]];
    }

    draw() {
        for (let z = 0; z < this.gridState.length; z++) {
            for (let y = 0; y < this.gridState[z].length; y++) {
                for (let x = 0; x < this.gridState[z][y].length; x++) {
                    const sprite = this.gridState[z][y][x];
                    if (sprite === 1) {
                        this.drawAt(x, y, z);
                    }
                }
            }
        }
    }

    drawAt(x: number, y: number, z: number) {
        this._canvas.drawSprite(
            this._tmpImg,                                   // TODO: Map to sprite
            0, 0, 32, 32,                                   // TODO: Cut sprite from spritesheet
            (CANVAS_WIDTH / 2) + (y - x) * 16,              // TODO: Center the grid beforehand
            (CANVAS_HEIGHT / 2) + (y + x) * 8 - (z) * 16,   // 
            32, 32                                          // Keep sprite size
        )
    }

}