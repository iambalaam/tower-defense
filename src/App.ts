import { CanvasRenderer } from './CanvasRenderer'
import { Sprite } from './Sprite';
import { GroundTile, Tile } from './Tile';
import { Tilemap } from './Tilemap';

export const isDebug = window.location.search
    .slice(1)
    .split('&')
    .includes('debug');

export class App {
    _loading = true;
    _imageBitmaps?: ImageBitmap[];
    _canvas: CanvasRenderer;
    _prevMs: number;
    _grid?: Tilemap;

    constructor(canvas: CanvasRenderer) {

        this._canvas = canvas;
        this._prevMs = 0;

        this.loadAssets()
            .then(() => {
                // block
                const b = new Tile(new Sprite(this._imageBitmaps![0], { x: 0, y: 0, w: 32, h: 32 }));
                // half block
                const h = new Tile(new Sprite(this._imageBitmaps![0], { x: 32, y: 0, w: 32, h: 32 }));
                // slope high
                const sh = new Tile(new Sprite(this._imageBitmaps![0], { x: 64, y: 0, w: 32, h: 32 }));
                // slope low
                const slN = new Sprite(this._imageBitmaps![0], { x: 96, y: 0, w: 32, h: 32 });
                const slE = new Sprite(this._imageBitmaps![0], { x: 96, y: 0, w: 32, h: 32 }, true);
                const slS = new Sprite(this._imageBitmaps![0], { x: 96, y: 32, w: 32, h: 32 });
                const slW = new Sprite(this._imageBitmaps![0], { x: 96, y: 32, w: 32, h: 32 }, true);
                const sl = new GroundTile('n', { n: slN, e: slE, w: slW, s: slS });

                this._grid = new Tilemap(this._canvas, [
                    [
                        [b, b, b, b, b, b, b, b],
                        [b, b, b, b, b, b, b, b],
                        [b, b, b, b, b, b, b, b],
                        [b, b, b, b, b, b, b, b],
                        [sh, sh, sh, sh, sh, sh, sh, sh],
                        [h, h, h, h, h, h, h, h],
                        [h, h, h, h, h, h, h, h],
                        [sl, sl, sl, sl, sl, sl, sl, sl],
                    ],
                    [
                        [b, b, b, b, b, b, b, b],
                        [sh, sh, sh, sh, sh, sh, sh, sh],
                        [sl, sl, sl, sl, sl, sl, sl, sl]
                    ]
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
        this._grid?.draw();
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
            this._grid?.drawBoundingRect();
        }

        // Queue next frame
        requestAnimationFrame(this.renderLoop);
    }
}