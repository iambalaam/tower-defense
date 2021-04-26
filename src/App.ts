import { CanvasRenderer } from './CanvasRenderer'

const SPRITE_SIZE = 32;
const isDebug = window.location.search
    .slice(1)
    .split('&')
    .includes('debug');

export class App {
    _canvas: CanvasRenderer;
    _img?: HTMLImageElement;
    _prevMs: number;

    constructor(canvas: CanvasRenderer) {
        this._canvas = canvas;
        this._prevMs = 0;

        const img = new Image();
        img.src = './Ground.png';
        img.onload = () => {
            this._img = img;
            this.renderSprites(this._img);
        }

        this.renderLoop(0);
    }

    renderSprites(img: HTMLImageElement) {
        this._canvas.drawSprite(img, 0, 0, SPRITE_SIZE, SPRITE_SIZE, 32, 32, 32, 32);
        this._canvas.drawSprite(img, 0, 0, SPRITE_SIZE, SPRITE_SIZE, 64, 32, 32, 32);
        this._canvas.drawSprite(img, 0, 0, SPRITE_SIZE, SPRITE_SIZE, 48, 40, 32, 32);
    }

    renderLoop: FrameRequestCallback = (cumMs: number) => {
        // Calculate time
        const ms = cumMs - this._prevMs;
        this._prevMs = cumMs;

        // Start with blank frame
        this._canvas.clear();

        // Render sprites
        if (this._img) {
            this.renderSprites(this._img);
        }

        // Debug
        if (isDebug) {
            this._canvas.drawText((1000 / ms).toFixed(0), 10, 50);
        }

        // Queue next frame
        requestAnimationFrame(this.renderLoop);
    }
}