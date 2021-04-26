export const CANVAS_WIDTH = 320;
export const CANVAS_HEIGHT = 240;
const BG_COLOR = '#eee';

export type Ctx = CanvasRenderingContext2D;

export class CanvasRenderer {
    _parentElement: HTMLElement;
    _canvas: HTMLCanvasElement;
    _canvasHeight: number;
    _canvasWidth: number;
    _ctx: Ctx;
    _scaleFactor: number

    constructor(parentElement: HTMLElement) {
        const canvas = document.createElement('canvas');
        this._canvas = canvas;
        this._parentElement = parentElement;
        this._parentElement.appendChild(this._canvas);

        // Create canvas and context
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Cannot create canvas context');
        this._ctx = ctx;
        this._ctx.imageSmoothingEnabled = false;

        // These will be updated
        this._scaleFactor = 1;
        this._canvasWidth = 320;
        this._canvasHeight = 240;
        this.scaleCanvas();

        // Attach event listeners
        window.onresize = () => {
            this.scaleCanvas();
        }

    }

    calculateScalingFactor(): number {
        const boundingRect = this._parentElement.getBoundingClientRect();
        return Math.min(
            Math.floor(boundingRect.width / CANVAS_WIDTH),
            Math.floor(boundingRect.height / CANVAS_HEIGHT)
        );
    }

    scaleCanvas() {
        this._scaleFactor = this.calculateScalingFactor();
        this._canvasWidth = CANVAS_WIDTH * this._scaleFactor;
        this._canvasHeight = CANVAS_HEIGHT * this._scaleFactor;
        this._canvas.width = this._canvasWidth;
        this._canvas.height = this._canvasHeight;
    }

    clear() {
        this._ctx.fillStyle = BG_COLOR;
        this._ctx.fillRect(0, 0, this._canvasWidth, this._canvasWidth);
    }

    // Source and Destination {x, y, width, height}
    drawSprite(img: HTMLImageElement | ImageBitmap, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number) {
        this._ctx.imageSmoothingEnabled = false;
        this._ctx.drawImage(img, sx, sy, sw, sh, dx * this._scaleFactor, dy * this._scaleFactor, dw * this._scaleFactor, dh * this._scaleFactor);
    }

    drawText(text: string, x: number, y: number) {
        this._ctx.fillStyle = 'black';
        this._ctx.font = '30px Arial';
        this._ctx.fillText(text, x, y);
    }

    drawRect(x: number, y: number, w: number, h: number) {
        this._ctx.imageSmoothingEnabled = false;
        this._ctx.strokeStyle = 'black';
        this._ctx.lineWidth = this._scaleFactor;
        this._ctx.strokeRect(x * this._scaleFactor, y * this._scaleFactor, w * this._scaleFactor, h * this._scaleFactor);
    }

}