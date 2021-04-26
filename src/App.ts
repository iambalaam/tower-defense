import { CanvasRenderer } from './CanvasRenderer'
import { Sprite } from './Sprite';
import { SpriteGrid } from './SpriteGrid';

const SPRITE_SIZE = 32;
const isDebug = window.location.search
    .slice(1)
    .split('&')
    .includes('debug');

export class App {
    _loading = true;
    _imageBitmaps?: ImageBitmap[];
    _canvas: CanvasRenderer;
    _prevMs: number;
    _grid?: SpriteGrid;

    constructor(canvas: CanvasRenderer) {

        this._canvas = canvas;
        this._prevMs = 0;

        this.loadAssets()
            .then(() => {
                const s = new Sprite(this._imageBitmaps![0]);
                this._grid = new SpriteGrid(this._canvas, [
                    [[s, s, s, s, s], [s, s, s, s], [s, s, s], [s, s], [s]],
                    [[s, s, s], [s, s], [s]],
                    [[s]]
                ]);
            });



        this.renderLoop(0);
    }

    async loadAssets() {
        const imageURLs = ['./Ground.png'];

        const imageElementPromises = imageURLs.map((url) => new Promise<HTMLImageElement>((res, _rej) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                res(img);
            }
        }));

        const imageElements = await Promise.all(imageElementPromises);

        const imageBitmapPromises = imageElements.map((img) => createImageBitmap(img));
        const imageBitmaps = await Promise.all(imageBitmapPromises);
        this._imageBitmaps = imageBitmaps;
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