import { CanvasRenderer } from './CanvasRenderer'
import { cutOutGroundTiles } from './tiles/Ground';
import { Tilemap } from './tiles/Tilemap';

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
                const { block, halfBlock, lowSlope, highSlope } = cutOutGroundTiles(this._imageBitmaps![0])

                this._grid = new Tilemap(this._canvas, [
                    [
                        [block, block, block, block, block, block, block, block],
                        [block, block, block, block, block, block, block, block],
                        [block, block, block, block, block, block, block, block],
                        [block, block, block, block, block, block, block, block],
                        [highSlope, highSlope, highSlope, highSlope, highSlope, highSlope, highSlope, highSlope],
                        [halfBlock, halfBlock, halfBlock, halfBlock, halfBlock, halfBlock, halfBlock, halfBlock],
                        [halfBlock, halfBlock, halfBlock, halfBlock, halfBlock, halfBlock, halfBlock, halfBlock],
                        [lowSlope, lowSlope, lowSlope, lowSlope, lowSlope, lowSlope, lowSlope, lowSlope],
                    ],
                    [
                        [block, block, block, block, block, block, block, block],
                        [highSlope, highSlope, highSlope, highSlope, highSlope, highSlope, highSlope, highSlope],
                        [lowSlope, lowSlope, lowSlope, lowSlope, lowSlope, lowSlope, lowSlope, lowSlope]
                    ]
                ]);
            });


        this.renderLoop(0);
    }

    async loadAssets() {
        const imageURLs = ['./Ground.png', './Turret.png'];

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