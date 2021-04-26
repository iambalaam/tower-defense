import { CanvasRenderer } from './CanvasRenderer'
import { Sprite } from './Sprite';
import { SpriteGrid } from './SpriteGrid';

const SPRITE_SIZE = 32;
const isDebug = window.location.search
    .slice(1)
    .split('&')
    .includes('debug');

export class App {
    _canvas: CanvasRenderer;
    _img?: HTMLImageElement;
    _prevMs: number;
    _grid?: SpriteGrid;

    constructor(canvas: CanvasRenderer) {
        this._canvas = canvas;
        this._prevMs = 0;

        const img = new Image();
        img.src = './Ground.png';
        img.onload = () => {
            createImageBitmap(img)
                .then((bitmap) => {
                    const s = new Sprite(bitmap);
                    this._grid = new SpriteGrid(this._canvas, [
                        [[s, s, s, s, s], [s, s, s, s], [s, s, s], [s, s], [s]],
                        [[s, s, s], [s, s], [s]],
                        [[s]]
                    ]);
                })
        }

        this.renderLoop(0);
    }

    renderSprites() {
        this._grid && this._grid.draw();
    }

    renderLoop: FrameRequestCallback = (cumMs: number) => {
        // Calculate time
        const ms = cumMs - this._prevMs;
        this._prevMs = cumMs;

        // Start with blank frame
        this._canvas.clear();

        // Render sprites
        this.renderSprites();

        // Debug
        if (isDebug) {
            this._canvas.drawText((1000 / ms).toFixed(0), 10, 50);
        }

        // Queue next frame
        requestAnimationFrame(this.renderLoop);
    }
}