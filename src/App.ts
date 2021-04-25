import { CanvasRenderer } from './CanvasRenderer'

const SPRITE_SIZE = 32;

export class App {
    _canvas: CanvasRenderer;
    _img?: HTMLImageElement;

    constructor(canvas: CanvasRenderer) {
        this._canvas = canvas;

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

    renderLoop: FrameRequestCallback = (_ms: number) => {
        // Start with blank frame
        this._canvas.clear();

        // Render sprites
        if (this._img) {
            this.renderSprites(this._img);
        }

        // Queue next frame
        requestAnimationFrame(this.renderLoop);
    }
}